/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },

    images: {
        domains: [
            "blockmania-marketplace.infura-ipfs.io",
            "cdn.pixabay.com",
            "ipfs.io",
            "gateway.p",
            "images.pexels.com",
            "res.cloudinary.com",
            "9ae075ddf0cff1be2c1727bf42618cbd.ipfscdn.io",
            "thumbor.forbes.com",
            "media.istockphoto.com",
            "i.guim.co.uk",
            "img.freepik.com",
            "encrypted-tbn0.gstatic.com",
            "www.shutterstock.com",
            "www.simplilearn.com",
        ],
        formats: ["image/webp"],
    },
};
