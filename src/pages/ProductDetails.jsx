import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaMinus,
  FaPlus,
  FaTruckFast,
} from "react-icons/fa6";

import { FiShoppingBag } from "react-icons/fi";

import products from "../data/products";
import CartDrawer from "../components/CartDrawer";

import "../product-details.css";

const CART_KEY = "sreecollections-cart";

/*
=========================================================
EXERCISE OUTFIT VARIANTS
=========================================================
*/

const EXERCISE_VARIANTS = [
  {
    id: "exercise-outfit-detail-1",

    name: "ShadowFlex Training Set",

    description:
      "A sleek black training set designed for confident movement, everyday workouts and comfortable studio sessions.",

    performance: [
      "Four-way stretch for unrestricted movement",
      "Breathable construction for active training",
      "Moisture-managing finish helps keep the skin comfortable",
    ],

    fabric: [
      "78% polyester",
      "22% elastane",
      "Smooth stretch-knit finish",
    ],

    care: [
      "Machine wash cold",
      "Wash with similar colours",
      "Do not bleach",
      "Lay flat or hang dry",
    ],

    detail: [
      "Streamlined athletic silhouette",
      "Flexible waistband",
      "Suitable for gym, yoga and light running",
    ],

    materialTitle: "Performance Stretch Knit",

    materialDescription:
      "A smooth, flexible performance knit that stretches with the body while remaining lightweight and breathable.",

    materialTags: [
      "Stretch",
      "Breathable",
      "Training",
    ],
  },

  {
    id: "exercise-outfit-detail-2",

    name: "SlateMotion Active Set",

    description:
      "A soft grey active set with a clean athletic look, made for training days, walks and relaxed movement.",

    performance: [
      "Lightweight construction for easy movement",
      "Quick-drying surface for active wear",
      "Stretch panels support a full range of motion",
    ],

    fabric: [
      "74% recycled polyester",
      "26% elastane",
      "Soft brushed stretch finish",
    ],

    care: [
      "Machine wash cold",
      "Turn inside out before washing",
      "Do not bleach",
      "Air dry naturally",
    ],

    detail: [
      "Sport-inspired fitted silhouette",
      "Soft elastic waist construction",
      "Designed for workouts and casual activewear",
    ],

    materialTitle: "Soft Performance Jersey",

    materialDescription:
      "A soft-touch athletic jersey balancing stretch, airflow and quick-drying comfort for everyday activity.",

    materialTags: [
      "Soft Touch",
      "Quick Dry",
      "Flexible",
    ],
  },

  {
    id: "exercise-outfit-detail-3",

    name: "GraphiteFlex Workout Set",

    description:
      "A graphite-toned workout set combining a minimal look with flexible comfort for training and everyday active styling.",

    performance: [
      "High flexibility for active movement",
      "Breathable knit structure supports airflow",
      "Durable finish for repeated workouts",
    ],

    fabric: [
      "80% nylon",
      "20% elastane",
      "Lightweight stretch fabric",
    ],

    care: [
      "Machine wash cold",
      "Use a gentle cycle",
      "Do not bleach",
      "Do not tumble dry on high heat",
    ],

    detail: [
      "Minimal graphite colourway",
      "Flexible athletic fit",
      "Ideal for gym sessions and active days",
    ],

    materialTitle: "Nylon Performance Stretch",

    materialDescription:
      "A durable nylon-stretch blend with a smooth hand feel and flexible recovery for repeated movement.",

    materialTags: [
      "Durable",
      "Stretch",
      "Lightweight",
    ],
  },
];


/*
=========================================================
ACCORDION
=========================================================
*/

function AccordionBox({
  title,
  open = false,
  children,
}) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className="details-accordion-box">

      <button
        type="button"
        className="details-accordion-header"
        onClick={() =>
          setIsOpen((current) => !current)
        }
      >
        <span>
          {title}
        </span>

        <span className="accordion-symbol">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="details-accordion-content">
          {children}
        </div>
      )}

    </div>
  );
}


/*
=========================================================
PRODUCT DETAILS
=========================================================
*/

function ProductDetails() {

  const { productId } = useParams();


  /*
  =======================================================
  PRODUCT
  =======================================================
  */

  const product = products.find(
    (item) => item.id === productId
  );


  const isExerciseOutfit =
    product?.id === "exercise-outfit";


  /*
  =======================================================
  STATES
  =======================================================
  */

  const [
    selectedVariantIndex,
    setSelectedVariantIndex,
  ] = useState(0);


  const [
    selectedImage,
    setSelectedImage,
  ] = useState(
    product?.image || ""
  );


  const [
    quantity,
    setQuantity,
  ] = useState(1);


  const [
    selectedSize,
    setSelectedSize,
  ] = useState("M");


  const [
    selectedColor,
    setSelectedColor,
  ] = useState("Black");


  const [
    isWishlisted,
    setIsWishlisted,
  ] = useState(false);


  const [
    cartOpen,
    setCartOpen,
  ] = useState(false);


  const [
    relatedCartItems,
    setRelatedCartItems,
  ] = useState([]);


  /*
  =======================================================
  THUMBNAIL IMAGES
  =======================================================
  */

  const thumbnailImages = useMemo(() => {

    if (!product) {
      return [];
    }

    return (product.details || [])
      .filter(Boolean)
      .slice(0, 3);

  }, [product]);


  /*
  =======================================================
  EXERCISE VARIANT
  =======================================================
  */

  const exerciseVariant =
    isExerciseOutfit
      ? EXERCISE_VARIANTS[
          selectedVariantIndex
        ]
      : null;


  /*
  =======================================================
  DISPLAY PRODUCT
  =======================================================
  */

  const displayProduct = useMemo(() => {

    if (!product) {
      return null;
    }


    if (
      !isExerciseOutfit ||
      !exerciseVariant
    ) {
      return product;
    }


    return {
      ...product,

      id:
        exerciseVariant.id,

      name:
        exerciseVariant.name,

      description:
        exerciseVariant.description,

      fitting: {
        title: "Performance",

        description:
          exerciseVariant.performance.join(
            " "
          ),
      },

      fabricCare: {
        title: "Fabric & Care",

        fabric:
          exerciseVariant.fabric,

        care:
          exerciseVariant.care,
      },

      productDetail:
        exerciseVariant.detail,

      material: {
        title:
          exerciseVariant.materialTitle,

        description:
          exerciseVariant.materialDescription,

        tags:
          exerciseVariant.materialTags,
      },
    };

  }, [
    product,
    isExerciseOutfit,
    exerciseVariant,
  ]);


  /*
  =======================================================
  RESET PRODUCT STATE
  =======================================================
  */

  useEffect(() => {

    if (!product) {
      return;
    }


    setSelectedVariantIndex(0);

    setSelectedImage(
      product.image
    );

    setQuantity(1);

    setSelectedSize("M");

    setSelectedColor("Black");

    setIsWishlisted(false);

    setCartOpen(false);

  }, [
    productId,
    product,
  ]);


  /*
  =======================================================
  FIGMA SCALE

  IMPORTANT:
  The Figma design is 1728px wide.

  We keep the whole Product Details page as one
  fixed Figma composition and uniformly scale it
  according to the viewport width.
  =======================================================
  */

  useEffect(() => {

    const updateFigmaScale = () => {

      const designWidth = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;


      const scale = Math.min(
        1,
        viewportWidth /
          designWidth
      );


      document.documentElement.style.setProperty(
        "--figma-scale",
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

    };

  }, []);


  /*
  =======================================================
  READ CART
  =======================================================
  */

  useEffect(() => {

    const readCart = () => {

      try {

        const saved =
          JSON.parse(
            localStorage.getItem(
              CART_KEY
            ) || "[]"
          );


        setRelatedCartItems(
          Array.isArray(saved)
            ? saved
            : []
        );

      } catch {

        setRelatedCartItems([]);

      }

    };


    readCart();


    window.addEventListener(
      "sreecollections-cart-updated",
      readCart
    );


    window.addEventListener(
      "storage",
      readCart
    );


    return () => {

      window.removeEventListener(
        "sreecollections-cart-updated",
        readCart
      );


      window.removeEventListener(
        "storage",
        readCart
      );

    };

  }, []);


  /*
  =======================================================
  PRODUCT NOT FOUND
  =======================================================
  */

  if (
    !product ||
    !displayProduct
  ) {

    return (

      <div className="product-not-found">

        <h2>
          Product Not Found
        </h2>

        <Link to="/categories">
          Back To Categories
        </Link>

      </div>

    );

  }


  /*
  =======================================================
  THUMBNAIL CLICK
  =======================================================
  */

  const handleThumbnailClick = (
    image,
    index
  ) => {

    setSelectedImage(image);


    if (isExerciseOutfit) {

      setSelectedVariantIndex(
        index
      );

      setQuantity(1);

      setSelectedColor(
        index === 0
          ? "Black"
          : "Grey"
      );

    }

  };


  /*
  =======================================================
  QUANTITY
  =======================================================
  */

  const increaseQuantity = () => {

    setQuantity(
      (current) =>
        current + 1
    );

  };


  const decreaseQuantity = () => {

    setQuantity(
      (current) =>
        current > 1
          ? current - 1
          : 1
    );

  };


  /*
  =======================================================
  ADD TO CART

  IMPORTANT:
  - Saves product
  - Uses the same keys expected by CartDrawer
  - Opens CartDrawer
  =======================================================
  */

  const addToCart = () => {

    let existingCart = [];


    try {

      existingCart =
        JSON.parse(
          localStorage.getItem(
            CART_KEY
          ) || "[]"
        );


      if (
        !Array.isArray(
          existingCart
        )
      ) {

        existingCart = [];

      }

    } catch {

      existingCart = [];

    }


    const cartProductId =
      displayProduct.id;


    const cartImage =
      isExerciseOutfit
        ? selectedImage
        : displayProduct.image;


    /*
    -------------------------------------------------------
    FIND EXISTING ITEM

    Cart uses:
      id
      size
      colour
    -------------------------------------------------------
    */

    const existingIndex =
      existingCart.findIndex(
        (item) =>
          String(item.id) ===
            String(cartProductId) &&
          item.size ===
            selectedSize &&
          item.colour ===
            selectedColor
      );


    /*
    -------------------------------------------------------
    EXISTING ITEM
    -------------------------------------------------------
    */

    if (
      existingIndex !== -1
    ) {

      existingCart[
        existingIndex
      ] = {

        ...existingCart[
          existingIndex
        ],

        id:
          cartProductId,

        name:
          displayProduct.name,

        price:
          Number(
            displayProduct.price
          ),

        image:
          cartImage,

        size:
          selectedSize,

        colour:
          selectedColor,

        quantity:
          Number(
            existingCart[
              existingIndex
            ].quantity || 0
          ) + quantity,
      };

    }


    /*
    -------------------------------------------------------
    NEW ITEM
    -------------------------------------------------------
    */

    else {

      existingCart.push({

        id:
          cartProductId,

        name:
          displayProduct.name,

        price:
          Number(
            displayProduct.price
          ),

        image:
          cartImage,

        size:
          selectedSize,

        colour:
          selectedColor,

        quantity,

      });

    }


    /*
    -------------------------------------------------------
    SAVE
    -------------------------------------------------------
    */

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(
        existingCart
      )
    );


    /*
    -------------------------------------------------------
    NOTIFY CART
    -------------------------------------------------------
    */

    window.dispatchEvent(
      new CustomEvent(
        "sreecollections-cart-updated"
      )
    );


    /*
    -------------------------------------------------------
    OPEN CART DRAWER

    This is intentionally kept.
    -------------------------------------------------------
    */

    setCartOpen(true);

  };


  /*
  =======================================================
  RELATED CART ITEM
  =======================================================
  */

  const getRelatedCartItem =
    (relatedProduct) => {

      return relatedCartItems.find(
        (item) =>
          String(item.id) ===
            String(
              relatedProduct.id
            ) &&
          item.size === "M" &&
          item.colour === "Black"
      );

    };


  /*
  =======================================================
  WRITE RELATED CART
  =======================================================
  */

  const writeRelatedCart =
    (nextCart) => {

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(
          nextCart
        )
      );


      setRelatedCartItems(
        nextCart
      );


      window.dispatchEvent(
        new CustomEvent(
          "sreecollections-cart-updated"
        )
      );

    };


  /*
  =======================================================
  ADD RELATED PRODUCT
  =======================================================
  */

  const addRelatedToCart =
    (relatedProduct) => {

      const currentCart = [
        ...relatedCartItems,
      ];


      const existingIndex =
        currentCart.findIndex(
          (item) =>
            String(item.id) ===
              String(
                relatedProduct.id
              ) &&
            item.size === "M" &&
            item.colour === "Black"
        );


      if (
        existingIndex === -1
      ) {

        currentCart.push({

          id:
            relatedProduct.id,

          name:
            relatedProduct.name,

          price:
            Number(
              relatedProduct.price
            ),

          image:
            relatedProduct.image,

          size: "M",

          colour: "Black",

          quantity: 1,

        });

      } else {

        currentCart[
          existingIndex
        ] = {

          ...currentCart[
            existingIndex
          ],

          quantity:
            Number(
              currentCart[
                existingIndex
              ].quantity || 0
            ) + 1,

        };

      }


      writeRelatedCart(
        currentCart
      );

    };


  /*
  =======================================================
  CHANGE RELATED QUANTITY
  =======================================================
  */

  const changeRelatedQuantity =
    (
      relatedProduct,
      change
    ) => {

      const currentCart = [
        ...relatedCartItems,
      ];


      const existingIndex =
        currentCart.findIndex(
          (item) =>
            String(item.id) ===
              String(
                relatedProduct.id
              ) &&
            item.size === "M" &&
            item.colour === "Black"
        );


      if (
        existingIndex === -1
      ) {

        return;

      }


      const nextQuantity =
        Number(
          currentCart[
            existingIndex
          ].quantity || 0
        ) + change;


      if (
        nextQuantity <= 0
      ) {

        currentCart.splice(
          existingIndex,
          1
        );

      } else {

        currentCart[
          existingIndex
        ] = {

          ...currentCart[
            existingIndex
          ],

          quantity:
            nextQuantity,

        };

      }


      writeRelatedCart(
        currentCart
      );

    };


  /*
  =======================================================
  RELATED PRODUCTS
  =======================================================
  */

  const relatedProducts =
    useMemo(() => {

      const otherProducts =
        products.filter(
          (item) =>
            item.id !==
            product.id
        );


      if (
        product.id ===
        "exercise-outfit"
      ) {

        const formal =
          products.find(
            (item) =>
              item.id ===
              "formal-shirt"
          );


        const yellow =
          products.find(
            (item) =>
              item.id ===
              "yellow-jacket"
          );


        return [
          formal,
          yellow,
          yellow,
          formal,
        ].filter(Boolean);

      }


      if (
        otherProducts.length === 0
      ) {

        return [];

      }


      return Array.from(
        { length: 4 },
        (_, index) =>
          otherProducts[
            index %
              otherProducts.length
          ]
      );

    }, [product.id]);


  /*
  =======================================================
  ACCORDION TITLES
  =======================================================
  */

  const fittingTitle =
    displayProduct.fitting?.title ||
    "Fitting";


  const fabricCareTitle =
    displayProduct.fabricCare?.title ||
    "Fabric & Care";


  const shippingTitle =
    displayProduct.shipping?.title ||
    "Shipping And Return";


  /*
  =======================================================
  RETURN
  =======================================================
  */

  return (

    <>

      {/* =================================================
          FIGMA SCALE WRAPPER

          DO NOT REMOVE THIS DIV
      ================================================= */}

      <div className="product-details-scale">

        <main className="product-details-page">


          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="product-breadcrumb">

            <Link to="/categories">
              Categories
            </Link>

            <span>
              /
            </span>

            <Link
              to={`/categories?category=${encodeURIComponent(
                product.category ||
                  "Casual Wear"
              )}`}
            >
              {
                product.category ||
                "Casual Wear"
              }
            </Link>

            <span>
              /
            </span>

            <span>
              {displayProduct.name}
            </span>

          </div>


          {/* =================================================
              MAIN PRODUCT
          ================================================= */}

          <section className="product-main">


            {/* =================================================
                GALLERY
            ================================================= */}

            <div className="product-gallery">

              <div className="product-main-image-wrapper">

                <img
                  src={selectedImage}
                  alt={
                    displayProduct.name
                  }
                  className="product-main-image"
                />

              </div>


              {/* =================================================
                  THUMBNAILS
              ================================================= */}

              <div className="product-thumbnails">

                {thumbnailImages.map(
                  (
                    image,
                    index
                  ) => (

                    <button
                      key={`${product.id}-thumbnail-${index}`}
                      type="button"
                      className={`product-thumbnail ${
                        selectedImage ===
                        image
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleThumbnailClick(
                          image,
                          index
                        )
                      }
                      aria-label={`View ${
                        isExerciseOutfit
                          ? EXERCISE_VARIANTS[
                              index
                            ]?.name ||
                            `product image ${
                              index + 1
                            }`
                          : `product image ${
                              index + 1
                            }`
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${displayProduct.name} detail ${
                          index + 1
                        }`}
                      />

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="product-information">


              {/* =================================================
                  TITLE
              ================================================= */}

              <h1>
                {displayProduct.name}
              </h1>


              {/* =================================================
                  RATING + STOCK
              ================================================= */}

              <div className="rating-stock-row">

                <div className="rating-area">

                  <div className="star-row">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />

                  </div>

                  <span>
                    {
                      displayProduct.rating ||
                      "5.00"
                    }{" "}
                    Rating
                  </span>

                </div>


                <div className="stock-area">

                  <span className="stock-check">
                    ✓
                  </span>

                  <span>
                    {
                      displayProduct.stock ||
                      "In Stock"
                    }
                  </span>

                </div>

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="product-description">

                {
                  displayProduct.description ||
                  "A carefully selected piece designed for comfort, style and everyday wear."
                }

              </p>


              {/* =================================================
                  QUANTITY + PRICE
              ================================================= */}

              <div className="quantity-price-row">


                <div className="quantity-area">

                  <span className="quantity-title">
                    Quantity
                  </span>


                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={
                        decreaseQuantity
                      }
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>


                    <span>
                      {quantity}
                    </span>


                    <button
                      type="button"
                      onClick={
                        increaseQuantity
                      }
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>


                <div className="price-area">

                  <div className="product-price">

                    $
                    {
                      displayProduct.price
                    }

                  </div>


                  <div className="vat-text">
                    +12% VAT Added
                  </div>

                </div>

              </div>


              {/* =================================================
                  ADD TO CART

                  ADD + OPEN DRAWER
              ================================================= */}

              <button
                type="button"
                className="add-to-cart-button"
                onClick={
                  addToCart
                }
              >
                Add to Cart
              </button>


              {/* =================================================
                  SIZE
              ================================================= */}

              <div className="product-option">

                <h3>
                  Select Size
                </h3>


                <div className="size-options">

                  {[
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                  ].map(
                    (size) => (

                      <button
                        key={size}
                        type="button"
                        className={
                          selectedSize ===
                          size
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                      >
                        {size}
                      </button>

                    )
                  )}

                </div>

              </div>


              {/* =================================================
                  COLOURS
              ================================================= */}

              <div className="product-option">

                <h3>
                  Colours
                </h3>


                <div className="color-options">

                  {[
                    {
                      name: "Red",
                      value:
                        "#9d3737",
                    },

                    {
                      name:
                        "Black",
                      value:
                        "#171717",
                    },

                    {
                      name:
                        "Olive",
                      value:
                        "#a39a3a",
                    },

                    {
                      name:
                        "Blue",
                      value:
                        "#347d94",
                    },

                    {
                      name:
                        "Pink",
                      value:
                        "#bd4096",
                    },
                  ].map(
                    (color) => (

                      <button
                        key={
                          color.name
                        }
                        type="button"
                        className={`color-circle ${
                          selectedColor ===
                          color.name
                            ? "selected"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                        onClick={() =>
                          setSelectedColor(
                            color.name
                          )
                        }
                        aria-label={
                          color.name
                        }
                        title={
                          color.name
                        }
                      >

                        {
                          selectedColor ===
                          color.name && (
                            <span>
                              ✓
                            </span>
                          )
                        }

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* =================================================
                  EASY RETURN + WISHLIST
              ================================================= */}

              <div className="product-actions">


                {/* SMALL TRUCK — FIGMA */}

                <span className="easy-return">

                  <FaTruckFast className="easy-return-truck" />

                  <span>
                    Easy Return
                  </span>

                </span>


                {/* WISHLIST */}

                <button
                  type="button"
                  className={`wishlist-button ${
                    isWishlisted
                      ? "wishlisted"
                      : ""
                  }`}
                  onClick={() =>
                    setIsWishlisted(
                      (current) =>
                        !current
                    )
                  }
                >

                  {
                    isWishlisted
                      ? <FaHeart />
                      : <FaRegHeart />
                  }


                  <span>
                    Add To Wish List
                  </span>

                </button>

              </div>

            </div>

          </section>


          {/* =================================================
              INFORMATION SECTION
          ================================================= */}

          <section className="product-information-section">

            <div className="information-grid">


              {/* =================================================
                  LEFT ACCORDION
              ================================================= */}

              <div className="information-left">


                {/* =================================================
                    FITTING
                ================================================= */}

                <AccordionBox
                  title={
                    fittingTitle
                  }
                  open={false}
                >

                  {
                    displayProduct
                      .fitting
                      ?.description && (
                      <p>
                        {
                          displayProduct
                            .fitting
                            .description
                        }
                      </p>
                    )
                  }


                  {
                    isExerciseOutfit && (
                      <ul>

                        {
                          exerciseVariant.performance.map(
                            (item) => (
                              <li key={item}>
                                {item}
                              </li>
                            )
                          )
                        }

                      </ul>
                    )
                  }

                </AccordionBox>


                {/* =================================================
                    FABRIC & CARE

                    NO BULLET DOTS
                ================================================= */}

                <AccordionBox
                  title={
                    fabricCareTitle
                  }
                  open={true}
                >

                  {
                    displayProduct
                      .fabricCare
                      ?.fabric
                      ?.length > 0 && (

                      <div className="info-subsection">

                        <h4>
                          Fabric:
                        </h4>


                        <div className="info-plain-list">

                          {
                            displayProduct.fabricCare.fabric.map(
                              (item) => (
                                <p key={item}>
                                  {item}
                                </p>
                              )
                            )
                          }

                        </div>

                      </div>
                    )
                  }


                  {
                    displayProduct
                      .fabricCare
                      ?.care
                      ?.length > 0 && (

                      <div className="info-subsection">

                        <h4>
                          Care:
                        </h4>


                        <div className="info-plain-list">

                          {
                            displayProduct.fabricCare.care.map(
                              (item) => (
                                <p key={item}>
                                  {item}
                                </p>
                              )
                            )
                          }

                        </div>

                      </div>
                    )
                  }

                </AccordionBox>


                {/* =================================================
                    PRODUCT DETAIL
                ================================================= */}

                <AccordionBox
                  title="Product Detail"
                  open={false}
                >

                  {
                    displayProduct
                      .productDetail
                      ?.length > 0 && (

                      <ul>

                        {
                          displayProduct.productDetail.map(
                            (item) => (
                              <li key={item}>
                                {item}
                              </li>
                            )
                          )
                        }

                      </ul>
                    )
                  }

                </AccordionBox>


                {/* =================================================
                    SHIPPING & RETURN

                    NO BULLET DOTS
                ================================================= */}

                <AccordionBox
                  title={
                    shippingTitle
                  }
                  open={true}
                >

                  {
                    displayProduct
                      .shipping
                      ?.shipping
                      ?.length > 0 && (

                      <div className="info-subsection">

                        <h4>
                          Shipping:
                        </h4>


                        <div className="info-plain-list">

                          {
                            displayProduct.shipping.shipping.map(
                              (item) => (
                                <p key={item}>
                                  {item}
                                </p>
                              )
                            )
                          }

                        </div>

                      </div>
                    )
                  }


                  {
                    displayProduct
                      .shipping
                      ?.returns
                      ?.length > 0 && (

                      <div className="info-subsection">

                        <h4>
                          Returns:
                        </h4>


                        <div className="info-plain-list">

                          {
                            displayProduct.shipping.returns.map(
                              (item) => (
                                <p key={item}>
                                  {item}
                                </p>
                              )
                            )
                          }

                        </div>

                      </div>
                    )
                  }

                </AccordionBox>

              </div>


              {/* =================================================
                  RIGHT INFORMATION
              ================================================= */}

              <div className="information-right">


                {/* =================================================
                    MATERIAL
                ================================================= */}

                <div className="silk-box">

                  <h3>

                    {
                      displayProduct
                        .material
                        ?.title ||
                      "Material"
                    }

                  </h3>


                  <p>

                    {
                      displayProduct
                        .material
                        ?.description ||
                      "A carefully selected material designed for comfort and everyday wear."
                    }

                  </p>


                  {
                    displayProduct
                      .material
                      ?.tags
                      ?.length > 0 && (

                      <div className="material-tags">

                        {
                          displayProduct.material.tags.map(
                            (tag) => (
                              <span key={tag}>
                                {tag}
                              </span>
                            )
                          )
                        }

                      </div>
                    )
                  }

                </div>


                {/* =================================================
                    RETURN POLICY
                ================================================= */}

                <div className="return-box">

                  <h3>
                    Return Policy
                  </h3>


                  <div className="return-divider" />


                  {
                    displayProduct
                      .returnPolicy
                      ?.length > 0 && (

                      <ul>

                        {
                          displayProduct.returnPolicy.map(
                            (item) => (
                              <li key={item}>
                                {item}
                              </li>
                            )
                          )
                        }

                      </ul>
                    )
                  }

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              YOU MAY ALSO LIKE
          ================================================= */}

          <section className="you-may-like">

            <h2>
              You May Also Like
            </h2>


            <div className="related-products">

              {
                relatedProducts.map(
                  (
                    relatedProduct,
                    index
                  ) => (

                    <Link
                      key={`${relatedProduct.id}-${index}`}
                      to={`/product/${relatedProduct.id}`}
                      className="related-card"
                    >

                      <div className="related-image">

                        <img
                          src={
                            relatedProduct.image
                          }
                          alt={
                            relatedProduct.name
                          }
                        />

                      </div>


                      <div className="related-card-content">

                        <h3>
                          {
                            relatedProduct.name
                          }
                        </h3>


                        <div className="related-bottom">

                          <span className="related-price">

                            Price: $
                            {
                              relatedProduct.price
                            }

                          </span>


                          <div
                            className="related-cart-action"
                            onClick={(
                              event
                            ) => {

                              event.preventDefault();

                              event.stopPropagation();

                            }}
                          >

                            {
                              getRelatedCartItem(
                                relatedProduct
                              ) ? (

                                <div className="related-cart-control">

                                  <button
                                    type="button"
                                    className="related-qty-button"
                                    onClick={(
                                      event
                                    ) => {

                                      event.preventDefault();

                                      event.stopPropagation();

                                      changeRelatedQuantity(
                                        relatedProduct,
                                        -1
                                      );

                                    }}
                                  >
                                    <FaMinus />
                                  </button>


                                  <span className="related-quantity">

                                    {
                                      getRelatedCartItem(
                                        relatedProduct
                                      ).quantity
                                    }

                                  </span>


                                  <button
                                    type="button"
                                    className="related-qty-button"
                                    onClick={(
                                      event
                                    ) => {

                                      event.preventDefault();

                                      event.stopPropagation();

                                      changeRelatedQuantity(
                                        relatedProduct,
                                        1
                                      );

                                    }}
                                  >
                                    <FaPlus />
                                  </button>

                                </div>

                              ) : (

                                <button
                                  type="button"
                                  className="related-cart-icon"
                                  aria-label={`Add ${relatedProduct.name} to cart`}
                                  onClick={(
                                    event
                                  ) => {

                                    event.preventDefault();

                                    event.stopPropagation();

                                    addRelatedToCart(
                                      relatedProduct
                                    );

                                  }}
                                >

                                  <FiShoppingBag />

                                </button>

                              )
                            }

                          </div>

                        </div>

                      </div>

                    </Link>

                  )
                )
              }

            </div>


            {/* =================================================
                EXPLORE MORE
            ================================================= */}

            <div className="explore-more-wrapper">

              <Link
                to="/categories"
                className="explore-more-button"
              >
                Explore More
              </Link>

            </div>

          </section>

        </main>

      </div>


      {/* =================================================
          CART DRAWER

          Opens after Add to Cart
      ================================================= */}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />

    </>

  );
}


export default ProductDetails;