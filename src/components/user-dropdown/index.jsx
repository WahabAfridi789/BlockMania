import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Image from "next/image";
import Anchor from "@ui/anchor";

const UserDropdown = ({ onDisconnect, ethBalance }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="icon-box">
            <Anchor path="/author">
                <Image
                    src="/images/icons/boy-avater.png"
                    alt="Images"
                    width={38}
                    height={38}
                />
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">
                        <Anchor path="/author">{user.fullName}</Anchor>
                    </h4>
                    <span>
                        <Anchor path="#">{user.email}</Anchor>
                    </span>
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
