import axios from "axios";
import { useEffect,useState } from "react";
import {useCart} from "../context/CartContex";

const MenuItems = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

     return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded shadow p-4">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-700 font-bold">${product.price}</p>
          <button
            className="mt-2 bg-brown-600 text-white py-1 px-4 rounded hover:bg-brown-700"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default MenuItems;