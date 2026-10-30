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
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-top-line" />

        <div className="site-footer-main">
          
<Link to="/" className="site-footer-brand" aria-label="Sree Collections home">
  <span className="site-footer-logo-icon">
    <img src={logoImage} alt="" />
  </span>

  <span className="site-footer-logo-wordmark">
    <img src={logoImage} alt="Sree Collections" />
  </span>
</Link>


          <div className="site-footer-info">
            <div className="site-footer-info-row site-footer-location">
              <FaLocationDot className="footer-location-icon" />
              <span>
                345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
              </span>
            </div>

            <div className="site-footer-info-row site-footer-contact-row">
              <a
                href="tel:+19526830741"
                className="footer-contact-icon"
                aria-label="Call Sree Collections"
              >
                <FaPhone />
              </a>

              <a href="tel:+19526830741" className="footer-phone">
                +19526830741
              </a>

              <a
                href="mailto:Sreecollections007@gmail.com"
                className="footer-contact-icon footer-email-icon"
                aria-label="Email Sree Collections"
              >
                <FaEnvelope />
              </a>

              <a
                href="mailto:Sreecollections007@gmail.com"
                className="footer-email"
              >
                Sreecollections007@gmail.com
              </a>
            </div>

            <div className="site-footer-social">
              <span className="site-footer-social-label">Social Media</span>

              <div className="site-footer-social-icons">
                <a href="#" aria-label="Facebook">
                  <FaFacebookF />
                </a>

                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>

                <a
                  href="https://www.instagram.com/sreecollections007"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a href="#" aria-label="Google">
                  <FaGoogle />
                </a>

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
        </div>

        <div className="site-footer-bottom-line" />

        <div className="site-footer-bottom">
          <nav className="site-footer-links" aria-label="Footer navigation">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">CONTACT US</Link>
            <Link to="/categories">CATEGORY</Link>
            <span>PRIVACY POLICY</span>
            <span>TERMS &amp; CONDITIONS</span>
          </nav>

          <p className="site-footer-copyright">
            Copyright © 2026 • kitsacitsolutions
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
