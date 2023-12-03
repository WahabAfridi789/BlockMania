// 'use-client';
// /* eslint-disable @next/next/no-img-element */
// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { useForm } from "react-hook-form";
// import Button from "@ui/button";
// import ProductModal from "@components/modals/product-modal";
// import ErrorText from "@ui/error-text";
// import { toast } from "react-toastify";
// import { useStateContext } from "../../context";
// import { ethers } from "ethers";

// import {
//     MediaRenderer,
//     useAddress,
//     useContract,
//     Web3Button,
// } from "@thirdweb-dev/react";

// const nftCollectionAddress = "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";
// const CreateNewCampaign = ({ className, space }) => {
//     const { data: nftCollection } = useContract(
//         nftCollectionAddress,
//         "nft-collection"
//     );
//     const address = useAddress();

//     const [showProductModal, setShowProductModal] = useState(false);
//     const [selectedImage, setSelectedImage] = useState();
//     const [hasImageError, setHasImageError] = useState(false);
//     const [previewData, setPreviewData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const { createCampaign} = useStateContext();




//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         mode: "onChange",
//     });

//     const notify = () => toast("Your product has submitted");
//     const handleProductModal = () => {
//         setShowProductModal(false);
//     };

//     // This function will be triggered when the file field change
//     const imageChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedImage(e.target.files[0]);
//         }
//     };

//     const onSubmit = async (data, e) => {
//         const { target } = e;

//          await createCampaign({ ...data, target: ethers.utils.parseUnits(data.target, 18)})

      

//         const submitBtn =
//             target.localName === "span" ? target.parentElement : target;
//         const isPreviewBtn = submitBtn.dataset?.btn;
//         setHasImageError(!selectedImage);
//         if (isPreviewBtn && selectedImage) {
//             setPreviewData({
//                 ...data,
//                 image: selectedImage,
//             });
//             setShowProductModal(true);
//         }

//      if (!isPreviewBtn) {
//     console.log("Form Data:", data);
//     notify();
//     reset();
//     setSelectedImage();
// }

//     };
//     return (
//         <>
//             <div
//                 className={clsx(
//                     "create-area",
//                     space === 1 && "rn-section-gapTop",
//                     className
//                 )}
//             >
//                 <form action="#" onSubmit={handleSubmit(onSubmit)}>
//                     <div className="container">
//                         <div className="row g-5">
//                             <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
//                                 <div className="upload-area">
//                                     <div className="upload-formate mb--30">
//                                         <h6 className="title">Upload file</h6>
//                                         <p className="formate">
//                                             Drag or choose your file to upload
//                                         </p>
//                                     </div>

//                                     <div className="brows-file-wrapper">
//                                         <input
//                                             name="file"
//                                             id="file"
//                                             type="file"
//                                             className="inputfile"
//                                             data-multiple-caption="{count} files selected"
//                                             multiple
//                                             onChange={imageChange}
//                                         />
//                                         {selectedImage && (
//                                             <img
//                                                 id="createfileImage"
//                                                 src={URL.createObjectURL(
//                                                     selectedImage
//                                                 )}
//                                                 alt=""
//                                                 data-black-overlay="6"
//                                             />
//                                         )}

//                                         <label
//                                             htmlFor="file"
//                                             title="No File Choosen"
//                                         >
//                                             <i className="feather-upload" />
//                                             <span className="text-center">
//                                                 Choose a File
//                                             </span>
//                                             <p className="text-center mt--10">
//                                                 PNG, GIF, WEBP, MP4 or MP3.{" "}
//                                                 <br /> Max 10Mb.
//                                             </p>
//                                         </label>
//                                     </div>
//                                     {hasImageError && !selectedImage && (
//                                         <ErrorText>Image is required</ErrorText>
//                                     )}
//                                 </div>

//                                 <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
//                                     <h5> Note: </h5>
//                                     <span>
//                                         {" "}
//                                         Service fee : <strong>2%</strong>{" "}
//                                     </span>{" "}
//                                     <br />
// s
//                                 </div>
//                             </div>

//                             <div className="col-lg-7">
//                                 <div className="form-wrapper-one">
//                                     <div className="row">
//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="title"
//                                                     className="form-label"
//                                                 >
//                                                   Campaign Title
//                                                 </label>
//                                                 <input
//                                                     id="title"
//                                                     placeholder="e. g. `BlockMania NFTs Hub ANd FundChain`"
//                                                     {...register("title", {
//                                                         required:
//                                                             "title is required",
//                                                     })}
//                                                 />
//                                                 {errors.title && (
//                                                     <ErrorText>
//                                                         {errors.title?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="Description"
//                                                     className="form-label"
//                                                 >
//                                                     Story
//                                                 </label>
//                                                 <textarea
//                                                     id="description"
//                                                     rows="3"
//                                                     placeholder="e. g. “Enter Your Campaign story here”"
//                                                     {...register(
//                                                         "description",
//                                                         {
//                                                             required:
//                                                                 "Story is required",
//                                                         }
//                                                     )}
//                                                 />
//                                                 {errors.description && (
//                                                     <ErrorText>
//                                                         {
//                                                             errors.description
//                                                                 ?.message
//                                                         }
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="target"
//                                                     className="form-label"
//                                                 >
//                                                     Fundraising Goal
//                                                 </label>
//                                                 <input
//                                                     id="target"
//                                                     placeholder="e.g. `0.023`"
//                                                     {...register("target", {
//                                                         pattern: {
//                                                             value: /^\d+(\.\d{1,4})?$/, // Allows up to 4 decimal places
//                                                             message:
//                                                                 "Please enter a valid number",
//                                                         },
//                                                         required:
//                                                             "target is required",
//                                                     })}
//                                                 />

//                                                 {errors.target && (
//                                                     <ErrorText>
//                                                         {errors.target?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                            <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="image"
//                                                     className="form-label"
//                                                 >
//                                                  Image URL
//                                                 </label>
//                                                 <input
//                                                     id="image"
//                                                     placeholder="``"
//                                                     {...register("image", {
//                                                         required:
//                                                             "image Url is required",
//                                                     })}
//                                                 />
//                                                 {errors.image && (
//                                                     <ErrorText>
//                                                         {errors.image?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>


//                                           <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="name"
//                                                     className="form-label"
//                                                 >
//                                                  Name
//                                                 </label>
//                                                 <input
//                                                     id="name"
//                                                     placeholder=""
//                                                     {...register("name", {
//                                                         required:
//                                                             "name Url is required",
//                                                     })}
//                                                 />
//                                                 {errors.name && (
//                                                     <ErrorText>
//                                                         {errors.name?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         {/* Pick end data */}

//                                         <div className="col-md-12">
//                                             <div className="input-box pb--20">
//                                                 <label
//                                                     htmlFor="deadline"
//                                                     className="form-label"
//                                                 >
//                                                     End Date
//                                                 </label>
//                                                 <input
//                                                     id="deadline"
//                                                     type="date"
//                                                     placeholder="e.g. `2021-09-30`"
//                                                     {...register("deadline", {
//                                                         required:
//                                                             "End Date is required",
//                                                     })}
//                                                 />
//                                                 {errors.deadline && (
//                                                     <ErrorText>

//                                                         {errors.deadline?.message}
//                                                     </ErrorText>
//                                                 )}
//                                             </div>
//                                         </div>


                                        

//                                         <div className="col-md-12 col-xl-4">
//                                             <div className="input-box">
//                                                 <Button
//                                                     color="primary-alta"
//                                                     fullwidth
//                                                     type="submit"
//                                                     data-btn="preview"
//                                                     onClick={handleSubmit(
//                                                         onSubmit
//                                                     )}
//                                                 >
//                                                     Preview
//                                                 </Button>
//                                             </div>
//                                         </div>

//                                         <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
//                                             <div className="input-box">
//                                                 <Button type="submit" fullwidth>
//                                                     Create Campaign
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
//                                 <h5> Note: </h5>
//                                 <span>
//                                     {" "}
//                                     Service fee : <strong>2%</strong>{" "}
//                                 </span>{" "}
//                             </div>

//                         </div>
//                     </div>
//                 </form>
//             </div>
//             {showProductModal && (
//                 <ProductModal
//                     show={showProductModal}
//                     handleModal={handleProductModal}
//                     data={previewData}
//                 />
//             )}
//         </>
//     );
// };

// CreateNewCampaign.propTypes = {
//     className: PropTypes.string,
//     space: PropTypes.oneOf([1]),
// };

// CreateNewCampaign.defaultProps = {
//     space: 1,
// };

// export default CreateNewCampaign;



/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import { ethers } from "ethers";


import {
    MediaRenderer,
    useAddress,
    useContract,
    Web3Button,
    ConnectWallet
} from "@thirdweb-dev/react";

const nftCollectionAddress = "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";
const CreateNewCampaign = ({ className, space }) => {
    const { data: nftCollection } = useContract(
        nftCollectionAddress,
        "nft-collection"
    );
    const address = useAddress();

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewData, setPreviewData] = useState({});
    const [loading, setLoading] = useState(false);
    const { createCampaign } = useStateContext();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        target: "",
        image: "",
        name: "",
        deadline: "",
    });

    const notify = () => toast("Your product has been submitted");

    const handleProductModal = () => {
        setShowProductModal(false);
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        await createCampaign({
            ...formData,
            target: ethers.utils.parseUnits(formData.target, 18),
        });

        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;

        if (isPreviewBtn && selectedImage) {
            setPreviewData({
                ...formData,
                image: selectedImage,
            });
            setShowProductModal(true);
        }

        if (!isPreviewBtn) {
            console.log("Form Data:", formData);
            notify();
            setFormData({
                title: "",
                description: "",
                target: "",
                image: "",
                name: "",
                deadline: "",
            });
            setSelectedImage(null);
        }
    };

    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
            <div className = "d-flex justify-content-center  " >
                

            <ConnectWallet />
            
            </div>
                <form action="#" onSubmit={onSubmit}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="upload-area">
                                    <div className="upload-formate mb--30">
                                        <h6 className="title">Upload file</h6>
                                        <p className="formate">
                                            Drag or choose your file to upload
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
                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
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
                                                PNG, GIF, WEBP, MP4 or MP3.{" "}
                                                <br /> Max 10Mb.
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="title"
                                                    className="form-label"
                                                >
                                                    Campaign Title
                                                </label>
                                                <input
                                                    id="title"
                                                    placeholder="e. g. `BlockMania NFTs Hub ANd FundChain`"
                                                    value={formData.title}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Repeat this pattern for other form fields */}
                                        



                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="deadline"
                                                    className="form-label"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    id="deadline"
                                                    type="date"
                                                    placeholder="e.g. `2021-09-30`"
                                                    value={formData.deadline}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            deadline: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="image"
                                                    className="form-label"
                                                >
                                                    Image URL
                                                </label>
                                                <input
                                                    id="image"
                                                    placeholder="``"
                                                    value={formData.image}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,    
                                                            image: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"  
                                                >

                                                    Name

                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="``"
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            name: e.target.value,
                                                        })

                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="target"
                                                    className="form-label"  
                                                >

                                                    Fundraising Goal

                                                </label>
                                                <input
                                                    id="target"
                                                    placeholder="``"
                                                    value={formData.target}
                                                    onChange={(e) =>
                                                        
                                                        setFormData({
                                                            ...formData,
                                                            target: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="description"
                                                    className="form-label"  
                                                >

                                                    Story

                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows="3"
                                                    placeholder="e. g. “Enter Your Campaign story here”"
                                                    value={formData.description}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>



                                        

                                        <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                    onClick={onSubmit}
                                                >
                                                    Preview
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            <div className="input-box">
                                                <Button type="submit" fullwidth>
                                                    Create Campaign
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
};

CreateNewCampaign.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewCampaign.defaultProps = {
    space: 1,
};

export default CreateNewCampaign;
