import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaXmark,
  FaWhatsapp,
} from "react-icons/fa6";

import "./Cart.css";

const CART_KEY = "sreecollections-cart";
const STORE_WHATSAPP = "19526830741";

function getCart() {
  try {
    const cart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new CustomEvent("sreecollections-cart-updated")
  );
}

function Cart() {
  const [cartItems, setCartItems] = useState(getCart);

  /* =========================================
     POPUP STATES
  ========================================== */

  const [showNumberPopup, setShowNumberPopup] =
    useState(false);

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [whatsappNumber, setWhatsappNumber] =
    useState("");

  const [numberError, setNumberError] =
    useState("");


  /* =========================================
     CART SYNC
  ========================================== */

  useEffect(() => {
    const syncCart = () => {
      setCartItems(getCart());
    };

    window.addEventListener(
      "sreecollections-cart-updated",
      syncCart
    );

    window.addEventListener(
      "storage",
      syncCart
    );

    return () => {
      window.removeEventListener(
        "sreecollections-cart-updated",
        syncCart
      );

      window.removeEventListener(
        "storage",
        syncCart
      );
    };
  }, []);


  /* =========================================
     INCREASE
  ========================================== */

  const increaseQuantity = (id) => {
    const cart = cartItems.map((item) => {
      if (
        String(item.id) !== String(id)
      ) {
        return item;
      }

      return {
        ...item,
        quantity:
          Number(item.quantity || 0) + 1,
      };
    });

    setCartItems(cart);
    saveCart(cart);
  };


  /* =========================================
     DECREASE
     1 → REMOVE
  ========================================== */

  const decreaseQuantity = (id) => {
    const cart = [...cartItems];

    const index = cart.findIndex(
      (item) =>
        String(item.id) === String(id)
    );

    if (index === -1) {
      return;
    }

    const quantity =
      Number(cart[index].quantity || 0);

    if (quantity <= 1) {
      cart.splice(index, 1);
    } else {
      cart[index] = {
        ...cart[index],
        quantity: quantity - 1,
      };
    }

    setCartItems(cart);
    saveCart(cart);
  };


  /* =========================================
     REMOVE
  ========================================== */

  const removeItem = (id) => {
    const cart = cartItems.filter(
      (item) =>
        String(item.id) !== String(id)
    );

    setCartItems(cart);
    saveCart(cart);
  };


  /* =========================================
     TOTAL ITEMS
  ========================================== */

  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );


  /* =========================================
     SUBTOTAL
  ========================================== */

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const shipping = 0;

  const total = subtotal + shipping;


  /* =========================================
     OPEN NUMBER POPUP
  ========================================== */

  const openNumberPopup = () => {
    if (cartItems.length === 0) {
      return;
    }

    setNumberError("");
    setShowNumberPopup(true);
  };


  /* =========================================
     CLOSE NUMBER POPUP
  ========================================== */

  const closeNumberPopup = () => {
    setShowNumberPopup(false);
    setNumberError("");
  };


  /* =========================================
     PROCEED FROM NUMBER POPUP
  ========================================== */

  const confirmWhatsAppOrder = () => {
    const cleanedNumber =
      whatsappNumber.replace(/\D/g, "");

    if (!cleanedNumber) {
      setNumberError(
        "Please enter your WhatsApp number."
      );

      return;
    }

    if (cleanedNumber.length < 10) {
      setNumberError(
        "Please enter a valid WhatsApp number."
      );

      return;
    }


    /* =======================================
       CREATE WHATSAPP MESSAGE
    ======================================== */

    let message =
      "Hello Sreecollections,%0A%0A";

    message +=
      "I would like to place an order.%0A%0A";


    cartItems.forEach((item, index) => {

      message +=
        `${index + 1}. ${item.name}%0A`;

      message +=
        `Quantity: ${item.quantity}%0A`;

      message +=
        `Size: ${item.size || "S"}%0A`;

      message +=
        `Colour: ${
          item.colour || "Black"
        }%0A`;

      message +=
        `Price: $${Number(
          item.price
        ).toFixed(2)}%0A`;

      message +=
        `Item Total: $${(
          Number(item.price) *
          Number(item.quantity)
        ).toFixed(2)}%0A%0A`;
    });


    message +=
      `Customer WhatsApp Number: ${cleanedNumber}%0A`;

    message +=
      `Subtotal: $${subtotal.toFixed(2)}%0A`;

    message +=
      "Shipping: FREE%0A";

    message +=
      `Total: $${total.toFixed(2)}%0A%0A`;

    message +=
      "Please confirm my order and share the next steps.";


    /* =======================================
       OPEN WHATSAPP
    ======================================== */

    const whatsappUrl =
      `https://wa.me/${STORE_WHATSAPP}?text=${message}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );


    /* =======================================
       CHANGE POPUP
    ======================================== */

    setShowNumberPopup(false);

    setShowSuccessPopup(true);
  };


  /* =========================================
     CLOSE SUCCESS POPUP
  ========================================== */

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };


  /* =========================================
     EMPTY CART
  ========================================== */

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">

        <section className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>
            Your Cart Is Empty
          </h1>

          <p>
            Add some products to your cart
            and they will appear here.
          </p>

          <Link
            to="/categories"
            className="cart-shop-button"
          >
            Continue Shopping
          </Link>

        </section>

      </main>
    );
  }


  return (
    <main className="cart-page">

      <section className="cart-container">

        {/* =================================
            HEADING
        ================================== */}

        <div className="cart-heading">

          <div>

            <h1>
              Shopping Cart
            </h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </p>

          </div>

          <Link
            to="/categories"
            className="cart-back-shopping"
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

        </div>


        {/* =================================
            CART LAYOUT
        ================================== */}

        <div className="cart-layout">

          {/* =================================
              PRODUCTS
          ================================== */}

          <section className="cart-products">

            {cartItems.map((item) => (

              <article
                className="cart-product"
                key={item.id}
              >

                {/* IMAGE */}

                <Link
                  to={`/product/${item.id}`}
                  className="cart-product-image"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </Link>


                {/* PRODUCT INFO */}

                <div className="cart-product-info">

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-product-name"
                  >
                    {item.name}
                  </Link>

                  <div className="cart-product-meta">

                    <span>
                      Size:
                      <strong>
                        {item.size || "S"}
                      </strong>
                    </span>

                    <span>
                      Colour:
                      <strong>
                        {item.colour || "Black"}
                      </strong>
                    </span>

                  </div>

                </div>


                {/* QUANTITY */}

                <div className="cart-product-quantity">

                  <span>
                    Quantity
                  </span>

                  <div className="cart-quantity-box">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>


                {/* PRICE */}

                <div className="cart-product-price">

                  <span>
                    Item Total
                  </span>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}
                  </strong>

                </div>


                {/* REMOVE */}

                <button
                  type="button"
                  className="cart-delete"
                  onClick={() =>
                    removeItem(item.id)
                  }
                  aria-label="Remove product"
                >
                  <FaTrash />
                </button>

              </article>

            ))}

          </section>


          {/* =================================
              SUMMARY
          ================================== */}

          <aside className="cart-summary">

            <h2>
              Price Details
            </h2>

            <div className="cart-summary-divider" />

            <div className="cart-summary-row">

              <span>
                Price ({totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"})
              </span>

              <span>
                ${subtotal.toFixed(2)}
              </span>

            </div>


            <div className="cart-summary-row">

              <span>
                Delivery Charges
              </span>

              <span className="free-delivery">
                FREE
              </span>

            </div>


            <div className="cart-summary-divider" />


            <div className="cart-total-row">

              <span>
                Total Amount
              </span>

              <strong>
                ${total.toFixed(2)}
              </strong>

            </div>


            {/* =================================
                PROCEED
            ================================== */}

            <button
              type="button"
              className="cart-checkout-button"
              onClick={openNumberPopup}
            >
              Proceed To WhatsApp
            </button>


            <div className="cart-secure-note">

              <span>
                🔒
              </span>

              <span>
                Order confirmation via WhatsApp
              </span>

            </div>

          </aside>

        </div>

      </section>


      {/* =====================================
          WHATSAPP NUMBER POPUP
      ====================================== */}

      {showNumberPopup && (

        <div
          className="checkout-popup-overlay"
          onClick={closeNumberPopup}
        >

          <div
            className="checkout-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="checkout-popup-header">

              <h3>
                Checkout
              </h3>

              <button
                type="button"
                onClick={closeNumberPopup}
                aria-label="Close"
              >
                <FaXmark />
              </button>

            </div>


            {/* BODY */}

            <div className="checkout-popup-body">

              <h2>
                Enter your WhatsApp number
                to confirm your order.
              </h2>


              <div className="whatsapp-input-wrapper">

                <FaWhatsapp />

                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(event) => {
                    setWhatsappNumber(
                      event.target.value
                    );

                    setNumberError("");
                  }}
                  placeholder="WhatsApp Number"
                  autoFocus
                />

              </div>


              {numberError && (

                <p className="whatsapp-number-error">
                  {numberError}
                </p>

              )}


              <button
                type="button"
                className="whatsapp-proceed-button"
                onClick={
                  confirmWhatsAppOrder
                }
              >
                Proceed
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          SUCCESS POPUP
      ====================================== */}

      {showSuccessPopup && (

        <div
          className="checkout-popup-overlay"
          onClick={closeSuccessPopup}
        >

          <div
            className="checkout-success-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="checkout-popup-header">

              <h3>
                Checkout
              </h3>

              <button
                type="button"
                onClick={closeSuccessPopup}
                aria-label="Close"
              >
                <FaXmark />
              </button>

            </div>


            {/* SUCCESS */}

            <div className="checkout-success-body">

              <div className="whatsapp-success-icon">
                <FaWhatsapp />
              </div>


              <h1>
                Order Confirm via WhatsApp
              </h1>


              <p>
                Thank you! We've received your
                order successfully. Our team will
                review it and contact you on
                WhatsApp to confirm your order
                and share the next steps.
              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Cart;