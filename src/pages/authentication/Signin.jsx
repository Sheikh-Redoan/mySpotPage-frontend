import { slideInFromRight } from "@/animations/variants";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { users } from "../../lib/mockUsers";
import { setUser } from "../../redux/features/userSlice";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    console.log("Phone:", e.target.phone.value);

    const user = users.find((user) => user.phone === e.target.phone.value);

    if (user) {
      console.log("User found:", user);
      dispatch(setUser(user));
      navigate("/"); // Redirect to home page after successful login
    } else {
      console.log("User not found");
    }
  };

  return (
    <div className=" bg-gray-100 font-golos">
      <div className="sm:hidden flex items-center gap-2 px-4 pt-6">
        <Link
          to="/auth"
          className="flex items-center text-[#0f0528] font-medium hover:underline">
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <motion.form
          onSubmit={handleSubmit}
          variants={slideInFromRight()}
          initial="hidden"
          animate="visible"
          className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md">
          <div className="flex items-center mb-6">
            <Link className="hidden sm:block" to={"/auth"}>
              <ArrowLeft size={24} />
            </Link>
            <h2 className="text-[20px] font-semibold text-center w-full">
              Sign in
            </h2>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1">
              Phone Number <span className="text-orange-600">*</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Your phone number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1">
              Password <span className="text-orange-600">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            {/* Added text-sm here */}
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" className="accent-[#744CDB]" />
              Remember me
            </label>
            <Link to={"/forgot-password"}>
              <button
                type="button"
                className="text-[#744CDB] font-medium hover:underline">
                Forgot Password?
              </button>
            </Link>
          </div>

          {/* Signin Button */}
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm">
            Sign in
          </button>

          {/* Signup Navigation */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <a
                href="#"
                className="text-[#744CDB] font-medium hover:underline">
                Signup
              </a>
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signin;
