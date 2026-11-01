
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaMagnifyingGlass,
  FaCartShopping,
} from "react-icons/fa6";

import logoImage from "../assets/logo-1.png";
import CartDrawer from "./CartDrawer";
import "../style.css";

const CART_KEY = "sreecollections-cart";

const mainLinks = [
  { label: "Home", to: "/home", end: true },
  { label: "About", to: "/about" },
  { label: "Categories", to: "/categories" },
];

const categoryLinks = [
  { label: "Home", to: "/home", end: true },
  { label: "Categories", to: "/categories" },
  { label: "Sarees", to: "/categories?category=sarees" },
  { label: "Fashion", to: "/categories?category=fashion" },
  { label: "Jewellery", to: "/categories?category=jewellery" },
  { label: "Decor", to: "/categories?category=decor" },
  { label: "Contact", to: "/contact" },
];

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

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
  const [cartCount, setCartCount] = useState(getCartCount);
  const [cartOpen, setCartOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => setCartCount(getCartCount());

    window.addEventListener("storage", updateCart);
    window.addEventListener("sreecollections-cart-updated", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("sreecollections-cart-updated", updateCart);
    };
  }, []);

  const isActiveLink = (to, end = false) => {
    const [pathname, search] = to.split("?");
    const currentPath = location.pathname;

    if (end && currentPath === pathname) {
      return !search || location.search === `?${search}`;
    }

    if (search) {
      return currentPath === pathname && location.search === `?${search}`;
    }

    return currentPath === pathname;
  };

  const renderLinks = (links, className) =>
    links.map((item) => (
      <NavLink
        key={`${className}-${item.label}`}
        to={item.to}
        end={item.end}
        className={() => {
          const active = isActiveLink(item.to, item.end);

          return `${className}${active ? " is-active" : ""}`;
        }}
      >
        {item.label}
      </NavLink>
    ));

  const openSearch = () => navigate("/search");

  return (
    <>
      <header className="site-header">
        <div className="navbar">
          {/* LOGO */}
          <Link
            to="/home"
            className="navbar-brand"
            aria-label="Sree Collections home"
          >
            <span className="navbar-logo-symbol">
              <img src={logoImage} alt="" />
            </span>

            <span className="navbar-logo-wordmark">
              <img src={logoImage} alt="Sree Collections" />
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="navbar-links" aria-label="Main navigation">
            {renderLinks(mainLinks, "navbar-link")}
          </nav>

          {/* DESKTOP CONTACT BUTTON */}
          <Link to="/contact" className="navbar-contact">
            CONTACT US
          </Link>

          {/* SEARCH AND CART */}
          <div className="navbar-actions">
            <button
              type="button"
              className="navbar-action-icon"
              aria-label="Search products"
              onClick={openSearch}
            >
              <FaMagnifyingGlass />
            </button>

            <button
              type="button"
              className="navbar-action-icon navbar-cart-button"
              aria-label={`Shopping cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
            >
              <FaCartShopping />

              {cartCount > 0 && (
                <span className="navbar-cart-count">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* SECOND ROW: TABLET AND MOBILE NAVIGATION */}
        <nav className="mobile-category-nav" aria-label="Shop navigation">
          <div className="mobile-category-track">
            {renderLinks(categoryLinks, "mobile-category-link")}
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
