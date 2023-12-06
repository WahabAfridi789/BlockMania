import React from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import { useCartContext } from "../cartContext/CartContext";
import clsx from "clsx";

import Link from "next/link";
import {
    ETHERSCAN_URL,
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
import Button from "@ui/button";
export async function getStaticProps() {
    return { props: { className: "template-color-1", space: 1 } };
}
const Cart = () => {
    const { cartItems, removeFromCart } = useCartContext();

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

    const buyListing = async (item) => {};

    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    return (
        <Wrapper>
            <SEO pageTitle="Cart" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Cart" currentPage="Cart" />
                <div className={clsx("rn-about-card")}>
                    <h2>Cart</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className="bg-red-900">Name</th>
                                <th>Description</th>
                                <th>Owner</th>
                          
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.metadata.name}</td>
                                    <td>{item.metadata.description}</td>

                                    <td>{item.owner}</td>
                               
                                    <td>
                                        <img
                                            src={item.metadata.image}
                                            alt={item.metadata.name}
                                            style={{ width: "50px" }}
                                        />
                                    </td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <Button
                                            className={clsx("bg-danger")}
                                            onClick={() =>
                                                handleRemove(item.metadata.id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                        <Link
                                            href={`/token/${NFT_COLLECTION_ADDRESS}/${item.metadata.id}`}
                                        >
                                            <Button
                                                className="ms-5"
                                                onClick={() => buyListing(item)}
                                            >
                                                Buy NFT
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Cart;
