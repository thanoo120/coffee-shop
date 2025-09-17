import { useState, useEffect } from "react";
import { useCart } from "../context/CartContex";

const ProductList = ({ products }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorited = (product) => favorites.includes(product._id);

  const toggleFavorite = (product, e) => {
    e.stopPropagation();
    if (isFavorited(product)) {
      setFavorites(favorites.filter((id) => id !== product._id));
    } else {
      setFavorites([...favorites, product._id]);
    }
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    closeModal();
  };

  return (
    <>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded shadow p-4 flex flex-col justify-between cursor-pointer"
            onClick={() => openProduct(product)}
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover mb-2 rounded"
              />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-700 font-bold">{product.price} LKR</p>
            </div>

            {/* Like Button - Moved to Bottom */}
            <button
              className="mt-4 text-red-500 text-xl self-end"
              onClick={(e) => toggleFavorite(product, e)}
            >
              {isFavorited(product) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-40 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-2">{selectedProduct.description}</p>
            <p className="text-green-700 font-bold mb-4">
              {selectedProduct.price} LKR
            </p>

            <div className="flex items-center mb-4">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-3 py-1 border rounded-l"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 border rounded-r"
              >
                +
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Delivery within 3-5 business days. Free shipping over 5000 LKR.
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorites yet</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter((product) => favorites.includes(product._id))
              .map((product) => (
                <li
                  key={product._id}
                  className="p-4 border rounded shadow cursor-pointer"
                  onClick={() => openProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-green-700">{product.price} LKR</p>
                  <button
                    className="mt-2 text-red-500 text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product, e);
                    }}
                  >
                    ❤️ Remove
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductList;
