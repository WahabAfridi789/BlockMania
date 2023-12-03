import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ProductModal from "@components/modals/product-modal";
import Web3 from "web3";
import { useState } from "react";
import mongoose from "mongoose";

const SignupForm = ({ className }) => {
    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log(
                "Non-ethereum browser detected. You should install Metamask"
            );
        }
        return provider;
    };

    const [showProductModal, setShowProductModal] = useState(false);
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

    const notify = () => toast("Registration Successful!");
    const notifyError = () => toast("Registration Failed!");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const walletAddress = await getWalletAddress();

            const dataWithoutPassword = { ...data }; // Create a copy of the data object
            delete dataWithoutPassword.password; // Remove the password property

            // Store the modified data object in localStorage
            localStorage.setItem("user", JSON.stringify(dataWithoutPassword));

            console.log(data);
            if (walletAddress != null) {
                data.walletAddress = walletAddress;
                const response = await axios.post(
                    "http://localhost:5000/user/register",
                    data
                );

                console.log(response);

                if (response.status === 201) {
                    setShowProductModal(true);
                    notify();
                    console.log("User registered successfully.");

                    router.push("/");
                } else {
                    setShowProductModal(true);
                    notifyError();

                    console.log("Error occurred while registering user.");
                }
            } else {
                alert(
                    "Please install MetaMask or another Ethereum-compatible wallet."
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        {...register("fullName", {
                            required: "fullName is required",
                        })}
                    />
                    {errors.fullName && (
                        <ErrorText>{errors.fullName?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="text"
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
                        Create Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorText>{errors.password?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="form-label">
                        Re Password
                    </label>
                    <input
                        type="text"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("password") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && (
                        <ErrorText>{errors.confirmPassword?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="cnic" className="form-label">
                        CNIC
                    </label>
                    <input
                        type="text"
                        id="cnic"
                        {...register("cnic", {
                            required: "cnic is required",
                        })}
                    />
                    {errors.cnic && (
                        <ErrorText>{errors.cnic?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        {...register("phone", {
                            required: "phone is required",
                        })}
                    />
                    {errors.phone && (
                        <ErrorText>{errors.phone?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="termsConditionCheckBox"
                        {...register("termsConditionCheckBox", {
                            required: "Checkbox is required",
                        })}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="termsConditionCheckBox"
                    >
                        Allow to all terms & conditions
                    </label>
                    <br />
                    {errors.termsConditionCheckBox && (
                        <ErrorText>
                            {errors.termsConditionCheckBox?.message}
                        </ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium" className="mr--15">
                    Sign Up
                </Button>
                <Button path="/login" color="primary-alta" size="medium">
                    Log In
                </Button>
            </form>
        </div>
    );
};

SignupForm.propTypes = {
    className: PropTypes.string,
};
export default SignupForm;
