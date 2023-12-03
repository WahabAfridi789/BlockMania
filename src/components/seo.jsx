import Head from "next/head";
import PropTypes from "prop-types";

const SEO = ({ pageTitle }) => {
    const title = `${pageTitle} || BlockMania Fundchain and NFTs Hub`;
    return (
        <Head>
            <title>{title}</title>
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="Generated by create next app" />
            <meta name="robots" content="noindex, follow" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
};

SEO.propTypes = {
    pageTitle: PropTypes.string.isRequired,
};

export default SEO;
