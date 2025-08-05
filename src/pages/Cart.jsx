import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalAmount, handleCardClick } = useCart();

  if (cartItems.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">
        Your cart is empty.
        <br />
        <Link to="/" className="text-pink-600 underline">Go Shopping</Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
            onClick={() => handleCardClick(item, navigate)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.images?.front || "/fallback.jpg"}
                alt={item.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold truncate w-40">{item.title}</h3>
                <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                <div className="flex mt-2 space-x-2 items-center">
                  <button
                    aria-label="Decrease quantity"
                    onClick={(e) => {
                      e.stopPropagation();
                      item.quantity === 1
                        ? removeFromCart(item._id, e)
                        : updateQuantity(item._id, item.quantity - 1, e);
                    }}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item._id, item.quantity + 1, e);
                    }}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(item._id, e);
              }}
              className="text-red-600 hover:underline"
              aria-label="Remove item"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="text-right mt-6">
        <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
        <Link
          to="/checkout"
          className="inline-block bg-pink-600 text-white px-6 py-2 mt-4 rounded hover:bg-pink-700"
        >
          Proceed to Pay
        </Link>
      </div>
    </div>
  );
}

export default Cart;
