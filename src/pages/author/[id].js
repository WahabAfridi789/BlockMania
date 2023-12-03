




//  1 of 1 unhandled error
// Server Error
// Error: getStaticPaths is required for dynamic SSG pages and is missing for '/author/[id]'.
// Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value

// This error happened while generating the page. Any console logs will be displayed in the terminal w










import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import AuthorIntroArea from "@containers/author-intro";

import {
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
  useValidDirectListings,
  useValidEnglishAuctions,
  useAddress,
} from "@thirdweb-dev/react";

import React, { useState } from "react";
import Container from "../../Container/Container";
import ListingWrapper from "../../ListingWrapper/ListingWrapper";
import NFTGrid from "../../NFT/NFTGrid";
import Skeleton from "../../Skeleton/Skeleton";

import styles from "../../styles/Profile.module.css";
import randomColor from "../../utils/randomColor";

import tokenPageStyles from "../../styles/Token.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../../SaleInfo/SaleInfo";


const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

const MARKETPLACE_ADDRESS = "0xe5c43B8fCaDEbee384fF1Ad7A3A1F30f59991AFB";
const NFT_COLLECTION_ADDRESS ="0x2CED1ca614CB808532bacd5F9ECc1EA40825445a"

// Demo data
import authorData from "../../data/author.json";

export async function getStaticProps() {
  return { props: { className: "template-color-1"
 } };
  

}

const Author = () => {
 const [tab, setTab] = useState("NFTs");

 const address = useAddress();

 const [selectedNft, setSelectedNft] = useState();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    address
  );

   const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      seller: address,
    });

  const { data: auctionListings, isLoading: loadingAuctions } =
    useValidEnglishAuctions(marketplace, {
      seller: address,
    });



  console.log(ownedNfts);

  return (
    <Wrapper>
        <SEO pageTitle="Author" />
        <Header />
        <main id="main-content">
            <AuthorIntroArea data={authorData} />
          


 <Container maxWidth="lg">
     

      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} 
        ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          NFTs
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3>
        <h3
          className={`${styles.tab}
        ${tab === "auctions" ? styles.activeTab : ""}`}
          onClick={() => setTab("auctions")}
        >
          Auctions
        </h3>
      </div>

      <div
        className={`${
          tab === "nfts" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {/* <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
        /> */}

      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
            data={ownedNfts}
            isLoading={loadingOwnedNfts}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )}

      </div>




      <div
        className={`${
          tab === "listings" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {loadingDirects ? (
          <p>Loading...</p>
        ) : directListings && directListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          directListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>

      <div
        className={`${
          tab === "auctions" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {loadingAuctions ? (
          <p>Loading...</p>
        ) : auctionListings && auctionListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          auctionListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>
    </Container>


        </main>
        <Footer />
    </Wrapper>

  )


}


export default Author;
