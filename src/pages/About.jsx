import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
} from "react-icons/fa6";

import introImage1 from "../assets/about-intro-1.png";
import introImage2 from "../assets/about-intro-2.png";
import fashionImage from "../assets/about-fashion.png";
import jewelleryImage from "../assets/about-jewellery.png";
import decorImage from "../assets/about-decor.png";

import "./About.css";

function About() {

  /* =====================================================
     FIGMA RESPONSIVE SCALING

     MASTER FIGMA CANVAS:
     1728 × 5200

     The complete About composition scales
     proportionally from the Figma canvas.
  ===================================================== */

  useEffect(() => {
    const updateFigmaScale = () => {
      const FIGMA_WIDTH = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;

      /*
        Keep the original Figma size on screens
        at or above 1728px.

        Below 1728px, scale the complete design
        proportionally.
      */

      const scale = Math.min(
        1,
        viewportWidth / FIGMA_WIDTH
      );

      document.documentElement.style.setProperty(
        "--about-figma-scale",
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
        "--about-figma-scale"
      );
    };
  }, []);

  /* =====================================================
     COLLECTION DATA
  ===================================================== */

  const fashionItems = [
    "Sarees",
    "Silk & Kanchipuram Sarees",
    "Banarasi & Pochampally Sarees",
    "Cotton & Fancy Sarees",
    "Lehengas & Half Sarees",
    "Salwar Suits & Kurtis",
    "Designer & Ready-to-Wear Blouses",
    "Indo-Western Wear",
    "Men’s Traditional Wear",
    "Kids’ Ethnic Wear",
  ];

  const jewelleryItems = [
    "Temple Jewellery",
    "Bridal Jewellery",
    "Gold-Look & Traditional Jewellery",
    "Bangles",
    "Jhumkas & Earrings",
    "Necklaces & Harams",
    "Maang Tikkas",
    "Hair Accessories",
    "Traditional & Fashion Accessories",
  ];

  const decorItems = [
    "Traditional Indian Home Décor",
    "Pooja & Festival Décor",
    "Wedding Décor Items",
    "Torans & Door Hangings",
    "Decorative Diyas",
    "Flower & Floral Décor",
    "Traditional Decorative Pieces",
    "Gift & Return-Gift Items",
    "Festive & Cultural Décor",
  ];

  return (
    <main className="about-page">

      {/* =================================================
          ABOUT INTRO
      ================================================= */}

      <section className="about-intro about-container">

        {/* ================= TITLE ================= */}

        <div className="about-title">

          <h1>
            About{" "}
            <span>Sree Collections</span>
          </h1>

          <div className="about-title-line" />

          <p>
            Where Tradition Meets Elegance
          </p>

        </div>


        {/* ================= INTRO LAYOUT ================= */}

        <div className="intro-layout">

          {/* ================= LEFT ================= */}

          <div className="intro-left">

            <Link
              to="/contact"
              className="contact-button"
            >
              <span>Contact Us</span>

              <FaArrowRight />
            </Link>

            <p className="intro-description">
              From beautiful sarees and ethnic wear to
              traditional jewellery and decorative pieces,
              our collections are thoughtfully selected for
              weddings, festivals, cultural celebrations,
              parties, gifting, and everyday occasions.
            </p>

          </div>


          {/* ================= RIGHT ================= */}

          <div className="intro-right">

            <p className="welcome-text">
              Welcome to Sree Collections, your destination
              for beautiful Indian fashion, jewellery, and
              traditional décor. We bring together timeless
              designs and modern styles to help you celebrate
              your special moments with elegance and charm.
            </p>


            {/* ================= IMAGES ================= */}

            <div className="intro-image-area">

              <img
                src={introImage2}
                alt="Traditional celebration"
                className="intro-image-one"
              />

              <img
                src={introImage1}
                alt="Celebration collection"
                className="intro-image-two"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          OUR COLLECTIONS
      ================================================= */}

      <section className="collections about-container">

        {/* ================= SECTION HEADING ================= */}

        <div className="section-heading">

          <h2>
            Our Collections
          </h2>

          <span />

        </div>


        {/* =================================================
            INDIAN FASHION
        ================================================= */}

        <div className="collection-row">

          <div className="collection-content">

            <h3>
              Indian Fashion
            </h3>

            <div className="gold-line" />

            <ul>
              {fashionItems.map((item) => (
                <li key={item}>
                  * {item}
                </li>
              ))}
            </ul>

            <Link
              to="/categories?category=sarees"
              className="shop-now"
            >
              SHOP NOW
            </Link>

          </div>


          <div className="collection-image">

            <img
              src={fashionImage}
              alt="Indian Fashion"
            />

          </div>

        </div>


        {/* =================================================
            INDIAN JEWELLERY
        ================================================= */}

        <div className="collection-row jewellery-row">

          <div className="collection-image">

            <img
              src={jewelleryImage}
              alt="Indian Jewellery"
            />

          </div>


          <div className="collection-content jewellery-content">

            <h3>
              Indian Jewellery &<br />
              Accessories
            </h3>

            <div className="gold-line" />

            <ul>
              {jewelleryItems.map((item) => (
                <li key={item}>
                  * {item}
                </li>
              ))}
            </ul>

            <Link
              to="/categories?category=one-gram-jewellery"
              className="shop-now"
            >
              SHOP NOW
            </Link>

          </div>

        </div>


        {/* =================================================
            INDIAN DECOR
        ================================================= */}

        <div className="collection-row decor-row">

          <div className="collection-content">

            <h3>
              Indian Decor & Celebration
            </h3>

            <div className="gold-line" />

            <ul>
              {decorItems.map((item) => (
                <li key={item}>
                  * {item}
                </li>
              ))}
            </ul>

            <Link
              to="/categories?category=decorative-items"
              className="shop-now"
            >
              SHOP NOW
            </Link>

          </div>


          <div className="collection-image">

            <img
              src={decorImage}
              alt="Indian Decor and Celebration"
            />

          </div>

        </div>

      </section>


      {/* =================================================
          OUR PROMISE
      ================================================= */}

      <section className="promise about-container">

        <div className="section-heading">

          <h2>
            Our Promise
          </h2>

          <span />

        </div>


        <div className="promise-content">

          <p>
            At Sree Collections, we believe Indian tradition
            is beautiful, meaningful, and meant to be
            celebrated. We carefully select our products
            with a focus on quality, elegance, traditional
            beauty, and affordability.
          </p>

          <p>
            Whether you’re searching for a stunning saree,
            beautiful Indian jewellery, a thoughtful gift,
            or traditional décor for your home or celebration,
            we hope to make your shopping experience special
            and memorable.
          </p>

        </div>

      </section>

    </main>
  );
}

export default About;