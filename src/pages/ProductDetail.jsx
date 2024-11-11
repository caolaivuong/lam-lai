import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setP(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Product Detail</h1>
      <img src={p.thumbnail} alt="" />
      <p>{p.title}</p>
      <p>{p.description}</p>
      <p className="gia">{p.price}</p>
    </div>
  );
};

export default ProductDetail;
