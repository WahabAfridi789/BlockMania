import React from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/campaignHeader";
import Footer from "@layout/footer";
import { normalizedData } from "@utils/methods";
import HeroArea from "../campaignsContainers/hero";
import RecentCampaigns from "../campaignsContainers/recent-campaigns";
import Breadcrumb from "@components/breadcrumb";

import NftCard from "../components/getCampaigns/nftcard";
import { useState, useEffect } from "react";
import { useStateContext } from "../context";

import homepageData from "../data/homepages/campaignsHomeData.json";

export async function getStaticProps() {
    return {
        props: { className: "template-color-1 nft-body-connect" },
    };
}

const GetCampaigns = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedSection, setSelectedSection] = useState("myCampaigns");
    const content = normalizedData(homepageData?.content || []);

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

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [contract]);

    console.log("All Campaigns", campaigns);
    console.log("USER Campaigns", userCampaigns);

    if (isLoading) return;
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;

    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />
            <Breadcrumb pageTitle="My Campaigns" currentPage="My Campaigns" />
            <main id="main-content">
                <div
                    className="container "
                    style={{
                        marginTop: 50,
                    }}
                >
                    <h1
                        style={{
                            marginBottom: 50,
                        }}
                    >
                        My Campaigns
                    </h1>
                    <div
                        className="row 
            "
                    >
                        {isLoading ? (
                            <p>Loading My Campaigns...</p>
                        ) : (
                            <>
                                {userCampaigns.map((nft, index) => (
                                    <div
                                        key={index}
                                        className="col-sm-12 col-md-6 col-lg-6 col-xl-4  mb-5"
                                    >
                                        {nft.pId != 13 && (
                                            <NftCard nftData={nft} />
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};

export default GetCampaigns;
