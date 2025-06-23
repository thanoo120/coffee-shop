import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContex";

const MenuItems = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit new product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("image", formData.image);

      await axios.post("http://localhost:5000/api/products/add-product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Refresh product list
      fetchProducts();

      // Clear form
      setFormData({ name: "", price: "", description: "", image: null });
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 border p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
          Upload Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-700 font-bold">{product.price} LKR</p>
            <button
              className="mt-2 bg-brown-600 text-white py-1 px-4 rounded hover:bg-brown-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
