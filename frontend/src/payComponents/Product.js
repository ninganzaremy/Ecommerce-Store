import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => (
  <li>
    <div className="product">
      <div className="product-image">
        <Link to={`/product/${props._id}`}>
          <img src={props.image} alt="images" />
        </Link>
      </div>
      <div className="product-name">
        <Link to={`/product/${props._id}`}>{props.name}</Link>
      </div>
      <div className="product-brand">{props.brand}</div>
      <div className="product-price">${props.price}</div>
      <div className="product-rating">
        <Rating value={props.rating} />({props.numReviews} Reviews)
      </div>
    </div>
  </li>
);
export default Product;
