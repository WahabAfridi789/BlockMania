import React from "react";
import {
    NFT_COLLECTION_ADDRESS,
    MARKETPLACE_ADDRESS,
} from "../../const/contractAddresses";
import {
    useContract,
    useNFTs,
    useDirectListings,
    useDirectListingsCount,
    useEnglishAuctions,
} from "@thirdweb-dev/react";

import NftCard from "./nftcard";

const GetDirectListings = () => {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data: nftData, isLoading: nftIsLoading } = useNFTs(contract);

    const { contract: marketplace, isLoading: loadingContract } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    const {
        data: directListings,
        isLoading: loadingDirectListings,
        error: directListingsError,
    } = useDirectListings(marketplace, { start: 0, count: 100 });

    const {
        data: directListingsCount,
        isLoading: loadingDirectListingsCount,
        error: errorDirectListingsCount,
    } = useDirectListingsCount(marketplace);

    const {
        data: englishAuctions,
        isLoading: loadingEnglishAuctions,
        error: englishAuctionsError,
    } = useEnglishAuctions(marketplace, { start: 0, count: 100 });

    // console.log("nftData", nftData);
    // console.log("marketplace", marketplace);
    // console.log("directListings", directListings);
    // console.log("englishAuctions", englishAuctions);

    return (
        <div className="container mt-4">
            <h1>Direct Listings</h1>
            <div
                className="row 
            "
            >
                {loadingDirectListings ? (
                    <p>Loading direct listings...</p>
                ) : (
                    <>
                        {directListings.map((nft, index) => (
                            <div
                                key={index}
                                className="col-sm-12 col-md-6 col-lg-6 col-xl-4  mb-5"
                            >
                                <NftCard nftData={nft} />
                            </div>
                        ))}
                    </>
                )}

                {directListingsError && <p>Error loading direct listings</p>}
            </div>
        </div>
    );
};

export default GetDirectListings;
