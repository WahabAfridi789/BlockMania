import React from "react";
import styles from "./NftCard.module.css";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import IsNftForSale from "../isNftForSale/isNftForSale";
const Web3 = require("web3");
import { useCartContext } from "../../cartContext/CartContext";
import {
    MARKETPLACE_ADDRESS,
    NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
const NFTCard = ({ nftData, allCollectionNfts }) => {
    const web3 = new Web3();
    let price = 0;
    let isAuction = false;
    let isDirect = false;
    const { addToCart, error, setError } = useCartContext();
    const { available, saleType, bid, pricePerToke } = IsNftForSale(nftData);
    const handleAddToCart = (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors

        addToCart(nftData);
    };

    const metadata = nftData?.metadata || {}; // Access metadata directly

    return (
        <div className={styles.container}>
            <div className={styles.cubeLink}>
                <Link href={`/token/${NFT_COLLECTION_ADDRESS}/${metadata.id}`}>
                    <Image
                        id="cube"
                        src={metadata.image != "asd" && metadata.image}
                        alt="cube"
                        width={300}
                        height={300}
                        className={styles.cube}
                    />
                </Link>
            </div>
            <div className={styles.header}>
                <Link
                    href={`/token/${nftData.assetContractAddress}/${metadata.tokenId}`}
                >
                    <p className={styles.name}>
                        {metadata.name?.slice(0, 1).toUpperCase() +
                            metadata.name?.slice(1)}
                    </p>
                </Link>
                <p onClick={handleAddToCart}>
                    Add to Cart <PlusCircle color="#00A4FE" />
                </p>
            </div>
            {
                // ... (Your code for price section)
                available ? (
                    <div
                        className="
                                fs-3 text
                               w-100
                               d-flex justify-content-center
                               
                            "
                    >
                        {saleType == "Direct Listing" ? (
                            <span className="badge bg-success w-75">
                                Available : Direct Listing {pricePerToke}
                            </span>
                        ) : (
                            <span className="badge bg-success w-75">
                                Available : Auction {bid}
                            </span>
                        )}
                    </div>
                ) : (
                    <div
                        className="
                               fs-3 text
                               w-100
                               d-flex justify-content-center
                               
                            "
                    >
                        <p
                            className="  badge bg-danger
                             
                                 w-50"
                        >
                            Not for Sale
                        </p>
                    </div>
                )
            }

            <p className={styles.description}>{metadata.description}</p>
            <div className={styles.ethAndDays}>
                {/* ... (Your code for ethAndDays section) */}
            </div>
            <div className={styles.line}></div>
            <div className={styles.jules}>
                <img
                    id="avatar"
                    src="https://i.ibb.co/yQGmyYK/image-avatar.png"
                    alt="image-avatar"
                    border="0"
                    className={styles.avatar}
                />
                <p className={styles.avatarName}>
                    Creation of{" "}
                    <a href="#" className={styles.mainName}>
                        {nftData?.owner?.slice(0, 6) +
                            "..." +
                            nftData.owner?.slice(-4)}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default NFTCard;
