import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Product from "@components/product/layout-01";

const ProductModal = ({ show, handleModal, data }) => (
    <Modal
        className="rn-popup-modal upload-modal-wrapper"
        show={show}
        onHide={handleModal}
        centered
    >
        {show && (
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleModal}
            >
                <i className="feather-x" />
            </button>
        )}
        <Modal.Body>
            <Product
                overlay
                disableShareDropdown
                title={data.name}
                slug="/product"
                price={{
                    amount: +data.price,
                    currency: "wETH",
                }}
                image={{ src: URL.createObjectURL(data.image) }}
            />
        </Modal.Body>
    </Modal>
);

ProductModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        image: PropTypes.shape({}),
        name: PropTypes.string,
        price: PropTypes.string,
    }),
};
export default ProductModal;
