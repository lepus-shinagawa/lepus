import {
    FrontierEvmEvent,
    FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";
import { Account, TofuNFT, TofuNFTTransaction } from "../types";

// Setup types from ABI
type TofuNFTEvInventoryUpdateArgs = [] & {
    id: BigNumber,
    inventory: {
        buyer: string,
        kind: Number,
        status: Number,
    },
};

type TofuNFTRunArgs = [] & {
    intent: {
        user: string,
        bundle: {
            tokenId: BigNumber,
        }[]
    },
    detail: {
        signer: string,
        opcode: Number,
        caller: string,
    },
}

const Kind = {
    KIND_BUY: 2,
} as const;

const Status = {
    Done: 1,
}

const Opcode = {
    COMPLETE_BUY: 2,
    ACCEPT_BUY: 4,
} as const;

export async function handleTofuNFTEvInventoryUpdateFrontierEvmEvent(
    event: FrontierEvmEvent<TofuNFTEvInventoryUpdateArgs>
): Promise<void> {
    // logger.info("========== handleTofuNFTEvInventoryUpdateFrontierEvmEvent ==========");
    // // 中身はabis/tofuNFT.jsonのEvInventoryUpdateを確認
    // logger.info(JSON.stringify(event));
    // logger.info(event.args.id.toBigInt());
    // logger.info(event.args.inventory.price.toBigInt());

    // logger.info("=== event ===")
    // logger.info(event.transactionHash, event.args.inventory.kind, event.args.inventory.status);
    // let count = await store.count(
    //     `TofuNFT`, `latestTransactionHash`, event.transactionHash);
    // if (count == 0) return;

    const isBuyDone =
        event.args.inventory.kind == Kind.KIND_BUY
        && event.args.inventory.status == Status.Done;
    if (!isBuyDone) return;

    // logger.info("=== isBuyDone ===")
    // logger.info(event.transactionHash)

    const transaction = await TofuNFTTransaction.get(event.transactionHash);
    let tofuNFT = await TofuNFT.get(transaction.tokenId);
    if (!tofuNFT) tofuNFT = TofuNFT.create({ id: transaction.tokenId });
    if (!tofuNFT.ownerHistoryAccountIds)
        tofuNFT.ownerHistoryAccountIds = [];

    const buyer = event.args.inventory.buyer;
    if (tofuNFT.ownerHistoryAccountIds.find(x => x == buyer)) return;

    // logger.info(`token id: ${tofuNFT.id}`);
    tofuNFT.ownerHistoryAccountIds.push(buyer);
    await tofuNFT.save();

    const account = await Account.get(buyer);
    if (!account) {
        await Account.create({
            id: buyer,
            totalTransferAmount: BigInt(0),
            nftForesightScore: BigInt(0),
        })
            .save();
    }

    // logger.info("saved")

    // logger.info(JSON.stringify(tofuNFT.ownerHistoryAccountIds));

    let accounts = await store.getByField(
        `Account`, `id`, tofuNFT.ownerHistoryAccountIds
    ) as Account[];

    const n = accounts.length;
    for (let i = 0; i < n - 1; i++) {
        // ((n-2) - i) ** 2 が足し込まれているはずなので、差分だけ足す
        accounts[i].nftForesightScore +=
            BigInt((n - 1 - i) ** 2 - (n - 2 - i) ** 2);
    }

    const data = accounts.map(function (x) {
        return {
            id: x.id,
            totalTransferAmount: x.totalTransferAmount,
            nftForesightScore: x.nftForesightScore,
        }
    });
    await store.bulkUpdate("Account", data);
}

export async function handleTofuNFTRunFrontierEvmCall(
    event: FrontierEvmCall<TofuNFTRunArgs>
): Promise<void> {
    const opcode = event.args.detail.opcode;
    if (opcode != Opcode.COMPLETE_BUY && opcode != Opcode.ACCEPT_BUY) return;

    // logger.info(opcode);
    const bundle = event.args.intent.bundle;
    for (let i = 0; i < bundle.length; i++) {
        const tokenId = bundle[i].tokenId.toString();
        const transaction = TofuNFTTransaction.create({
            id: event.hash, tokenId: tokenId
        });
        await transaction.save();

        // logger.info("=== call ===")
        // logger.info(JSON.stringify(transaction));
    }
}
