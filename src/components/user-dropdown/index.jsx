import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Image from "next/image";
import Anchor from "@ui/anchor";
import Link from "next/link";
import AvatarComponent from "@components/top-seller/layout-01";
import clsx from "clsx";
const UserDropdown = ({ onDisconnect, ethBalance }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    console.log("USERRR", user);

    const isVarified = user?.isVerified;
    // const isVarified = false;

    return (
        <div className="icon-box">
            <Link
                href="/author"
                className={clsx("thumbnail", isVarified && "varified")}
            >
                <Image
                    src={user?.profilePicture}
                    alt="Images"
                    width={38}
                    height={38}
                />
                {/* <AvatarComponent
                    name={user.fullName}
                    image={user.profilePicture}
                    className="avatar"
                    isVarified={isVarified}
                    followBtn={false}
                /> */}
            </Link>

            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <div className="title">
                        <Anchor path="/author">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <AvatarComponent
                                        name={user.fullName}
                                        image={user.profilePicture}
                                        className="avatar"
                                        isVarified={isVarified}
                                        followBtn={false}
                                    />

                                    {user.fullName}
                                </div>

                                <div className="icon">
                                    {isVarified ? (
                                        <span
                                            className="badge ml-2 badge-success "
                                            style={{
                                                fontSize: "10px",
                                                padding: "5px 10px",
                                                borderRadius: "10px",
                                                background: "#079EFE",
                                            }}
                                        >
                                            Verified
                                        </span>
                                    ) : (
                                        <span
                                            className="badge ml-2 badge-danger"
                                            style={{
                                                fontSize: "10px",
                                                padding: "5px 10px",
                                                borderRadius: "10px",
                                                background: "#FF0000",
                                            }}
                                        >
                                            Not Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Anchor>

                        <span
                            style={{
                                fontSize: "12px",
                                color: "#999",
                                fontWeight: "400",
                                display: "block",
                                marginTop: "5px",
                            }}
                        >
                            <Anchor path="#">{user.email}</Anchor>
                        </span>
                    </div>
                    {isVarified ? (
                        <span className="badge badge-success">Verified</span>
                    ) : (
                        <div className="add-fund-button mt--20 pb--20">
                            <Anchor
                                className="btn btn-primary-alta w-100"
                                path="/verify"
                            >
                                Verify
                            </Anchor>
                        </div>
                    )}
                </div>
                <div className="rn-product-inner">
                    <ul className="product-list">
                        <li className="single-product-list">
                            <div className="content">
                                <h6 className="title">
                                    <Anchor path="#">Balance</Anchor>
                                </h6>
                                <span className="price">
                                    {ethBalance} Matic
                                </span>
                            </div>
                            <div className="button" />
                        </li>
                    </ul>
                </div>
                <div className="add-fund-button mt--20 pb--20">
                    <Anchor
                        onClick={onDisconnect}
                        className="btn btn-primary-alta w-100"
                        path="#"
                    >
                        Disconnect Wallet
                    </Anchor>
                </div>
                <ul className="list-inner">
                    <li>
                        <Anchor path="/author">My Profile</Anchor>
                    </li>
                    <li>
                        <Anchor path="/edit-profile">Edit Profile</Anchor>
                    </li>

                    <li>
                        <button type="button" onClick={onDisconnect}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

UserDropdown.propTypes = {
    onDisconnect: PropTypes.func.isRequired,
    ethBalance: PropTypes.string,
};
export default UserDropdown;
