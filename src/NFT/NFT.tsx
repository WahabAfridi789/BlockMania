import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { ClaimEligibility, NFT } from "@thirdweb-dev/sdk";
import React from "react";
import { useCartContext } from '../cartContext/CartContext';

import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./NFT.module.css";
import Link from "next/link";
type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { addToCart, error, setError } = useCartContext();

  const handleAddToCart = (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    addToCart(nft);
  };

  // 1. Load if the NFT is for direct listing
  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  return (
    <>

      <Link
        href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}


      >
        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
      </Link>

      <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
      <p className={styles.nftName}>{nft.metadata.name}</p>

      <div className={styles.priceContainer}>
        {loadingContract || loadingDirect || loadingAuction ? (
          <Skeleton width="100%" height="100%" />
        ) : directListing && directListing[0] ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <h1 >
                Direct Listing
              </h1>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>
                {`${directListing[0]?.currencyValuePerToken.displayValue}
          ${directListing[0]?.currencyValuePerToken.symbol}`}
              </p>

              <button className="bg-primary" onClick={handleAddToCart}
              >

                Add to cart
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        ) : auctionListing && auctionListing[0] ? (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Minimum Bid</p>
              <p className={styles.nftPriceValue}>
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
          ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </p>
              <button className="bg-primary" onClick={handleAddToCart}
              >

                Add to cart
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        ) : (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>Not for sale</p>
              <button className="bg-primary" onClick={handleAddToCart}
              >

                Add to cart
              </button>

            </div>

          </div>
        )}
      </div>
    </>
  );
}
