import { useEffect, useMemo, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import "./WhatsAppCheckoutModal.css";

const BUSINESS_WHATSAPP = "19526830741";
const CART_KEY = "sreecollections-cart";

function readCart() {
  try {
    const value = JSON.parse(
      localStorage.getItem(CART_KEY)
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function WhatsAppCheckoutModal({
  isOpen,
  onClose,
  onConfirmed,
  cart: cartProp,
}) {
  /* =====================================================
     WHATSAPP NUMBER
  ===================================================== */

  const [whatsappNumber, setWhatsappNumber] =
    useState("");

  /* =====================================================
     ERROR
  ===================================================== */

  const [error, setError] = useState("");

  /* =====================================================
     SUBMITTING
  ===================================================== */

  const [submitting, setSubmitting] =
    useState(false);

  /* =====================================================
     CART
  ===================================================== */

  const cart = Array.isArray(cartProp)
    ? cartProp
    : readCart();

  /* =====================================================
     TOTAL
  ===================================================== */

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* =====================================================
     FIGMA RESPONSIVE SCALING

     Figma master canvas:
     1728px wide

     The complete checkout modal scales
     proportionally from the Figma canvas.
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const updateFigmaScale = () => {
      const FIGMA_WIDTH = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;

      /*
        Figma reference width:
        1728px

        At 1728px:
        scale = 1

        At smaller widths:
        scale = viewportWidth / 1728

        Never allow the design to become
        larger than the original Figma.
      */

      const scale = Math.min(
        1,
        viewportWidth / FIGMA_WIDTH
      );

      document.documentElement.style.setProperty(
        "--whatsapp-figma-scale",
        scale.toString()
      );
    };

    updateFigmaScale();

    window.addEventListener(
      "resize",
      updateFigmaScale
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateFigmaScale
      );

      document.documentElement.style.removeProperty(
        "--whatsapp-figma-scale"
      );
    };
  }, [isOpen]);

  /* =====================================================
     RESET WHEN MODAL CLOSES
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      setWhatsappNumber("");
      setError("");
      setSubmitting(false);
    }
  }, [isOpen]);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    /*
      Prevent background page scrolling
      while checkout popup is open.
    */

    document.body.classList.add(
      "whatsapp-modal-open"
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.classList.remove(
        "whatsapp-modal-open"
      );
    };
  }, [isOpen, onClose]);

  /* =====================================================
     DO NOT RENDER WHEN CLOSED
  ===================================================== */

  if (!isOpen) {
    return null;
  }

  /* =====================================================
     PROCEED / CONFIRM ORDER
  ===================================================== */

  const handleProceed = (event) => {
    event.preventDefault();

    /* -----------------------------------------------
       CLEAN NUMBER
    ------------------------------------------------ */

    const digits =
      whatsappNumber.replace(/\D/g, "");

    /* -----------------------------------------------
       VALIDATE NUMBER
    ------------------------------------------------ */

    if (
      digits.length < 8 ||
      digits.length > 15
    ) {
      setError(
        "Please enter a valid WhatsApp number."
      );

      return;
    }

    /* -----------------------------------------------
       VALIDATE CART
    ------------------------------------------------ */

    if (!cart.length) {
      setError("Your cart is empty.");

      return;
    }

    /* -----------------------------------------------
       SUBMITTING STATE
    ------------------------------------------------ */

    setSubmitting(true);

    /* =================================================
       SAVE ORDER
    ================================================= */

    const order = {
      customer: {
        whatsappNumber:
          whatsappNumber.trim(),
      },

      cart,

      total,

      createdAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      "sreecollections-order",
      JSON.stringify(order)
    );

    /* =================================================
       BUILD ORDER LINES
    ================================================= */

    const orderLines = cart.map(
      (item) => {
        const lineTotal =
          Number(item.price || 0) *
          Number(item.quantity || 0);

        return [
          `Product: ${item.name}`,

          `Size: ${item.size || "M"}`,

          `Colour: ${
            item.colour || "Black"
          }`,

          `Quantity: ${item.quantity}`,

          `Price: $${lineTotal.toFixed(
            2
          )}`,
        ].join("\n");
      }
    );

    /* =================================================
       WHATSAPP MESSAGE
    ================================================= */

    const message = [
      "Hello Sreecollections, I would like to confirm my order.",

      "",

      `Customer WhatsApp Number: ${whatsappNumber.trim()}`,

      "",

      ...orderLines.flatMap(
        (line, index) => [
          line,

          ...(index <
          orderLines.length - 1
            ? [""]
            : []),
        ]
      ),

      "",

      `Total: $${total.toFixed(2)}`,
    ].join("\n");

    /* =================================================
       WHATSAPP URL
    ================================================= */

    const whatsappUrl =
      `https://wa.me/${BUSINESS_WHATSAPP}?text=` +
      encodeURIComponent(message);

    /* =================================================
       OPEN WHATSAPP
    ================================================= */

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    /* =================================================
       RESET SUBMITTING
    ================================================= */

    setSubmitting(false);

    /* =================================================
       CLOSE NUMBER POPUP
    ================================================= */

    onClose();

    /* =================================================
       SHOW CONFIRMATION
    ================================================= */

    if (onConfirmed) {
      onConfirmed();
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="whatsapp-checkout-overlay"
      onMouseDown={onClose}
    >
      <section
        className="whatsapp-checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-checkout-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="whatsapp-checkout-header">

          <h2
            id="whatsapp-checkout-title"
          >
            Checkout
          </h2>

          <button
            type="button"
            className="whatsapp-checkout-close"
            onClick={onClose}
            aria-label="Close checkout"
          >
            <FaXmark />
          </button>

        </div>


        {/* =================================================
            DIVIDER

            Kept in JSX for compatibility,
            hidden by CSS because the header itself
            contains the exact Figma divider.
        ================================================= */}

        <div className="whatsapp-checkout-divider" />


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="whatsapp-checkout-form"
          onSubmit={handleProceed}
        >

          {/* =================================================
              QUESTION
          ================================================= */}

          <p className="whatsapp-checkout-question">
            Enter your WhatsApp number to confirm
            your order.
          </p>


          {/* =================================================
              ACCESSIBILITY LABEL
          ================================================= */}

          <label
            htmlFor="whatsapp-number"
            className="sr-only"
          >
            WhatsApp Number
          </label>


          {/* =================================================
              WHATSAPP NUMBER INPUT
          ================================================= */}

          <input
            id="whatsapp-number"

            type="tel"

            inputMode="tel"

            autoComplete="tel"

            value={whatsappNumber}

            onChange={(event) => {
              setWhatsappNumber(
                event.target.value
              );

              if (error) {
                setError("");
              }
            }}

            placeholder="WhatsApp Number"

            className={`whatsapp-number-input ${
              error ? "has-error" : ""
            }`}

            aria-invalid={Boolean(error)}

            autoFocus
          />


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <p className="whatsapp-checkout-error">
              {error}
            </p>
          )}


          {/* =================================================
              PROCEED BUTTON
          ================================================= */}

          <button
            type="submit"

            className="whatsapp-proceed-button"

            disabled={submitting}
          >
            {submitting
              ? "Opening WhatsApp..."
              : "Proceed"}
          </button>

        </form>

      </section>
    </div>
  );
}

export default WhatsAppCheckoutModal;