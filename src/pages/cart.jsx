import React from 'react';
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Breadcrumb from "@components/breadcrumb";
import { useCartContext } from '../cartContext/CartContext';
import clsx from "clsx";

import Button from "@ui/button";
export async function getStaticProps() {
    return { props: { className: "template-color-1",space: 1} };
  }
const Cart = () => {
  const { cartItems, removeFromCart } = useCartContext();

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      <Header />
      <main id="main-content">
        <Breadcrumb
          pageTitle="Cart"
          currentPage="Cart"
        />
         <div className={clsx("rn-about-card")}> 

        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Staus</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.metadata.name}</td>
                <td>{item.metadata.description}</td>
               
                <td>{item.owner}</td>
                <td>Not for sale</td>
                <td>
                  <img src={item.metadata.image} alt={item.metadata.name} style={{ width: '50px' }} />
                </td>
                <td className='d-flex justify-content-center align-items-center'>
                  <Button  className={clsx("bg-danger")} onClick={() => handleRemove(item.metadata.id)}>Remove</Button>
                  <Button className="ms-5"  onClick={()=>console.log(item.metadata.id)} >Buy NFT</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
};



export default Cart;
