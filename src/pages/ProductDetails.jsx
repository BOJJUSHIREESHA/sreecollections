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
        <span>{title}</span>

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

function ShoppingBagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.71168 2.25H14.1897C14.7417 2.25004 15.2745 2.45302 15.6866 2.82032C16.0987 3.18762 16.3614 3.69361 16.4247 4.242L17.6367 14.742C17.6731 15.0571 17.6424 15.3764 17.5467 15.6789C17.451 15.9813 17.2924 16.2601 17.0813 16.4969C16.8703 16.7338 16.6115 16.9233 16.322 17.0531C16.0326 17.1829 15.7189 17.25 15.4017 17.25H4.49968C4.18245 17.25 3.86881 17.1829 3.57934 17.0531C3.28987 16.9233 3.03111 16.7338 2.82006 16.4969C2.609 16.2601 2.45041 15.9813 2.3547 15.6789C2.25898 15.3764 2.22831 15.0571 2.26468 14.742L3.47668 4.242C3.53998 3.69361 3.80268 3.18762 4.21478 2.82032C4.62689 2.45302 5.15965 2.25004 5.71168 2.25ZM1.24168 3.984C1.36828 2.88721 1.89367 1.87524 2.71789 1.14064C3.5421 0.40604 4.60761 7.8048e-05 5.71168 0H14.1897C15.2937 7.8048e-05 16.3593 0.40604 17.1835 1.14064C18.0077 1.87524 18.5331 2.88721 18.6597 3.984L19.8717 14.484C19.9444 15.1143 19.8831 15.7528 19.6917 16.3577C19.5002 16.9626 19.183 17.5202 18.7609 17.9939C18.3388 18.4675 17.8213 18.8466 17.2424 19.1062C16.6634 19.3657 16.0361 19.5 15.4017 19.5H4.49968C3.86522 19.5 3.23793 19.3657 2.65899 19.1062C2.08005 18.8466 1.56254 18.4675 1.14043 17.9939C0.718316 17.5202 0.401138 16.9626 0.20971 16.3577C0.0182814 15.7528 -0.0430698 15.1143 0.0296823 14.484L1.24168 3.984ZM5.45068 5.625C5.45068 5.32663 5.56921 5.04048 5.78019 4.8295C5.99116 4.61853 6.27731 4.5 6.57568 4.5C6.87405 4.5 7.1602 4.61853 7.37118 4.8295C7.58216 5.04048 7.70068 5.32663 7.70068 5.625V6C7.70068 6.59674 7.93773 7.16903 8.35969 7.59099C8.78165 8.01295 9.35394 8.25 9.95068 8.25C10.5474 8.25 11.1197 8.01295 11.5417 7.59099C11.9636 7.16903 12.2007 6.59674 12.2007 6V5.625C12.2007 5.32663 12.3192 5.04048 12.5302 4.8295C12.7412 4.61853 13.0273 4.5 13.3257 4.5C13.624 4.5 13.9102 4.61853 14.1212 4.8295C14.3322 5.04048 14.4507 5.32663 14.4507 5.625V6C14.4507 7.19347 13.9766 8.33807 13.1327 9.18198C12.2887 10.0259 11.1442 10.5 9.95068 10.5C8.75721 10.5 7.61262 10.0259 6.7687 9.18198C5.92479 8.33807 5.45068 7.19347 5.45068 6V5.625Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#BB8E43"
      />
    </svg>
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
  ] = useState(product?.image || "");

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
  THUMBNAIL IMAGES — MAXIMUM THREE
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

  const exerciseVariant = isExerciseOutfit
    ? EXERCISE_VARIANTS[selectedVariantIndex]
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

    if (!isExerciseOutfit || !exerciseVariant) {
      return product;
    }

    return {
      ...product,

      id: exerciseVariant.id,
      name: exerciseVariant.name,
      description: exerciseVariant.description,

      fitting: {
        title: "Performance",
        description: exerciseVariant.performance.join(" "),
      },

      fabricCare: {
        title: "Fabric & Care",
        fabric: exerciseVariant.fabric,
        care: exerciseVariant.care,
      },

      productDetail: exerciseVariant.detail,

      material: {
        title: exerciseVariant.materialTitle,
        description: exerciseVariant.materialDescription,
        tags: exerciseVariant.materialTags,
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
    setSelectedImage(product.image);
    setQuantity(1);
    setSelectedSize("M");
    setSelectedColor("Black");
    setIsWishlisted(false);
    setCartOpen(false);
  }, [productId, product]);


  /*
  =======================================================
  READ CART
  =======================================================
  */

  useEffect(() => {
    const readCart = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(CART_KEY) || "[]"
        );

        setRelatedCartItems(
          Array.isArray(saved) ? saved : []
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

    window.addEventListener("storage", readCart);

    return () => {
      window.removeEventListener(
        "sreecollections-cart-updated",
        readCart
      );

      window.removeEventListener("storage", readCart);
    };
  }, []);


  /*
  =======================================================
  PRODUCT NOT FOUND
  =======================================================
  */

  if (!product || !displayProduct) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>

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

  const handleThumbnailClick = (image, index) => {
    setSelectedImage(image);

    if (isExerciseOutfit) {
      setSelectedVariantIndex(index);
      setQuantity(1);

      setSelectedColor(
        index === 0 ? "Black" : "Grey"
      );
    }
  };


  /*
  =======================================================
  QUANTITY
  =======================================================
  */

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };


  /*
  =======================================================
  ADD TO CART
  =======================================================
  */

  const addToCart = () => {
    let existingCart = [];

    try {
      existingCart = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      if (!Array.isArray(existingCart)) {
        existingCart = [];
      }
    } catch {
      existingCart = [];
    }

    const cartProductId = displayProduct.id;

    const cartImage = isExerciseOutfit
      ? selectedImage
      : displayProduct.image;

    const existingIndex = existingCart.findIndex(
      (item) =>
        String(item.id) === String(cartProductId) &&
        item.size === selectedSize &&
        item.colour === selectedColor
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex] = {
        ...existingCart[existingIndex],
        id: cartProductId,
        name: displayProduct.name,
        price: Number(displayProduct.price),
        image: cartImage,
        size: selectedSize,
        colour: selectedColor,
        quantity:
          Number(existingCart[existingIndex].quantity || 0) +
          quantity,
      };
    } else {
      existingCart.push({
        id: cartProductId,
        name: displayProduct.name,
        price: Number(displayProduct.price),
        image: cartImage,
        size: selectedSize,
        colour: selectedColor,
        quantity,
      });
    }

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(existingCart)
    );

    window.dispatchEvent(
      new CustomEvent("sreecollections-cart-updated")
    );

    setCartOpen(true);
  };


  /*
  =======================================================
  RELATED CART ITEM
  =======================================================
  */

  const getRelatedCartItem = (relatedProduct) => {
    return relatedCartItems.find(
      (item) =>
        String(item.id) === String(relatedProduct.id) &&
        item.size === "M" &&
        item.colour === "Black"
    );
  };


  /*
  =======================================================
  WRITE RELATED CART
  =======================================================
  */

  const writeRelatedCart = (nextCart) => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(nextCart)
    );

    setRelatedCartItems(nextCart);

    window.dispatchEvent(
      new CustomEvent("sreecollections-cart-updated")
    );
  };


  /*
  =======================================================
  ADD RELATED PRODUCT
  =======================================================
  */

  const addRelatedToCart = (relatedProduct) => {
    const currentCart = [...relatedCartItems];

    const existingIndex = currentCart.findIndex(
      (item) =>
        String(item.id) === String(relatedProduct.id) &&
        item.size === "M" &&
        item.colour === "Black"
    );

    if (existingIndex === -1) {
      currentCart.push({
        id: relatedProduct.id,
        name: relatedProduct.name,
        price: Number(relatedProduct.price),
        image: relatedProduct.image,
        size: "M",
        colour: "Black",
        quantity: 1,
      });
    } else {
      currentCart[existingIndex] = {
        ...currentCart[existingIndex],
        quantity:
          Number(currentCart[existingIndex].quantity || 0) + 1,
      };
    }

    writeRelatedCart(currentCart);
  };


  /*
  =======================================================
  CHANGE RELATED QUANTITY
  =======================================================
  */

  const changeRelatedQuantity = (
    relatedProduct,
    change
  ) => {
    const currentCart = [...relatedCartItems];

    const existingIndex = currentCart.findIndex(
      (item) =>
        String(item.id) === String(relatedProduct.id) &&
        item.size === "M" &&
        item.colour === "Black"
    );

    if (existingIndex === -1) {
      return;
    }

    const nextQuantity =
      Number(currentCart[existingIndex].quantity || 0) +
      change;

    if (nextQuantity <= 0) {
      currentCart.splice(existingIndex, 1);
    } else {
      currentCart[existingIndex] = {
        ...currentCart[existingIndex],
        quantity: nextQuantity,
      };
    }

    writeRelatedCart(currentCart);
  };
    /*
  =======================================================
  RELATED PRODUCTS
  =======================================================
  */

  const relatedProducts = useMemo(() => {
    const otherProducts = products.filter(
      (item) => item.id !== product.id
    );

    if (product.id === "exercise-outfit") {
      const formal = products.find(
        (item) => item.id === "formal-shirt"
      );

      const yellow = products.find(
        (item) => item.id === "yellow-jacket"
      );

      return [
        formal,
        yellow,
        yellow,
        formal,
      ].filter(Boolean);
    }

    if (otherProducts.length === 0) {
      return [];
    }

    return Array.from(
      { length: 4 },
      (_, index) =>
        otherProducts[index % otherProducts.length]
    );
  }, [product.id]);


  /*
  =======================================================
  ACCORDION TITLES
  =======================================================
  */

  const fittingTitle =
    displayProduct.fitting?.title || "Fitting";

  const fabricCareTitle =
    displayProduct.fabricCare?.title || "Fabric & Care";

  const shippingTitle =
    displayProduct.shipping?.title || "Shipping And Return";


  /*
  =======================================================
  RETURN
  =======================================================
  */

  return (
    <>
      <div className="product-details-scale">
        <main className="product-details-page">

          {/* BREADCRUMB */}
          <div className="product-breadcrumb">
            <Link to="/categories">Categories</Link>
            <span>/</span>

            <Link
              to={`/categories?category=${encodeURIComponent(
                product.category || "Casual Wear"
              )}`}
            >
              {product.category || "Casual Wear"}
            </Link>

            <span>/</span>
            <span>{displayProduct.name}</span>
          </div>


          {/* MAIN PRODUCT */}
          <section className="product-main">

            {/* GALLERY */}
            <div className="product-gallery">
              <div className="product-main-image-wrapper">
                <img
                  src={selectedImage}
                  alt={displayProduct.name}
                  className="product-main-image"
                />
              </div>

              {/* THREE THUMBNAILS MAXIMUM */}
              <div className="product-thumbnails">
                {thumbnailImages.map((image, index) => (
                  <button
                    key={`${product.id}-thumbnail-${index}`}
                    type="button"
                    className={`product-thumbnail ${
                      selectedImage === image ? "active" : ""
                    }`}
                    onClick={() =>
                      handleThumbnailClick(image, index)
                    }
                    aria-label={`View ${
                      isExerciseOutfit
                        ? EXERCISE_VARIANTS[index]?.name ||
                          `product image ${index + 1}`
                        : `product image ${index + 1}`
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${displayProduct.name} detail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>


            {/* PRODUCT INFORMATION */}
            <div className="product-information">

              <h1>{displayProduct.name}</h1>

              {/* RATING AND STOCK */}
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
                    {displayProduct.rating || "5.00"} Rating
                  </span>
                </div>

                <div className="stock-area">
                  <span className="stock-check">✓</span>
                  <span>
                    {displayProduct.stock || "In Stock"}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="product-description">
                {displayProduct.description ||
                  "A carefully selected piece designed for comfort, style and everyday wear."}
              </p>

              {/* QUANTITY AND PRICE */}
              <div className="quantity-price-row">
                <div className="quantity-area">
                  <span className="quantity-title">Quantity</span>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="price-area">
                  <div className="product-price">
                    ${displayProduct.price}
                  </div>

                  <div className="vat-text">
                    +12% VAT Added
                  </div>
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                className="add-to-cart-button"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              {/* SIZE */}
              <div className="product-option">
                <h3>Select Size</h3>

                <div className="size-options">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSize === size ? "selected" : ""
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOURS */}
              <div className="product-option">
                <h3>Colours</h3>

                <div className="color-options">
                  {[
                    { name: "Red", value: "#9d3737" },
                    { name: "Black", value: "#171717" },
                    { name: "Olive", value: "#a39a3a" },
                    { name: "Blue", value: "#347d94" },
                    { name: "Pink", value: "#bd4096" },
                  ].map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`color-circle ${
                        selectedColor === color.name ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: color.value,
                      }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={color.name}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <span>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* EASY RETURN AND WISHLIST */}
              <div className="product-actions">
                <span className="easy-return">
                  <FaTruckFast className="easy-return-truck" />
                  <span>Easy Return</span>
                </span>

                <button
  type="button"
  className={`wishlist-button ${isWishlisted ? "wishlisted" : ""}`}
  onClick={() => setIsWishlisted((current) => !current)}
  aria-pressed={isWishlisted}
  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
>
  {isWishlisted ? <FaHeart /> : <FaRegHeart />}
  <span>Add To Wish List</span>
</button>
              </div>
            </div>
          </section>


          {/* PRODUCT INFORMATION SECTION */}
          <section className="product-information-section">
            <div className="information-grid">

              {/* LEFT ACCORDIONS */}
              <div className="information-left">

                <AccordionBox title={fittingTitle} open={false}>
                  {displayProduct.fitting?.description && (
                    <p>{displayProduct.fitting.description}</p>
                  )}

                  {isExerciseOutfit && (
                    <ul>
                      {exerciseVariant.performance.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </AccordionBox>

                <AccordionBox title={fabricCareTitle} open={true}>
                  {displayProduct.fabricCare?.fabric?.length > 0 && (
                    <div className="info-subsection">
                      <h4>Fabric:</h4>

                      <div className="info-plain-list">
                        {displayProduct.fabricCare.fabric.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProduct.fabricCare?.care?.length > 0 && (
                    <div className="info-subsection">
                      <h4>Care:</h4>

                      <div className="info-plain-list">
                        {displayProduct.fabricCare.care.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionBox>

                <AccordionBox title="Product Detail" open={false}>
                  {displayProduct.productDetail?.length > 0 && (
                    <ul>
                      {displayProduct.productDetail.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </AccordionBox>

                <AccordionBox title={shippingTitle} open={true}>
                  {displayProduct.shipping?.shipping?.length > 0 && (
                    <div className="info-subsection">
                      <h4>Shipping:</h4>

                      <div className="info-plain-list">
                        {displayProduct.shipping.shipping.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProduct.shipping?.returns?.length > 0 && (
                    <div className="info-subsection">
                      <h4>Returns:</h4>

                      <div className="info-plain-list">
                        {displayProduct.shipping.returns.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionBox>
              </div>


              {/* RIGHT INFORMATION */}
              <div className="information-right">

                <div className="silk-box">
                  <h3>
                    {displayProduct.material?.title || "Material"}
                  </h3>

                  <p>
                    {displayProduct.material?.description ||
                      "A carefully selected material designed for comfort and everyday wear."}
                  </p>

                  {displayProduct.material?.tags?.length > 0 && (
                    <div className="material-tags">
                      {displayProduct.material.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="return-box">
                  <h3>Return Policy</h3>
                  <div className="return-divider" />

                  {displayProduct.returnPolicy?.length > 0 && (
                    <ul>
                      {displayProduct.returnPolicy.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>


          {/* YOU MAY ALSO LIKE */}
          <section className="you-may-like">
            <h2>You May Also Like</h2>

            <div className="related-products">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={`${relatedProduct.id}-${index}`}
                  to={`/product/${relatedProduct.id}`}
                  className="related-card"
                >
                  <div className="related-image">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                    />
                  </div>

                  <div className="related-card-content">
                    <h3>{relatedProduct.name}</h3>

                    <div className="related-bottom">
                      <span className="related-price">
                        Price: ${relatedProduct.price}
                      </span>

                      <div
                        className="related-cart-action"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      >
                        {getRelatedCartItem(relatedProduct) ? (
                          <div className="related-cart-control">
                            <button
                              type="button"
                              className="related-qty-button"
                              aria-label="Decrease related product quantity"
                              onClick={(event) => {
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
                              {getRelatedCartItem(relatedProduct).quantity}
                            </span>

                            <button
                              type="button"
                              className="related-qty-button"
                              aria-label="Increase related product quantity"
                              onClick={(event) => {
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
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();

                              addRelatedToCart(relatedProduct);
                            }}
                          >
                           <ShoppingBagIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

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

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default ProductDetails;