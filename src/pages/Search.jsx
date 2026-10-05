import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCartShopping,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import products from "../data/products";
import "./Search.css";

const CART_KEY = "sreecollections-cart";

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

function Search() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(readCart);

  /* =====================================================
     FIGMA SCALE
     Master design = 1728px
  ===================================================== */

  useEffect(() => {
    const updateSearchScale = () => {
      const FIGMA_WIDTH = 1728;

      const viewportWidth =
        document.documentElement.clientWidth;

      const scale = Math.min(
        1,
        viewportWidth / FIGMA_WIDTH
      );

      document.documentElement.style.setProperty(
        "--search-figma-scale",
        scale.toString()
      );
    };

    updateSearchScale();

    window.addEventListener(
      "resize",
      updateSearchScale
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateSearchScale
      );

      document.documentElement.style.removeProperty(
        "--search-figma-scale"
      );
    };
  }, []);

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

    window.addEventListener(
      "storage",
      syncCart
    );

    return () => {
      window.removeEventListener(
        "sreecollections-cart-updated",
        syncCart
      );

      window.removeEventListener(
        "storage",
        syncCart
      );
    };
  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  const saveCart = (nextCart) => {
    setCart(nextCart);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(nextCart)
    );

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
        item.id === product.id &&
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
     CHANGE QUANTITY
  ===================================================== */

  const changeQuantity = (
    event,
    product,
    change
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const nextCart = cart
      .map((item) =>
        item.id === product.id &&
        item.size === "M"
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) +
                change,
            }
          : item
      )
      .filter(
        (item) =>
          Number(item.quantity || 0) > 0
      );

    saveCart(nextCart);
  };

  /* =====================================================
     GET QUANTITY
  ===================================================== */

  const getQuantity = (productId) => {
    const item = cart.find(
      (cartItem) =>
        cartItem.id === productId &&
        cartItem.size === "M"
    );

    return Number(item?.quantity || 0);
  };

  /* =====================================================
     SEARCH FILTER
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) =>
      `${product.name} ${
        product.category || ""
      }`
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  /* =====================================================
     REFERENCE PRODUCTS
  ===================================================== */

  const referenceProducts = useMemo(() => {
    const formal =
      products.find(
        (item) =>
          item.id === "formal-shirt"
      ) || products[0];

    const exercise =
      products.find(
        (item) =>
          item.id === "exercise-outfit"
      ) || products[1];

    const yellow =
      products.find(
        (item) =>
          item.id === "yellow-jacket"
      ) || products[2];

    return [
      formal,
      exercise,
      yellow,
    ].filter(Boolean);
  }, []);

  /* =====================================================
     FIGMA COLUMN ORDER
  ===================================================== */

  const columns = useMemo(() => {
    if (query.trim()) {
      const result = [
        [],
        [],
        [],
      ];

      filteredProducts.forEach(
        (product, index) => {
          result[index % 3].push(
            product
          );
        }
      );

      return result;
    }

    const [
      formal,
      exercise,
      yellow,
    ] = referenceProducts;

    if (
      !formal ||
      !exercise ||
      !yellow
    ) {
      return [
        [],
        [],
        [],
      ];
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
     CATEGORY
  ===================================================== */

  const chooseCategory = (value) => {
    setQuery(value);
  };

  return (
    <main className="search-page">

      <div className="search-page-canvas">

        {/* =================================================
            INTRO
        ================================================= */}

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


        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <section className="search-controls">

          <form
            className="search-form"
            onSubmit={(event) =>
              event.preventDefault()
            }
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


          {/* =================================================
              CATEGORY TAGS
          ================================================= */}

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
                chooseCategory(
                  "One gr Gold Jewellery"
                )
              }
            >
              One gr Gold Jewellery
            </button>

            <button
              type="button"
              onClick={() =>
                chooseCategory(
                  "Decorative Items"
                )
              }
            >
              Decorative Items
            </button>

          </div>

        </section>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        <section className="search-results">

          {filteredProducts.length === 0 ? (

            <div className="search-empty-state">

              <h2>
                No products found
              </h2>

              <p>
                Try another product name or
                category.
              </p>

            </div>

          ) : (

            <div className="search-product-columns">

              {columns.map(
                (
                  column,
                  columnIndex
                ) => (

                  <div
                    className="search-product-column"
                    key={columnIndex}
                  >

                    {column.map(
                      (
                        product,
                        productIndex
                      ) => {

                        const quantity =
                          getQuantity(
                            product.id
                          );

                        return (

                          <article
                            className={`search-product-card product-${product.id}`}
                            key={`${product.id}-${columnIndex}-${productIndex}`}
                          >

                            <Link
                              to={`/product/${product.id}`}
                              className="search-product-link"
                            >

                              <div className="search-product-image">

                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.name
                                  }
                                />

                              </div>


                              <div className="search-product-info">

                                <h3>
                                  {
                                    product.name
                                  }
                                </h3>

                                <div className="search-product-bottom">

                                  <p>
                                    Price:
                                    <span>
                                      $
                                      {Number(
                                        product.price
                                      ).toFixed(
                                        2
                                      )}
                                    </span>
                                  </p>

                                </div>

                              </div>

                            </Link>


                            {/* =================================
                                CART ACTION
                            ================================= */}

                            <div className="search-card-action">

                              {quantity > 0 ? (

                                <div className="search-quantity-control">

                                  <button
                                    type="button"
                                    onClick={(
                                      event
                                    ) =>
                                      changeQuantity(
                                        event,
                                        product,
                                        -1
                                      )
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
                                    onClick={(
                                      event
                                    ) =>
                                      changeQuantity(
                                        event,
                                        product,
                                        1
                                      )
                                    }
                                    aria-label="Increase quantity"
                                  >
                                    <FaPlus />
                                  </button>

                                </div>

                              ) : (

                                <button
                                  type="button"
                                  className="search-cart-button"
                                  onClick={(
                                    event
                                  ) =>
                                    addToCart(
                                      event,
                                      product
                                    )
                                  }
                                  aria-label={`Add ${product.name} to cart`}
                                >
                                  <FaCartShopping />
                                </button>

                              )}

                            </div>

                          </article>

                        );
                      }
                    )}

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default Search;



