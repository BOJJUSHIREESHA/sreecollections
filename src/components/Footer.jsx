import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaGoogle,
  FaWhatsapp,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import logoImage from "../assets/logo-1.png";
import sreecollectionsImage from "../assets/sreecollections.png";

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="site-footer-container">

        {/* =====================================================
            FOOTER MAIN
        ====================================================== */}

        <div className="site-footer-main">

          {/* =========================
              LOGO
          ========================== */}

          <Link to="/" className="site-footer-brand">

            <img
              src={logoImage}
              alt="Sree Collections logo"
              className="site-footer-logo-icon"
            />

            <img
              src={sreecollectionsImage}
              alt="Sree Collections"
              className="site-footer-logo-wordmark"
            />

          </Link>


          {/* =========================
              CONTACT INFORMATION
          ========================== */}

          <div className="site-footer-info">

            {/* LOCATION */}

            <div className="site-footer-info-row">

              <FaLocationDot />

              <span>
                345 Faulconer Drive, Suite 4 •
                Charlottesville, VA 12345
              </span>

            </div>


            {/* PHONE + EMAIL */}

            <div className="site-footer-info-row">

              <a
                href="tel:+19526830741"
                className="footer-phone-icon"
                aria-label="Call Sree Collections"
              >
                <FaPhone />
              </a>

              <a href="tel:+19526830741">
                +19526830741
              </a>


              <a
                href="mailto:Sreecollections007@gmail.com"
                className="footer-email-icon"
                aria-label="Email Sree Collections"
              >
                <FaEnvelope />
              </a>

              <a href="mailto:Sreecollections007@gmail.com">
                Sreecollections007@gmail.com
              </a>

            </div>


            {/* =========================
                SOCIAL MEDIA
            ========================== */}

            <div className="site-footer-social">

              <span>Social Media</span>


              {/* FACEBOOK */}

              <a
                href="#"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>


              {/* YOUTUBE */}

              <a
                href="#"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/sreecollections007"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>


              {/* GOOGLE */}

              <a
                href="#"
                aria-label="Google"
              >
                <FaGoogle />
              </a>


              {/* WHATSAPP */}

              <a
                href="https://wa.me/19526830741"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER BOTTOM
        ====================================================== */}

        <div className="site-footer-bottom">

          {/* BOTTOM NAVIGATION */}

          <nav className="site-footer-links">

            <Link to="/about">
              ABOUT US
            </Link>

            <Link to="/contact">
              CONTACT US
            </Link>

            <Link to="/categories">
              CATEGORY
            </Link>

            <span>
              PRIVACY POLICY
            </span>

            <span>
              TERMS &amp; CONDITIONS
            </span>

          </nav>


          {/* COPYRIGHT */}

          <p>
            Copyright © 2026 • kitsacitsolutions
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;