import { useEffect } from "react";
import { FaWhatsapp, FaXmark } from "react-icons/fa6";
import "./OrderConfirmationModal.css";

function OrderConfirmationModal({
  isOpen,
  onClose,
}) {
  /* =====================================================
     FIGMA RESPONSIVE SCALING

     Figma master canvas:
     1728 × 3481

     The complete confirmation modal is designed
     against that reference canvas.
  ===================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const updateFigmaScale = () => {
      const FIGMA_WIDTH = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;

      /*
        Scale the complete Figma composition
        from the 1728px reference width.

        At 1728px:
        scale = 1

        Smaller devices:
        scale = viewportWidth / 1728

        Never make the Figma design larger
        than its original size.
      */

      const scale = Math.min(
        1,
        viewportWidth / FIGMA_WIDTH
      );

      document.documentElement.style.setProperty(
        "--order-confirm-figma-scale",
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
        "--order-confirm-figma-scale"
      );
    };
  }, [isOpen]);

  /* =====================================================
     DO NOT RENDER WHEN CLOSED
  ===================================================== */

  if (!isOpen) {
    return null;
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className="order-confirmation-overlay"
      onMouseDown={onClose}
    >
      <section
        className="order-confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmation-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="order-confirmation-header">

          <h2>
            Checkout
          </h2>

          <button
            type="button"
            className="order-confirmation-close"
            onClick={onClose}
            aria-label="Close confirmation"
          >
            <FaXmark />
          </button>

        </div>


        {/* =================================================
            DIVIDER

            The actual Figma divider is created by
            the header border, so this remains hidden.
        ================================================= */}

        <div className="order-confirmation-divider" />


        {/* =================================================
            CONFIRMATION CONTENT

            Figma group:
            919 × 276
        ================================================= */}

        <div className="order-confirmation-content">

          {/* =================================================
              WHATSAPP ICON

              Figma:
              96 × 96
          ================================================= */}

          <div
            className="whatsapp-confirmation-icon"
            aria-hidden="true"
          >
            <div className="whatsapp-confirmation-green">
              <FaWhatsapp />
            </div>
          </div>


          {/* =================================================
              TITLE

              Figma:
              842 × 72
          ================================================= */}

          <h1 id="order-confirmation-title">
            Order Confirm via WhatsApp
          </h1>


          {/* =================================================
              DESCRIPTION

              Figma:
              919 × 60
          ================================================= */}

          <p>
            Thank you! We've received your order
            successfully. Our team will review it and
            contact you on WhatsApp to confirm your
            order and share the next steps.
          </p>

        </div>

      </section>
    </div>
  );
}

export default OrderConfirmationModal;