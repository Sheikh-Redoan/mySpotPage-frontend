import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useAccountUpdateMutation } from "@/redux/features/auth/authApi";

const SetupSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  
  const [accountUpdate, { isLoading }] = useAccountUpdateMutation();

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

    // Validation
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.sex) {
      setError("Please select your sex");
      return;
    }

    if (!formData.date_of_birth) {
      setError("Date of birth is required");
      return;
    }

    // Password validation for sellers only
    if (!isClient) {
      if (!formData.password) {
        setError("Password is required");
        return;
      }

      if (formData.password.length < 4) {
        setError("Password must be at least 4 characters long");
        return;
      }

      if (formData.password !== formData.confirm_password) {
        setError("Passwords do not match");
        return;
      }
    }

    // Prepare JSON data
  const data = {
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    date_of_birth: formData.date_of_birth,
    sex: formData.sex,
  };
    
  // Only add password for sellers
  if (!isClient) {
    data.password = formData.password;
  }

  try {
    await accountUpdate(data).unwrap();
    
    // ✅ KEY FIX: Pass user type to success page
    navigate("/signup-successfull", { 
      state: { type: isClient ? "client" : "seller" } 
    });
  } catch (err) {
    console.error("Account update failed:", err);
    setError(
      err.data?.message ||
        err.data?.detail ||
        "Failed to update account. Please try again."
    );
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center mb-4">
            {error}
          </div>
        )}

        {/* First and Last Name */}
        <div className="sm:flex gap-4 mb-4">
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
              required
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              Other
            </label>
          </div>
        </div>

        {/* Password - Only for Sellers */}
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
                  disabled={isLoading}
                  minLength={4}
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
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
                  required
                  disabled={isLoading}
                  minLength={4}
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 text-sm mb-6">
          <input 
            type="checkbox" 
            className="mt-1 accent-[#744CDB]" 
            required 
            disabled={isLoading}
          />
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
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-x-100"
          disabled={isLoading}
        >
          {isLoading ? "Setting up..." : "Sign up"}
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