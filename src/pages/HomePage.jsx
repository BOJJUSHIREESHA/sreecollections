import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import {
  FaArrowRight,
  FaCartShopping,
  FaWhatsapp,
  FaCheck
} from "react-icons/fa6";

import fashionImage from "../assets/home/hero-fashion.png";
import jewelleryImage from "../assets/home/hero-jewellery.png";
import sareeImage from "../assets/home/hero-saree-1.png";
import heroGoldVector from "../assets/home/Vector.png";





import featured1 from "../assets/home/featured-1.png";
import featured2 from "../assets/home/featured-2.png";
import featured3 from "../assets/home/featured-3.png";
import featured4 from "../assets/home/featured-4.png";
import featured5 from "../assets/home/featured-5.png";
import featured6 from "../assets/home/featured-6.png";
import featured7 from "../assets/home/featured-7.png";


import jeansImage from "../assets/home/jeans.png";
import sareeStyleImage from "../assets/home/saree-style.png";
import collectionJewelleryImage from "../assets/home/jewellery.png";
import willBearImage from "../assets/home/will-bear.png";
import joggerImage from "../assets/home/jogger.png";
import decorativeStyleImage from "../assets/home/decorative-items.png";

import yourStyleImage from "../assets/home/your-style.png";
import yourRulesImage from "../assets/home/your-rules.png";

import casual1 from "../assets/home/casual-1.png";
import casual2 from "../assets/home/casual-2.png";
import casual3 from "../assets/home/casual-3.png";

import saree1 from "../assets/home/saree-1.png";
import saree2 from "../assets/home/saree-2.png";

import decorative1 from "../assets/home/decorative-1.png";
import decorative2 from "../assets/home/decorative-2.png";

import whatsappBanner from "../assets/home/whatsapp.png";

import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
const WHATSAPP_NUMBER = "19526830741";

function HomePage() {
const testimonials = [
  {
    review:
      "Ladies vibe provided me the exact quality product I wanted. I'm very much satisfied by their quick delivery process. They delivered my dress within a day.",
    name: "Jane Bennet",
    role: "Fashion Model",
  },
  {
    review:
      "I really loved the quality of the product. The design was beautiful and the delivery was very quick. I am completely satisfied with my purchase.",
    name: "Sophia Williams",
    role: "Fashion Designer",
  },
  {
    review:
      "The collection was exactly what I was looking for. The product quality was excellent and the entire shopping experience was smooth and easy.",
    name: "Emma Watson",
    role: "Customer",
  },
  {
    review:
      "Beautiful products, excellent quality and fast delivery. I would definitely shop again because the service was very convenient.",
    name: "Olivia Bennett",
    role: "Fashion Blogger",
  },
];

const [testimonialIndex, setTestimonialIndex] = useState(0);

const currentTestimonial = testimonials[testimonialIndex];

const handlePreviousTestimonial = () => {
  setTestimonialIndex((current) =>
    current === 0 ? testimonials.length - 1 : current - 1
  );
};

const handleNextTestimonial = () => {
  setTestimonialIndex((current) =>
    current === testimonials.length - 1 ? 0 : current + 1
  );
};


/* ============================================================
   FEATURED COLLECTION CAROUSEL
============================================================ */

const featuredItems = [
  {
    id: "featured-1",
    image: featured1,
    name: "Decorative collection",
    alt: "Decorative collection",
    link: "/categories?category=decorative-items",
  },

  {
    id: "featured-2",
    image: featured2,
    name: "Saree collection",
    alt: "Saree collection",
    link: "/categories?category=sarees",
  },

  {
    id: "featured-3",
    image: featured3,
    name: "Casual wear collection",
    alt: "Casual wear collection",
    link: "/categories?category=casual-wear",
  },

  {
    id: "featured-4",
    image: featured4,
    name: "Featured fashion collection",
    alt: "Featured fashion collection",
    link: "/categories",
  },

  {
    id: "featured-5",
    image: featured5,
    name: "Jewellery collection",
    alt: "Jewellery collection",
    link: "/categories?category=one-gram-jewellery",
  },

  {
    id: "featured-6",
    image: featured6,
    name: "Formal collection",
    alt: "Formal collection",
    link: "/categories?category=casual-wear",
  },

  {
    id: "featured-7",
    image: featured7,
    name: "Decorative items",
    alt: "Decorative items",
    link: "/categories?category=decorative-items",
  },
];


/* ============================================================
   CURRENT MAIN IMAGE

   featured4 starts as the MAIN image.
   Array index of featured4 = 3.
============================================================ */

const [activeFeaturedIndex, setActiveFeaturedIndex] =
  useState(3);


/* ============================================================
   FEATURED COLLECTION SWIPE STATE
============================================================ */

const featuredPointerStartRef = useRef(0);

const hasDraggedRef = useRef(false);

const [isDragging, setIsDragging] = useState(false);


/* ============================================================
   DETERMINE CARD POSITION

   1 = far left
   2 = left
   3 = left-middle
   4 = MAIN
   5 = right-middle
   6 = right
   7 = far right
============================================================ */

const getFeaturedSlot = (itemIndex) => {

  let difference =
    itemIndex - activeFeaturedIndex;


  /*
    Keep the difference inside
    the seven-card circular range.
  */

  if (difference > 3) {
    difference -= 7;
  }

  if (difference < -3) {
    difference += 7;
  }


  return difference + 4;
};


/* ============================================================
   NEXT FEATURED IMAGE
============================================================ */

const nextFeaturedImage = () => {

  setActiveFeaturedIndex((current) => {

    return (
      (current + 1) %
      featuredItems.length
    );

  });

};


/* ============================================================
   PREVIOUS FEATURED IMAGE
============================================================ */

const previousFeaturedImage = () => {

  setActiveFeaturedIndex((current) => {

    return (
      (current - 1 + featuredItems.length) %
      featuredItems.length
    );

  });

};


/* ============================================================
   POINTER DOWN
============================================================ */

const handleFeaturedPointerDown = (event) => {

  if (event.isPrimary === false) {
    return;
  }


  featuredPointerStartRef.current =
    event.clientX;

  hasDraggedRef.current = false;

  setIsDragging(true);

};


/* ============================================================
   POINTER MOVE
============================================================ */

const handleFeaturedPointerMove = (event) => {

  if (!isDragging) {
    return;
  }


  const currentX =
    event.clientX;


  const difference =
    currentX -
    featuredPointerStartRef.current;


  /*
    Ignore tiny movements.
  */

  if (Math.abs(difference) < 20) {
    return;
  }


  /*
    The user actually dragged.
  */

  hasDraggedRef.current = true;


  /*
    Swipe LEFT
    → next image becomes MAIN.
  */

  if (difference < 0) {

    nextFeaturedImage();

  }


  /*
    Swipe RIGHT
    → previous image becomes MAIN.
  */

  else {

    previousFeaturedImage();

  }


  /*
    Reset the starting point so one
    drag does not rotate everything.
  */

  featuredPointerStartRef.current =
    currentX;

};


/* ============================================================
   POINTER UP
============================================================ */

const handleFeaturedPointerUp = () => {

  setIsDragging(false);


  /*
    Give the Link click handler time
    to detect that this was a swipe.
  */

  window.setTimeout(() => {

    hasDraggedRef.current = false;

  }, 100);

};


/* ============================================================
   ADD FEATURED PRODUCT TO EXISTING CART
============================================================ */

const addFeaturedProductToCart = (item) => {
  if (!item) {
    return;
  }

  const CART_KEY = "sreecollections-cart";

  let cart = [];

  try {
    const savedCart = localStorage.getItem(CART_KEY);

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        cart = parsedCart;
      }
    }
  } catch (error) {
    console.error("Unable to read cart:", error);
    cart = [];
  }


  /* ==========================================================
     PRODUCT INFORMATION
  ========================================================== */

  const product = {
    id: item.id,
    name: item.alt,
    image: item.image,
    price: 120.25,

    /*
      Default values because Featured Collection
      does not have size/colour selectors.
    */
    size: "M",
    colour: "Default",

    quantity: 1,
  };


  /* ==========================================================
     CHECK IF PRODUCT ALREADY EXISTS
  ========================================================== */

  const existingIndex = cart.findIndex(
    (cartItem) =>
      cartItem.id === product.id &&
      cartItem.size === product.size &&
      cartItem.colour === product.colour
  );


  if (existingIndex !== -1) {

    /*
      Product already exists.
      Increase quantity.
    */

    cart[existingIndex] = {
      ...cart[existingIndex],
      quantity:
        Number(cart[existingIndex].quantity || 0) + 1,
    };

  } else {

    /*
      Product does not exist.
      Add it to cart.
    */

    cart.push(product);

  }


  /* ==========================================================
     SAVE TO SAME CART USED BY CARTDRAWER
  ========================================================== */

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );


  /* ==========================================================
     UPDATE CARTDRAWER

     IMPORTANT:
     This event ONLY tells CartDrawer that the cart changed.

     It DOES NOT open the drawer.
  ========================================================== */

  window.dispatchEvent(
    new Event("sreecollections-cart-updated")
  );


  /* ==========================================================
     OPTIONAL SUCCESS MESSAGE
  ========================================================== */

  console.log(
    `${product.name} added to cart`
  );
};


  return (
    <main className="home-page">

      
     {/* =========================================================
    HERO SECTION
========================================================= */}

<section className="hero-section">


 

    
  {/* =======================================================
      HERO HEADING
  ======================================================= */}

  <div className="hero-heading">

    <div className="hero-title">

      <h1>

        <span className="hero-title-line-one">

          <span className="hero-title-before-symbol">
            Dive Into A W
          </span>

          {/* =================================================
              EXACT GOLD FIGMA VECTOR
          ================================================= */}

          <span className="gold-symbol">

            <img
              src={heroGoldVector}
              alt=""
              className="gold-symbol-vector"
            />

          </span>

          <span className="hero-title-after-symbol">
            rld Of Endless
          </span>

        </span>


        <span className="hero-title-line-two">
          Fashion Possibilities
        </span>

      </h1>

    </div>


    {/* =====================================================
        HERO DESCRIPTION
    ===================================================== */}

    <div className="hero-description">

      <p>
        Elevate your wardrobe with our fashion finds. Discover
        <br />
        Your Signature Style At Fashion Avenue.
      </p>

    </div>

  </div>


  {/* =======================================================
      HERO MAIN FRAME
  ======================================================= */}

  <div className="hero-grid">


    {/* =====================================================
        LEFT FASHION CARD

        Figma:
        402 × 506
        X = 222
        Y = 314
    ===================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="hero-left-card"
    >

      <img
        src={fashionImage}
        alt="Fashion collection"
      />

    </Link>


    {/* =====================================================
        CENTER COLUMN
    ===================================================== */}

    <div className="hero-center">


      {/* ===================================================
          CENTER NOTCHED BUTTON AREA
      =================================================== */}

      <div className="hero-notch">


        {/* ================================================
            SHOP NOW

            Figma:
            416 × 56
        ================================================ */}

        <Link
          to="/categories"
          className="hero-shop-button"
        >

          <span>
            SHOP NOW
          </span>

          <span className="hero-button-arrow">

            <span></span>

            <FaArrowRight />

          </span>

        </Link>


        {/* ================================================
            EXPLORE MORE PRODUCTS

            Figma:
            416 × 56
            Gap = 18px
        ================================================ */}

        <Link
          to="/categories"
          className="hero-products-button"
        >
          EXPLORE MORE PRODUCTS
        </Link>

      </div>


      {/* ===================================================
          JEWELLERY CARD

          Figma:
          Width  = 432
          Height = 331
          X      = 644
          Y      = 489
      =================================================== */}

      <Link
        to="/categories?category=one-gram-jewellery"
        className="hero-jewellery-card"
      >

        <img
          src={jewelleryImage}
          alt="One gram jewellery collection"
        />


        {/* ================================================
            JEWELLERY INFORMATION
        ================================================ */}

        <div className="jewellery-overlay">


          {/* ==============================================
              TRENDING

              Figma:
              78 × 24
          ============================================== */}

          <div className="jewellery-trending-frame">

            <span className="jewellery-trending">
              TRENDING
            </span>

          </div>


          {/* ==============================================
              AWESOME COLLECTION

              Figma:
              99 × 77
          ============================================== */}

          <p>
            Awesome
            <br />
            <strong>
              Collection
            </strong>
          </p>

        </div>


        {/* ================================================
            VIEW ALL

            Figma:
            Text 46 × 15
            Circle 22.25 × 22.25
        ================================================ */}

        <span className="jewellery-view-all">

          <span>
            View All
          </span>

          <b>
            ↗
          </b>

        </span>

      </Link>

    </div>


   {/* =====================================================
    RIGHT SAREE COMPOSITION
===================================================== */}

<div
  className="hero-right-composition"
  style={{
    "--hero-saree-image": `url(${sareeImage})`,
  }}
>

  {/* ===================================================
      MAIN SAREE BLOCK
      Figma: 402 × 227
  =================================================== */}

  <Link
    to="/categories?category=sarees"
    className="hero-saree-block hero-saree-main"
    aria-label="Saree collection"
  />


  {/* ===================================================
      PRICE ROW
      Figma:
      161 × 80
      11px gap
      230 × 80
  =================================================== */}

  <div className="hero-product-row hero-price-row">

    <div className="hero-saree-block hero-row-left">

      <span className="hero-price-text">
  <span className="hero-price-currency">$</span>
  <span className="hero-price-number">480</span>
</span>

    </div>

    <div className="hero-saree-block hero-row-right" />

  </div>


  {/* ===================================================
      GUCCI ROW
      Figma:
      274 × 80
      11px gap
      117 × 80
  =================================================== */}

  <div className="hero-product-row hero-gucci-row">

    <div className="hero-saree-block hero-row-left hero-gucci-left">

      <span className="hero-gucci-text">
        Gucci Formal Set
      </span>

    </div>

    <div className="hero-saree-block hero-row-right" />

  </div>


  {/* ===================================================
      BOTTOM ROW
      Figma:
      161 × 80
      11px gap
      233 × 80
  =================================================== */}

  <div className="hero-product-row hero-bottom-row">

    <div className="hero-saree-block hero-row-left" />

    <div className="hero-saree-block hero-row-right">

      <span className="hero-bottom-arrow">

        <span className="hero-arrow-line"></span>

        <FaArrowRight />

      </span>

    </div>

  </div>

</div>
</div>

</section>



{/* ============================================================
    FEATURED COLLECTION
============================================================ */}

<section className="home-featured">

  <div className="home-section-heading">
    <h2>Featured Collection</h2>
  </div>

  <div
    className={`home-featured-showcase ${
      isDragging ? "is-dragging" : ""
    }`}
    onPointerDown={handleFeaturedPointerDown}
    onPointerMove={handleFeaturedPointerMove}
    onPointerUp={handleFeaturedPointerUp}
    onPointerCancel={handleFeaturedPointerUp}
    onPointerLeave={handleFeaturedPointerUp}
  >

    {featuredItems.map((item, index) => {

      const slot = getFeaturedSlot(index);

      const isMain = slot === 4;

      return (
        <Link
          key={item.id}
          to={item.link}
          className={`home-featured-card featured-slot-${slot} ${
  isMain ? "is-main" : ""
} ${item.id === "featured-3" ? "featured-three-card" : ""}`}
          draggable={false}
          onClick={(e) => {

            /*
              Do not navigate while the user is swiping.
            */
            if (hasDraggedRef.current) {
              e.preventDefault();
            }

          }}
        >

          <img
            src={item.image}
            alt={item.alt}
            draggable={false}
          />

          {/* ==================================================
              MAIN CARD INFORMATION
          ================================================== */}

          {isMain && (
            <>
              <span className="featured-new-badge">
                NEW
              </span>

              <span className="featured-edition">
                Formal Edition
              </span>

              <span className="featured-price">
                <small>
                  Start From
                </small>

                <strong>
                  120.25USD
                </strong>
              </span>
            </>
          )}

        </Link>
      );
    })}


    {/* ========================================================
        CART BUTTON

        IMPORTANT:
        This DOES NOT open the CartDrawer.

        It adds the currently displayed MAIN product
        to the cart.
    ======================================================== */}

    <button
      type="button"
      className="home-featured-cart"
      aria-label="Add featured product to cart"
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {

        e.preventDefault();
        e.stopPropagation();

        addFeaturedProductToCart(
          featuredItems[activeFeaturedIndex]
        );

      }}
    >
      <FaCartShopping />
    </button>

  </div>

</section>

      {/* =====================================================
    WHY CHOOSE SREE COLLECTIONS
===================================================== */}

<section className="why-choose-section">

  {/* =========================
      SECTION HEADING
  ========================== */}

  <div className="why-choose-heading">

    <h2>
      Why Choose SREE Collections
    </h2>

  </div>


  {/* =========================
      THREE BENEFITS
  ========================== */}

  <div className="why-choose-grid">


    {/* =========================
        100% COTTON
    ========================== */}

    <div className="why-choose-item why-choose-cotton">

      <div className="why-choose-icon why-icon-cotton">
        <span>🍀</span>
      </div>

      <h3>
        100% Cotton
      </h3>

      <p>
        Premium quality natural cotton fabric
      </p>

    </div>


    {/* =========================
        FREE SHIPPING
    ========================== */}

    <div className="why-choose-item why-choose-shipping">

      <div className="why-choose-icon why-icon-shipping">
        <span>🚚</span>
      </div>

      <h3>
        Free Shipping
      </h3>

      <p>
        On Orders above $499
      </p>

    </div>


    {/* =========================
        EASY RETURNS
    ========================== */}

    <div className="why-choose-item why-choose-returns">

      <div className="why-choose-icon why-icon-returns">
        <span>↩</span>
      </div>

      <h3>
        Easy Returns
      </h3>

      <p>
        7-day return policy
      </p>

    </div>

  </div>

</section>
{/* ============================================================
    STYLE COLLECTION
============================================================ */}

<section className="style-collection">

  {/* ==========================================================
      TOP SECTION
  ========================================================== */}

  <div className="style-top-section">

    {/* ========================================================
        LEFT — JEANS
    ======================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="style-top-split-card style-jeans-card"
    >

      <div className="style-top-text">
        <span>MOST WANTED</span>
        <strong>Jeans</strong>
      </div>

      <div className="style-top-image">
        <img
          src={jeansImage}
          alt="Most Wanted Jeans"
        />
      </div>

    </Link>


    {/* ========================================================
        LEFT — SAREE / SHIRTS
    ======================================================== */}

    <Link
  to="/categories?category=casual-wear"
  className="style-top-split-card style-shirts-card"
>
      <div className="style-top-image">
        <img
          src={sareeStyleImage}
          alt="Saree collection"
        />
      </div>

      
      <div className="style-top-text">
        <span>BRAND NEW</span>
        <strong>Shirts</strong>
      </div>

    </Link>

  </div>


  {/* ==========================================================
      RIGHT — ONE GRAM GOLD JEWELLERY
  ========================================================== */}

  <Link
    to="/categories?category=one-gram-jewellery"
    className="style-jewellery-card"
  >

    <img
      src={collectionJewelleryImage}
      alt="One gram gold jewellery"
      className="style-jewellery-image"
    />

    <div className="style-jewellery-content">

      <h2>
        one gram gold jewellery
      </h2>

      <span>
        JUST FOR WOMEN
      </span>

    </div>

  </Link>


  {/* ==========================================================
      BOTTOM SECTION
  ========================================================== */}

  <div className="style-bottom-section">

    {/* ========================================================
        WILL + BEAR JACKET
    ======================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="style-product-card style-jacket"
    >

      <div className="style-product-text">

        <span>
          Will+Bear Andy
        </span>

        <strong>
          blue jacket
        </strong>

      </div>

      <div className="style-product-image">

        <img
          src={willBearImage}
          alt="Will+Bear Andy blue jacket"
        />

      </div>

    </Link>


    {/* ========================================================
        MIDI JOGGER
    ======================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="style-product-card style-jogger"
    >

      <div className="style-product-text">

        <span>
          Midi jogger
        </span>

        <strong>
          with buckle
        </strong>

        <small>
          JUST 39.99$
        </small>

      </div>

      <div className="style-product-image">

        <img
          src={joggerImage}
          alt="Midi jogger with buckle"
        />

      </div>

    </Link>
    {/* ========================================================
        DECORATIVE ITEMS
    ======================================================== */}

    <Link
      to="/categories?category=decorative-items"
      className="style-product-card style-decorative"
    >

      <div className="style-decorative-image">

        <img
          src={decorativeStyleImage}
          alt="Decorative items"
        />

      </div>

      <div className="style-decorative-text">
        Decorative
        <br />
        Items
      </div>

    </Link>

  </div>

</section>




{/* =====================================================
    YOUR STYLE SECTION
===================================================== */}

<section className="your-style-section">

  <div className="your-style-content">

    {/* ROW 1 */}
    <div className="your-style-row your-style-row-one">
      <h2>Your Style</h2>

      <div className="your-style-image-pill">
        <img
          src={yourStyleImage}
          alt="Fashion style"
        />
      </div>
    </div>


    {/* ROW 2 */}
    <div className="your-style-row your-style-row-two">

      <div className="your-style-image-pill">
        <img
          src={yourRulesImage}
          alt="Jewellery style"
        />
      </div>

      <h2>Your Rules</h2>

    </div>


    {/* MAIN HEADING */}
    <h1>Empower Your Fashion</h1>


    {/* SHOP BUTTON */}
    <Link
  to="/categories"
  className="your-style-shop-button"
>
  <span>SHOP NOW</span>

  <span className="your-style-arrow">
    <span className="your-style-arrow-line"></span>
    <span className="your-style-arrow-head"></span>
  </span>
</Link>

  </div>

</section>

{/* =====================================================
    CASUAL WEAR COLLECTION
===================================================== */}

<section className="home-casual-section">

  {/* Heading */}
  <div className="home-casual-heading">

    <h2>
      Casual Wear <span>Collections</span>
    </h2>

    <div className="home-casual-line"></div>

    <p>
      We consider your look and comfort on scorching weather.
    </p>

  </div>


  {/* Main Casual Wear Layout */}
  <div className="home-casual-container">


    {/* =================================================
        LEFT LARGE IMAGE
    ================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="home-casual-left-image"
      aria-label="View Casual Wear"
    >

      <img
        src={casual1}
        alt="Casual Wear Collection"
      />

    </Link>


    {/* =================================================
        RIGHT CONTENT
    ================================================== */}

    <div className="home-casual-right">


      {/* Right Text */}

      <p className="home-casual-description">
        We provide the largest clothing collection for your
        comfort. You can choose trendy or classy design according
        to your preferences. Our services are super fast and we
        update within 24 hours.
      </p>


      {/* Right Large Image */}

      <Link
        to="/categories?category=casual-wear"
        className="home-casual-right-image"
        aria-label="View Casual Wear"
      >

        <img
          src={casual2}
          alt="Casual Wear Collection"
        />

      </Link>

    </div>


    {/* =================================================
        SMALL OVERLAPPING IMAGE
    ================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="home-casual-small-image"
      aria-label="View Casual Wear"
    >

      <img
        src={casual3}
        alt="Casual Wear Collection"
      />

    </Link>


    {/* =================================================
        BOTTOM LEFT TEXT
    ================================================== */}

    <div className="home-casual-bottom-text">

      <p>
        Our main aim is to serve our customer with better
        quality product. We try to understand their needs and
        provide them within a short period of time.
      </p>

    </div>


    {/* =================================================
        EXPLORE BUTTON
    ================================================== */}

    <Link
      to="/categories?category=casual-wear"
      className="home-casual-explore"
      aria-label="Explore Casual Wear"
    >

      <span>
        Explore
      </span>

      <span className="home-casual-arrow">
        →
      </span>

    </Link>

  </div>

</section>

{/* =====================================================
    END CASUAL WEAR COLLECTION
===================================================== */}
     {/* =====================================================
    SAREE COLLECTION
===================================================== */}

<section className="saree-section">

  {/* =================================================
      HEADING
  ================================================= */}

  <div className="saree-heading">

  <h2>
    <span className="saree-title-main">Saree</span>
    <span className="saree-title-sub">Collections</span>
  </h2>

  <div className="saree-heading-line"></div>

  <p>
    We consider your look and comfort on cold weather.
  </p>

</div>

  {/* =================================================
      MAIN CONTENT
  ================================================= */}

  <div className="saree-layout">


    {/* =================================================
        LEFT SIDE
    ================================================= */}

    <div className="saree-left">

      {/* TOP DESCRIPTION */}

      <p className="saree-left-description">
        We provide the largest collection sarees. You can
        choose trendy or classy design according to your
        preferences. Our services are super fast and we
        update within 24 hours.
      </p>


      {/* IMAGES */}

      <div className="saree-images">

        {/* LARGE SAREE IMAGE */}

        <Link
          to="/categories?category=sarees"
          className="saree-large-image"
        >
          <img
            src={saree2}
            alt="Saree collection"
          />
        </Link>


        {/* SMALL OVERLAPPING IMAGE */}

        <Link
          to="/categories?category=sarees"
          className="saree-small-image"
        >
          <img
            src={saree1}
            alt="Saree fabric collection"
          />
        </Link>

      </div>

    </div>


    {/* =================================================
        RIGHT SIDE
    ================================================= */}

    <div className="saree-right">

      <p className="saree-right-description">
        Our main aim is to serve our customer with better
        quality product. We try to understand their needs
        and provide them within a short period of time.
        We provide the largest clothing collection for any
        season. You can choose trendy or classy design
        according to your preferences. Our services are
        super fast and we update within 24 hours.
      </p>


      {/* EXPLORE */}

      <Link
        to="/categories?category=sarees"
        className="saree-explore-button"
      >
        <span>Explore</span>
        <span>⟶</span>
      </Link>

    </div>

  </div>

</section>

{/* =====================================================
    END SAREE COLLECTION
===================================================== */}

      {/* =====================================================
    DECORATIVE ITEM COLLECTION
===================================================== */}

<section className="decorative-section">

  {/* =================================================
      HEADING
  ================================================= */}

  <div className="decorative-heading">

    <h2>
      <span className="decorative-title-main">
        Decorative Item
      </span>

      <span className="decorative-title-sub">
        Collections
      </span>
    </h2>

    <div className="decorative-heading-line"></div>

    <p>
      We consider your look and comfort on cold weather.
    </p>

  </div>


  {/* =================================================
      MAIN CONTENT
  ================================================= */}

  <div className="decorative-layout">


    {/* =================================================
        RIGHT TOP DESCRIPTION
    ================================================= */}

    <div className="decorative-top-description">

      <p>
        We provide the largest collection of decorative
        items for every occasion. You can choose trendy
        or classy designs according to your preferences.
        Our services are super fast and we update within
        24 hours.
      </p>

    </div>


    {/* =================================================
        RIGHT IMAGE AREA
    ================================================= */}

    <div className="decorative-images">


      {/* LARGE BACK IMAGE */}

      <Link
        to="/categories?category=decorative-items"
        className="decorative-large-image"
      >
        <img
          src={decorative2}
          alt="Decorative items collection"
        />
      </Link>


      {/* SMALL FRONT IMAGE */}

      <Link
        to="/categories?category=decorative-items"
        className="decorative-small-image"
      >
        <img
          src={decorative1}
          alt="Decorative party items"
        />
      </Link>

    </div>


    {/* =================================================
        EXPLORE BUTTON
    ================================================= */}

    <Link
      to="/categories?category=decorative-items"
      className="decorative-explore-button"
    >
      <span>Explore</span>
      <span>⟶</span>
    </Link>


    {/* =================================================
        BOTTOM DESCRIPTION
    ================================================= */}

    <div className="decorative-bottom-description">

      <p>
        Our main aim is to serve our customer with better
        quality product. We try to understand their needs
        and provide them within a short period of time.
        We provide the largest collection for every
        occasion. You can choose trendy or classy designs
        according to your preferences. Our services are
        super fast and we update within 24 hours.
      </p>

    </div>

  </div>

</section>

{/* =====================================================
    END DECORATIVE ITEM COLLECTION
===================================================== */}
     {/* =====================================================
         WHATSAPP SHOPPING SECTION
     ===================================================== */}
     
     <section className="whatsapp-shopping-section">
     
       <div className="whatsapp-shopping-container">
     
         {/* =================================================
             LEFT CONTENT
         ================================================= */}
     
         <div className="whatsapp-shopping-content">
     
           {/* SMALL LABEL */}
     
           <div className="whatsapp-shopping-label">
             <span className="whatsapp-shopping-icon">
               🛍️
             </span>
     
             <span>
               Shopping Made Personal
             </span>
           </div>
     
     
           {/* MAIN HEADING */}
     
           <h2 className="whatsapp-shopping-title">
             Curate your cart.
             <br />
             Complete on WhatsApp.
           </h2>
     
     
           {/* WHATSAPP BUTTON */}
     
           <a
       href="https://wa.me/19526830741"
       target="_blank"
       rel="noopener noreferrer"
       className="whatsapp-shopping-button"
     >
       <FontAwesomeIcon
       icon={faWhatsapp}
       className="whatsapp-button-icon"
     />
       <span>
         CHECKOUT ON WHATSAPP
       </span>
     </a>
     
         </div>
     
     
         {/* =================================================
             RIGHT IMAGE
         ================================================= */}
     
         <div className="whatsapp-shopping-image">
     
           <img
             src={whatsappBanner}
             alt="Saree shopping on WhatsApp"
           />
     
         </div>
     
     
         {/* =================================================
             BOTTOM SHOPPING FLOW
         ================================================= */}
     
        <div className="whatsapp-shopping-flow">

  <span className="whatsapp-flow-item whatsapp-flow-cart">

    <FaCartShopping
      className="whatsapp-flow-cart-icon"
    />

    <span>Add to Cart</span>

  </span>


  <span className="whatsapp-flow-arrow">
    →
  </span>


  <span className="whatsapp-flow-item whatsapp-flow-whatsapp">

    <FaWhatsapp
      className="whatsapp-flow-whatsapp-icon"
    />

    <span>WhatsApp</span>

  </span>


  <span className="whatsapp-flow-arrow">
    →
  </span>


  <span className="whatsapp-flow-item whatsapp-flow-confirmed">

    <FaCheck
      className="whatsapp-flow-check-icon"
    />

    <span>Order Confirmed</span>

  </span>

</div>
     
       </div>
     
     </section>
     
     {/* =====================================================
         END WHATSAPP SHOPPING SECTION
     ===================================================== */}
     
      {/* =====================================================
         CUSTOMER TESTIMONIALS
     ===================================================== */}
     
     <section className="home-testimonials-section">
     
       <div className="home-testimonials-container">
     
         {/* HEADING */}
         <div className="home-testimonials-heading">
     
           <h2>
             <span className="home-testimonials-small-title">
               What our
             </span>
     
             <span className="home-testimonials-main-title">
               Customer Says
             </span>
           </h2>
     
           <div className="home-testimonials-heading-line"></div>
     
           <p>
             We value our customer's feedback to provide the best service.
           </p>
     
         </div>
     
     
         {/* REVIEW */}
         <div className="home-testimonial-content">
     
           {/* QUOTE */}
           <div className="home-testimonial-quote">
             “
           </div>
     
     
           {/* REVIEW TEXT */}
           <div className="home-testimonial-review">
     
             <p>
               {currentTestimonial.review}
             </p>
     
           </div>
     
     
           {/* CUSTOMER + NAVIGATION */}
           <div className="home-testimonial-bottom">
     
             {/* CUSTOMER DETAILS */}
             <div className="home-testimonial-customer">
     
               <h3>
                 {currentTestimonial.name}
               </h3>
     
               <span>
                 {currentTestimonial.role}
               </span>
     
             </div>
     
     
             {/* NAVIGATION */}
             <div className="home-testimonial-navigation">
     
               <button
                 type="button"
                 onClick={handlePreviousTestimonial}
                 aria-label="Previous testimonial"
               >
                 <span>‹</span>
               </button>
     
               <button
                 type="button"
                 onClick={handleNextTestimonial}
                 aria-label="Next testimonial"
               >
                 <span>›</span>
               </button>
     
             </div>
     
           </div>
     
         </div>
     
       </div>
     
     </section>
     
     {/* =====================================================
         END CUSTOMER TESTIMONIALS
     ===================================================== */}
 </main>
  );
}   
    

export default HomePage;