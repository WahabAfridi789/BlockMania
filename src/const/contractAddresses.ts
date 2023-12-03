/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0xe5c43B8fCaDEbee384fF1Ad7A3A1F30f59991AFB";

// export const MARKETPLACE_ADDRESS = '0x542e4bB2Ea205806c306C463D840d1f175deF38F';

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";

// export const NFT_COLLECTION_ADDRESS =
//   "0xDF6d05A80b27612d261749030E30508DED86F7bE";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com";
