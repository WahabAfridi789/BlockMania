import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const TermsAndConditionsArea = ({ className, space }) => (
    <div
        className={clsx(
            "terms-condition-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row">
                <div className="offset-lg-2 col-lg-8 ">
                    <div
                        className="condition-wrapper"
                        style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                        }}
                    >
                        <h2>BlockMania Terms and Conditions</h2>
                        <h3>NFT Bidding Terms & Conditions</h3>
                        <p>
                            NFTs are unique digital assets that can be bought
                            and sold. They represent one-of-a-kind items in the
                            digital world and have no tangible form. By
                            participating in NFT bidding on BlockMania, you
                            acknowledge and agree to the following terms and
                            conditions.
                        </p>
                        <p>
                            1. Bidding: By placing a bid on an NFT, you commit
                            to purchasing it at the bid price if you become the
                            highest bidder at the end of the bidding period.
                        </p>
                        <p>
                            2. Ownership: Once the bidding period ends and you
                            are the highest bidder, you will become the owner of
                            the NFT. Ownership will be transferred to your
                            connected wallet address.
                        </p>
                        <p>
                            3. Payment: You agree to pay the bid price in the
                            cryptocurrency specified for the NFT listing.
                            Payment must be made within the specified timeframe
                            after winning the bid.
                        </p>
                        <p>
                            4. Non-Refundable: Bids are non-refundable. Once a
                            bid is placed and accepted, you are obligated to
                            complete the purchase.
                        </p>
                        <p>
                            5. Authenticity: BlockMania strives to ensure the
                            authenticity of the NFTs listed on the platform.
                            However, it is your responsibility to conduct due
                            diligence before placing a bid. BlockMania does not
                            guarantee the accuracy or authenticity of the NFTs
                            listed by sellers.
                        </p>
                        <h3>Selling Condition Terms & Conditions</h3>
                        <p>
                            As a seller on BlockMania, you agree to the
                            following terms and conditions when listing your
                            NFTs for sale.
                        </p>
                        <p>
                            1. Listing: You have the right to list and sell NFTs
                            that you own and have the necessary rights to sell.
                            You must accurately represent the NFT and provide
                            all relevant details in the listing.
                        </p>
                        <p>
                            2. Ownership Transfer: Once a buyer purchases your
                            NFT, ownership will be automatically transferred to
                            the buyer's wallet address upon successful payment.
                        </p>
                        <p>
                            3. Seller Fees: BlockMania may charge a transaction
                            fee or commission for facilitating the sale of your
                            NFTs. The applicable fees will be clearly
                            communicated to you during the listing process.
                        </p>
                        <p>
                            4. Compliance: You must comply with all applicable
                            laws and regulations regarding the sale and transfer
                            of NFTs. It is your responsibility to ensure that
                            your listings and activities on BlockMania are
                            lawful.
                        </p>
                        <h3>Buying NFTs Terms & Conditions</h3>
                        <p>
                            By purchasing NFTs on BlockMania, you agree to the
                            following terms and conditions:
                        </p>
                        <p>
                            1. Authenticity: BlockMania aims to provide a
                            platform for genuine NFTs; however, it is your
                            responsibility to verify the authenticity and
                            legitimacy of the NFTs before making a purchase.
                            BlockMania does not guarantee the accuracy or
                            authenticity of the NFTs listed by sellers.
                        </p>
                        <p>
                            2. Ownership: Once you complete the purchase of an
                            NFT, ownership will be transferred to your connected
                            wallet address. It is your responsibility to
                            securely store and manage your NFTs.
                        </p>
                        <p>
                            3. Payment: You agree to pay the listed price for
                            the NFT in the specified cryptocurrency. Payment
                            must be made within the specified timeframe after
                            confirming the purchase.
                        </p>
                        <p>
                            4. Non-Refundable: NFT purchases are non-refundable.
                            Once a purchase is completed, it cannot be reversed
                            or refunded.
                        </p>
                        <p>
                            5. Risks: Buying NFTs carries inherent risks,
                            including potential loss of value or liquidity. You
                            acknowledge and accept these risks before making any
                            purchases on BlockMania.
                        </p>
                        <p>
                            Please read these terms and conditions carefully
                            before using BlockMania. By using the platform, you
                            agree to comply with these terms and any additional
                            policies or guidelines provided by BlockMania.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt--50">
                <div className="offset-lg-2 col-lg-8">
                    <Button path="#" size="medium" className="mr--15">
                        Accept
                    </Button>
                    <Button path="#" color="primary-alta" size="medium">
                        Decline
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

TermsAndConditionsArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
TermsAndConditionsArea.defaultProps = {
    space: 1,
};

export default TermsAndConditionsArea;
