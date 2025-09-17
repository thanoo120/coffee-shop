import { BrowserRouter,Routes,Route }  from "react-router-dom";
// import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
 import Navbar from "./components/Navbar";
 import Footer from "./components/footer";
import Menu from "./pages/Menu"
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
     <Navbar /> 
      <Routes>

        <Route path="/" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;