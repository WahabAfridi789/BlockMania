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

import NftCard from "../getListings/nftcard";

const GetAuctions = () => {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data: nftData, isLoading: nftIsLoading } = useNFTs(contract);

    const { contract: marketplace, isLoading: loadingContract } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    const {
        data: englishAuctions,
        isLoading: loadingEnglishAuctions,
        error: englishAuctionsError,
    } = useEnglishAuctions(marketplace, { start: 0, count: 100 });

    // console.log("englishAuctions", englishAuctions);

    return (
        <div className="container mt-4">
            <h1>Auctions</h1>
            <div
                className="row 
            "
            >
                {/* <div className="col-md-6">
                    <h2>Auctions</h2>
                    {loadingEnglishAuctions ? (
                        <p>Loading auctions...</p>
                    ) : (
                        <ul className="list-group">
                            {englishAuctions.map((auction, index) => (
                                <li className="list-group-item" key={index}>
                                    <div className="card mb-3">
                                        <img
                                            src={auction.image}
                                            className="card-img-top"
                                            alt={auction.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {auction.name}
                                            </h5>
                                            <p className="card-text">
                                                {auction.description}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {englishAuctionsError && <p>Error loading auctions</p>}
                </div> */}
                {/* <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2"></div> */}
                {loadingEnglishAuctions ? (
                    <p>Loading direct listings...</p>
                ) : (
                    <>
                        {englishAuctions.map((nft, index) => (
                            <div
                                key={index}
                                className="col-sm-12 col-md-6 col-lg-6 col-xl-4  mb-5"
                            >
                                <NftCard nftData={nft} />
                            </div>
                        ))}
                    </>
                )}

                {englishAuctionsError && <p>Error loading direct listings</p>}
            </div>
        </div>
    );
};

export default GetAuctions;
