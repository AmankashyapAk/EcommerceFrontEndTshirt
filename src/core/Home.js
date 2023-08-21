import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
    return () => {};
  }, []);

  return (
    <Base title="" description="Welcome to the Store">
      <div className="row text-center">
        <h1 className="text-white">Tshirts</h1>
        <div className="row mobile-home">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4 mobile-card">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
