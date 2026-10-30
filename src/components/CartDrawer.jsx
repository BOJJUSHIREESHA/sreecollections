import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaXmark,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";

import "./CartDrawer.css";
import WhatsAppCheckoutModal from "./WhatsAppCheckoutModal";
import OrderConfirmationModal from "./OrderConfirmationModal";

const CART_KEY = "sreecollections-cart";

/* READ CART */
function readCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

/* GET COLOUR VALUE */
function getColorValue(colour) {
  switch (colour) {
    case "Red":
      return "#9d3737";
    case "Olive":
      return "#a39a3a";
    case "Blue":
      return "#347d94";
    case "Pink":
      return "#bd4096";
    case "Black":
    default:
      return "#171717";
  }
}

/* CART DRAWER */
function CartDrawer({ isOpen, onClose }) {
  const [cart, setCart] = useState(readCart);
  const [promoCode, setPromoCode] = useState("");

  const [
    whatsappCheckoutOpen,
    setWhatsappCheckoutOpen,
  ] = useState(false);

  const [
    orderConfirmationOpen,
    setOrderConfirmationOpen,
  ] = useState(false);

  /* LOCK PAGE SCROLL WHILE CART IS OPEN */
  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  /* LOAD CART WHEN DRAWER OPENS */
  useEffect(() => {
    if (!isOpen) return;
    setCart(readCart());
  }, [isOpen]);

  /* KEEP CART SYNCHRONIZED */
  useEffect(() => {
    const syncCart = () => {
      setCart(readCart());
    };

    window.addEventListener("sreecollections-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("sreecollections-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  /* TOTAL NUMBER OF PRODUCTS */
  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* SUBTOTAL */
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* SHIPPING */
  const shipping = subtotal > 0 ? 0 : 0;

  /* GRAND TOTAL */
  const total = subtotal + shipping;

  /* SAVE CART */
  const saveCart = (nextCart) => {
    setCart(nextCart);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(nextCart)
    );

    window.dispatchEvent(
      new Event("sreecollections-cart-updated")
    );
  };

  /* CHANGE QUANTITY */
  const changeQuantity = (item, delta) => {
    const nextCart = cart
      .map((entry) => {
        const sameProduct =
          entry.id === item.id &&
          entry.size === item.size &&
          entry.colour === item.colour;

        if (!sameProduct) return entry;

        return {
          ...entry,
          quantity: Number(entry.quantity || 0) + delta,
        };
      })
      .filter((entry) => Number(entry.quantity) > 0);

    saveCart(nextCart);
  };

  /* CHECKOUT */
  const checkout = () => {
    if (!cart.length) return;

    onClose();
    setWhatsappCheckoutOpen(true);
  };

  return (
    <>
      {/* CART DRAWER */}
      {isOpen && (
        <div
          className="cart-drawer-overlay"
          onClick={onClose}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER */}
            <div className="cart-drawer-header">
              <h2>Your Cart ({totalItems})</h2>

              <button
                type="button"
                className="cart-drawer-close"
                onClick={onClose}
                aria-label="Close cart"
              >
                <FaXmark />
              </button>
            </div>

            {/* CART CONTENT */}
            <div className="cart-drawer-content">
              {cart.length === 0 ? (
                <div className="empty-cart-drawer">
                  <p>Your cart is empty.</p>

                  <Link
                    to="/categories"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="cart-drawer-item"
                    key={`${item.id}-${item.size}-${item.colour}`}
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="cart-drawer-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    {/* PRODUCT INFORMATION */}
                    <div className="cart-drawer-item-details">
                      <h3>{item.name}</h3>

                      {/* SIZE AND COLOUR */}
                      <div className="cart-item-meta-row">
                        <span className="cart-item-size">
                          Size: {item.size || "M"}
                        </span>

                        <span
                          className="cart-item-color"
                          title={item.colour || "Black"}
                          style={{
                            backgroundColor: getColorValue(
                              item.colour
                            ),
                          }}
                        />
                      </div>

                      {/* QUANTITY AND PRICE */}
                      <div className="cart-item-bottom">
                        <div className="cart-item-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item, -1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item, 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <strong>
                          $
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* BOTTOM SUMMARY */}
            {cart.length > 0 && (
              <div className="cart-drawer-bottom">
                {/* PROMO CODE */}
                <div className="promo-row">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(event) =>
                      setPromoCode(event.target.value)
                    }
                    placeholder="Promo code"
                  />

                  <button type="button">Apply</button>
                </div>

                {/* SUMMARY */}
                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>

                  <div>
                    <span>Shipping</span>
                    <strong>
                      {shipping === 0
                        ? "Free"
                        : `$${shipping.toFixed(2)}`}
                    </strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* CHECKOUT */}
                <button
                  type="button"
                  className="drawer-checkout-button"
                  onClick={checkout}
                >
                  Checkout
                </button>

                {/* CONTINUE SHOPPING */}
                <button
                  type="button"
                  className="drawer-continue-button"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* WHATSAPP CHECKOUT MODAL */}
      <WhatsAppCheckoutModal
        isOpen={whatsappCheckoutOpen}
        onClose={() => setWhatsappCheckoutOpen(false)}
        onConfirmed={() => setOrderConfirmationOpen(true)}
        cart={cart}
      />

      {/* ORDER CONFIRMATION MODAL */}
      <OrderConfirmationModal
        isOpen={orderConfirmationOpen}
        onClose={() => setOrderConfirmationOpen(false)}
      />
    </>
  );
}

export default CartDrawer;