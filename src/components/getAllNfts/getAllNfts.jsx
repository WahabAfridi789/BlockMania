import React,{useEffect} from "react";
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

import {useStateContext} from "../../context";



const GetDirectListings = () => {
    const { contract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data: nftData, isLoading: nftIsLoading } = useNFTs(contract);


    const {       allCollectionNfts,
                isCollectionLoading} = useStateContext();

                // console.log("allCollectionNfts",allCollectionNfts)



    // const { contract: marketplace, isLoading: loadingContract } = useContract(
    //     MARKETPLACE_ADDRESS,
    //     "marketplace-v3"
    // );

    // const {
    //     data: directListings,
    //     isLoading: loadingDirectListings,
    //     error: directListingsError,
    // } = useDirectListings(marketplace, { start: 0, count: 100 });

    // const {
    //     data: directListingsCount,
    //     isLoading: loadingDirectListingsCount,
    //     error: errorDirectListingsCount,
    // } = useDirectListingsCount(marketplace);

 
    // const {
    //     data: englishAuctions,
    //     isLoading: loadingEnglishAuctions,
    //     error: englishAuctionsError,
    // } = useEnglishAuctions(marketplace, { start: 0, count: 100 });



    return (
        <div className="container mt-4">
            <h1>All NFTs</h1>
            <div
                className="row 
            "
            >
                {nftIsLoading ? (
                    <p>Loading All NFTs...</p>
                ) : (
                    <>
                        {nftData.map((nft, index) => (
                            <div
                                key={index}
                                className="col-sm-12 col-md-6 col-lg-6 col-xl-4  mb-5"
                            >
                                <NftCard nftData={...nft} 
                                allCollectionNfts={allCollectionNfts}
                                 />
                            </div>
                        ))}
                    </>
                )}

               
            </div>
        </div>
    );
};

export default GetDirectListings;
