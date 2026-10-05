import { Link } from "react-router-dom";
import {
  FaCartShopping,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";

function ProductCard({
  product,
  quantity = 0,
  onAdd,
  onIncrease,
  onDecrease,
}) {
  return (
    <article
      className={`sc-product-card sc-product-card-${product.id}`}
    >

      {/* Product image */}

      <Link
        to={`/product/${product.id}`}
        className="sc-product-card-image-link"
      >
        <div className="sc-product-card-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>


      {/* Product information */}

      <div className="sc-product-card-content">

        <Link
          to={`/product/${product.id}`}
          className="sc-product-card-name"
        >
          {product.name}
        </Link>


        <div className="sc-product-card-footer">

          <span className="sc-product-card-price">
            Price: $
            {Number(product.price).toFixed(2)}
          </span>


          {/* Already in cart */}

          {quantity > 0 ? (
            <div className="sc-product-card-quantity">

              <button
                type="button"
                onClick={() =>
                  onDecrease(product)
                }
                aria-label={`Decrease ${product.name} quantity`}
              >
                <FaMinus />
              </button>


              <span>
                {quantity}
              </span>


              <button
                type="button"
                onClick={() =>
                  onIncrease(product)
                }
                aria-label={`Increase ${product.name} quantity`}
              >
                <FaPlus />
              </button>

            </div>
          ) : (

            /* Not in cart */

            <button
              type="button"
              className="sc-product-card-cart-button"
              onClick={() =>
                onAdd(product)
              }
              aria-label={`Add ${product.name} to cart`}
            >
              <FaCartShopping />
            </button>

          )}

        </div>

      </div>

    </article>
  );
}

export default ProductCard;