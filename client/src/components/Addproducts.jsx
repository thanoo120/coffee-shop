import axios from "axios";
import { useState } from "react";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

      alert("Product added successfully!");

      setFormData({ name: "", price: "", description: "", image: null });
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product.");
    }
  };

  return (
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
  );
};

export default AddProducts;
