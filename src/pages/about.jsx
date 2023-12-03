import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import AboutArea from "@containers/about/layout-02";
import QuoteArea from "@containers/quote-area";
import FunfactArea from "@containers/funfact";
import CTAArea from "@containers/cta";
import { normalizedData } from "@utils/methods";
// Demo data
import aboutData from "../data/innerpages/about.json";

const About = () => {
    const content = normalizedData(aboutData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="About" />
            <Header />
            <main id="main-content">
                <AboutArea data={content["about-section"]} />
                <QuoteArea data={content["quote-section"]} />
                <FunfactArea data={content["funfact-section"]} />
                <CTAArea data={content["cta-section"]} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticProps() {
    return {
        props: {
            className: "template-color-1",
        },
    };
}

About.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default About;
