import { ThirdwebSDK } from "@thirdweb-dev/react";


export default async function server(req, res) {
    const { address } = JSON.parse(req.body);

    try {
        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.WALLET_PRIVATE_KEY,
            "mumbai",
            {
                secretKey: process.env.TW_SECRET_KEY,
            }
        );

        const nftCollection = await sdk.getContract(
            "0x4D5c26bc166bf3588a2D2B5114dc0d57F3b1FC67",
            "nft-collection"
        );

        const metadata = {
            metadata: {
                name:"New Name",
                description: "NEw Discription",
            },
            to: address,
        };

        const signature = await nftCollection?.signature.generate(metadata);

        console.log(signature.toString());
        return res.status(200).json({ signature });

    
    } catch (error) {
        return res.status(500).json({ error });
    }
}
