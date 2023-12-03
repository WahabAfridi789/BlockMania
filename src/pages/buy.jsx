import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../Container/Container";
import NFTGrid from "../NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  console.log(contract);
  const { data, isLoading } = useNFTs(contract);

  console.log(data);  

  return (
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection."
        }
      />
    </Container>
  );
}