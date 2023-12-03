import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ExploreCampaignArea from "@containers/explore-product/campaigns";
import { useState, useEffect } from "react";



// Demo data
import productData from "../data/campaigns.json";


export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => {

 
  return (
    <Wrapper>
      <SEO pageTitle="Explore Campaigns" />
      <Header />

      <main id="main-content">
        <Breadcrumb
          pageTitle="Explore Campaigns"
          currentPage="Explore Campaigns"
        />


        
          <ExploreCampaignArea
            data={{
              section_title: {
                title: "Explore Campaigns",
              },
              products: productData,
            }}
            
          />
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Home02;
