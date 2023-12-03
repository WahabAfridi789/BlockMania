import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import { NFT_COLLECTION_ADDRESS } from "../../../const/contractAddresses";


const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({
    overlay,
    title,
    id,
    likeCount,
    image,
    price,
    placeBid,
    latestBid,
    discritpion
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    console.log("Image",image);
    console.log("Latest Bid",latestBid);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
  
    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {image && (
                        <Anchor path={`/token/${NFT_COLLECTION_ADDRESS}/${id}`}>
                            <Image
                                src={image}
                                alt={image?.alt || "NFT_portfolio"}
                                width={200}
                                height={200}
                            />
                        </Anchor>
                    )}
                    {/* {auction_date && <CountdownTimer date={auction_date} />} */}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {/* {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                id={client.id}
                                name={client.name}
                                image={client.image}
                            />
                        ))} */}
                        <Anchor path={`/token/${id}`}>
                            <span className="product-name">{title}</span>
                        </Anchor>

                        {/* <Anchor
                            className="more-author-text"
                            path={`/product/${id}`}
                        >
                            {bitCount}+ Place Bit.
                        </Anchor> */}
                    </div>
                    <ShareDropdown />
                </div>
                <span className="text-primary ">{discritpion}
                    
                    </span>

                {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
                <ProductBid price={latestBid} />
            </div>
            {/* <PlaceBidModal show={showBidModal} handleModal={handleBidModal} /> */}
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    latestBid: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    auction_date: PropTypes.string,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
