import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../payComponents/Rating";
import LoadingBox from "../payComponents/LoadingBox";
import ErrorBox from "../payComponents/ErrorBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomePage(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder));

    return () => {
      //
    };
  }, [dispatch, category]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, e.target.value));
  };

  return (
    <div className="content">
      <div className="searchbox">
        <ul className="filter">
          <li>
            <form onSubmit={searchHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type="submit" className="search">
                <i className="far fa-search"></i>
              </button>
            </form>
          </li>
          <li>
            Sort By{" "}
            <select value={sortOrder} onChange={sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </li>
        </ul>

        <ul>{category && <h2 className="result">{category}</h2>} </ul>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : products.length === 0 ? (
        <div className="empty-list">There is no products.</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={"/product/" + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>

                <div className="product-name">
                  <Link to={"/product/" + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating value={product.rating} />({product.numReviews}{" "}
                  Reviews)
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default HomePage;
