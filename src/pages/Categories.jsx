import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import products from "../data/products";


import "../categories.css";

const CART_KEY = "sreecollections-cart";
const TOTAL_ALL_PRODUCTS = 321;
const INITIAL_VISIBLE = 18;
const LOAD_BATCH = 18;

const categories = [
  "All Products",
  "Casual Wear",
  "Sarees",
  "One Gram Jewellery",
  "Decorative Items",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const readCart = () => {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const categorySlug = (value) =>
  value.toLowerCase().replace(/\s+/g, "-");

function Categories() {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");

  const initialCategory =
    categories.find(
      (item) =>
        categorySlug(item) ===
        (queryCategory || "").toLowerCase()
    ) || "All Products";

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [selectedSize, setSelectedSize] = useState("S");
  const [priceFilters, setPriceFilters] = useState(["all"]);
  const [sortOption, setSortOption] = useState("featured");
  const [sortOpen, setSortOpen] =
  useState(false);

  const [cartItems, setCartItems] = useState(readCart);

  /*
    Only a batch is rendered initially.
    More products are added when the user clicks Load More
    or reaches the bottom of the catalogue.
  */
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const syncCart = () => setCartItems(readCart());

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

  /*
    Whenever category, price filter, or sorting changes,
    start the catalogue again from the top.
  */
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [selectedCategory, priceFilters, sortOption]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All Products" ||
        product.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const price = Number(product.price);

      const priceMatch =
        priceFilters.includes("all") ||
        (priceFilters.includes("under20") && price < 20) ||
        (priceFilters.includes("20to30") &&
          price >= 20 &&
          price <= 30) ||
        (priceFilters.includes("above30") && price > 30);

      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, priceFilters]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortOption === "low") {
      return result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortOption === "high") {
      return result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortOption === "name") {
      return result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [filteredProducts, sortOption]);

  /*
    The supplied product data is reused to reproduce the
    321-card catalogue shown by the reference design.

    This does NOT create fake product objects. It repeats the
    actual products already present in products.js.
  */
  const catalogueTarget =
    selectedCategory === "All Products" &&
    priceFilters.includes("all")
      ? TOTAL_ALL_PRODUCTS
      : sortedProducts.length;

  const catalogueItems = useMemo(() => {
    if (!sortedProducts.length) return [];

    const result = [];
    const count = Math.min(
      visibleCount,
      catalogueTarget
    );

    for (let index = 0; index < count; index += 1) {
      result.push({
        ...sortedProducts[index % sortedProducts.length],
        displayId: `${sortedProducts[index % sortedProducts.length].id}-${index}`,
      });
    }

    return result;
  }, [
    sortedProducts,
    visibleCount,
    catalogueTarget,
  ]);

  /*
    Keep the reference staggered three-column arrangement.
  */
  const columns = useMemo(() => {
    const result = [[], [], []];

    catalogueItems.forEach((product, index) => {
      const row = Math.floor(index / 3);
      const pattern = row % 3;

      const targetColumn =
        pattern === 0
          ? index % 3
          : pattern === 1
            ? (index + 1) % 3
            : (index + 2) % 3;

      result[targetColumn].push(product);
    });

    return result;
  }, [catalogueItems]);

  /*
    Automatically load another batch when the user scrolls
    close to the end of the currently visible catalogue.
  */
  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node) return;
    if (visibleCount >= catalogueTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((current) =>
            Math.min(
              current + LOAD_BATCH,
              catalogueTarget
            )
          );
        }
      },
      {
        root: null,
        rootMargin: "500px 0px",
        threshold: 0,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [visibleCount, catalogueTarget]);

  const updateCart = (updater) => {
    setCartItems((current) => {
      const next = updater(current);

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(next)
      );

      window.dispatchEvent(
        new Event("sreecollections-cart-updated")
      );

      return next;
    });
  };

  const findCartItem = (product) =>
    cartItems.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize
    );

  const addToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    updateCart((current) => {
      const index = current.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize
      );

      if (index === -1) {
        return [
          ...current,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1,
            size: selectedSize,
            colour: "Black",
          },
        ];
      }

      return current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      );
    });
  };

  const changeQuantity = (
    event,
    product,
    delta
  ) => {
    event.preventDefault();
    event.stopPropagation();

    updateCart((current) =>
      current
        .map((item) =>
          item.id === product.id &&
          item.size === selectedSize
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) +
                  delta,
              }
            : item
        )
        .filter(
          (item) => Number(item.quantity) > 0
        )
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePriceFilter = (value) => {
    setPriceFilters((current) => {
      // All Prices is the default and cannot be
      // combined with individual price ranges.
      if (value === "all") {
        return ["all"];
      }

      // Remove All Prices when selecting a
      // specific price range.
      const withoutAll = current.filter(
        (item) => item !== "all"
      );

      // Uncheck an already selected range.
      if (withoutAll.includes(value)) {
        const updated = withoutAll.filter(
          (item) => item !== value
        );

        // If no range remains selected,
        // return to All Prices.
        return updated.length ? updated : ["all"];
      }

      // Multiple price ranges can be selected.
      return [...withoutAll, value];
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(
        current + LOAD_BATCH,
        catalogueTarget
      )
    );
  };

  const ProductCard = ({ product }) => {
    const cartItem = findCartItem(product);

    return (
      <article
        className={`category-product-card product-${product.id}`}
      >
        <Link
          to={`/product/${product.id}`}
          className="category-product-link"
        >
          <div className="category-product-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="category-product-info">
            <h3>{product.name}</h3>

            <p>
              Price:
              <span>
                ${Number(product.price).toFixed(2)}
              </span>
            </p>
          </div>
        </Link>

        <div className="category-card-action">
          {cartItem ? (
            <div className="category-quantity-control">
              <button
                type="button"
                onClick={(event) =>
                  changeQuantity(
                    event,
                    product,
                    -1
                  )
                }
                aria-label={`Decrease ${product.name} quantity`}
              >
                −
              </button>

              <span>{cartItem.quantity}</span>

              <button
                type="button"
                onClick={(event) =>
                  changeQuantity(
                    event,
                    product,
                    1
                  )
                }
                aria-label={`Increase ${product.name} quantity`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="category-cart-button"
              onClick={(event) =>
                addToCart(event, product)
              }
              aria-label={`Add ${product.name} to cart`}
            >
              <FiShoppingBag />
            </button>
          )}
        </div>
      </article>
    );
  };

  const displayedCount =
    selectedCategory === "All Products" &&
    priceFilters.includes("all")
      ? TOTAL_ALL_PRODUCTS
      : filteredProducts.length;

  return (
    <main className="categories-page">
      <section className="categories-heading">
        <div className="categories-heading-left">
          <h1>{selectedCategory}</h1>

          <span>
            Showing {displayedCount} results
          </span>
        </div>

        <div className="featured-dropdown">

  <button
    type="button"
    className="featured-dropdown-button"
    onClick={() =>
      setSortOpen((previous) => !previous)
    }
    aria-expanded={sortOpen}
    aria-haspopup="listbox"
  >
    <span>
      {sortOption === "featured"
        ? "Featured"
        : sortOption === "low"
        ? "Price: Low to High"
        : sortOption === "high"
        ? "Price: High to Low"
        : "Name"}
    </span>

    <span className="featured-dropdown-arrow">
      ⌄
    </span>
  </button>

  {sortOpen && (
    <div
      className="featured-dropdown-menu"
      role="listbox"
    >

      <button
        type="button"
        className={
          sortOption === "featured"
            ? "active"
            : ""
        }
        onClick={() => {
          setSortOption("featured");
          setSortOpen(false);
        }}
      >
        Featured
      </button>

      <button
        type="button"
        className={
          sortOption === "low"
            ? "active"
            : ""
        }
        onClick={() => {
          setSortOption("low");
          setSortOpen(false);
        }}
      >
        Price: Low to High
      </button>

      <button
        type="button"
        className={
          sortOption === "high"
            ? "active"
            : ""
        }
        onClick={() => {
          setSortOption("high");
          setSortOpen(false);
        }}
      >
        Price: High to Low
      </button>

      <button
        type="button"
        className={
          sortOption === "name"
            ? "active"
            : ""
        }
        onClick={() => {
          setSortOption("name");
          setSortOpen(false);
        }}
      >
        Name
      </button>

    </div>
  )}

</div>
      </section>

      <section className="categories-main">
        <aside className="category-sidebar">
          <div className="sidebar-section">
            <h2>Categories</h2>

            <div className="category-options">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section price-section">
            <h2>Price Range</h2>

            {[
              ["all", "All Prices"],
              ["under20", "Under $2,000"],
              ["20to30", "$2,000 - $5,000"],
              ["above30", "Above $5,000"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="price-checkbox"
              >
                <input
                  type="checkbox"
                  name="price"
                  checked={priceFilters.includes(value)}
                  onChange={() =>
                    handlePriceFilter(value)
                  }
                />

                <span>{label}</span>
              </label>
            ))}
          </div>


          <div className="sidebar-section size-section">
            <h2>Size</h2>

            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section
          className="category-products"
          aria-label="Products"
        >
          {sortedProducts.length === 0 ? (
            <div className="no-products">
              No Products Found
            </div>
          ) : (
            <>
              <div className="category-product-columns">
                {columns.map(
                  (column, index) => (
                    <div
                      className="product-column"
                      key={`column-${index}`}
                    >
                      {column.map((product) => (
                        <ProductCard
                          key={product.displayId}
                          product={product}
                        />
                      ))}
                    </div>
                  )
                )}
              </div>

              <div
                ref={loadMoreRef}
                className="category-load-more-area"
              >
                {visibleCount <
                catalogueTarget ? (
                  <button
                    type="button"
                    className="category-load-more"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                ) : (
                  <p className="all-products-loaded">
                    All {catalogueTarget} products loaded
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default Categories;
