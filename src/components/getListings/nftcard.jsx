import React from "react";
import styles from "./NftCard.module.css";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
const Web3 = require("web3");
const NFTCard = (nftData) => {
    // console.log("NFTCARD", nftData.nftData);
    // console.log("Image", nftData.nftData.asset.image);
    const web3 = new Web3();
    let price = 0;
    let isAuction = false;
    if (nftData.nftData.pricePerToken) {
        price = web3.utils.fromWei(
            nftData.nftData?.pricePerToken?.toString(),
            "ether"
        );
    } else {
        price = web3.utils.fromWei(
            nftData.nftData?.buyoutBidAmount?.toString(),
            "ether"
        );
        isAuction = true;
    }

    return (
        <div className={styles.container}>
            <div className={styles.cubeLink}>
                <Link
                    href={`/token/${nftData.nftData.assetContractAddress}/${nftData.nftData.tokenId}`}
                >
                    <Image
                        id="cube"
                        src={nftData.nftData.asset.image}
                        alt="cube"
                        width={300}
                        height={300}
                        className={styles.cube}
                    />
                </Link>
            </div>
            <div className={styles.header}>
                <Link
                    href={`/token/${nftData.nftData.assetContractAddress}/${nftData.nftData.tokenId}`}
                >
                    <p className={styles.name}>
                        {nftData.nftData.asset.name.slice(0, 1).toUpperCase() +
                            nftData.nftData.asset.name.slice(1)}
                    </p>
                </Link>
                <p>
                    Add to Cart <PlusCircle color="#00A4FE" />
                </p>
            </div>
            <p className={styles.description}>
                {nftData.nftData.asset.description}
            </p>
            <div className={styles.ethAndDays}>
                <div className={styles.ethPlusIcon}>
                    <div className={styles.eth}>
                        {isAuction ? (
                            <div>
                                <p className={styles.bid}>
                                    Bid{" "}
                                    {
                                        nftData.nftData.minimumBidCurrencyValue
                                            .displayValue
                                    }
                                </p>
                            </div>
                        ) : (
                            <p> {price} MATIC</p>
                        )}
                    </div>
                </div>
                <div className={styles.clockPlusDays}>
                    <svg
                        width="17"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Clock SVG code */}
                    </svg>
                    <p className={styles.days}>3 days left</p>
                </div>
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
                        {nftData.nftData.creatorAddress.slice(0, 6) +
                            "..." +
                            nftData.nftData.creatorAddress.slice(-4)}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default NFTCard;
