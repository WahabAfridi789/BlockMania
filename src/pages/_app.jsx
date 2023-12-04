import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../context";
import { CartContextProvider } from "../cartContext/CartContext";
// import "../styles/globals.css";

const activeChain = "mumbai";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <ThemeProvider defaultTheme="dark">
            <ThirdwebProvider
                activeChain="mumbai"
                clientId="9ae075ddf0cff1be2c1727bf42618cbd"
            >
                <StateContextProvider>
                    <CartContextProvider>
                        <Component {...pageProps} />
                    </CartContextProvider>
                </StateContextProvider>
            </ThirdwebProvider>
        </ThemeProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
