import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const ChangePassword = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm({
        mode: "onChange",
    });
    const notify = () => toast("Your password has changed");
    const onSubmit = async (_data, e) => {
        e.preventDefault();

        const data = {
            oldPassword: _data.oldPass,
            newPassword: _data.rePass,
        };

        /** Find user by its id and match password , if match then update */
        const response = await axios.put(
            `http://localhost:5000/user/update-password/${user._id}`,
            data
        );

        if (response.status === 200) {
            console.log("Password updated successfully");
        } else {
            console.log("Error occurred while updating password");
        }

        console.log(_data);
        notify();
        reset();
    };
    return (
        <div className="nuron-information">
            <div className="condition">
                <h5 className="title">Create Your Password</h5>
                <p className="condition" />
                <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="email-area">
                    <label htmlFor="Email2" className="form-label">
                        Email
                    </label>
                    <input
                        id="Email2"
                        type="email"
                        value={user.email}
                        disabled
                        // {...register("email", {
                        //     required: "Email is required",
                        //     pattern: {
                        //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        //         message: "invalid email address",
                        //     },
                        // })}
                    />
                    {/* {errors.email && (
                        <ErrorText>{errors.email?.message}</ErrorText>
                    )} */}
                </div>
                <div className="input-two-wrapper mt--15">
                    <div className="old-password half-wid">
                        <label htmlFor="oldPass" className="form-label">
                            Enter Old Password
                        </label>
                        <input
                            name="pass"
                            id="oldPass"
                            type="password"
                            {...register("oldPass", {
                                required: "Old Password is required",
                            })}
                        />
                        {errors.oldPass && (
                            <ErrorText>{errors.oldPass?.message}</ErrorText>
                        )}
                    </div>
                    <div className="new-password half-wid">
                        <label htmlFor="NewPass" className="form-label">
                            Create New Password
                        </label>
                        <input
                            name="password"
                            id="NewPass"
                            type="password"
                            {...register("NewPass", {
                                required: "New Password is required",
                            })}
                        />
                        {errors.NewPass && (
                            <ErrorText>{errors.NewPass?.message}</ErrorText>
                        )}
                    </div>
                </div>
                <div className="email-area mt--15">
                    <label htmlFor="rePass" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        name="Password"
                        id="rePass"
                        type="password"
                        {...register("rePass", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("NewPass") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.rePass && (
                        <ErrorText>{errors.rePass?.message}</ErrorText>
                    )}
                </div>
                <Button className="save-btn-edit" size="medium" type="submit">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
