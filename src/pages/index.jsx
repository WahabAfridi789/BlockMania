/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import SEO from "../components/seo";
import Wrapper from "../layouts/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import HeroArea from "@containers/hero";
import CategoryArea from "@containers/category";
import LiveExploreArea from "@containers/live-explore";
import ServiceArea from "@containers/services";
import NewestItmesArea from "@containers/product";
import TopSellerArea from "@containers/top-seller";
import ExploreProductArea from "@containers/explore-product";
// import VideoArea from "@containers/video/layout-01";
import CollectionArea from "@containers/collection";
import NewsletterArea from "@containers/newsletter";
import { normalizedData } from "@utils/methods";
import { useState, useEffect } from "react";
import Buy from "./buy";
// Demo Data

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useSDK ,
    ThirdwebProvider,
    useContract,
    useContractMetadata,
    useNFT,
    useNFTs,
    useOwnedNFTs,
    useContractMetadataUpdate,


    useAddress,
 useSigner } from "@thirdweb-dev/react";


import homepageData from "../data/homepages/home.json";
import productData from "../data/products.json";




import sellerData from "../data/sellers.json";
import collectionsData from "../data/collections.json";

export async function getStaticProps() {

    return {
        props: { className: "template-color-1 nft-body-connect" },
    };
}
 const MARKETPLACE_ADDRESS = "0xe5c43B8fCaDEbee384fF1Ad7A3A1F30f59991AFB";


const NFT_COLLECTION_ADDRESS =
  "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";
const Home = ({ data }) => {
    const [marketplaceData, setMarketplaceData] = useState([]);

        const address = useAddress();


 const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  console.log(contract);
  const {data: nftData, isLoading } = useNFTs(contract);

 


  console.log("NFT DATA ",nftData);  

 



    const content = normalizedData(homepageData?.content || []);
   

    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />
          {
                isLoading ? 
                <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>: <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <Buy />
               
                <ServiceArea data={content["service-section"]} />
                <NewsletterArea data={content["newsletter-section"]} />
            </main>
          }
            
            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};
export default Home;
