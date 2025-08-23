import { useState } from "react";
import { motion } from "framer-motion";
import LoginInput from "./LoginInput";

const RegisterForm = ({ onRegister, loading, error, message, goLogin }) => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.username || !form.contact || !form.password || !form.confirmPassword) {
      return onRegister({ error: "Semua field wajib diisi !!" });
    }
    if (form.password !== form.confirmPassword) {
      return onRegister({ error: "Password dan konfirmasi password tidak sama !!" });
    }

    onRegister(form); // kirim data ke parent
  };

  return (
    <motion.div
      className="w-full max-w-md space-y-4 px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Sign Up
      </motion.div>

      {error && (
        <motion.div
          className="text-xs sm:text-sm text-red-500 bg-red-100 rounded p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {message && (
        <motion.div
          className="text-xs sm:text-sm text-green-700 bg-green-100 rounded p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.div>
      )}

      <LoginInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter Email" size="small" />
      <LoginInput label="Username" type="text" name="username" value={form.username} onChange={handleChange} placeholder="Create Username" size="small" />
      <LoginInput label="Contact Number" type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact number" size="small" />
      <LoginInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" size="small" />
      <LoginInput label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" size="small" />

      <motion.button
        onClick={handleSubmit}
        className="w-full py-2 sm:py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition disabled:opacity-50 text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          "Register"
        )}
      </motion.button>

      <div className="text-xs sm:text-sm text-center text-gray-500">
        Sudah punya akun?{" "}
        <span
          onClick={goLogin}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Sign In
        </span>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
