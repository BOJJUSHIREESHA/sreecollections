import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* HANDLE INPUT CHANGES */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* FORM VALIDATION AND SUBMISSION */
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "This field is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "This field is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(formData.topic.trim());

    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\n\n` +
        `Email: ${formData.email.trim()}\n\n` +
        `Topic: ${formData.topic.trim()}\n\n` +
        `Message:\n${formData.message.trim()}`
    );

    window.location.href =
      `mailto:Sreecollections007@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      {/* INTRODUCTION */}
      <section className="contact-intro">
        <h1>
          For Any Inquiries, Our Team Is Completely At Your Disposal.
        </h1>

        <p>
          Duis vestibulum elit vel neque pharetra vulputate.
          Quisque scelerisque nisi
          <br className="contact-intro-desktop-break" />
          <span>
            urna. Duis rutrum non risus in imperdiet.
          </span>
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section
        className="contact-cards"
        aria-label="Contact information"
      >
        {/* SOCIAL MEDIA */}
        <article className="contact-card social-media-card">
          <div className="contact-card-icon social-media-logo">
            <img
              src="/contact-social-icon.png"
              alt=""
              className="social-media-image"
            />
          </div>

          <h2>Social Media</h2>

          <div className="social-links">
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              WhatsApp
            </a>

            <a
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              Instagram
            </a>

            <a
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              Facebook
            </a>

            <a
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              You Tube
            </a>
          </div>
        </article>

        {/* EMAIL */}
        <article className="contact-card">
          <div className="contact-card-icon">
            <FaEnvelope aria-hidden="true" />
          </div>

          <h2>Our Email</h2>

          <div className="contact-card-links">
            <a href="mailto:public@news.com">
              public@news.com
            </a>

            <a href="mailto:info@publicnews.com">
              info@publicnews.com
            </a>
          </div>
        </article>

        {/* PHONE */}
        <article className="contact-card">
          <div className="contact-card-icon">
            <FaPhone aria-hidden="true" />
          </div>

          <h2>Our Phone Number</h2>

          <div className="contact-card-links">
            <a href="tel:+2681428413">
              (268)142-8413
            </a>

            <a href="tel:+7602652917">
              (760)265-2917
            </a>
          </div>
        </article>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="contact-form-section">
        {/* LEFT IMAGE */}
        <div className="contact-form-image">
          <img
            src="/contact-woman.png"
            alt="Woman speaking through a megaphone"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-wrapper">
          <h2>
            We Are Available For You At Any Time
          </h2>

          <p className="contact-form-description">
            Need assistance? We will contact you when you complete the following form!
          </p>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* NAME */}
            <div className="form-field form-name">
              <label htmlFor="contact-name">
                Your Name *
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
              />

              {errors.name && (
                <span
                  id="contact-name-error"
                  className="form-error"
                >
                  {errors.name}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="form-field form-email">
              <label htmlFor="contact-email">
                Your Email Address *
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />

              {errors.email && (
                <span
                  id="contact-email-error"
                  className="form-error"
                >
                  {errors.email}
                </span>
              )}
            </div>

            {/* TOPIC */}
            <div className="form-field form-topic">
              <label htmlFor="contact-topic">
                Topic *
              </label>

              <input
                id="contact-topic"
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                aria-invalid={Boolean(errors.topic)}
                aria-describedby={
                  errors.topic ? "contact-topic-error" : undefined
                }
              />

              {errors.topic && (
                <span
                  id="contact-topic-error"
                  className="form-error"
                >
                  {errors.topic}
                </span>
              )}
            </div>

            {/* MESSAGE */}
            <div className="form-field form-message">
              <label htmlFor="contact-message">
                Your Message *
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />

              {errors.message && (
                <span
                  id="contact-message-error"
                  className="form-error"
                >
                  {errors.message}
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="contact-submit-button"
            >
              CONTACT US
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;