import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

const priceOptions = [
  ["all", "All Prices"],
  ["under20", "Under $2,000"],
  ["20to30", "$2,000 - $5,000"],
  ["above30", "Above $5,000"],
];

const categorySlug = (value = "") =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

const getProductType = (product) => {
  const name = (product.name || "").toLowerCase();

  if (name.includes("formal shirt")) return "formal";
  if (name.includes("exercise outfit")) return "exercise";
  if (name.includes("yellow jacket")) return "jacket";

  return "standard";
};

const readCart = () => {
  try {
    const stored = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19.901363"
    height="19.5"
    viewBox="0 0 20 20"
    fill="none"
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
      d="M5.71168 2.25H14.1897C14.7417 2.25004 15.2745 2.45302 15.6866 2.82032C16.0987 3.18762 16.3614 3.69361 16.4247 4.242L17.6367 14.742C17.6731 15.0571 17.6424 15.3764 17.5467 15.6789C17.451 15.9813 17.2924 16.2601 17.0813 16.4969C16.8703 16.7338 16.6115 16.9233 16.322 17.0531C16.0326 17.1829 15.7189 17.25 15.4017 17.25H4.49968C4.18245 17.25 3.86881 17.1829 3.57934 17.0531C3.28987 16.9233 3.03111 16.7338 2.82006 16.4969C2.609 16.2601 2.45041 15.9813 2.3547 15.6789C2.25898 15.3764 2.22831 15.0571 2.26468 14.742L3.47668 4.242C3.53998 3.69361 3.80268 3.18762 4.21478 2.82032C4.62689 2.45302 5.15965 2.25004 5.71168 2.25ZM1.24168 3.984C1.36828 2.88721 1.89367 1.87524 2.71789 1.14064C3.5421 0.40604 4.60761 7.8048e-05 5.71168 0H14.1897C15.2937 7.8048e-05 16.3593 0.40604 17.1835 1.14064C18.0077 1.87524 18.5331 2.88721 18.6597 3.984L19.8717 14.484C19.9444 15.1143 19.8831 15.7528 19.6917 16.3577C19.5002 16.9626 19.183 17.5202 18.7609 17.9939C18.3388 18.4675 17.8213 18.8466 17.2424 19.1062C16.6635 19.3657 16.0361 19.5 15.4017 19.5H4.49968C3.86522 19.5 3.23793 19.3657 2.65899 19.1062C2.08005 18.8466 1.56254 18.4675 1.14043 17.9939C0.718316 17.5202 0.401138 16.9628 0.20971 16.3577C0.0182814 15.7528 -0.0430698 15.1143 0.0296823 14.484L1.24168 3.984ZM5.45068 5.625C5.45068 5.32663 5.56921 5.04048 5.78019 4.8295C5.99116 4.61853 6.27731 4.5 6.57568 4.5C6.87405 4.5 7.1602 4.61853 7.37118 4.8295C7.58216 4.61853 7.70068 5.32663 7.70068 5.625V6C7.70068 6.59674 7.93773 7.16903 8.35969 7.59099C8.78165 8.01295 9.35394 8.25 9.95068 8.25C10.5474 8.25 11.1197 8.01295 11.5417 7.59099C11.9636 7.16903 12.2007 6.59674 12.2007 5.625C12.2007 5.32663 12.3192 5.04048 12.5302 4.8295C12.7412 4.61853 13.0273 4.5 13.3257 4.5C13.624 4.5 13.9102 4.61853 14.1212 4.8295C14.3322 5.04053 14.4507 5.32663 14.4507 5.625V6C14.4507 7.19347 13.9766 8.33807 13.1327 9.18198C12.2887 10.0259 11.1442 10.5 9.95068 10.5C8.75721 10.5 7.61262 10.0259 6.7687 9.18198C5.92479 9.33807 5.45068 6.59674 5.45068 5.625Z"
      fill="#BB8E43"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

function Categories() {
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");

  const initialCategory =
    categories.find(
      (category) =>
        categorySlug(category) ===
        (queryCategory || "").toLowerCase()
    ) || "All Products";

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [selectedSize, setSelectedSize] = useState("S");
  const [priceFilters, setPriceFilters] = useState(["all"]);
  const [sortOption, setSortOption] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [cartItems, setCartItems] = useState(readCart);
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const [columnCount, setColumnCount] = useState(() =>
    typeof window === "undefined"
      ? 3
      : window.innerWidth < 1024
        ? 2
        : 3
  );

  const loadMoreRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(window.innerWidth < 1024 ? 2 : 3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

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

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeDropdown
      );
    };
  }, []);

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
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [filteredProducts, sortOption]);

  const catalogueTarget =
    selectedCategory === "All Products" &&
    priceFilters.includes("all")
      ? TOTAL_ALL_PRODUCTS
      : sortedProducts.length;

  const catalogueItems = useMemo(() => {
    if (!sortedProducts.length) return [];

    const count = Math.min(visibleCount, catalogueTarget);

    const isDefaultCatalogue =
      selectedCategory === "All Products" &&
      priceFilters.includes("all") &&
      sortOption === "featured";

    const formal = sortedProducts.find(
      (product) => getProductType(product) === "formal"
    );

    const exercise = sortedProducts.find(
      (product) => getProductType(product) === "exercise"
    );

    const jacket = sortedProducts.find(
      (product) => getProductType(product) === "jacket"
    );

    if (isDefaultCatalogue && formal && exercise && jacket) {
      const pattern = [formal, exercise, jacket];

      return Array.from({ length: count }, (_, index) => {
        const product = pattern[index % pattern.length];
        const productType = getProductType(product);

        return {
          ...product,
          displayId: `${product.id}-${index}`,
          productType,
          layoutVariant:
            productType === "exercise"
              ? "featured"
              : "standard",
        };
      });
    }

    return Array.from({ length: count }, (_, index) => {
      const product =
        sortedProducts[index % sortedProducts.length];

      const productType = getProductType(product);

      return {
        ...product,
        displayId: `${product.id}-${index}`,
        productType,
        layoutVariant:
          productType === "exercise"
            ? "featured"
            : "standard",
      };
    });
  }, [
    sortedProducts,
    visibleCount,
    catalogueTarget,
    selectedCategory,
    priceFilters,
    sortOption,
  ]);

  const columns = useMemo(() => {
    const result = Array.from(
      { length: columnCount },
      () => []
    );

    const isDefaultCatalogue =
      selectedCategory === "All Products" &&
      priceFilters.includes("all") &&
      sortOption === "featured";

    if (isDefaultCatalogue) {
      const formal = catalogueItems.find(
        (product) => product.productType === "formal"
      );

      const exercise = catalogueItems.find(
        (product) => product.productType === "exercise"
      );

      const jacket = catalogueItems.find(
        (product) => product.productType === "jacket"
      );

      if (formal && exercise && jacket) {
        const productsByType = {
          formal,
          exercise,
          jacket,
        };

        if (columnCount === 3) {
          const desktopPatterns = [
            ["formal", "jacket", "exercise"],
            ["exercise", "formal", "jacket"],
            ["jacket", "exercise", "formal"],
          ];

          desktopPatterns.forEach((pattern, columnIndex) => {
            for (
              let row = 0;
              row < Math.ceil(catalogueItems.length / 3);
              row++
            ) {
              const type = pattern[row % pattern.length];
              const index = row * 3 + columnIndex;

              if (index >= catalogueItems.length) break;

              const product = productsByType[type];

              result[columnIndex].push({
                ...product,
                displayId:
                  `${product.id}-col-${columnIndex}-row-${row}`,
                productType: type,
                layoutVariant:
                  type === "exercise"
                    ? "featured"
                    : "standard",
              });
            }
          });

          return result;
        }

        const mobilePattern = ["formal", "exercise", "jacket"];

        catalogueItems.forEach((_, index) => {
          const type = mobilePattern[index % mobilePattern.length];
          const product = productsByType[type];
          const targetColumn = index % 2;

          result[targetColumn].push({
            ...product,
            displayId: `${product.id}-mobile-${index}`,
            productType: type,
            layoutVariant:
              type === "exercise" ? "featured" : "standard",
          });
        });

        return result;
      }
    }

    catalogueItems.forEach((product, index) => {
      if (columnCount === 3) {
        const row = Math.floor(index / 3);
        const targetColumn = (index % 3 + row) % 3;

        result[targetColumn].push(product);
      } else {
        result[index % columnCount].push(product);
      }
    });

    return result;
  }, [
    catalogueItems,
    columnCount,
    selectedCategory,
    priceFilters,
    sortOption,
  ]);

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || visibleCount >= catalogueTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + LOAD_BATCH, catalogueTarget)
          );
        }
      },
      {
        rootMargin: "500px 0px",
        threshold: 0,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [visibleCount, catalogueTarget]);

  const updateCart = (updater) => {
    const next = updater(readCart());

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }

    setCartItems(next);

    window.dispatchEvent(
      new Event("sreecollections-cart-updated")
    );
  };

  const findCartItem = (product) =>
    cartItems.find(
      (item) =>
        String(item.id) === String(product.id) &&
        item.size === selectedSize
    );

  const addToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    updateCart((current) => {
      const existingIndex = current.findIndex(
        (item) =>
          String(item.id) === String(product.id) &&
          item.size === selectedSize
      );

      if (existingIndex === -1) {
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

      return current.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      );
    });
  };

  const changeQuantity = (event, product, delta) => {
    event.preventDefault();
    event.stopPropagation();

    updateCart((current) =>
      current
        .map((item) =>
          String(item.id) === String(product.id) &&
          item.size === selectedSize
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + delta,
              }
            : item
        )
        .filter((item) => Number(item.quantity) > 0)
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
      if (value === "all") return ["all"];

      const withoutAll = current.filter(
        (item) => item !== "all"
      );

      if (withoutAll.includes(value)) {
        const next = withoutAll.filter(
          (item) => item !== value
        );

        return next.length ? next : ["all"];
      }

      return [...withoutAll, value];
    });
  };

  const displayedCount =
    selectedCategory === "All Products" &&
    priceFilters.includes("all")
      ? TOTAL_ALL_PRODUCTS
      : filteredProducts.length;

  const sortLabels = {
    featured: "Featured",
    low: "Price: Low to High",
    high: "Price: High to Low",
    name: "Name",
  };

  const ProductCard = ({ product }) => {
    const cartItem = findCartItem(product);

    return (
      <article
        className={[
          "category-product-card",
          `category-product-card--${product.layoutVariant}`,
          `category-product-card--${product.productType}`,
          `product-${categorySlug(product.name)}`,
        ].join(" ")}
      >
        <Link
          to={`/product/${product.id}`}
          className="category-product-link"
          aria-label={`View ${product.name}`}
        >
          <div className="category-product-image">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </div>

          <div className="category-product-info">
            <h3 title={product.name}>{product.name}</h3>
          </div>
        </Link>

        <div className="category-product-bottom">
          <p className="category-product-price">
            Price:{" "}
            <span>
              ${Number(product.price).toFixed(2)}
            </span>
          </p>

          <div className="category-card-action">
            {cartItem ? (
              <div className="category-quantity-control">
                <button
                  type="button"
                  aria-label={`Decrease ${product.name} quantity`}
                  onClick={(event) =>
                    changeQuantity(event, product, -1)
                  }
                >
                  −
                </button>

                <span>{cartItem.quantity}</span>

                <button
                  type="button"
                  aria-label={`Increase ${product.name} quantity`}
                  onClick={(event) =>
                    changeQuantity(event, product, 1)
                  }
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="category-cart-button"
                aria-label={`Add ${product.name} to cart`}
                onClick={(event) =>
                  addToCart(event, product)
                }
              >
                <ShoppingBagIcon />
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="categories-page">
      <section className="categories-heading">
        <div className="categories-heading-left">
          <h1>{selectedCategory}</h1>
          <span>Showing {displayedCount} results</span>
        </div>

        <div className="featured-dropdown" ref={sortRef}>
          <button
            type="button"
            className="featured-dropdown-button"
            onClick={() =>
              setSortOpen((previous) => !previous)
            }
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
          >
            <span>{sortLabels[sortOption]}</span>
            <span className="featured-dropdown-arrow">⌄</span>
          </button>

          {sortOpen && (
            <div
              className="featured-dropdown-menu"
              role="listbox"
            >
              {Object.entries(sortLabels).map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="option"
                    aria-selected={sortOption === value}
                    className={
                      sortOption === value ? "active" : ""
                    }
                    onClick={() => {
                      setSortOption(value);
                      setSortOpen(false);
                    }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>

      <section className="categories-main">
        <aside className="category-sidebar">
          <div className="sidebar-section categories-filter-section">
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

            {priceOptions.map(([value, label]) => (
              <label className="price-checkbox" key={value}>
                <input
                  type="checkbox"
                  checked={priceFilters.includes(value)}
                  onChange={() => handlePriceFilter(value)}
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
                    selectedSize === size ? "active" : ""
                  }
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
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
              <div
                className={`category-product-columns columns-${columnCount}`}
              >
                {columns.map((column, index) => (
                  <div className="product-column" key={index}>
                    {column.map((product) => (
                      <ProductCard
                        key={product.displayId}
                        product={product}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div
                ref={loadMoreRef}
                className="category-load-more-area"
              >
                {catalogueItems.length < catalogueTarget && (
                  <button
                    type="button"
                    className="category-load-more"
                    onClick={() =>
                      setVisibleCount((current) =>
                        Math.min(
                          current + LOAD_BATCH,
                          catalogueTarget
                        )
                      )
                    }
                  >
                    Load More
                  </button>
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