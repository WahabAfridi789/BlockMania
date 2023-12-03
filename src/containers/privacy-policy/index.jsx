import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const PrivacyPolicyArea = ({ className, space }) => (
    <div
        className={clsx(
            "rn-privacy-policy-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row mb_dec--50">
                <div className="offset-lg-2 col-lg-8 ">
                    <div
                        className="privacy-wrapper"
                        style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                        }}
                    >
                        <h2>BlockMania Privacy Policy</h2>

                        <p>
                            At BlockMania, we are committed to protecting your
                            privacy and ensuring the security of your personal
                            information. This Privacy Policy outlines how we
                            collect, use, and safeguard your personal data when
                            you use our platform. By using BlockMania, you
                            consent to the practices described in this Privacy
                            Policy.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We may collect the following types of personal
                            information from you:
                        </p>
                        <ol>
                            <li>
                                Account Information: When you create an account
                                on BlockMania, we may collect your name, email
                                address, username, and other relevant account
                                details.
                            </li>
                            <li>
                                Transaction Information: When you engage in
                                transactions on BlockMania, such as buying or
                                selling NFTs, we may collect information related
                                to those transactions, including payment details
                                and transaction history.
                            </li>
                            <li>
                                Communication Information: If you contact our
                                customer support or communicate with us through
                                other channels, we may collect the content of
                                your communication and any relevant information
                                provided.
                            </li>
                            <li>
                                Device and Usage Information: We may collect
                                information about the device you use to access
                                BlockMania, including your IP address, browser
                                type, operating system, and usage data.
                            </li>
                        </ol>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use the collected information for the following
                            purposes:
                        </p>
                        <ol>
                            <li>
                                To provide and improve our services: We use your
                                information to facilitate your use of
                                BlockMania, process transactions, personalize
                                your experience, and enhance the functionality
                                of our platform.
                            </li>
                            <li>
                                To communicate with you: We may send you
                                service-related communications, such as
                                transaction notifications, account updates, and
                                security alerts. We may also send you
                                promotional or marketing communications if you
                                have opted to receive them.
                            </li>
                            <li>
                                To protect our platform: We may use your
                                information to detect and prevent fraudulent or
                                unauthorized activities, ensure compliance with
                                our terms and conditions, and maintain the
                                security and integrity of BlockMania.
                            </li>
                            <li>
                                To conduct research and analytics: We may
                                analyze user behavior and preferences to improve
                                our services, develop new features, and conduct
                                market research.
                            </li>
                            <li>
                                To comply with legal obligations: We may process
                                your information to comply with applicable laws,
                                regulations, or legal requests, such as
                                responding to lawful requests for information
                                from government authorities.
                            </li>
                        </ol>

                        <h3>3. Information Sharing and Disclosure</h3>
                        <p>
                            We may share your personal information with the
                            following parties:
                        </p>
                        <ol>
                            <li>
                                Service Providers: We may engage trusted
                                third-party service providers to perform certain
                                functions on our behalf, such as payment
                                processing, data analysis, customer support, and
                                marketing. These service providers will have
                                access to your personal information only to the
                                extent necessary to fulfill their obligations.
                            </li>
                            <li>
                                Compliance with Law: We may disclose your
                                information if required to do so by law or in
                                response to valid legal requests, such as court
                                orders or government regulations.
                            </li>
                            <li>
                                Business Transfers: In the event of a merger,
                                acquisition, or sale of all or a portion of our
                                assets, your personal information may be
                                transferred to the acquiring entity as part of
                                the transaction. We will notify you via email or
                                prominent notice on BlockMania in such
                                circumstances.
                            </li>
                            <li>
                                Consent: We may share your information with
                                third parties if we have obtained your consent
                                to do so .
                            </li>
                        </ol>

                        <h3>4. Data Security</h3>
                        <p>
                            We implement appropriate security measures to
                            protect your personal information from unauthorized
                            access, disclosure, alteration, or destruction.
                            However, please note that no method of transmission
                            over the internet or electronic storage is 100%
                            secure. While we strive to use commercially
                            acceptable means to protect your information, we
                            cannot guarantee absolute security.
                        </p>

                        <h3>5. Your Rights and Choices</h3>
                        <p>
                            You have certain rights regarding your personal
                            information and can exercise them by contacting us.
                            These rights include:
                        </p>
                        <ol>
                            <li>
                                Access: You can request access to the personal
                                information we hold about you and receive a copy
                                of that information.
                            </li>
                            <li>
                                Correction: You can request to correct any
                                inaccurate or incomplete personal information we
                                have about you.
                            </li>
                            <li>
                                Deletion: You can request the deletion of your
                                personal information, subject to certain
                                exceptions allowed by law.
                            </li>
                            <li>
                                Marketing Communications: You can opt-out of
                                receiving promotional or marketing
                                communications from us by following the
                                instructions in the communication or by
                                contacting us.
                            </li>
                        </ol>

                        <h3>6. Children's Privacy</h3>
                        <p>
                            BlockMania is not intended for individuals under the
                            age of 18. We do not knowingly collect or solicit
                            personal information from anyone under the age of
                            18. If we become aware that we have collected
                            personal information from a child without parental
                            consent, we will take steps to remove that
                            information from our servers.
                        </p>

                        <h3>7. Changes to this Privacy Policy</h3>
                        <p>
                            We may update this Privacy Policy from time to time.
                            The updated version will be indicated by an updated
                            "Effective Date" at the top of this policy. We
                            encourage you to review this Privacy Policy
                            periodically for any changes. Your continued use of
                            BlockMania after the posting of changes constitutes
                            your acceptance of the updated Privacy Policy.
                        </p>

                        <h3>8. Contact Us</h3>
                        <p>
                            If you have any questions, concerns, or requests
                            regarding this Privacy Policy or the processing of
                            your personal information, please contact us at
                            privacy@blockmania.com.
                        </p>

                        <p>
                            Last updated:{" "}
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt--50">
                <div className="offset-lg-2 col-lg-8">
                    <Button path="#" size="medium" className="mr--15 ml--25">
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

PrivacyPolicyArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
PrivacyPolicyArea.defaultProps = {
    space: 1,
};

export default PrivacyPolicyArea;
