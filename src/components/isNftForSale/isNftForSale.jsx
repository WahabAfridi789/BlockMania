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

    // console.log("Direct Listing[0]", directListing[0]);

    const isNftAvailableForSale = () => {
        if (directListing && directListing[0]) {
            return {
                available: true,
                saleType: "Direct Listing",
                pricePerToke:
                    directListing[0]?.currencyValuePerToken.displayValue,
            };
        } else if (auctionListing && auctionListing[0]) {
            return {
                available: true,
                saleType: "Auction",
                bid: `${auctionListing[0]?.minimumBidCurrencyValue.displayValue}`,
            };
        }
        return {
            available: false,
            saleType: null,
            pricePerToke: null,
            bid: null,
        };
    };

    return isNftAvailableForSale();
};

export default NftSaleAvailability;
