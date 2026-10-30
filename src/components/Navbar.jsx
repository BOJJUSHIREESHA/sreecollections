
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaMagnifyingGlass,
  FaCartShopping,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import logoImage from "../assets/logo-1.png";
import CartDrawer from "./CartDrawer";

const CART_KEY = "sreecollections-cart";

function readCartCount() {
  try {
    const cart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    if (!Array.isArray(cart)) return 0;

    return cart.reduce(
      (total, item) =>
        total + Math.max(0, Number(item.quantity) || 0),
      0
    );
  } catch {
    return 0;
  }
}

function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(readCartCount);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncCart = () => setCartCount(readCartCount());
    const openCart = () => {
      setMenuOpen(false);
      setCartOpen(true);
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener(
      "sreecollections-cart-updated",
      syncCart
    );
    window.addEventListener(
      "open-sreecollections-cart",
      openCart
    );

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(
        "sreecollections-cart-updated",
        syncCart
      );
      window.removeEventListener(
        "open-sreecollections-cart",
        openCart
      );
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () =>
      window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `navbar-link${isActive ? " navbar-link-active" : ""}`;

  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          {/* BRAND */}
          <Link
            to="/home"
            className="navbar-brand"
            aria-label="Sree Collections home"
            onClick={closeMenu}
          >
            <span className="navbar-logo-symbol" aria-hidden="true">
              <img src={logoImage} alt="" />
            </span>

            <span
              className="navbar-logo-wordmark"
              aria-hidden="true"
            >
              <img src={logoImage} alt="" />
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-navigation"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>

          {/* NAVIGATION */}
          <div
            id="navbar-navigation"
            className={`navbar-right ${
              menuOpen ? "navbar-right-open" : ""
            }`}
          >
            <div className="navbar-links">
              <NavLink
                to="/home"
                end
                className={linkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={linkClass}
                onClick={closeMenu}
              >
                About
              </NavLink>

              <NavLink
                to="/categories"
                className={linkClass}
                onClick={closeMenu}
              >
                Categories
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `navbar-contact${
                    isActive ? " navbar-contact-active" : ""
                  }`
                }
                onClick={closeMenu}
              >
                CONTACT US
              </NavLink>
            </div>

            {/* SEARCH AND CART */}
            <div className="navbar-actions">
              <Link
                to="/search"
                className="navbar-action-icon"
                aria-label="Search products"
                onClick={closeMenu}
              >
                <FaMagnifyingGlass aria-hidden="true" />
              </Link>

              <div className="navbar-cart-wrapper">
                <button
                  type="button"
                  className="navbar-action-icon navbar-cart-button"
                  onClick={() => {
                    closeMenu();
                    setCartOpen(true);
                  }}
                  aria-label={`Open cart, ${cartCount} items`}
                >
                  <FaCartShopping aria-hidden="true" />
                </button>

                {cartCount > 0 && (
                  <span className="navbar-cart-count">
                    {cartCount}
                  </span>
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


