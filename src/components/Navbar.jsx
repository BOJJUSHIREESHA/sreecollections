import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaMagnifyingGlass, FaCartShopping } from "react-icons/fa6";

import logoImage from "../assets/logo-1.png";
import sreecollectionsImage from "../assets/sreecollections.png";
import CartDrawer from "./CartDrawer";

const CART_KEY = "sreecollections-cart";

function readCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(cart)) return 0;

    return cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
  } catch {
    return 0;
  }
}

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(readCartCount);

  useEffect(() => {
    const syncCart = () => setCartCount(readCartCount());
    const openCartDrawer = () => setCartOpen(true);

    window.addEventListener("sreecollections-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);
    window.addEventListener("open-sreecollections-cart", openCartDrawer);

    return () => {
      window.removeEventListener("sreecollections-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(
        "open-sreecollections-cart",
        openCartDrawer
      );
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="navbar">
          <div className="navbar-logo-area">
            <div 
  className="navbar-brand" 
  aria-label="Sreecollections"
> 
  <img 
    src={logoImage} 
    alt="Sreecollections logo" 
    className="navbar-logo" 
  /> 
 
  <img 
    src={sreecollectionsImage} 
    alt="Sreecollections" 
    className="navbar-wordmark" 
  /> 
</div>
          </div>

          <div className="navbar-right">
            <div className="navbar-links">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "navbar-link-active" : ""}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "navbar-link-active" : ""}`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "navbar-link-active" : ""}`
                }
              >
                Categories
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `navbar-contact ${
                    isActive ? "navbar-contact-active" : ""
                  }`
                }
              >
                CONTACT US
              </NavLink>
            </div>

            <div className="navbar-actions">
              <Link
                to="/search"
                className="navbar-action-icon"
                aria-label="Search"
              >
                <FaMagnifyingGlass />
              </Link>

              <div className="navbar-cart-wrapper">
                <button
                  type="button"
                  className="navbar-action-icon navbar-cart-button"
                  onClick={() => setCartOpen(true)}
                  aria-label="Open cart"
                >
                  <FaCartShopping />
                </button>

                {cartCount > 0 && (
                  <span className="navbar-cart-count">{cartCount}</span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default Navbar;
