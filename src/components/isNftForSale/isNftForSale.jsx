import {
    useValidDirectListings,
    useValidEnglishAuctions,
    useContract,
} from "@thirdweb-dev/react";
import React from "react";

import {
    MARKETPLACE_ADDRESS,
    NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";

const NftSaleAvailability = (nftData) => {
    console.log("NFT for SalE COM", nftData);

    const { contract: marketplace, isLoading: loadingContract } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    const { data: directListing, isLoading: loadingDirect } =
        useValidDirectListings(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nftData.metadata.id,
        });

    const { data: auctionListing, isLoading: loadingAuction } =
        useValidEnglishAuctions(marketplace, {
            tokenContract: NFT_COLLECTION_ADDRESS,
            tokenId: nftData.metadata.id,
        });

    const isNftAvailableForSale = () => {
        if (directListing && directListing[0]) {
            return { available: true, saleType: "Direct Listing" };
        } else if (auctionListing && auctionListing[0]) {
            return { available: true, saleType: "Auction" };
        }
        return { available: false };
    };

    return isNftAvailableForSale();
};

export default NftSaleAvailability;
