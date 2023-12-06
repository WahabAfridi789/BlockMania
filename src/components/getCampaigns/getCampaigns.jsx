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
import { useState, useEffect } from "react";
import { useStateContext } from "../../context";

const GetCampaigns = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedSection, setSelectedSection] = useState("myCampaigns");

    const [userCampaigns, setUserCampaigns] = useState([]);

    const { address, contract, getCampaigns, getUserCampaigns } =
        useStateContext();

    const handleButtonClick = (section) => {
        setSelectedSection(section);
    };

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();

        const userCampaigns = await getUserCampaigns();
        setUserCampaigns(userCampaigns);

        setCampaigns(data);
        console.log("data", data);
        setIsLoading(false);
    };

    if (isLoading) return;
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;

    return (
        <div
            className="container "
            style={{
                marginTop: 200,
            }}
        >
            <h1
                style={{
                    marginBottom: 50,
                }}
            >
                All Campaigns
            </h1>
            <div
                className="row 
            "
            >
                {isLoading ? (
                    <p>Loading direct listings...</p>
                ) : (
                    <>
                        {campaigns.map((nft, index) => (
                            <div
                                key={index}
                                className="col-sm-12 col-md-6 col-lg-6 col-xl-4  mb-5"
                            >
                                {nft.pId != 13 && <NftCard nftData={nft} />}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default GetCampaigns;
