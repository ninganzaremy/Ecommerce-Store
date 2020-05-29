import React from "react";
import data from "../data";
import { Link } from "react-router-dom";


function ProductPage(props){
  console.log(props.match.params.id);
  const product = data.products.find((x) => x._id === props.match.params.id);

  return <div>
      <div>
        <Link to="/">Back to result </Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product">
            {" "}
          </img>
        </div>
      </div>

      <div className="details-info">
        <ul>
          <li>
            <h4> {product.name}</h4>
          </li>
          <li>
            {product.rating} Stars ({product.numReview} Reviews)
          </li>
          <li>
            Price: <b>${product.price}</b>
          </li>
          <li>
            Description:
            <div>{product.description}</div>
          </li>
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>Price: {product.price}</li>
          <li>Status: {product.status}</li>
          <li>
            QTY:
            <select>
              <option>1</option>
              <option>2</option>
              <option>4</option>
              <option>5</option>
            </select>
          </li>
          <li>
            <button>Add to cart</button>
          </li>
        </ul>
      </div>
    </div>
}
export default ProductPage;
