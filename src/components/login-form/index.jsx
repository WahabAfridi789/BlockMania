import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import Web3 from "web3";

const LoginForm = ({ className }) => {
    const getWalletAddress = async () => {
        if (window.ethereum) {
            // Modern dapp browsers
            const web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.enable();
                // Get the selected account address
                const accounts = await web3.eth.getAccounts();
                const walletAddress = accounts[0];
                return walletAddress;
            } catch (error) {
                console.error(error);
                return null;
            }
        } else if (window.web3) {
            // Legacy dapp browsers
            const web3 = new Web3(window.web3.currentProvider);
            // Get the selected account address
            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];
            return walletAddress;
        } else {
            // Non-dapp browsers
            console.log(
                "Please install MetaMask or another Ethereum-compatible wallet."
            );
            return null;
        }
    };

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    // const onSubmit = (data, e) => {
    //     e.preventDefault();
    //     // eslint-disable-next-line no-console
    //     console.log(data);
    //     router.push({
    //         pathname: "/",
    //     });
    // };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post(
                "http://localhost:5000/user/login",
                data
            );

            console.log(response);

            if (response.data) {
                const dataToBeStored = response.data.user;

                const dataWithoutPassword = { ...dataToBeStored };
                delete dataWithoutPassword.password; // Remove the password property

                // Store the modified data object in localStorage
                localStorage.setItem(
                    "user",
                    JSON.stringify(dataWithoutPassword)
                );
                console.log("login successful");

                router.push("http://localhost:3000/");
            }
            // Do something with the response if needed
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    // const [walletAddress, setWalletAddress] = useState("");
    // useEffect(() => {
    //     async function walletAddres1() {
    //         const walletAddress = await getWalletAddress();
    //         setWalletAddress(walletAddress);
    //     }
    //     if (!walletAddress) {
    //         walletAddres1();
    //     }
    // }, []);
    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>{errors.email?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorText>{errors.password?.message}</ErrorText>
                    )}
                </div>

                {/* <div className="mb-5">
                    <label htmlFor="walletAddress" className="form-label">
                        WalletAddress
                    </label>
                    <input
                        type="text"
                        value={walletAddress || ""}
                        id="walletAddress"
                        {...register("walletAddress", {
                            required: "walletAddress is required",
                        })}
                    />
                    {errors.walletAddress && (
                        <ErrorText>{errors.walletAddress?.message}</ErrorText>
                    )}
                </div> */}

                <Button type="submit" size="medium" className="mr--15">
                    Log In
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
