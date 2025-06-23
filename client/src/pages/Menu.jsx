import axios from "axios";
import { useEffect, useState } from "react";
import AddProducts from "../components/Addproducts";
import ProductList from "../components/ProductList";

const MenuItems = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="p-6">
      <AddProducts onUpload={fetchProducts} />

      <ProductList products={products} />
    </div>
  );
};

export default MenuItems;
