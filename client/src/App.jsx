import { BrowserRouter,Routes,Route }  from "react-router-dom";
// import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
 import Navbar from "./components/Navbar";
 import Footer from "./components/footer";
import Menu from "./pages/Menu"
// import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
     <Navbar /> 
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;