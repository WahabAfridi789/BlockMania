/* eslint-disable @next/next/no-img-element */
import { use, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { useStorageUpload, ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { useStateContext } from "src/context";

const sdk = new ThirdwebSDK("mumbai", {
    clientId: "9ae075ddf0cff1be2c1727bf42618cbd",
});

import {
    MediaRenderer,
    useAddress,
    useContract,
    Web3Button,
} from "@thirdweb-dev/react";
import { useContractWrite } from "@thirdweb-dev/react";
import { set } from "mongoose";

const nftCollectionAddress = "0x2CED1ca614CB808532bacd5F9ECc1EA40825445a";
const CreateNewArea = ({ className, space }) => {
    const { uploadToIPFS } = useStateContext();

    const { data: nftCollection } = useContract(
        nftCollectionAddress,
        "nft-collection"
    );
    const address = useAddress();

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [ipfsUrl, setIpfsUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedTraits, setSelectedTraits] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("NFT Minted Successfully!");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change
    const imageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }

        const tempUrl = await uploadToIPFS(e.target.files[0]);
        setIpfsUrl(tempUrl);
        console.log("IPFS URL", tempUrl);
    };

    const nftCategory = [
        {
            value: "Art",
            label: "Art",
        },
        {
            value: "Music",
            label: "Music",
        },
        {
            value: "Photography",
            label: "Photography",
        },
        {
            value: "Video",
            label: "Video",
        },
        {
            value: "Games",
            label: "Games",
        },
        {
            value: "Collectibles",
            label: "Collectibles",
        },
        {
            value: "Domain Names",
            label: "Domain Names",
        },
        {
            value: "Documents",
            label: "Documents",
        },
        {
            value: "Memes",
            label: "Memes",
        },
        {
            value: "Sports",
            label: "Sports",
        },
        {
            value: "Utility",
            label: "Utility",
        },
        {
            value: "Other",
            label: "Other",
        },
    ];

    const attributes = {
        traits: [
            {
                trait_type: "Color",
                value: "Blue",
            },
            {
                trait_type: "Background",
                value: "Space",
            },
            {
                trait_type: "Rarity",
                value: "Legendary",
            },
            {
                trait_type: "Edition",
                value: "1 of 10",
            },
            {
                trait_type: "Art Style",
                value: "Abstract",
            },
            {
                trait_type: "Size",
                value: "Large",
            },
            {
                trait_type: "Animation",
                value: "Static",
            },
            {
                trait_type: "Theme",
                value: "Fantasy",
            },
        ],
    };

      const handlePreview = (e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          console.log(data);

          // Your existing code for setting previewData and displaying the modal
          if (selectedImage) {
              setPreviewData({
                  ...data,
                  imageUrl: ipfsUrl,
              });
              setShowProductModal(true);
          }
      };

    const onSubmit = async (data, e) => {
        setLoading(true);
        const { target } = e;

        const formData = {
            ...data,
            imageUrl: ipfsUrl,

            attributes: 
                 selectedTraits,
            
        };

        console.log("Form Data:", formData);
    
        try {
            const response = await fetch("/api/mint-api", {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    address,
                }),
            });

            const data = await response.json();

            if (data.signature) {
                alert("NFT successfully minted!");
            } else {
                alert("Failed to mint NFT!");
            }
        } catch (error) {
            console.log(error);
        }
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;
        setHasImageError(!selectedImage);
        if (isPreviewBtn && selectedImage) {
            setPreviewData({
                ...data,
                imageUrl: ipfsUrl,
            });
            setShowProductModal(true);
        }

        if (!isPreviewBtn) {
            console.log("Form Data:", formData);

            setLoading(false);

            notify();
            reset();
            setSelectedImage();
        }
    };

    const handleTraitSelection = (traitType) => {
        console.log("Trait Type", traitType);
        if (selectedTraits.includes(traitType)) {
            setSelectedTraits(
                selectedTraits.filter((trait) => trait !== traitType)
            );
        } else {
            setSelectedTraits([...selectedTraits, traitType]);
        }
    };
    return (
        <>
            <div>
                <ConnectWallet />
            </div>

            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
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
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Image is required</ErrorText>
                                    )}
                                </div>

                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                    <h5> Note: </h5>
                                    <span>
                                        {" "}
                                        Service fee : <strong>2%</strong>{" "}
                                    </span>{" "}
                                    <br />
                                    {/* <span>
                                        {" "}
                                        You will receive :{" "}
                                        <strong>25.00 ETH $50,000</strong>
                                    </span> */}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    NFT Name
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `Monkey`"
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                    })}
                                                />
                                                {errors.name && (
                                                    <ErrorText>
                                                        {errors.name?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="description"
                                                    className="form-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    rows="3"
                                                    placeholder="e. g. “After purchasing the product you can get item...”"
                                                    {...register(
                                                        "description",
                                                        {
                                                            required:
                                                                "Description is required",
                                                        }
                                                    )}
                                                />
                                                {errors.description && (
                                                    <ErrorText>
                                                        {
                                                            errors.description
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="price"
                                                    className="form-label"
                                                >
                                                    Item Price in Matic
                                                </label>
                                                <input
                                                    id="price"
                                                    placeholder="e.g. `0.023`"
                                                    {...register("price", {
                                                        pattern: {
                                                            value: /^\d+(\.\d{1,4})?$/, // Allows up to 4 decimal places
                                                            message:
                                                                "Please enter a valid number",
                                                        },
                                                        required:
                                                            "Price is required",
                                                    })}
                                                />

                                                {errors.price && (
                                                    <ErrorText>
                                                        {errors.price?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="category"
                                                    className="form-label"
                                                >
                                                    Category
                                                </label>
                                                <select
                                                    id="category"
                                                    {...register("category", {
                                                        required:
                                                            "Category is required",
                                                    })}
                                                    className="form-select form-select-lg mb-3 bg-[#242435]"
                                                    aria-label=".form-select-lg example"
                                                >
                                                    <option value="">
                                                        Select Category
                                                    </option>
                                                    {nftCategory.map(
                                                        (item, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item.value
                                                                }
                                                            >
                                                                {item.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {errors.category && (
                                                    <ErrorText>
                                                        {
                                                            errors.category
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row g-5 d-flex justify-content-between">
                                            <div className="col-md-12">
                                                <div className="input-box pb--20">
                                                    <label
                                                        htmlFor="traits"
                                                        className="form-label"
                                                    >
                                                        Check Traits
                                                    </label>
                                                    <div className="row">
                                                        {attributes.traits.map(
                                                            (trait, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="col-md-4 mb-5"
                                                                >
                                                                    <div className="rn-check-box">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="rn-check-box-input"
                                                                            id={`traitCheckbox${index}`}
                                                                            name="traits"
                                                                            value={
                                                                                trait.trait_type
                                                                            }
                                                                            onChange={() =>
                                                                                handleTraitSelection(
                                                                                    trait.trait_type
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="rn-check-box-label"
                                                                            htmlFor={`traitCheckbox${index}`}
                                                                        >
                                                                            {
                                                                                trait.trait_type
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    onClick={handlePreview} // Call the handlePreview function
                                                    data-btn="preview"
                                                >
                                                    Preview
                                                </Button>
                                            </div>
                                        </div> */}

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            <div className="input-box">
                                                {loading ? (
                                                    <div
                                                        className="
                                                spinner-border text-primary 
                                                spinner-border-sm
                                                text-center

                                                "
                                                        role="status"
                                                        style={{
                                                            width: "3rem",
                                                            height: "3rem",
                                                            display: "block",
                                                            margin: "auto",
                                                            borderWidth:
                                                                "0.2em",
                                                        }}
                                                    ></div>
                                                ) : (
                                                    <Button
                                                        color="primary"
                                                        fullwidth
                                                        type="submit"
                                                        onClick={handleSubmit(
                                                            onSubmit
                                                        )}
                                                    >
                                                        Submit Item
                                                    </Button>
                                                )}
                                                {/* <Button type="submit" fullwidth>
                                                    Submit Item
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2%</strong>{" "}
                                </span>{" "}
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

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
