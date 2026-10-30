import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

import products from "../data/products";
import "./Search.css";

const CART_KEY = "sreecollections-cart";

/* =====================================================
   READ CART
===================================================== */

function readCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const ShoppingBagIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    style={{
      display: "block",
      width: "19.901363px",
      height: "19.5px",
      flexShrink: 0,
    }}
  >
    <path
      d="M5.71168 2.25H14.1897C14.7417 2.25004 15.2745 2.45302 15.6866 2.82032C16.0987 3.18762 16.3614 3.69361 16.4247 4.242L17.6367 14.742C17.6731 15.0571 17.6424 15.3764 17.5467 15.6789C17.451 15.9813 17.2924 16.2601 17.0813 16.4969C16.8703 16.7338 16.6115 16.9233 16.322 17.0531C16.0326 17.1829 15.7189 17.25 15.4017 17.25H4.49968C4.18245 17.25 3.86881 17.1829 3.57934 17.0531C3.28987 16.9233 3.03111 16.7338 2.82006 16.4969C2.609 16.2601 2.45041 15.9813 2.3547 15.6789C2.25898 15.3764 2.22831 15.0571 2.26468 14.742L3.47668 4.242C3.53998 3.69361 3.80268 3.18762 4.21478 2.82032C4.62689 2.45302 5.15965 2.25004 5.71168 2.25ZM1.24168 3.984C1.36828 2.88721 1.89367 1.87524 2.71789 1.14064C3.5421 0.40604 4.60761 7.8048e-05 5.71168 0H14.1897C15.2937 7.8048e-05 16.3593 0.40604 17.1835 1.14064C18.0077 1.87524 18.5331 2.88721 18.6597 3.984L19.8717 14.484C19.9444 15.1143 19.8831 15.7528 19.6917 16.3577C19.5002 16.9626 19.183 17.5202 18.7609 17.9939C18.3388 18.4675 17.8213 18.8466 17.2424 19.1062C16.6634 19.3657 16.0361 19.5 15.4017 19.5H4.49968C3.86522 19.5 3.23793 19.3657 2.65899 19.1062C2.08005 18.8466 1.56254 18.4675 1.14043 17.9939C0.718316 17.5202 0.401138 16.9626 0.20971 16.3577C0.0182814 15.7528 -0.0430698 15.1143 0.0296823 14.484L1.24168 3.984ZM5.45068 5.625C5.45068 5.32663 5.56921 5.04048 5.78019 4.8295C5.99116 4.61853 6.27731 4.5 6.57568 4.5C6.87405 4.5 7.1602 4.61853 7.37118 4.8295C7.58216 5.04048 7.70068 5.32663 7.70068 5.625V6C7.70068 6.59674 7.93773 7.16903 8.35969 7.59099C8.78165 8.01295 9.35394 8.25 9.95068 8.25C10.5474 8.25 11.1197 8.01295 11.5417 7.59099C11.9636 7.16903 12.2007 6.59674 12.2007 6V5.625C12.2007 5.32663 12.3192 5.04048 12.5302 4.8295C12.7412 4.61853 13.0273 4.5 13.3257 4.5C13.624 4.5 13.9102 4.61853 14.1212 4.8295C14.3322 5.04048 14.4507 5.32663 14.4507 5.625V6C14.4507 7.19347 13.9766 8.33807 13.1327 9.18198C12.2887 10.0259 11.1442 10.5 9.95068 10.5C8.75721 10.5 7.61262 10.0259 6.7687 9.18198C5.92479 8.33807 5.45068 7.19347 5.45068 6V5.625Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#BB8E43"
    />
  </svg>
);
/* =====================================================
   SEARCH PAGE
===================================================== */

function Search() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(readCart);

  /* =====================================================
     CART SYNC
  ===================================================== */

  useEffect(() => {
    const syncCart = () => {
      setCart(readCart());
    };

    window.addEventListener(
      "sreecollections-cart-updated",
      syncCart
    );

    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(
        "sreecollections-cart-updated",
        syncCart
      );

      window.removeEventListener("storage", syncCart);
    };
  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  const saveCart = (nextCart) => {
    setCart(nextCart);

    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(nextCart)
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
    }

    window.dispatchEvent(
      new Event("sreecollections-cart-updated")
    );
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    const current = [...cart];

    const index = current.findIndex(
      (item) =>
        String(item.id) === String(product.id) &&
        item.size === "M"
    );

    if (index === -1) {
      current.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        size: "M",
        colour: "Default",
        quantity: 1,
      });
    } else {
      current[index] = {
        ...current[index],
        quantity:
          Number(current[index].quantity || 0) + 1,
      };
    }

    saveCart(current);
  };

  /* =====================================================
     CHANGE CART QUANTITY
  ===================================================== */

  const changeQuantity = (
    event,
    product,
    change
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const nextCart = cart
      .map((item) => {
        if (
          String(item.id) === String(product.id) &&
          item.size === "M"
        ) {
          return {
            ...item,
            quantity:
              Number(item.quantity || 0) + change,
          };
        }

        return item;
      })
      .filter(
        (item) => Number(item.quantity || 0) > 0
      );

    saveCart(nextCart);
  };

  /* =====================================================
     GET CART QUANTITY
  ===================================================== */

  const getQuantity = (productId) => {
    const item = cart.find(
      (cartItem) =>
        String(cartItem.id) === String(productId) &&
        cartItem.size === "M"
    );

    return Number(item?.quantity || 0);
  };

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = `
        ${product.name || ""}
        ${product.category || ""}
      `.toLowerCase();

      return searchableText.includes(value);
    });
  }, [query]);

  /* =====================================================
     REFERENCE PRODUCTS
  ===================================================== */

  const referenceProducts = useMemo(() => {
    const formal =
      products.find(
        (product) => product.id === "formal-shirt"
      ) || products[0];

    const exercise =
      products.find(
        (product) => product.id === "exercise-outfit"
      ) || products[1];

    const yellow =
      products.find(
        (product) => product.id === "yellow-jacket"
      ) || products[2];

    return {
      formal,
      exercise,
      yellow,
    };
  }, []);

  /* =====================================================
     DESKTOP FIGMA COLUMN ORDER

     LEFT:
     Formal Shirt
     Yellow Jacket
     Exercise Outfit
     Formal Shirt

     CENTER:
     Exercise Outfit
     Formal Shirt
     Yellow Jacket
     Exercise Outfit

     RIGHT:
     Yellow Jacket
     Exercise Outfit
     Formal Shirt
     Yellow Jacket
  ===================================================== */

  const columns = useMemo(() => {
    if (query.trim()) {
      const result = [[], [], []];

      filteredProducts.forEach((product, index) => {
        result[index % 3].push(product);
      });

      return result;
    }

    const {
      formal,
      exercise,
      yellow,
    } = referenceProducts;

    if (!formal || !exercise || !yellow) {
      return [[], [], []];
    }

    return [
      [
        formal,
        yellow,
        exercise,
        formal,
      ],
      [
        exercise,
        formal,
        yellow,
        exercise,
      ],
      [
        yellow,
        exercise,
        formal,
        yellow,
      ],
    ];
  }, [
    filteredProducts,
    query,
    referenceProducts,
  ]);

  /* =====================================================
     MOBILE AND TABLET — TWO COLUMNS
     ALL 12 PRODUCT CARDS
  ===================================================== */

  const mobileColumns = useMemo(() => {
    if (query.trim()) {
      const result = [[], []];

      filteredProducts.forEach((product, index) => {
        result[index % 2].push(product);
      });

      return result;
    }

    const {
      formal,
      exercise,
      yellow,
    } = referenceProducts;

    if (!formal || !exercise || !yellow) {
      return [[], []];
    }

    const leftColumn = [
      formal,
      yellow,
      exercise,
      formal,
      yellow,
      exercise,
    ];

    const rightColumn = [
      exercise,
      formal,
      yellow,
      exercise,
      formal,
      yellow,
    ];

    return [leftColumn, rightColumn];
  }, [
    query,
    filteredProducts,
    referenceProducts,
  ]);

  /* =====================================================
     CATEGORY BUTTONS
  ===================================================== */

  const chooseCategory = (category) => {
    setQuery(category);
  };

  /* =====================================================
     PRODUCT CARD
  ===================================================== */

  const renderProductCard = (
    product,
    columnIndex,
    productIndex
  ) => {
    const quantity = getQuantity(product.id);

    return (
      <article
        className={`search-product-card product-${product.id}`}
        key={`${product.id}-${columnIndex}-${productIndex}`}
      >
        {/* PRODUCT LINK */}

        <Link
          to={`/product/${product.id}`}
          className="search-product-link"
          aria-label={`View ${product.name}`}
        >
          {/* PRODUCT IMAGE */}

          <div className="search-product-image">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="search-product-info">
            <h3>{product.name}</h3>

            <div className="search-product-bottom">
              <p>
                Price:
                <span>
                  ${Number(product.price).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </Link>

        {/* CART ACTION */}

        <div className="search-card-action">
          {quantity > 0 ? (
            <div className="search-quantity-control">
              <button
                type="button"
                onClick={(event) =>
                  changeQuantity(event, product, -1)
                }
                aria-label={`Decrease ${product.name} quantity`}
              >
                <FaMinus aria-hidden="true" />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={(event) =>
                  changeQuantity(event, product, 1)
                }
                aria-label={`Increase ${product.name} quantity`}
              >
                <FaPlus aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="search-cart-button"
              onClick={(event) =>
                addToCart(event, product)
              }
              aria-label={`Add ${product.name} to cart`}
            >
              {/* UPDATED CUSTOM SHOPPING BAG ICON */}
              <ShoppingBagIcon size={24} />
            </button>
          )}
        </div>
      </article>
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="search-page">
      <div className="search-page-canvas">

        {/* INTRODUCTION */}

        <section className="search-intro">
          <h1>
            Looking for something special? Your perfect
            find is just a search away.
          </h1>

          <p>
            <span>
              Duis vestibulum elit vel neque pharetra
              vulputate. Quisque scelerisque nibh urna.
            </span>

            <span>
              Duis rutrum non risus in imperdiet.
            </span>
          </p>
        </section>

        {/* SEARCH BAR AND CATEGORY BUTTONS */}

        <section className="search-controls">
          <form
            className="search-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search"
              aria-label="Search products"
            />

            <button type="submit">
              SEARCH
            </button>
          </form>

          {/* CATEGORY BUTTONS */}

          <div className="search-category-pills">
            <button
              type="button"
              onClick={() =>
                chooseCategory("Casual Wear")
              }
            >
              Casual Wear
            </button>

            <button
              type="button"
              onClick={() =>
                chooseCategory("Saree")
              }
            >
              Sarees
            </button>

            <button
              type="button"
              onClick={() =>
                chooseCategory("One gr Gold Jewellery")
              }
            >
              One gr Gold Jewellery
            </button>

            <button
              type="button"
              onClick={() =>
                chooseCategory("Decorative Items")
              }
            >
              Decorative Items
            </button>
          </div>
        </section>

        {/* SEARCH RESULTS */}

        <section className="search-results">
          {filteredProducts.length === 0 ? (
            <div className="search-empty-state">
              <h2>No products found</h2>
              <p>
                Try another product name or category.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP: THREE-COLUMN LAYOUT */}

              <div className="search-product-columns search-desktop-products">
                {columns.map((column, columnIndex) => (
                  <div
                    className="search-product-column"
                    key={`desktop-${columnIndex}`}
                  >
                    {column.map((product, productIndex) =>
                      renderProductCard(
                        product,
                        columnIndex,
                        productIndex
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* TABLET AND MOBILE: TWO VERTICAL COLUMNS */}

              <div className="search-product-columns search-mobile-products">
                {mobileColumns.map((column, columnIndex) => (
                  <div
                    className="search-product-column"
                    key={`mobile-${columnIndex}`}
                  >
                    {column.map((product, productIndex) =>
                      renderProductCard(
                        product,
                        columnIndex,
                        productIndex
                      )
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

      </div>
    </main>
  );
}

export default Search;