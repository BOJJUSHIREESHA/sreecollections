import { Link } from "react-router-dom";

function OrderConfirmation() {
  const customer =
    JSON.parse(localStorage.getItem("customer")) || {};

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const whatsappNumber = "19526830741";

  const orderItems = cart
    .map(
      (item) =>
        `${item.name} x ${item.quantity} - ₹${
          item.price * item.quantity
        }`
    )
    .join("\n");

  const message = `Hello Sreecollections,

I would like to place an order.

Customer Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
City: ${customer.city}
Pincode: ${customer.pincode}

Order:
${orderItems}

Total: ₹${total}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <main className="confirmation-page">

      <section className="confirmation-container">

        <p className="section-subtitle">
          SREECOLLECTIONS
        </p>

        <h1>Thank You!</h1>

        <h2>Your order details are ready.</h2>

        <p>
          Click the button below to complete your order
          through WhatsApp.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-order-button"
        >
          Complete Order on WhatsApp
        </a>

        <br />
        <br />

        <Link
          to="/"
          className="continue-home-link"
        >
          ← Back to Home
        </Link>

      </section>

    </main>
  );
}

export default OrderConfirmation;