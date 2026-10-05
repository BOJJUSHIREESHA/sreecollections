import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";


// =====================================================
// CHECK REFRESH ONLY ONCE
// =====================================================

function RefreshToLanding() {
  const navigate = useNavigate();
  const checked = useRef(false);

  useEffect(() => {

    // Prevent this check from running again
    // during normal React Router navigation
    if (checked.current) {
      return;
    }

    checked.current = true;

    const navigation =
      performance.getEntriesByType("navigation")[0];

    const isRefresh =
      navigation?.type === "reload";

    const currentPath =
      window.location.pathname;

    // If the website was refreshed while
    // on any page other than the landing page
    if (isRefresh && currentPath !== "/") {
      navigate("/", { replace: true });
    }

  }, [navigate]);

  return null;
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      {/* Check browser refresh once */}
      <RefreshToLanding />

      <Navbar />

      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* MAIN HOME PAGE */}
        <Route
          path="/home"
          element={<HomePage />}
        />

        {/* OTHER PAGES */}
        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:productId"
          element={<ProductDetails />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;