import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import ProgressBar from "react-bootstrap/ProgressBar"; // Import the ProgressBar component

import { useStateContext } from "../../../context";
import { daysLeft } from "../../../utils/index";

import CountdownTimer from "@ui/countdown/layout-02";

const CampaignDetailView = ({ campaign }) => {
    const { donate, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [donators, setDonators] = useState([]);

    const remainingDays = daysLeft(campaign.deadline);

    const fetchDonators = async () => {
        const data = await getDonations(campaign.pId);
        setDonators(data);
    };

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address]);

    const handleDonate = async () => {
        if (parseFloat(amount) >= 0) {
            // Check if amount is not less than 0
            setIsLoading(true);
            await donate(campaign.pId, amount);
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row p-5">
                <div className="col-md-12 col-lg-6">
                    <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-12 col-lg-6 p-5">
                    <h5 className="card-title">{campaign.title}</h5>
                    <p className="card-text">{campaign.description}</p>
                    <p className="card-text">Target: {campaign.target} MATIC</p>
                    <p className="card-text">
                        Amount Collected: {campaign.amountCollected}
                    </p>
                    <p className="card-text">
                        Deadline: {remainingDays} Days Left
                    </p>
                    <p className="card-text">Owner: {campaign.owner}</p>
                    <CountdownTimer
                        date={campaign.deadline}
                        className="countdown"
                    />
                </div>
            </div>

            <div className="row mt-4">
                <div>
                    <h5 className="card-title px-5">Fund This Campaign</h5>
                    <div className="form-group d-flex gap-5 px-5">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter the amount to fund"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{}} // Use transparent background
                        />
                        <Button
                            className="btn btn-primary"
                            title="Fund Now"
                            type="button"
                            onClick={handleDonate}
                        >
                            {isLoading ? "Loading..." : "Fund Now"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CampaignDetailView.propTypes = {
    campaign: PropTypes.object.isRequired,
};

export default CampaignDetailView;
