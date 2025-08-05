import React, { useState } from "react";

const AddressSection = ({ selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Ayu Rajput",
      line1: "123, Arya Nagar",
      city: "Ghaziabad",
      state: "UP",
      pin: "201001",
      phone: "9876543210",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const handleAddAddress = () => {
    const isValid = Object.values(newAddress).every((field) => field.trim() !== "");
    if (!isValid) {
      alert("Please fill all fields.");
      return;
    }

    const updatedAddresses = [
      ...addresses,
      { ...newAddress, id: Date.now() },
    ];

    setAddresses(updatedAddresses);
    setNewAddress({
      name: "",
      line1: "",
      city: "",
      state: "",
      pin: "",
      phone: "",
    });
    setShowForm(false);
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg md:text-xl font-bold text-[#6A4E3A] mb-4">1️⃣ Delivery Address</h2>

      {/* Existing Addresses */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-xl p-4 font-serif transition-all cursor-pointer ${
              selectedAddress?.id === address.id
                ? "border-[#FFD700] bg-yellow-50 scale-[1.01] shadow"
                : "border-gray-300 hover:border-[#FFD700] hover:shadow-sm"
            }`}
            onClick={() => setSelectedAddress(address)}
          >
            <p className="font-medium text-[#6A4E3A]">{address.name}</p>
            <p className="text-sm text-gray-700">
              {address.line1}, {address.city}, {address.state} - {address.pin}
            </p>
            <p className="text-sm text-gray-700">Phone: {address.phone}</p>
          </div>
        ))}
      </div>

      {/* Add New Address Toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 text-sm text-blue-600 hover:underline font-medium"
        >
          ➕ Add New Address
        </button>
      ) : (
        <div className="mt-5 bg-[#fff8dc] border border-yellow-300 p-5 rounded-xl font-serif">
          <h3 className="text-md font-semibold text-[#6A4E3A] mb-4">New Address</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
            <input
              type="text"
              placeholder="Address Line"
              value={newAddress.line1}
              onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
            <input
              type="text"
              placeholder="PIN Code"
              value={newAddress.pin}
              onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="p-2 border rounded text-sm focus:outline-yellow-400"
            />
          </div>

          <div className="mt-5 flex gap-4">
            <button
              onClick={handleAddAddress}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-red-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
