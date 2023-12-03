/* eslint-disable @next/next/no-img-element */
import { useState,useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { set } from "mongoose";

const EditProfileImage = () => {
    const [selectedImage, setSelectedImage] = useState({
        profile: "",
        cover: "",
    });

    const [profilePicture, setProfilePicture] = useState(""); 
    const [coverPicture, setCoverPicture] = useState(""); 

    const[user,setUser]=useState({})

    const getUpdatedUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/user/${user._id}`
            );
            const updatedUser = response.data;
            console.log("UPDATED USER:",updatedUser);
            setProfilePicture(updatedUser.profilePicture);
            setCoverPicture(updatedUser.coverPicture);
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error(error);
        }
    };




    useEffect(()=>{
        getUpdatedUser()
        const user=JSON.parse(localStorage.getItem("user"))
        setProfilePicture(user.profilePicture)
        setCoverPicture(user.coverPicture)
        setUser(user)
        console.log("USERRR",user);
        console.log("PROFILE:",profilePicture);
    },[])


    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0],
            }));
        }
    };

    const updateProfilePic = async (imageType) => {

        localStorage.removeItem('user');


        const formData = new FormData();
formData.append("imageType", imageType);
formData.append("image", selectedImage[imageType]);
        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
                    },
                }
            );
            const imageUrl = response.data.imageUrl;
               if (imageType === "profile") {
                  setProfilePicture(imageUrl); // Update the profile image URL
               } else if (imageType === "cover") {
                    setCoverPicture(imageUrl); // Update the cover image URL
               }
               
          


            console.log(imageUrl);
        } catch (error) {
            console.error(error);
        }
    }

    const updateUserInfo = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/user/updateImage/${user._id}`,
                {
                    profilePicture,
                    coverPicture,
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (profilePicture || coverPicture) {
            updateUserInfo();
        }
    }, [profilePicture, coverPicture]);



 


    return (
        <div className="nuron-information">
            <div className="profile-change row g-5">
                <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap">
                            {selectedImage?.profile ? (
                                <img
                                    src={URL.createObjectURL(
                                        selectedImage.profile
                                    )}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (

                                <Image
                                    id="rbtinput1"
                                    src= {profilePicture}
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profile"
                                id="fatima"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="fatima" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                        <button
                            onClick={() => updateProfilePic("profile")} // Pass "profile" as the image type
                            className="btn btn-secondary btn-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className="profile-left right col-lg-8">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap">
                            {selectedImage?.cover ? (
                                <img
                                    src={URL.createObjectURL(
                                        selectedImage.cover
                                    )}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput2"
                                    src={coverPicture}
                                    alt="Profile-NFT"
                                    priority
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="cover"
                                id="nipa"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="nipa" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={() => updateProfilePic("cover")} // Pass "profile" as the image type
                            className="btn btn-secondary btn-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileImage;
