import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import CartPage from './components/CartPage';

import "./App.css";


function App() {
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
            <button type="button" onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/"> SuitsPro </Link>
          </div>
          <div className="header-links">
            <a href="cart.html">cart</a>
            <a href="signin.html">Sign in</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3> Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            X
          </button>
          <ul className="categories">
            <a href="index.html">Suits</a>
            <a href="index.html">Shirts</a>
            <a href="index.html">Pants</a>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />

            <Route path="/" exact={true} component={HomePage} />
          </div>
        </main>
        <footer className="footer">Remy-2020 All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
