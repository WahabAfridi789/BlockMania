import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import Product from "@components/product/layout-01";
import { ProductType } from "@utils/types";

const AuthorProfileArea = ({
    className,
    data,
    ownedNfts,
    loadingOwnedNfts,
    directListings,
    loadingDirects,
    auctionListings,
    loadingAuctions,
}) => {

    console.log("Auction Listings", auctionListings);

    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            Listed
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            Owned
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-contact"
                                        >
                                            On Auction
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Liked
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <TabContent className="tab-content rn-bid-content">
                        <TabPane className="row d-flex g-5" eventKey="nav-home">
                            {loadingDirects ? (
                                <p>Loading...</p>
                            ) : directListings &&
                              directListings.length === 0 ? (
                                <p>
                                    Nothing for sale yet! Head to the sell tab
                                    to list an NFT.
                                </p>
                            ) : (
                                directListings?.map((nft) => (
                                    <div
                                        key={nft.metadata.id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <Product
                                            overlay
                                            title={nft.metadata.name}
                                            id={nft.metadata.id}
                                            image={nft.metadata.image}
                                            discritpion={
                                                nft.metadata.description
                                            }
                                        />
                                    </div>
                                ))
                            )}
                        </TabPane>

                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {ownedNfts?.map((nft) => (
                                <div
                                    key={nft.metadata.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        title={nft.metadata.name}
                                        id={nft.metadata.id}
                                        image={nft.metadata.image}
                                        discritpion={nft.metadata.description}
                                    />
                                </div>
                            ))}
                        </TabPane>

                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            {loadingAuctions ? (
                                <p>Loading...</p>
                            ) : auctionListings &&
                              auctionListings.length === 0 ? (
                                <p>
                                    Nothing for sale yet! Head to the sell tab
                                    to list an NFT.
                                </p>
                            ) : (
                                auctionListings?.map((nft) => (
                                    <div
                                        key={nft.asset.id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <Product
                                            overlay
                                            title={nft.asset.name}
                                            id={nft.asset.id}
                                            image={nft.asset.image}
                                            discritpion={nft.asset.description}
                                            latestBid={
                                                nft.minimumBidCurrencyValue
                                                    .displayValue
                                            }
                                        />
                                    </div>
                                ))
                            )}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default AuthorProfileArea;
