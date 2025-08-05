import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PackageSearch, MapPin } from "lucide-react";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#f9f1e7] min-h-screen p-6 rounded-lg space-y-6">
      <h2 className="text-3xl font-serif font-bold text-[#d89f00]">
        Welcome, {user?.name}
      </h2>

      {/* Contact Info */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="text-yellow-600" />
          Your Details
        </h3>
        <div className="ml-8 text-gray-700 space-y-1">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="bg-yellow-100 px-2 py-1 rounded-full text-yellow-800 font-medium">
              {user?.role?.toUpperCase()}
            </span>
          </p>
          <p>
            <strong>Joined on:</strong>{" "}
            {new Date(user?.createdAt)?.toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="text-yellow-600" />
          Delivery Address
        </h3>
        <div className="ml-8 text-gray-700 space-y-1">
          <p>{user?.address?.street || "No address added yet."}</p>
          <p>
            {user?.address?.city}, {user?.address?.state} -{" "}
            {user?.address?.zip}
          </p>
          <p>{user?.address?.country}</p>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <PackageSearch className="text-yellow-600" />
          Order History
        </h3>

        {user?.orderHistory?.length ? (
          <div className="ml-6 space-y-4">
            {user.orderHistory.map((order, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-4 rounded-lg bg-[#fdf9f3]"
              >
                <p>
                  <strong>Order ID:</strong> {order?.orderId}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order?.date).toLocaleDateString("en-IN")}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-yellow-700 font-medium">
                    {order?.status}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong> ₹{order?.totalAmount}
                </p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc ml-6">
                    {order?.items?.map((item, i) => (
                      <li key={i}>
                        {item.title} (x{item.quantity}) - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 ml-6">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
