import { useState } from "react"
import products from "./data/products"
import ProductCard from "./components/ProductCard"

function App() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [cart, setCart] = useState([])
const [cartOpen, setCartOpen] = useState(false)

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === "All" || product.category === category

    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product])
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">ShopEase</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </div>

        <button
  className="cart-btn"
  onClick={() => setCartOpen(true)}
>
  🛒 Cart ({cart.length})
</button>
      </nav>

      <main>

        {/* HERO */}
        <section className="hero" id="home">

          <div className="hero-content">
            <p className="tagline">
              YOUR EVERYDAY SHOPPING DESTINATION
            </p>

            <h1>
              Find what you
              <span> love.</span>
            </h1>

            <p className="hero-text">
              Discover products you'll love, all in one place.
              Simple shopping, great products, better choices.
            </p>

            <button
              className="shop-btn"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now →
            </button>
          </div>

          <div className="hero-card">
            <div className="circle">🛍️</div>
            <h2>Fresh Finds</h2>
            <p>Curated products for you</p>
          </div>

        </section>

        {/* CATEGORIES */}
        <section className="categories" id="categories">

          <h2>Shop by Category</h2>

          <div className="category-grid">

            <div className="category-card">
              👕 Fashion
            </div>

            <div className="category-card">
              💻 Electronics
            </div>

            <div className="category-card">
              🏠 Home & Living
            </div>

            <div className="category-card">
              🎧 Accessories
            </div>

          </div>

        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="products">

          <div className="section-heading">
            <div>
              <p className="small-title">
                CURATED FOR YOU
              </p>

              <h2>Featured Products</h2>
            </div>
          </div>

          {/* SEARCH */}
          <div className="search-area">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="filter-buttons">

              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "filter-btn active"
                      : "filter-btn"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (

            <div className="products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}

            </div>

          ) : (

            <div className="no-products">
              <h3>No products found</h3>
              <p>Try another search or category.</p>
            </div>

          )}

        </section>

        {/* ABOUT */}
        <section className="about" id="about">

          <p className="small-title">
            ABOUT SHOEASE
          </p>

          <h2>Shopping made simple.</h2>

          <p>
            ShopEase brings carefully selected products together
            in one simple and modern shopping experience.
          </p>

        </section>

      </main>

{cartOpen && (
  <div className="cart-overlay">
    <div className="cart-panel">

      <div className="cart-header">
        <h2>Your Cart</h2>

        <button
          className="close-cart"
          onClick={() => setCartOpen(false)}
        >
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div>🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((item, index) => (
              <div className="cart-item" key={`${item.id}-${index}`}>

                <div className="cart-item-icon">
                  {item.emoji}
                </div>

                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>
            ))}

          </div>

          <div className="cart-total">
            <span>Total</span>

            <strong>
              ₹
              {cart
                .reduce((total, item) => total + item.price, 0)
                .toLocaleString("en-IN")}
            </strong>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout →
          </button>
        </>
      )}

    </div>
  </div>
)}

</div>
  )
}

export default App