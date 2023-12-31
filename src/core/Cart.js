import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setproducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This Section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This Section is for Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart" description="Ready to checkout">
      <div className="row text-center payment-mobile">
        <div className="col-6 mob-6">
          {products && products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products</h3>
          )}
        </div>
        <div className="col-6 mob-6">
          <Paymentb products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
