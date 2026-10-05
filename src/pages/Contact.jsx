import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import "./Contact.css";

const Contact = () => {
  /* =====================================================
     FORM STATE
  ===================================================== */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  /* =====================================================
     FIGMA RESPONSIVE SCALE
  ===================================================== */

  useEffect(() => {
    const updateContactScale = () => {
      const FIGMA_WIDTH = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;

      const scale = Math.min(
        1,
        viewportWidth / FIGMA_WIDTH
      );

      document.documentElement.style.setProperty(
        "--contact-figma-scale",
        scale.toString()
      );
    };

    updateContactScale();

    window.addEventListener(
      "resize",
      updateContactScale
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateContactScale
      );

      document.documentElement.style.removeProperty(
        "--contact-figma-scale"
      );
    };
  }, []);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     HANDLE SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      formData.topic || "Contact Inquiry"
    );

    const body = encodeURIComponent(
      `Name: ${formData.name}\n\n` +
        `Email: ${formData.email}\n\n` +
        `Topic: ${formData.topic}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href =
      `mailto:Sreecollections007@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="contact-intro">

        <h1>
          For Any Inquiries, Our Team Is Completely At Your
          Disposal.
        </h1>

        <p>
         Duis vestibulum elit vel neque pharetra vulputate. Quisque scelerisque nibh urna.
Duis rutrum non risus in imperdiet.
        </p>

      </section>


      {/* =====================================================
          CONTACT CARDS
      ===================================================== */}

      <section className="contact-cards">

        {/* ===================================================
            SOCIAL MEDIA CARD
        =================================================== */}

        <div className="contact-card social-media-card">

          <div className="social-media-logo">

            <img
              src="/contact-social-icon.png"
              alt="Social Media"
              className="social-media-image"
            />

          </div>

          <h2>Social Media</h2>

          <div className="social-links">

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              WhatsApp
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Instagram
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Facebook
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              You Tube
            </a>

          </div>

        </div>


        {/* ===================================================
            EMAIL CARD
        =================================================== */}

        <div className="contact-card">

          <div className="contact-card-icon">

            <FaEnvelope />

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

        </div>


        {/* ===================================================
            PHONE CARD
        =================================================== */}

        <div className="contact-card">

          <div className="contact-card-icon">

            <FaPhone />

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

        </div>

      </section>


      {/* =====================================================
          FORM SECTION
      ===================================================== */}

      <section className="contact-form-section">

        {/* ===================================================
            LEFT IMAGE
        =================================================== */}

        <div className="contact-form-image">

          <img
            src="/contact-woman.png"
            alt="Contact"
          />

        </div>


        {/* ===================================================
            RIGHT FORM
        =================================================== */}

        <div className="contact-form-wrapper">

          <h2>
            We Are Available For You At Any Time
          </h2>

          <p className="contact-form-description">
           Need assistance? We will contact you when you complete the following form!
          </p>


          <form onSubmit={handleSubmit}>

            {/* ===============================================
                NAME
            =============================================== */}

            <div className="form-field form-name">

              <label htmlFor="contact-name">
                Your Name
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />

            </div>


            {/* ===============================================
                EMAIL
            =============================================== */}

            <div className="form-field form-email">

              <label htmlFor="contact-email">
                Your Email
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />

            </div>


            {/* ===============================================
                TOPIC
            =============================================== */}

            <div className="form-field form-topic">

              <label htmlFor="contact-topic">
                Topic
              </label>

              <input
                id="contact-topic"
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Topic"
              />

            </div>


            {/* ===============================================
                MESSAGE
            =============================================== */}

            <div className="form-field form-message">

              <label htmlFor="contact-message">
                Your Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
              />

            </div>


            {/* ===============================================
                SUBMIT
            =============================================== */}

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

