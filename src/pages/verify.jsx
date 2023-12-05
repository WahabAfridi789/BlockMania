import React, { useState } from "react";
import { useStateContext } from "../context";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import clsx from "clsx";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Support = () => {
    const { uploadToIPFS } = useStateContext();
    const router = useRouter();

    const [showProductModal, setShowProductModal] = useState(false);
    const [cnicImageSelected, setCnicImageSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);

    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [selfieImageFile, setSelfieImageFile] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    const notifyError = (e) => toast.error(e);
    const notifySuccess = (e) => toast.success(e);

    const handleProductModal = () => {
        setShowProductModal(false);
    };

    const imageChange = async (e) => {
        console.log("Image Change", e.target.files[0]);
        if (e.target.files && e.target.files.length > 0) {
            setCnicImageSelected(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        setLoading(true);
        if (!cnicImageSelected) {
            setHasImageError(true);
            return;
        }
        setHasImageError(false);
        console.log("Image Selected", cnicImageSelected);
    };

    const takeSelfie = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    // const video = document.createElement("video");
                    const video = document.getElementById("video");
                    // const captureButton = document.createElement("button");
                    const captureButton =
                        document.getElementById("captureButton");

                    // captureButton.textContent = "Capture";
                    // document.body.appendChild(video);

                    // document.body.appendChild(captureButton);

                    video.srcObject = stream;
                    video.play();

                    captureButton.onclick = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas
                            .getContext("2d")
                            .drawImage(
                                video,
                                0,
                                0,
                                canvas.width,
                                canvas.height
                            );

                        canvas.toBlob((blob) => {
                            setSelfieImageFile(blob);
                        }, "image/png");

                        stream.getTracks().forEach((track) => {
                            track.stop();
                        });

                        // document.body.removeChild(video);

                        video.pause();
                        video.src = "";
                        // video.srcObject = null;

                        captureButton.remove();
                        video.remove();

                        // document.body.removeChild(captureButton);
                    };
                })
                .catch((error) => {
                    console.error("Error accessing the camera:", error);
                });
        } else {
            console.error("getUserMedia is not supported");
        }
    };

    const handleVerify = async () => {
        setLoading(true);

        if (!cnicImageSelected) {
            setHasImageError(true);

            notifyError("Please upload CNIC file");
            return;
        }
        setHasImageError(false);
        console.log("Image Selected", cnicImageSelected);

        try {
            console.log("Uploaded Image File:", cnicImageSelected);
            console.log("Selfie Image File:", selfieImageFile);

            // const cnictempUrl = await uploadToIPFS(uploadedImageFile);
            const cnictempUrl = await uploadToIPFS(cnicImageSelected);
            const selfieTempUrl = await uploadToIPFS(selfieImageFile);

            console.log("CNIC URL", cnictempUrl);
            console.log("Selfie URL", selfieTempUrl);

            const res = await axios.post("http://127.0.0.1:5001/verify-user", {
                cnictempUrl: cnictempUrl,
                selfieTempUrl: selfieTempUrl,
            });

            if (res.data.error && res.status == 200) {
                if (
                    res.data.error ==
                    "Face could not be detected. Please confirm that the picture is a face photo or consider to set enforce_detection param to False."
                ) {
                    notifyError(
                        "Face could not be detected. Please confirm that the picture is a face photo"
                    );

                    return;
                }
                notifyError(res.data.error);
            }

            if (res.data.verified == true) {
                notifySuccess("User Verified");
                setIsVerified(true);
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await axios.put(
                    `http://localhost:5000/updateVerification/${user._id}`,
                    {
                        isVerified: true,
                    }
                );

                notifySuccess("User Verification Status Updated");

                console.log("User Verification Status Updated", res);
                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...user, isVerified: true })
                );

                router.push("/");
            }

            console.log("response", res);
        } catch (error) {
            // Handle the error here
            if (error.response) {
                // The request was made and the server responded with a status code

                // Check if the error response contains a specific error message
                if (error.response.data && error.response.data.error) {
                    const errorMessage = error.response.data.error;

                    notifyError(errorMessage);

                    console.log(
                        "Server responded with an error:",
                        errorMessage
                    );

                    // Handle the error message, display it to the user, or take corrective actions
                } else {
                    // Handle other types of errors
                    console.log(
                        "Unknown error occurred:",
                        error.response.statusText
                    );
                    notifyError(error.response.statusText);
                }
            } else if (error.request) {
                // The request was made but no response was received
                notifyError("No response received from the server");
                console.log(
                    "No response received from the server:",
                    error.request
                );
            } else {
                // Something happened in setting up the request that triggered an error
                console.log("Error during request setup:", error.message);
                notifyError(error.message);
            }
            // Optionally, you can display an error message to the user or take corrective actions
        } finally {
            setLoading(false);
        }

        //update the user verified status

        // Here you can proceed to upload the files to Cloudinary or any other cloud storage service
        // You can use these files directly for uploading
    };

    return (
        <Wrapper>
            <SEO pageTitle="Verify Identity" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle="Verify Identityr"
                    currentPage="Verify Identity"
                />
                {/* <div className="container ">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                    <button onClick={takeSelfie}>Take Selfie</button>
                    <button onClick={handleVerify}>Verify</button>
                </div> */}

                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                            <div className="upload-area">
                                <div className="upload-formate mb--50">
                                    <h6 className="title">Upload CNIC file</h6>
                                    <p className="formate">
                                        Please upload your CNIC file (Front)
                                    </p>
                                </div>

                                <div className="brows-file-wrapper">
                                    <input
                                        name="file"
                                        id="file"
                                        type="file"
                                        className="inputfile"
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                        onChange={imageChange}
                                    />
                                    {cnicImageSelected && (
                                        <img
                                            id="createfileImage"
                                            src={URL.createObjectURL(
                                                cnicImageSelected
                                            )}
                                            alt=""
                                            data-black-overlay="6"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",

                                                borderRadius: "10px",
                                            }}
                                        />
                                    )}

                                    <label
                                        htmlFor="file"
                                        title="No File Choosen"
                                    >
                                        <i className="feather-upload" />
                                        <span className="text-center">
                                            Choose a File
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, WEBP, MP4 or MP3. <br />{" "}
                                            Max 10Mb.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-wrapper-one">
                                <div className="row">
                                    <div
                                        className="col-md-12"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <video
                                            id="video"
                                            width="640"
                                            height="480"
                                            autoPlay
                                        ></video>

                                        {selfieImageFile && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selfieImageFile
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}
                                    </div>

                                    <div
                                        className="col-md-12"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        id="captureButton"
                                    >
                                        <div className="input-box">
                                            <Button
                                                fullwidth
                                                onClick={() => takeSelfie()}
                                            >
                                                Capture
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="row mt--30"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                            <div className="input-box">
                                {isVerified ? (
                                    <Button
                                        fullwidth
                                        disabled
                                        style={{
                                            backgroundColor: "#28a745",
                                            color: "#fff",
                                        }}
                                    >
                                        Verified
                                    </Button>
                                ) : (
                                    <Button
                                        fullwidth
                                        onClick={handleVerify}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </>
                                        ) : (
                                            "Verify"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Support;
