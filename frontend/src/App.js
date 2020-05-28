import React from 'react';
import './App.css';

function App() {
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu =()=>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <div className="grid-container">
      <header className="header">
        <button type="button" onClick={openMenu}>&#9776;
        </button>
        <div className="brand">
          <a href="index.html">SuitsPro</a>
        </div>
        <div className="header-links">
          <a href="cart.html">cart</a>
          <a href="signin.html">Sign in</a>
        </div>
      </header>
      <aside className="sidebar">
      <h3> Shopping Categories</h3>
      <button className="sidebar-close-button" type="button" name="button" onClick={closeMenu}>X</button>
      <ul>
        <a href="index.html">Suits</a>
        <a href="index.html">Pants</a>
      </ul>
      </aside>
      <main className="main">
        <div className="content">
          <ul className="products">
            <li>
              <div className="product">
                <img className="product-image"src="/images/product-1.jpg" alt="product" />
                <div className="product-name">
                  <a href="product.html">Slim Suits</a>
                </div>
                <div className="product-brand">Tuxedo</div>
                <div className="product-price">$250</div>
                <div className="product-rating">4.6 Stars (20 reviews)</div>
                </div>
            </li>
            <li>
              <div className="product">
                <img className="product-image"src="/images/product-1.jpg" alt="product" />
                <div className="product-name">
                  <a href="product.html">Slim Suits</a>
                </div>
                <div className="product-brand">Tuxedo</div>
                <div className="product-price">$250</div>
                <div className="product-rating">4.6 Stars (20 reviews)</div>
              </div>
            </li>
            <li>
              <div className="product">
                <img className="product-image"src="/images/product-1.jpg" alt="product" />
                <div className="product-name">
                  <a href="product.html">Slim Suits</a>
                </div>
                <div className="product-brand">Tuxedo</div>
                <div className="product-price">$250</div>
                <div className="product-rating">4.6 Stars (20 reviews)</div>
              </div>
            </li>
          </ul>
        </div>

      </main>
      <footer className="footer">
        Remy-2020 All right reserved
      </footer>
    </div>
  );
}

export default App;
