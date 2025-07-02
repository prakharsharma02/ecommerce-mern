import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?search=${search}`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <div>
      <h2>Product Listings</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
              }}
            >
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
