import { SubstrateEvent } from "@subql/types"
import { Contract, DAppStakingReward, Account2, ContractType, AllClaimedReward, UnbondAndUnstake, BondAndStake } from "../types"
import { Balance } from "@polkadot/types/interfaces"
import { u32 } from "@polkadot/types"

export async function handleBondAndStake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, smartContract, balanceOf],
    },
  } = event
  const accountId = account.toString()
  const balance = correctBalance((balanceOf as Balance).toBigInt())
  const smartContractObj = JSON.parse(smartContract.toString())
  const contractType = smartContractObj.hasOwnProperty("wasm") ? "wasm" : "evm"
  const contractId = smartContractObj[contractType]
  await ensureAccount(accountId, 0, balance)
  await ensureContract(contractId, 0, balance)
  const entity = new BondAndStake(`${event.block.block.header.number}-${event.idx.toString()}`)
  entity.accountId = accountId
  entity.contractId = contractId
  entity.contractType = ContractType[contractType.toUpperCase()]
  entity.amount = balance
  entity.timestamp = event.block.timestamp
  await entity.save()
}

export async function handleUnbondAndUnstake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, smartContract, balanceOf],
    },
  } = event
  const accountId = account.toString()
  const balance = correctBalance((balanceOf as Balance).toBigInt())
  const smartContractObj = JSON.parse(smartContract.toString())
  const contractType = smartContractObj.hasOwnProperty("wasm") ? "wasm" : "evm"
  const contractId = smartContractObj[contractType]
  await ensureAccount(accountId, 0, -balance)
  await ensureContract(contractId, 0, -balance)
  const entity = new UnbondAndUnstake(`${event.block.block.header.number}-${event.idx.toString()}`)
  entity.accountId = accountId
  entity.contractId = contractId
  entity.contractType = ContractType[contractType.toUpperCase()]
  entity.amount = balance
  entity.timestamp = event.block.timestamp
  await entity.save()
}

export async function handleDAppStakingReward(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, smartContract, era, balanceOf],
    },
  } = event
  const balance = correctBalance((balanceOf as Balance).toBigInt())
  const accountId = account.toString()
  const smartContractObj = JSON.parse(smartContract.toString())
  const contractType = smartContractObj.hasOwnProperty("wasm") ? "wasm" : "evm"
  const contractId = smartContractObj[contractType]
  await ensureAccount(accountId, balance, 0)
  await ensureContract(contractId, balance, 0)
  await ensureAllClaimedReward(balance)
  const entity = new DAppStakingReward(`${event.block.block.header.number}-${event.idx.toString()}`)
  entity.accountId = accountId
  entity.contractId = contractId
  entity.contractType = ContractType[contractType.toUpperCase()]
  entity.reward = balance
  entity.eraIndex = (era as u32).toNumber()
  entity.timestamp = event.block.timestamp
  await entity.save()
}

async function ensureAccount(accountId: string, reward: number = 0, staking: number = 0): Promise<void> {
  let account = await Account2.get(accountId)
  if (!account) {
    account = new Account2(accountId)
    account.totalRewarded = 0
    account.totalStaking = 0
  }
  account.totalRewarded += reward
  account.totalStaking += staking
  await account.save()
}

async function ensureContract(contractId: string, balance: number = 0, staked: number = 0): Promise<void> {
  let contract = await Contract.get(contractId)
  if (!contract) {
    contract = new Contract(contractId)
    contract.totalReward = 0
    contract.totalStaked = 0
  }
  contract.totalReward += balance
  contract.totalStaked += staked
  await contract.save()
}

async function ensureAllClaimedReward(balance: number): Promise<void> {
  let allClaimedReward = await AllClaimedReward.get("1")
  if (!allClaimedReward) {
    allClaimedReward = new AllClaimedReward("1")
    allClaimedReward.amount = 0
    allClaimedReward.count = BigInt(0)
  }
  allClaimedReward.amount += balance
  allClaimedReward.count++
  await allClaimedReward.save()
}

function insertStr(str, index, insert) {
  return str.slice(0, index) + insert + str.slice(index, str.length)
}

function correctBalance(balanceOf: BigInt): number {
  let balance = balanceOf.toString()
  while (balance.length < 18) {
    balance = "0" + balance
  }
  if (balance.length > 18) {
    balance = insertStr(balance, balance.length - 18, ".")
  } else {
    balance = "0." + balance
  }
  return parseFloat(balance)
}