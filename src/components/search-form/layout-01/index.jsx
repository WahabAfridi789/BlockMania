// import { useStateContext } from "../../../context";

// const SearchForm = () => {
//     const { allCollectionNfts, isCollectionLoading } = useStateContext();
//     console.log("allCollectionNfts", allCollectionNfts);
//     return (
//         <form className="search-form-wrapper" action="#">
//             <input
//                 type="search"
//                 placeholder="Search Here"
//                 aria-label="Search"
//             />
//             <div className="search-icon">
//                 <button type="button">
//                     <i className="feather-search" />
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default SearchForm;
import { useStateContext } from "../../../context";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Anchor from "@ui/anchor";
import Image from "next/image";

import {
    NFT_COLLECTION_ADDRESS,
    MARKETPLACE_ADDRESS,
} from "../../../const/contractAddresses";

const SearchForm = ({}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { allCollectionNfts, isCollectionLoading } = useStateContext();

    const router = useRouter();
    console.log("Results", searchResults);
    // Function to handle search input change
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filteredNfts = allCollectionNfts?.filter(
            (nft) =>
                nft.metadata.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                nft.metadata.image.length >= 20 // Check if image URL length is at least 20
        );
        setSearchResults(filteredNfts);
    }, [searchTerm, allCollectionNfts]);

    // Function to handle redirection to another page
    const redirectToNftPage = (uri) => {
        // Redirect to the specific NFT page using history.push (React Router)
        router.push(`/nft/${uri}`);
    };

    return (
        <form className="search-form-wrapper" action="#">
            <input
                type="search"
                placeholder="Search Here"
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <div className="search-icon">
                <button type="button">
                    <i className="feather-search" />
                </button>
            </div>

            <div className="rn-inner-top">
                {searchResults?.length > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "100%",
                            zIndex: 100,
                            backgroundColor: "#14141D",
                            boxShadow: "0 0 10px rgba(0,0,0,.1)",
                            borderRadius: 5,
                            padding: 10,
                            maxHeight: 300,
                            overflowY: "auto",
                        }}
                    >
                        <ul className="search-results-list">
                            {searchResults?.map((result) => (
                                <li key={result.id}>
                                    <Anchor
                                        path={`/token/${NFT_COLLECTION_ADDRESS}/${result?.metadata?.id}`}
                                        image={result.metadata.image}
                                    >
                                        <Image
                                            src={result.metadata.image}
                                            alt="cube"
                                            width={54}
                                            height={54}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                redirectToNftPage(result.uri)
                                            }
                                        >
                                            {result.metadata.name}
                                        </button>
                                    </Anchor>
                                </li>
                            ))}

                            {
                                searchResults?.length === 0 && (
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                        }}
                                    >
                                        No results found
                                    </li>
                                ) // If no results found
                            }
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchForm;
