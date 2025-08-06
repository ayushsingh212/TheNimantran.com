import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext"; // ✅ import global loader

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { setUser, setShowLogin } = useContext(AuthContext);
  const { setLoading } = useLoading(); 
  const navigate = useNavigate();
  const modalRef = useRef(null);

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
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setUser(res.data.data);
        setShowLogin({ login: false, signup: false });

        setTimeout(() => {
          navigate("/");
        }, 400); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-gray-100 bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        ref={modalRef}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          autoFocus
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() =>
              setShowLogin((prev) => ({ ...prev, login: false, signup: true }))
            }
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
