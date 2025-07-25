import axios from "axios";
import { useEffect, useState } from "react";
import ProductFilter from "../components/filter";
import ProductList from "../components/ProductList";

const MenuItems = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/all");
      setProducts(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

 const handleFilter =async ({ search, minPrice, maxPrice }) => {
     const productsData= await axios.get("http://localhost:5000/api/products/all");
    const result = productsData.filter((product) => {
      const matchName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchMin =
        minPrice === "" || parseFloat(product.price) >= parseFloat(minPrice);
      const matchMax =
        maxPrice === "" || parseFloat(product.price) <= parseFloat(maxPrice);
      return matchName && matchMin && matchMax;
    });
    setFilteredProducts(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <ProductFilter onFilter={handleFilter} />
      <ProductList products={products} />
    </div>
  );
};

export default MenuItems;
