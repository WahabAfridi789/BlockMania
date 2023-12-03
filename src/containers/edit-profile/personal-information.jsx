// import Button from "@ui/button";
// import NiceSelect from "@ui/nice-select";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PersonalInformation = () => {
//     const [userInfo, setUserInfo] = useState({});
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [emailAddress, setEmailAddress] = useState("");
//     const [bio, setBio] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [gender, setGender] = useState("");
//     const [userid, setUserid] = useState("");

//     useEffect(() => {
//         const user = localStorage.getItem("user");
//         if (user) {
//             setUserInfo(JSON.parse(user));
//             setFirstName(JSON.parse(user).fullName.split(" ")[0]);
//             setLastName(JSON.parse(user).fullName.split(" ")[1]);
//             setEmailAddress(JSON.parse(user).email);
//             setPhoneNumber(JSON.parse(user).phone);
//             setBio(JSON.parse(user).bio);
//             setGender(JSON.parse(user).gender);

//             setUserid(JSON.parse(user)._id);
//         }
//     }, []);

//     const onSave = async () => {
//         // Step 1: Fetch the current user from the database
//         const userId = userInfo._id; // Assuming you have the user's ID

//         try {
//             const response = await axios.get(
//                 `http://localhost:5000/user/${userId}`
//             );
//             const currentUser = response.data.user;

//             console.log("Current user:", currentUser);

//             // Step 2: Merge the updated user information
//             const updatedUser = {
//                 ...currentUser, // Keep existing data
//                 fullName: `${firstName} ${lastName}`,
//                 email: emailAddress,
//                 phoneNumber,
//                 bio,
//                 gender: gender.value,
//             };

//             // Step 3: Update the user document in the database
//             console.log("Sending PUT request with data:", updatedUser);

//             const updateResponse = await axios.put(
//                 `http://localhost:5000/user/${userId}`,
//                 updatedUser
//             );

//             console.log("User updated successfully:", updateResponse.data);
//             localStorage.setItem("user", JSON.stringify(updatedUser));
//         } catch (err) {
//             console.error("Error updating user:", err);
//         }
//     };
//     return (
//         <div className="nuron-information">
//             <div className="profile-form-wrapper">
//                 <div className="input-two-wrapper mb--15">
//                     <div className="first-name half-wid">
//                         <label htmlFor="contact-name" className="form-label">
//                             First Name
//                         </label>
//                         <input
//                             name="contact-name"
//                             id="contact-name"
//                             type="text"
//                             value={firstName}
//                             onChange={
//                                 (e) => setFirstName(e.target.value)
//                                 // console.log(e.target.value)
//                             }
//                         />
//                     </div>
//                     <div className="last-name half-wid">
//                         <label
//                             htmlFor="contact-name-last"
//                             className="form-label"
//                         >
//                             Last Name
//                         </label>
//                         <input
//                             name="contact-name"
//                             id="contact-name-last"
//                             type="text"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <div className="email-area">
//                     <label htmlFor="Email" className="form-label">
//                         Edit Your Email
//                     </label>
//                     <input
//                         name="email"
//                         id="Email"
//                         type="email"
//                         value={emailAddress}
//                         disabled
//                         className="pointer-events-none !bg-gray-200 !text-gray-500"
//                     />
//                 </div>
//             </div>
//             <div className="edit-bio-area mt--30">
//                 <label htmlFor="Discription" className="form-label">
//                     Edit Your Bio
//                 </label>
//                 <textarea
//                     id="Description"
//                     placeholder="Write your bio here..."
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                 />
//             </div>

//             <div className="input-two-wrapper mt--15">
//                 <div className="half-wid phone-number">
//                     <label htmlFor="PhoneNumber" className="form-label mb--10 ">
//                         Phone Number
//                     </label>
//                     <input
//                         className="pointer-events-none !bg-gray-200 !text-gray-500"
//                         name="contact-name"
//                         id="PhoneNumber"
//                         type="text"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                     />
//                 </div>
//                 <div className="half-wid gender">
//                     {/* <NiceSelect
//                         options={[
//                             { value: "male", text: "Male" },
//                             { value: "female", text: "Female" },
//                         ]}
//                         placeholder="Select Your Gender"
//                         className="profile-edit-select"
//                         onChange={(selectedGender) => setGender(selectedGender)}
//                     /> */}

//                     {gender.value ? (
//                         <NiceSelect
//                             options={[
//                                 { value: "male", text: "Male" },
//                                 { value: "female", text: "Female" },
//                             ]}
//                             placeholder="Select Your Gender"
//                             className="profile-edit-select"
//                             onChange={(selectedGender) =>
//                                 setGender(selectedGender)
//                             }
//                             value={gender} // Set the value attribute to display the current value
//                             disabled // Add the disabled attribute to disable the select
//                         />
//                     ) : (
//                         <NiceSelect
//                             options={[
//                                 { value: "male", text: "Male" },
//                                 { value: "female", text: "Female" },
//                             ]}
//                             placeholder="Select Your Gender"
//                             className="profile-edit-select"
//                             onChange={(selectedGender) =>
//                                 setGender(selectedGender)
//                             }
//                         />
//                     )}
//                 </div>
//             </div>
//             {/* <div className="input-two-wrapper mt--15">
//                 <div className="half-wid currency">
//                     <NiceSelect
//                         options={[
//                             { value: "Pakistan", text: "Pakistan" },
//                             { value: "India", text: "India" },
//                             { value: "China", text: "China" },
//                         ]}
//                         placeholder="Location"
//                         className="profile-edit-select"
//                         onChange={(e) => e}
//                     />
//                 </div>
//                 <div className="half-wid phone-number">
//                     <label htmlFor="PhoneNumber" className="form-label mb--10">
//                         Address
//                     </label>
//                     <input
//                         name="contact-name"
//                         id="address"
//                         type="text"
//                         value="House # 1, Street # 1, Karachi, Pakistan"
//                         onChange={(e) => e}
//                     />
//                 </div>
//             </div> */}
//             <div className="button-area save-btn-edit">
//                 <Button className="mr--15" color="primary-alta" size="medium">
//                     Cancel
//                 </Button>
//                 <Button size="medium" onClick={onSave}>
//                     Save
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default PersonalInformation;
import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { useEffect, useState } from "react";
import axios from "axios";

const PersonalInformation = () => {
    const [userInfo, setUserInfo] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [bio, setBio] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [userid, setUserid] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
            setFirstName(parsedUser.fullName.split(" ")[0]);
            setLastName(parsedUser.fullName.split(" ")[1]);
            setEmailAddress(parsedUser.email);
            setPhoneNumber(parsedUser.phone);
            setBio(parsedUser.bio);
            setGender(parsedUser.gender);
            setUserid(parsedUser._id);
        }
    }, []);

    const onSave = async () => {
        // Step 1: Fetch the current user from the database
        const userId = userInfo._id;

        try {
            const response = await axios.get(
                `http://localhost:5000/user/${userId}`
            );
            const currentUser = response.data.user;

            console.log("Current user:", currentUser);

            // Step 2: Merge the updated user information
            const updatedUser = {
                ...currentUser,
                fullName: `${firstName} ${lastName}`,
                email: emailAddress,
                phoneNumber,
                bio,
                gender: gender.value,
            };

            // Step 3: Update the user document in the database
            console.log("Sending PUT request with data:", updatedUser);

            const updateResponse = await axios.put(
                `http://localhost:5000/user/${userId}`,
                updatedUser
            );

            console.log("User updated successfully:", updateResponse.data);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const renderGenderSelect = () => {
        if (gender && typeof gender === "object" && gender.value) {
            // If gender is an object with a value, display it as text input
            return (
                <div className="gender-text-input">
                    <input
                        type="text"
                        value={gender.value}
                        readOnly
                        className="profile-edit-select"
                    />
                </div>
            );
        }
        // If gender is empty or not in the correct format, display the select box
        return (
            <NiceSelect
                options={[
                    { value: "male", text: "Male" },
                    { value: "female", text: "Female" },
                ]}
                placeholder="Select Your Gender"
                className="profile-edit-select"
                onChange={(selectedGender) => setGender(selectedGender)}
                value={gender}
            />
        );
    };

    return (
        <div className="nuron-information">
            <div className="profile-form-wrapper">
                <div className="input-two-wrapper mb--15">
                    <div className="first-name half-wid">
                        <label htmlFor="contact-name" className="form-label">
                            First Name
                        </label>
                        <input
                            name="contact-name"
                            id="contact-name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="last-name half-wid">
                        <label
                            htmlFor="contact-name-last"
                            className="form-label"
                        >
                            Last Name
                        </label>
                        <input
                            name="contact-name"
                            id="contact-name-last"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="email-area">
                    <label htmlFor="Email" className="form-label">
                        Edit Your Email
                    </label>
                    <input
                        name="email"
                        id="Email"
                        type="email"
                        value={emailAddress}
                        disabled
                        className="pointer-events-none !bg-gray-200 !text-gray-500"
                    />
                </div>
            </div>
            <div className="edit-bio-area mt--30">
                <label htmlFor="Discription" className="form-label">
                    Edit Your Bio
                </label>
                <textarea
                    id="Description"
                    placeholder="Write your bio here..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>

            <div className="input-two-wrapper mt--15">
                <div className="half-wid phone-number">
                    <label htmlFor="PhoneNumber" className="form-label mb--10 ">
                        Phone Number
                    </label>
                    <input
                        className="pointer-events-none !bg-gray-200 !text-gray-500"
                        name="contact-name"
                        id="PhoneNumber"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="half-wid gender">{renderGenderSelect()}</div>
            </div>
            <div className="button-area save-btn-edit">
                <Button className="mr--15" color="primary-alta" size="medium">
                    Cancel
                </Button>
                <Button size="medium" onClick={onSave}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default PersonalInformation;
