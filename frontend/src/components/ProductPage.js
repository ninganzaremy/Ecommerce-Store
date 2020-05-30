import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";


function ProductPage(props) {
  const [qty, setQTY] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);
  return <div>
      <div className="back-to-result">
        <Link to="/">Back to result </Link>
      </div>
      {loading ? (
        <div>loading....</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product"></img>
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
                <select value={qty} onChange={(e) => {setQTY(e.target.value)}}>
                {[...Array(product.countInStock).keys()].map(x=>
                  <option value={x+1}>{x+1}</option>)}
                </select>
              </li>
              <li>
                <button className="button primary">Add to cart</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
}
export default ProductPage;
