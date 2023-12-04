"use-client";

import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/campaignItemLayout";
import ProductFilter from "@components/product-filter/layout-01";
import FilterButton from "@ui/filter-button";
import { slideToggle } from "@utils/methods";
import { SectionTitleType, ProductType } from "@utils/types";
import Link from "next/link";
import CampaignCard from "./campaignCard";
import MyCampaigns from "src/pages/myCampaigns";

import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";

import { useStateContext } from "../../context";
function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}

const ExploreCampaignArea = ({ className, space, data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedSection, setSelectedSection] = useState("myCampaigns");

    const [userCampaigns, setUserCampaigns] = useState([]);

    const { address, contract, getCampaigns, getUserCampaigns } =
        useStateContext();

    const handleButtonClick = (section) => {
        setSelectedSection(section);
    };

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();

        const userCampaigns = await getUserCampaigns();
        setUserCampaigns(userCampaigns);

        setCampaigns(data);
        console.log("data", data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [contract]);

    console.log("All Campaigns", campaigns);
    console.log("USER Campaigns", userCampaigns);

    if (isLoading) return;
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;

    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row mb--50 align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        {data?.section_title && (
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        )}
                    </div>
                </div>

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
                                                My Campaigns
                                            </Nav.Link>
                                            <Nav.Link
                                                as="button"
                                                eventKey="nav-profile"
                                            >
                                                All Campaigns
                                            </Nav.Link>
                                        </Nav>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <TabContent className="tab-content rn-bid-content ">
                            <TabPane
                                className="row d-flex g-5"
                                eventKey="nav-home"
                            >
                                <MyCampaigns campaign={userCampaigns} />
                            </TabPane>
                            <TabPane
                                className="row g-5 d-flex mt-0 "
                                eventKey="nav-profile"
                            >
                                {campaigns.map((product, index) => (
                                    <div className="col mb-4" key={index}>
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                            <CampaignCard product={product} />
                                        </div>
                                    </div>
                                ))}
                            </TabPane>
                        </TabContent>
                    </div>
                </TabContainer>

                {/* <div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        handleButtonClick("allCampaigns")
                                    }
                                >
                                    All Campaigns
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        handleButtonClick("myCampaigns")
                                    }
                                >
                                    My Campaigns
                                </button>
                            </div>
                        </div>
                    </div>

                  
                    {selectedSection === "allCampaigns" ? (
                        <div className="container row">
                            {campaigns.map((product, index) => (
                                <div className="col mb-4" key={index}>
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <CampaignCard product={product} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : selectedSection === "myCampaigns" ? (
                        <MyCampaigns campaign={userCampaigns} />
                    ) : null}
                </div> */}
            </div>
        </div>
    );
};

ExploreCampaignArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreCampaignArea.defaultProps = {
    space: 1,
};

export default ExploreCampaignArea;
