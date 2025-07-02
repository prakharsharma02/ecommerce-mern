import { useContext } from "react";
import { CartContext } from "../CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}
