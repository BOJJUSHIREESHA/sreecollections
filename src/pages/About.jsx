import { Link } from "react-router-dom";

import introImage1 from "../assets/about-intro-1.png";
import introImage2 from "../assets/about-intro-2.png";
import fashionImage from "../assets/about-fashion.png";
import jewelleryImage from "../assets/about-jewellery.png";
import decorImage from "../assets/about-decor.png";

import "./About.css";

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

function CollectionList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ShopButton({ category }) {
  return (
    <Link
      to={`/categories?category=${category}`}
      className="about-shop-button"
    >
      <span>SHOP NOW</span>
    </Link>
  );
}

function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        {/* INTRODUCTION */}
        <section className="about-intro">
          <div className="about-title">
            <h1>
              <span className="about-title-main">About</span>
              <span className="about-title-brand">
                Sree Collections
              </span>
            </h1>

            <div className="about-title-line" />

            <p className="about-subtitle">
              Where Tradition Meets Elegance
            </p>
          </div>

          <div className="intro-layout">
            <div className="intro-left">
              <div className="intro-image-area">
                <img
                  className="intro-image-one"
                  src={introImage1}
                  alt="Traditional Indian celebration décor"
                />

                <img
                  className="intro-image-two"
                  src={introImage2}
                  alt="Colourful celebration accessories"
                />
              </div>

              <p className="intro-description">
                From beautiful sarees and ethnic wear to
                traditional jewellery and decorative pieces,
                our collections are thoughtfully selected for
                weddings, festivals, cultural celebrations,
                parties, gifting, and everyday occasions.
              </p>
            </div>

            <div className="intro-right">
              <p className="welcome-text">
                Welcome to Sree Collections, your destination
                for beautiful Indian fashion, jewellery, and
                traditional décor. We bring together timeless
                designs and modern styles to help you celebrate
                your special moments with elegance and charm.
              </p>

              <Link
                to="/contact"
                className="about-contact-button"
              >
                <span>Contact Us</span>

                <svg
                  className="about-contact-arrow"
                  viewBox="0 0 34 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7H32M25 1L32 7L25 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section className="about-collections">
          <div className="about-section-heading">
            <h2>Our Collections</h2>
            <span />
          </div>

          <div className="collection-row fashion-row">
            <div className="collection-content fashion-content">
              <h3>Indian Fashion</h3>
              <CollectionList items={fashionItems} />
              <ShopButton category="indian-fashion" />
            </div>

            <div className="collection-image fashion-image">
              <img
                src={fashionImage}
                alt="Black and gold traditional Indian saree"
              />
            </div>
          </div>

          <div className="collection-row jewellery-row">
            <div className="collection-image jewellery-image">
              <img
                src={jewelleryImage}
                alt="Traditional Indian jewellery collection"
              />
            </div>

            <div className="collection-content jewellery-content">
              <h3>Indian Jewellery &amp; Accessories</h3>
              <CollectionList items={jewelleryItems} />
              <ShopButton category="indian-jewellery" />
            </div>
          </div>

          <div className="collection-row decor-row">
            <div className="collection-content decor-content">
              <h3>Indian Decor &amp; Celebration</h3>
              <CollectionList items={decorItems} />
              <ShopButton category="indian-decor" />
            </div>

            <div className="collection-image decor-image">
              <img
                src={decorImage}
                alt="Indian celebration and decorative items"
              />
            </div>
          </div>
        </section>

        {/* PROMISE */}
        <section className="promise">
          <div className="about-section-heading promise-heading">
            <h2>Our Promise</h2>
            <span />
          </div>

          <div className="promise-content">
            <p>
              At Sree Collections, we believe Indian tradition
              is beautiful, meaningful, and meant to be
              celebrated. We carefully select our products with
              a focus on quality, elegance, traditional beauty,
              and affordability.
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
      </div>
    </main>
  );
}

export default About;
