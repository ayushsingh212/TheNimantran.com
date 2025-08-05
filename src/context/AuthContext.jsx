import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";

export const AuthContext = createContext();


const dummyNormalUser = {
  _id: "u1234567890",
  name: "Ravi Kumar",
  email: "ravi.kumar@example.com",
  phone: "+91-9876543210",
  role: "user",
  isWholeseller: true,

  profilePicture: "https://example.com/profiles/ravi-kumar.jpg", // optional

  savedAddresses: [
    {
      label: "Home",
      street: "Sector 15, Noida",
      city: "Noida",
      zip: "201301",
      state: "Uttar Pradesh",
      country: "India",
    },
    {
      label: "Work",
      street: "IT Park Tower 2",
      city: "Noida",
      zip: "201305",
      state: "Uttar Pradesh",
      country: "India",
    },
  ],

  deliveryAddress: {
    street: "Plot 42, Green Park",
    city: "Noida",
    zip: "201302",
    state: "Uttar Pradesh",
    country: "India",
  },

  orderHistory: [
    {
      orderId: "ORD1234",
      items: [
        {
          cardId: "card007",
          title: "Printed Wedding Card (Pack of 10)",
          quantity: 1,
          price: 499,
        },
      ],
      date: "2025-07-15T14:30:00.000Z",
      status: "Delivered",
      totalAmount: 499,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      trackingId: "TRK-112233"
    },
    {
      orderId: "ORD1235",
      items: [
        {
          cardId: "card009",
          title: "Birthday Card Pack - Unicorn Theme",
          quantity: 2,
          price: 899,
        },
      ],
      date: "2025-07-25T16:00:00.000Z",
      status: "Shipped",
      totalAmount: 1798,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      trackingId: "TRK-112234"
    },
  ],

  wishlist: [
    {
      cardId: "card021",
      title: "Elegant Golden Anniversary Card",
      price: 599,
      image: "https://example.com/cards/card021.jpg"
    },
  ],

  recentlyViewed: [
    {
      cardId: "card012",
      title: "Minimal Baby Shower Card",
      viewedAt: "2025-08-01T19:00:00.000Z"
    },
  ],

  notifications: [
    {
      id: "n001",
      message: "Your order ORD1235 has been shipped!",
      read: false,
      date: "2025-08-01T10:15:00.000Z"
    },
  ],

  preferences: {
    communication: {
      email: true,
      sms: false,
      push: true,
    },
    theme: "light",
    language: "en",
  },

  createdAt: "2025-06-01T10:30:00.000Z",
  updatedAt: "2025-08-02T12:15:00.000Z",
};






export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(dummyNormalUser);
  const [showLogin, setShowLogin] = useState({
    login: false,
    signup: false,
  });

  const modalRef = useRef(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      // setUser(res.data.user);
    } catch {
      // setUser(null);

    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, showLogin, setShowLogin, modalRef }}
    >
      {children}
    </AuthContext.Provider>
  );
};
