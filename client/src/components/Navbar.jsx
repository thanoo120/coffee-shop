// components/Navbar.jsx
import { useCart } from "../context/CartContex";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">
        🛍️ MyShop
      </Link>
      
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/favorites" className="hover:underline">
          Favorites
        </Link>
        <Link to="/cart" className="relative hover:underline">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
