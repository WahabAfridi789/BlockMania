import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { set } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

const nftCollectionAddress =
  "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {if (req.method === "POST") {
    // Handle POST request to mint a new NFT.
    console.log('Request body:', req.body);
    const { name, description, imageUrl, price, address,category,attributes } = JSON.parse(req.body);
    console.log("name:", name);

  console.log('Received data:', { name, description, imageUrl, price, address, });

    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.WALLET_PRIVATE_KEY!,
        "mumbai",
        {
          secretKey: process.env.TW_SECRET_KEY,
        }
      );

      const nftCollection = await sdk.getContract(
        nftCollectionAddress,
        "nft-collection"
      );

      // You can add validation logic here to check if an NFT with the same name already exists.

      const metadata = {
        metadata: {
          name,
          description,
          image: imageUrl,
          category,
          mintedBy: address,
          traits : attributes
          
          // You can add more attributes if needed.
        },
        price,
        to: address,
      };

      console.log("metadata:", metadata);

      const signature = await nftCollection?.signature.generate(metadata);
console.log("signature:", signature);
      // Mint the NFT with the generated signature.
      await nftCollection?.signature.mint(signature);

      console.log("NFT minted successfully.");

      return res.status(200).json({ signature });
    } catch (error) {
      console.log("Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
