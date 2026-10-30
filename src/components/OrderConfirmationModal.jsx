import { useEffect } from "react";
import { FaWhatsapp, FaXmark } from "react-icons/fa6";
import "./OrderConfirmationModal.css";

function OrderConfirmationModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const updateFigmaScale = () => {
      const FIGMA_WIDTH = 1728;
      const viewportWidth = document.documentElement.clientWidth;

      // Scale proportionally below and above the Figma width.
      const scale = viewportWidth / FIGMA_WIDTH;

      document.documentElement.style.setProperty(
        "--order-confirm-figma-scale",
        scale.toString()
      );
    };

    updateFigmaScale();

    window.addEventListener("resize", updateFigmaScale);

    return () => {
      window.removeEventListener("resize", updateFigmaScale);

      document.documentElement.style.removeProperty(
        "--order-confirm-figma-scale"
      );
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="order-confirmation-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        className="order-confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
      >
        <header className="order-confirmation-header">
          <h2 className="order-confirmation-heading">Checkout</h2>

          <button
            type="button"
            className="order-confirmation-close"
            onClick={onClose}
            aria-label="Close confirmation"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </header>

        <div className="order-confirmation-divider" />

        <div className="order-confirmation-content">
          <div
            className="whatsapp-confirmation-icon"
            aria-hidden="true"
          >
            <div className="whatsapp-confirmation-green">
              <FaWhatsapp />
            </div>
          </div>

          <h1
            id="order-confirmation-title"
            className="order-confirmation-title"
          >
            Order Confirm via WhatsApp
          </h1>

          <p className="order-confirmation-description">
            Thank you! We've received your order successfully. Our team
            will review it and contact you on WhatsApp to confirm your
            order and share the next steps.
          </p>
        </div>
      </section>
    </div>
  );
}

export default OrderConfirmationModal;

