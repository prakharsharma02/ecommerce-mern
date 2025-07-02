import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", { name, price });
      setName("");
      setPrice("");
      getProducts();
      alert("Product added!");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>Existing Products:</h3>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
