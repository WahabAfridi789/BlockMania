import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";

// demo data

const CampaignDetail = ({ product, recentViewProducts, relatedProducts }) => (
    <Wrapper>
        <SEO pageTitle="Product Details" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Product Details"
                currentPage="Product Details"
            />
            <ProductDetailsArea product={product} />
        </main>
        <Footer />
    </Wrapper>
);

export async function getStaticPaths() {
    return {
        paths: productData.map(({ slug }) => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    };
}

export default CampaignDetail;
