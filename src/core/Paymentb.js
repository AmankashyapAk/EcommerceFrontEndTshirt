import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";

import { getMeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <div>
            <h3>Please Login or add something to cart</h3>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          PaymentMethodNonce: nonce,
          amount: calculateAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            setInfo({ ...info, success: res.success, loading: false });
            console.log("PYmnet SUCC");
            //todo empty the cart
            // force reload
          })
          .catch((err) => {
            setInfo({ loading: false, success: false });
            console.log("PYmnet Failed");
          });
      })
      .catch((err) => console.log(err));
  };

  const calculateAmount = () => {
    let amount = 0;
    products.map((product, index) => {
      amount = amount + product.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is Rs {calculateAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
