import { useEffect, useMemo, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import "./WhatsAppCheckoutModal.css";

const BUSINESS_WHATSAPP = "19526830741";
const CART_KEY = "sreecollections-cart";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY));
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
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cart = Array.isArray(cartProp) ? cartProp : readCart();

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* =====================================================
     FIGMA PROPORTIONAL SCALING
     Reference width: 1728px
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const updateFigmaScale = () => {
      const FIGMA_WIDTH = 1728;
      const viewportWidth = document.documentElement.clientWidth;

      const scale = viewportWidth / FIGMA_WIDTH;

      document.documentElement.style.setProperty(
        "--whatsapp-checkout-figma-scale",
        String(scale)
      );
    };

    updateFigmaScale();

    window.addEventListener("resize", updateFigmaScale);

    return () => {
      window.removeEventListener("resize", updateFigmaScale);

      document.documentElement.style.removeProperty(
        "--whatsapp-checkout-figma-scale"
      );
    };
  }, [isOpen]);

  /* =====================================================
     RESET FORM WHEN MODAL CLOSES
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      setWhatsappNumber("");
      setError("");
      setSubmitting(false);
    }
  }, [isOpen]);

  /* =====================================================
     ESCAPE KEY AND BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("whatsapp-modal-open");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("whatsapp-modal-open");
    };
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  /* =====================================================
     PROCEED / CONFIRM ORDER
  ===================================================== */

  const handleProceed = (event) => {
    event.preventDefault();

    if (submitting) return;

    const digits = whatsappNumber.replace(/\D/g, "");

    /* Validate WhatsApp number */

    if (digits.length < 8 || digits.length > 15) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    /* Validate cart */

    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      /* Save order */

      const order = {
        customer: {
          whatsappNumber: whatsappNumber.trim(),
        },
        cart,
        total,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "sreecollections-order",
        JSON.stringify(order)
      );

      /* Build order lines */

      const orderLines = cart.map((item) => {
        const lineTotal =
          Number(item.price || 0) *
          Number(item.quantity || 0);

        return [
          `Product: ${item.name}`,
          `Size: ${item.size || "M"}`,
          `Colour: ${item.colour || "Black"}`,
          `Quantity: ${item.quantity}`,
          `Price: $${lineTotal.toFixed(2)}`,
        ].join("\n");
      });

      /* Build WhatsApp message */

      const message = [
        "Hello Sreecollections, I would like to confirm my order.",
        "",
        `Customer WhatsApp Number: ${whatsappNumber.trim()}`,
        "",
        ...orderLines.flatMap((line, index) => [
          line,
          ...(index < orderLines.length - 1 ? [""] : []),
        ]),
        "",
        `Total: $${total.toFixed(2)}`,
      ].join("\n");

      /* Create WhatsApp URL */

      const whatsappUrl =
        `https://wa.me/${BUSINESS_WHATSAPP}?text=` +
        encodeURIComponent(message);

      /* Open WhatsApp */

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      /* Close modal */

      onClose?.();

      /* Trigger confirmation callback */

      if (onConfirmed) {
        onConfirmed();
      }
    } catch (err) {
      console.error("Unable to process checkout:", err);

      setError(
        "Unable to process your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="whatsapp-checkout-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !submitting
        ) {
          onClose?.();
        }
      }}
    >
      <section
        className="whatsapp-checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-checkout-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* HEADER */}

        <header className="whatsapp-checkout-header">
          <h2 id="whatsapp-checkout-title">
            Checkout
          </h2>

          <button
            type="button"
            className="whatsapp-checkout-close"
            onClick={onClose}
            aria-label="Close checkout"
            disabled={submitting}
          >
            <FaXmark aria-hidden="true" />
          </button>
        </header>

        <div className="whatsapp-checkout-divider" />

        {/* CHECKOUT FORM */}

        <form
          className="whatsapp-checkout-form"
          onSubmit={handleProceed}
        >
          <p className="whatsapp-checkout-question">
            Enter your WhatsApp number to confirm
            your order.
          </p>

          <label
            htmlFor="whatsapp-number"
            className="sr-only"
          >
            WhatsApp Number
          </label>

          <input
            id="whatsapp-number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={whatsappNumber}
            onChange={(event) => {
              setWhatsappNumber(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="WhatsApp Number"
            className={`whatsapp-number-input ${
              error ? "has-error" : ""
            }`}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "whatsapp-checkout-error" : undefined
            }
            autoFocus
            required
          />

          {error && (
            <p
              id="whatsapp-checkout-error"
              className="whatsapp-checkout-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="whatsapp-proceed-button"
            disabled={submitting}
          >
            {submitting ? "Opening WhatsApp..." : "Proceed"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default WhatsAppCheckoutModal;