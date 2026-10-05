import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    localStorage.setItem(
      "customer",
      JSON.stringify(customer)
    );

    navigate("/order-confirmation");
  };

  return (
    <main className="checkout-page">

      <section className="checkout-header">
        <p className="section-subtitle">SREECOLLECTIONS</p>

        <h1>Checkout</h1>

        <p>Enter your details to complete your order.</p>
      </section>

      <section className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Customer Details</h2>

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />

          <label>
            Address
          </label>

          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />

          <label>
            City
          </label>

          <input
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
            required
          />

          <label>
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={customer.pincode}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <p>
                {item.name} × {item.quantity}
              </p>

              <p>
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <hr />

          <h3>
            Total: ₹{total}
          </h3>

          <Link
            to="/cart"
            className="back-cart-link"
          >
            ← Back to Cart
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Checkout;