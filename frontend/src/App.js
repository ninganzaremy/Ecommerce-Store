import React, { useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import SigninPage from "./components/SigninPage";
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from "./components/RegisterPage";
import ProductsPage from "./components/ProductsPage";
import ShippingPage from "./components/ShippingPage";
import PaymentPage from "./components/PaymentPage";
import { listProductCategories } from "./actions/productActions";
import PlaceOrderPage from "./components/PlaceOrderPage";
import OrderPage from "./components/OrderPage";
import ProfilePage from "./components/ProfilePage";
import OrdersPage from "./components/OrdersPage";
import LoadingBox from "./payComponents/LoadingBox";
import ErrorBox from "./payComponents/ErrorBox";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  window.isAuth = !!userInfo;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories, loading, error } = productCategoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, []);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/" className="name">
              ShopPro
            </Link>{" "}
            <div className="drop">
              <li className="dropbtn">
                <i className="far fa-chevron-down"></i>
              </li>
              <div className="categories-content">
                <li>
                  <Link to="/category/Computers">Computers</Link>
                </li>

                <li>
                  <Link to="/category/Phones">Phones</Link>
                </li>

                <li>
                  <Link to="/category/Printers">Printers</Link>
                </li>

                <li>
                  <Link to="/category/Televisions">Televisions</Link>
                </li>

                <li>
                  <Link to="/category/Cameras">Cameras</Link>
                </li>
              </div>
            </div>
          </div>
          <div className="fal">
            {" "}
            <Link to="/">
              <i className="fal fa-home-alt"></i>
            </Link>
            <div className="description">
              <span className="title color1">Free Shipping</span>{" "}
              <span className="title">on order above </span>
              <span className=" title color1"> $1000 !</span>
            </div>
          </div>
          <div className="header-links">
            {cartItems.length !== 0 && (
              <div className="badge">{cartItems.length}</div>
            )}
            <Link className="header-link" to="/cart">
              <i className="fad fa-shopping-cart" />
            </Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">
                  Admin <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-content">
                  <li>
                    <Link className="header-link" to="/orders">
                      Orders
                    </Link>
                    <Link className="header-link" to="/products">
                      Products
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <div className="side-menu">
            <h3> Shopping Categories</h3>
            <i className="sidebar-close-button" onClick={closeMenu}>
              <i className="far fa-times"></i>
            </i>
          </div>
          <ul className="categories" onClick={closeMenu}>
            <li>
              <Link to="/category/Computers">Computers</Link>
            </li>

            <li>
              <Link to="/category/Phones">Phones</Link>
            </li>

            <li>
              <Link to="/category/Printers">Printers</Link>
            </li>

            <li>
              <Link to="/category/Televisions">Televisions</Link>
            </li>

            <li>
              <Link to="/category/Cameras">Cameras</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/category/:id" component={HomePage} />
            <Route path="/" exact={true} component={HomePage} />
          </div>
        </main>
        <footer className="footer">
          Copyright © 2020 REMY - Software Developer
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
