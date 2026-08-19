function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product)
  }

  return (
    <div className="product-card">

      <div className="product-image">
        {product.emoji}
      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">

          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            className="add-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProductCard