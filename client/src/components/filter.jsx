// components/ProductFilter.jsx
import { useState } from "react";

const ProductFilter = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter({ search, minPrice, maxPrice });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-auto"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-auto"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-auto"
      />
      <button
        onClick={handleFilter}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Apply
      </button>
    </div>
  );
};

export default ProductFilter;
