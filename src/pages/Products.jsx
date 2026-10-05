import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";

function Products() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <main className="products-page">

      <section className="products-header">
        <p className="section-subtitle">SREECOLLECTIONS</p>

        <h1>
          {category
            ? category.replace("-", " ")
            : "All Products"}
        </h1>

        <p>Explore our fashion and lifestyle collections.</p>
      </section>

      <section className="products-grid">

        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="product-card"
            key={product.id}
          >
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span>{product.name}</span>
              )}
            </div>

            <h2>{product.name}</h2>

            <p>₹{product.price}</p>
          </Link>
        ))}

      </section>

    </main>
  );
}

export default Products;