import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ExploreProductArea from "@containers/explore-product";

// Demo data
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => (
    <Wrapper>
        <SEO pageTitle="Explore Campaigns" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Explore Campaigns"
                currentPage="Explore Campaigns"
            />
            <ExploreProductArea
                data={{
                    section_title: {
                        title: "Explore Product",
                    },
                    products: productData,
                }}
            />
        </main>
        <Footer />
    </Wrapper>
);

export default Home02;
