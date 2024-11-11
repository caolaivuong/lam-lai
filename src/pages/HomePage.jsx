import React from "react";
import { Link } from "react-router-dom";

function HomePage({ data }) {
  return (
    <>
      <h1>Danh Sách Sản Phẩm</h1>
      {data.map((product) => (
        <div key={product.id} className="card">
          <Link to={`/product-detail/${product.id}`}>
            <p>
              <img src={product.thumbnail} alt="" />
            </p>
          </Link>
          <Link to={`/product-detail/${product.id}`}>
            <h2>{product.title}</h2>
          </Link>
          <p>{product.description}</p>
          <p className="gia">${product.price}</p>
          <button className="btn btn-info">Add to cart</button>
        </div>
      ))}
    </>
  );
}

export default HomePage;
