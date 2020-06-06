import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingBox from "../payComponents/LoadingBox";
import ErrorBox from "../payComponents/ErrorBox";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../payComponents/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const {
    loading: loadingSaveReview,
    error: errorSaveReview,
    success: successSaveReview,
  } = productReviewSave;

  useEffect(() => {
    if (successSaveReview) {
      setComment("");
      setRating("");
      alert("Review Submitted");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    } else {
      dispatch(detailsProduct(props.match.params.id));
    }
    return () => {
      //
    };
  }, [successSaveReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProductReview(props.match.params.id, { comment, rating }));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox message={error} />
  ) : (
    <div>
      <div className="back-to-result button">
        <Link to="/"> <i className="far fa-backward"></i>  Back to result</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              <Rating value={product.rating} />({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>$ {product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: $ {product.price}</li>
            <li>
              Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
            </li>

            {product.countInStock && (
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
            )}

            {product.countInStock > 0 && (
              <li>
                <button onClick={handleAddToCart} className="button primary">
                <i className="fal fa-cart-plus"></i>  Add to Cart
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="content-margined">
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <div>There is no review.</div>}
        <ul className="review">
          {product.reviews.map((review) => (
            <li key={review._id}>
              <div>
                <b>{review.name}</b>
              </div>
              <div className="rating-container">
                <Rating value={review.rating} />
                <div>{review.createdAt.substring(0, 10)}</div>
              </div>
              <div>{review.comment}</div>
            </li>
          ))}
          <li>
            <h3>Write a customer reviews</h3>

            {window.isAuth ? (
              <form onSubmit={submitHandler}>
                <ul className="form-container">
                  <li>
                    <label htmlFor="rating">Rating</label>
                    <select
                      required
                      value={rating}
                      name="rating"
                      id="rating"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1">1 = Poor</option>
                      <option value="2">2 = Fair</option>
                      <option value="3">3 = Good</option>
                      <option value="4">4 = Very Good</option>
                      <option value="5">5 = Excellent</option>
                    </select>
                  </li>
                  <li>
                    <label htmlFor="comment">Comment</label>

                    <textarea
                      required
                      value={comment}
                      name="comment"
                      id="comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </li>
                  <li>
                    <button type="submit" className="button primary">
                      Submit
                    </button>
                  </li>
                </ul>
              </form>
            ) : (
              <div>
                Please <Link to="/signin"> LOGIN </Link> to write a review.
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default ProductPage;
