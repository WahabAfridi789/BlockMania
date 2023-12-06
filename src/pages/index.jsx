/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import SEO from "../components/seo";
import Wrapper from "../layouts/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import HeroArea from "@containers/hero";
import ServiceArea from "@containers/services";
import NewsletterArea from "@containers/newsletter";
import { normalizedData } from "@utils/methods";
// import Buy from "./buy";
import homepageData from "../data/homepages/home.json";
import GetDirectListings from "../components/getListings/getDirectListings";
import GetAuctions from "../components/getAuctions/getAuctions";
import GetAllNfts from "../components/getAllNfts/getAllNfts";

export async function getStaticProps() {
    return {
        props: { className: "template-color-1 nft-body-connect" },
    };
}

const Home = ({ data }) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle="Marketplace" />
            <Header />

            {/* <div className="d-flex justify-content-center align-items-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> */}

            <main id="main-content">
                <HeroArea data={content["hero-section"]} />

                {/* <Buy /> */}
                <GetAllNfts />
                <GetDirectListings />
                <GetAuctions />

                <ServiceArea data={content["service-section"]} />
                <NewsletterArea data={content["newsletter-section"]} />
            </main>

            <Footer data={content["brand-section"]} space={3} />
        </Wrapper>
    );
};
export default Home;
