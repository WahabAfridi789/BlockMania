// import React from "react";
// import styles from "./NftCard.module.css";
// import Image from "next/image";
// import { PlusCircle } from "lucide-react";
// import Link from "next/link";
// const Web3 = require("web3");
// const NFTCard = (nftData) => {
//     return (
//         <div className={styles.container}>
//             <div className={styles.cubeLink}>
//                 <Link
//                     href={`/token/${nftData.nftData.assetContractAddress}/${nftData.nftData.tokenId}`}
//                 >
//                     <Image
//                         id="cube"
//                         src={nftData.nftData.asset.image}
//                         alt="cube"
//                         width={300}
//                         height={300}
//                         className={styles.cube}
//                     />
//                 </Link>
//             </div>
//             <div className={styles.header}>
//                 <Link
//                     href={`/token/${nftData.nftData.assetContractAddress}/${nftData.nftData.tokenId}`}
//                 >
//                     <p className={styles.name}>
//                         {nftData.nftData.asset.name.slice(0, 1).toUpperCase() +
//                             nftData.nftData.asset.name.slice(1)}
//                     </p>
//                 </Link>
//                 <p>
//                     Add to Cart <PlusCircle color="#00A4FE" />
//                 </p>
//             </div>
//             <p className={styles.description}>
//                 {nftData.nftData.asset.description}
//             </p>
//             <div className={styles.ethAndDays}>
//                 <div className={styles.ethPlusIcon}>
//                     <div className={styles.eth}>
//                         {isAuction ? (
//                             <div>
//                                 <p className={styles.bid}>
//                                     Bid{" "}
//                                     {
//                                         nftData.nftData.minimumBidCurrencyValue
//                                             .displayValue
//                                     }
//                                 </p>
//                             </div>
//                         ) : (
//                             <p> {price} MATIC</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className={styles.clockPlusDays}>
//                     <svg
//                         width="17"
//                         height="17"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         {/* Clock SVG code */}
//                     </svg>
//                     <p className={styles.days}>3 days left</p>
//                 </div>
//             </div>
//             <div className={styles.jules}>
//                 <img
//                     id="avatar"
//                     src="https://i.ibb.co/yQGmyYK/image-avatar.png"
//                     alt="image-avatar"
//                     border="0"
//                     className={styles.avatar}
//                 />
//                 <p className={styles.avatarName}>
//                     Creation of{" "}
//                     <a href="#" className={styles.mainName}>
//                         {nftData.nftData.creatorAddress.slice(0, 6) +
//                             "..." +
//                             nftData.nftData.creatorAddress.slice(-4)}
//                     </a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default NFTCard;

import React, { useState } from "react";
import styles from "./NftCard.module.css";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const NFTCard = ({ nftData }) => {
    const [status, setStatus] = useState(true);
    const {
        amountCollected,
        deadline,
        description,
        image,
        owner,
        pId,
        target,
        title,
    } = nftData;

    const calculateDaysLeft = (deadline) => {
        const currentDate = new Date().getTime();
        const remainingTime = deadline - currentDate;
        const daysLeft = Math.ceil(remainingTime / (1000 * 3600 * 24)); // Convert milliseconds to days
        if (daysLeft > 0) return daysLeft;

        return 0;
    };

    return (
        <div className={styles.container}>
            <div className={styles.cubeLink}>
                <Link
                    href={{
                        pathname: "/campaignDetail",
                        query: { campaignData: JSON.stringify(nftData) },
                    }}
                >
                    <Image
                        id="cube"
                        src={image}
                        alt="cube"
                        width={300}
                        height={300}
                        className={styles.cube}
                    />
                </Link>
            </div>
            <div className={styles.header}>
                <Link
                    href={`/token/${nftData.assetContractAddress}/${nftData.tokenId}`}
                >
                    <p className={styles.name}>
                        {title.slice(0, 1).toUpperCase() + title.slice(1)}
                    </p>
                </Link>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.ethAndDays}>
                <div
                    className={styles.ethPlusIcon}
                    style={{
                        marginLeft: 20,
                        marginBottom: 20,
                    }}
                >
                    <div className={styles.eth}>
                        {/* Display amount collected */}
                        <p>Amount Collected: {amountCollected}</p>
                    </div>

                    <div className={styles.eth}>
                        {/* Display amount collected */}
                        <p>Target: {target}</p>
                    </div>
                </div>
                <div className={styles.clockPlusDays}>
                    {/* Display days left */}
                    <p className={styles.days}>
                        {calculateDaysLeft(deadline)} days left
                    </p>
                </div>
            </div>
            <div className={styles.jules}>
                {/* Display owner */}
                <p className={styles.avatarName}>
                    Owner: {owner.slice(0, 6) + "..." + owner.slice(-4)}
                </p>
            </div>
        </div>
    );
};

export default NFTCard;
