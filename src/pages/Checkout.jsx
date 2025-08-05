import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddressSection from "../components/AddressSection";
import PaymentOptions from "../components/PaymentOptions";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();

  const buyNowItem = location.state?.card;
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
  const totalAmount = buyNowItem ? buyNowItem.price : total;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    if (!buyNowItem && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [buyNowItem, cartItems, navigate]);

  const handlePayment = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    alert(`Order placed using ${paymentMethod}!`);
    if (!buyNowItem) {
      clearCart();
    }

    navigate("/");
  };

  return (
    <div className="bg-[#f9f1e7] min-h-screen py-10 px-4 md:px-8 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8">

        {/* Section Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#6A4E3A] text-center mb-6">
          Checkout
        </h1>

        {/* Address Section */}
        <AddressSection
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        {/* Payment Options */}
        <PaymentOptions
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {/* Items Summary */}
        <div className="divide-y divide-gray-300">
          {itemsToCheckout.map((item, index) => (
            <div
              key={index}
              className="py-4 flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={item.images?.front || item.image}
                alt={item.title}
                className="w-28 h-28 rounded-md object-cover border"
              />
              <div className="text-sm md:text-base flex-1 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold text-[#6A4E3A]">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Category: <span className="font-medium">{item.category}</span>
                </p>
                <p className="text-gray-600">
                  Brand: <span className="font-medium">{item.brand || "TheNimantran"}</span>
                </p>
                <p className="text-gray-800 font-semibold mt-2">
                  Price: ₹{item.price}
                </p>
                <p className="text-gray-700">Quantity: 1</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Pay Button */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
          <p className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Total: ₹{totalAmount}
          </p>
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white px-5 py-2.5 rounded-full shadow hover:scale-105 transition-transform text-sm md:text-base"
          >
            Pay Now 💳
          </button>
        </div>

        {/* Back to Cart */}
        {!buyNowItem && (
          <div className="text-center">
            <Link
              to="/cart"
              className="text-blue-600 hover:underline text-sm inline-block mt-2"
            >
              ⬅ Back to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
