import {
    FrontierEvmEvent,
    FrontierEvmCall,
} from "@subql/frontier-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type Inventory = [[string, string, string, BigNumber, BigNumber, BigNumber, Number, Number]] & {
    seller: string,
    buyer: string,
    currency: string, // IERC20
    price: BigNumber,
    netPrice: BigNumber,
    deadline: BigNumber,
    kind: Number,
    status: Number,
};

type EvInventoryUpdateArgs = [BigNumber, Inventory] & {
    id: BigNumber,
    inventory: Inventory,
};

export async function handleTofuNFTEvInventoryUpdateFrontierEvmEvent(
    event: FrontierEvmEvent<EvInventoryUpdateArgs>
): Promise<void> {
    logger.info("========== handleTofuNFTEvInventoryUpdateFrontierEvmEvent ==========");
    // 中身はabis/tofuNFT.jsonのEvInventoryUpdateを確認
    logger.info(JSON.stringify(event));
    logger.info(event.args.id.toBigInt());
    logger.info(event.args.inventory.price.toBigInt());
}

export async function handleTofuNFTFrontierEvmCall(
    event: FrontierEvmCall
): Promise<void> {
    logger.info("========== handleTofuNFTFrontierEvmCall ==========");
    logger.info(JSON.stringify(event));
}
