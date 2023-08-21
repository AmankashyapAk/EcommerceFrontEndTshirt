import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
// import { addItemToCart } from "./helper/cartHelper";
// import addItemToCart from "./helper/cartHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function(f){return f}
  reload,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default Description";
  const cartPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showaddtoCart = () => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showremoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <div>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">Rs {cartPrice}</p>
          <div className="row">
            <div className="col-12">{showaddtoCart(addtoCart)}</div>
            <div className="col-12">{showremoveFromCart(removeFromCart)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
