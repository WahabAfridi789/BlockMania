import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/campaignHeader";
import Footer from "@layout/footer";
import { normalizedData } from "@utils/methods";
import HeroArea from "../campaignsContainers/hero";
import RecentCampaigns from "../campaignsContainers/recent-campaigns";

import { Sidebar, Navbar } from "../components/campaigns";

import CampaignDetails from "./campaignDetails";
import CreateCampaign from "./CreateCampaignnnn";
import campaignHome from "./allCampaigns";
import Profile from "./profile";
import ExploreCampaigns from "./exploreCampaigns";

// import { CampaignDetails, CreateCampaign, campaignHome, Profile } from './pages/campaignPagesExport.js';


import productData from "../data/products.json";

// Demo Data

import homepageData from "../data/homepages/campaignsHomeData.json";

export async function getStaticProps() {
    return {
        props: { className: "template-color-1 nft-body-connect" },
    };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
 
    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />            
          
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />

                <ExploreCampaigns />
        

                {/* <CampaignDetails /> */}
            </main>
            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};
export default Home;
