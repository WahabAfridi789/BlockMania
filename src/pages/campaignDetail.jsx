import React from 'react';
import { useRouter } from 'next/router';
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import CampaignDetailView from "@components/product/campaignItemLayout";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const CampaignDetail = () => {
    const router = useRouter();
    const { campaignData } = router.query;

    console.log("Campaign Detail", campaignData);

    // Parse the campaignData back to an object
    const campaign = campaignData ? JSON.parse(campaignData) : null;

    return (
        <Wrapper>
            <SEO pageTitle="Campaigns Detail" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Campaigns Detail"
                    currentPage="Campaigns Detail"
                />
                {/* Render the CampaignDetailView component with the campaign data */}
                {campaign && <CampaignDetailView campaign={campaign} />}
            </main>
            <Footer />
        </Wrapper>
    );
};

export default CampaignDetail;
