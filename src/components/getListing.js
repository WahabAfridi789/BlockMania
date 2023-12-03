import useListingData from "../hooks/useGetListing";
import {
    MARKETPLACE_ADDRESS,
    NETWORK,
    NFT_COLLECTION_ADDRESS,
} from "../const/contractAddresses";
import {
    MediaRenderer,
    ThirdwebNftMedia,
    useContract,
    useContractEvents,
    useValidDirectListings,
    useValidEnglishAuctions,
    useContractWrite,
    Web3Button,
    useAddress,
} from "@thirdweb-dev/react";
const GetListing = () => {
    // Connect to marketplace smart contract
    const { contract: marketplace, isLoading: loadingContract } = useContract(
        MARKETPLACE_ADDRESS,
        "marketplace-v3"
    );

    // Connect to NFT Collection smart contract
    const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
    const { contract } = useContract(
        "0xe5c43B8fCaDEbee384fF1Ad7A3A1F30f59991AFB"
    );
    const address = useAddress();
    console.log("MARKETPLACE ", marketplace);
    console.log("NFT COLLECTION ", nftCollection);
    // Get all direct listings from the marketplace
    const { data: directListings, isLoading: loadingDirectListings } =
        useValidDirectListings(marketplace);

    console.log("DIRECT LISTINGS ", directListings);

    const { mutateAsync: buyFromListing, isLoading } = useContractWrite(
        contract,
        "buyFromListing"
    );

    console.log("BUY FROM LISTING ", buyFromListing);
    const buyListing = async (item) => {
        console.log("ITEM ", item);
        const { listingData, loading } = useListingData(item.metadata.id);

        try {
            const data = await buyFromListing({
                args: [item.metadata.id, address, 1, _price, _priceCurrency],
            });
            console.info("contract call successs", data);
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    // Rest of your component logic
};

export default GetListing;
