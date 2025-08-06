import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const Signup = ({ onClose }) => {

  const { showLogin, setShowLogin, modalRef } = useContext(AuthContext);
  const {setLoading} = useLoading()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    isRetailer: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", formData, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setTimeout(() => {
          setShowLogin({ signup: false, login: true });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin({ login: false, signup: false });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, setShowLogin]);

  if (!showLogin.signup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md relative"
        ref={modalRef}
      >
        <button
          type="button"
          onClick={() => setShowLogin({ login: false, signup: false })}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          autoFocus
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Set your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <div className="mb-4">
          <label className="block font-medium mb-1">Are you a retailer?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRetailer"
                value="true"
                checked={formData.isRetailer === true}
                onChange={() => setFormData({ ...formData, isRetailer: true })}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRetailer"
                value="false"
                checked={formData.isRetailer === false}
                onChange={() =>
                  setFormData({ ...formData, isRetailer: false })
                }
              />
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
        >
        SignUp
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setShowLogin({ login: true, signup: false })}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
