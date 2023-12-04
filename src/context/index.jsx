import React, { useContext, createContext, useState } from "react";

import {
    useAddress,
    ConnectWallet,
    useContract,
    useMetamask,
    useContractWrite,
    useNFTs,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = "2WUz6avAarbZ3JBmFww1rnSa6Rq";
const projectSecretKey = "aea1f2e07401352ac354a2e715792715";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`;

const subdomain = "https://blockmania-marketplace.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        "0x6A85796498095646D887D5Ab647631986F2D20A9"
    );
    const { mutateAsync: createCampaign } = useContractWrite(
        contract,
        "createCampaign"
    );
    const [error, setError] = useState();

    const { contract: nftCollectionContract } = useContract(
        NFT_COLLECTION_ADDRESS
    );
    console.log(nftCollectionContract);
    const { data: allCollectionNfts, isLoading: isCollectionLoading } = useNFTs(
        nftCollectionContract
    );

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        console.log("Address", address);
        console.log("Metamask", connect);

        console.log("form", form);
        try {
            const data = await createCampaign({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            });

            console.log("contract call success", data);
        } catch (error) {
            console.log("contract call failure", error);
        }
    };

    const getCampaigns = async () => {
        const campaigns = await contract.call("getCampaigns");

        const parsedCampaings = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            image: campaign.image,
            pId: i,
        }));

        return parsedCampaings;
    };

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner === address
        );

        return filteredCampaigns;
    };

    const donate = async (pId, amount) => {
        console.log("donate", pId, amount);
        const data = await contract.call("donateToCampaign", [pId], {
            value: ethers.utils.parseEther(amount),
        });
        return data;
    };

    const getDonations = async (pId) => {
        const donations = await contract.call("getDonators", [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    };

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            setError("Error Uploading to IPFS");
            return JSON.stringify({
                message: error,
            });
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                uploadToIPFS,
                allCollectionNfts,
                isCollectionLoading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
