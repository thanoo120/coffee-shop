// components/Navbar.jsx
import { useCart } from "../context/CartContex";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ProfileEdit from "./ProfileEdit";

const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const authMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    // Listen for login/logout in other tabs
    const handleStorage = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handleStorage);
    // Close auth menu on outside click
    const handleClickOutside = (event) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setShowAuthMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowAuthMenu(false);
    setShowProfileEdit(false);
    navigate("/login");
  };

  const handleProfileSave = (updated) => {
    const newUser = { ...user, ...updated };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setShowProfileEdit(false);
  };

  const handleLoginClick = () => {
    setShowAuthMenu((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-500 to-pink-400 text-white px-8 py-4 flex justify-between items-center shadow-lg rounded-b-xl">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform"
      >
        <span className="text-3xl">☕</span> CoffeeShop
      </Link>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:text-yellow-200 font-semibold transition-colors"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="hover:text-yellow-200 font-semibold transition-colors"
        >
          Favorites
        </Link>
        <Link
          to="/cart"
          className="relative hover:text-yellow-200 font-semibold transition-colors"
        >
          <span className="mr-1">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-white text-purple-600 text-xs px-2 py-0.5 rounded-full font-bold border border-purple-400">
              {cart.length}
            </span>
          )}
        </Link>
        {user ? (
          <div className="relative ml-2" ref={authMenuRef}>
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-all"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-300 text-purple-700 rounded-full font-bold text-lg">
                {user.name
                  ? user.name[0].toUpperCase()
                  : user.email[0].toUpperCase()}
              </span>
              <span className="hidden sm:block">Profile</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-purple-700 rounded-xl shadow-xl z-50 p-4 border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <label htmlFor="profile-photo" className="cursor-pointer">
                    <img
                      src={
                        user.photo ||
                        `https://ui-avatars.com/api/?name=${
                          user.name || user.email
                        }`
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-400"
                    />
                  </label>
                  <div>
                    <div className="font-bold text-lg">
                      {user.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowProfileEdit(true);
                    setShowAuthMenu(false);
                  }}
                  className="w-full bg-yellow-300 hover:bg-yellow-400 text-purple-700 py-2 rounded-lg font-semibold mb-2 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            {showProfileEdit && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-purple-600 hover:text-purple-900 text-2xl font-bold"
                    onClick={() => setShowProfileEdit(false)}
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-4 text-purple-700">
                    Edit Profile
                  </h2>
                  <ProfileEdit user={user} onSave={handleProfileSave} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative ml-2" ref={authMenuRef}>
            <button
              onClick={handleLoginClick}
              className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-all"
            >
              Login
            </button>
            {showAuthMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-purple-700 rounded-xl shadow-xl z-50 border border-purple-100">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-purple-100 rounded-t-xl"
                  onClick={() => {
                    setShowAuthMenu(false);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-purple-100 rounded-b-xl"
                  onClick={() => {
                    setShowAuthMenu(false);
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
