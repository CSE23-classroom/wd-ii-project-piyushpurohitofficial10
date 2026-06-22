import React, { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "Mechanical Keyboard", price: 2500, emoji: "⌨️" },
  { id: 2, name: "Wireless Mouse", price: 800, emoji: "🖱️" },
  { id: 3, name: "Noise Cancelling Headphones", price: 3500, emoji: "🎧" },
  { id: 4, name: "Ergonomic Chair", price: 5000, emoji: "🪑" },
  { id: 5, name: "27-inch Monitor", price: 12000, emoji: "🖥️" },
  { id: 6, name: "Desk Mat", price: 400, emoji: "⬛" },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="app-container">
      <nav className="navbar">
        <h2>TechShop</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <div className="cart-icon">🛒 Cart ({cart.length})</div>
      </nav>

      <div className="main-layout">
        <div className="products-section">
          <h3>Our Products</h3>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-emoji">{product.emoji}</div>
                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>
                  <button 
                    className="add-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products found matching "{searchQuery}"</p>
            )}
          </div>
        </div>

        <div className="cart-sidebar">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <span>{item.name} - ₹{item.price}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ₹{cartTotal}</strong>
              </div>
              <button className="checkout-btn" onClick={() => alert("Checkout successful!")}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}