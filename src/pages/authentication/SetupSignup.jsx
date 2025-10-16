import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux"; // To get the token from redux store

const SetupSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    sex: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Assuming token is in auth slice

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get("type");
    if (userType === "client") {
      setIsClient(true);
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, sex: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isClient && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("date_of_birth", formData.date_of_birth);
    data.append("sex", formData.sex);
    if (!isClient) {
      data.append("password", formData.password);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/account/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/signup-successfull");
      }
    } catch (err) {
      setError("Failed to update account. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-golos">
      <motion.form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-lg"
      >
        <h2 className="text-[22px] font-semibold text-center py-6 mb-4">
          Set up Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* First and Last Name */}
        <div className="sm:flex gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              First Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
              required
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Last Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Date of Birth <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
              required
            />
          </div>
        </div>

        {/* Sex Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Sex <span className="text-orange-600">*</span>
          </label>
          <div className="flex gap-6 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="M"
                checked={formData.sex === "M"}
                onChange={handleRadioChange}
                className="accent-[#744CDB]"
                required
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="F"
                checked={formData.sex === "F"}
                onChange={handleRadioChange}
                className="accent-[#744CDB]"
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="O"
                checked={formData.sex === "O"}
                onChange={handleRadioChange}
                className="accent-[#744CDB]"
              />
              Other
            </label>
          </div>
        </div>

        {/* Password */}
        {!isClient && (
          <>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirm_password"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 text-sm mb-6">
          <input type="checkbox" className="mt-1 accent-[#744CDB]" required />
          <label className="text-gray-700">
            I agree to the{" "}
            <span className="text-[#744CDB] font-medium cursor-pointer">
              privacy policy
            </span>{" "}
            and
            <span className="text-[#744CDB] font-medium cursor-pointer">
              {" "}
              terms of use
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
        >
          Sign up
        </button>

        {/* Signin Navigation */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/signin"}>
            <span className="text-[#744CDB] font-medium hover:underline">
              Signin
            </span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SetupSignup;