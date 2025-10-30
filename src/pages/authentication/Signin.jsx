import { slideInFromRight } from "@/animations/variants";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import { setTokens } from "../../redux/features/auth/authSlice";
import { useLoginMutation, useClientSignInMutation } from "../../redux/features/auth/authApi";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: isSellerLoading }] = useLoginMutation();
  const [clientSignIn, { isLoading: isClientLoading }] = useClientSignInMutation();
  const [searchParams] = useSearchParams();
  const isClientLogin = searchParams.get("type") === "client";

  const isLoading = isClientLogin ? isClientLoading : isSellerLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phone = e.target.phone.value;

    if (isClientLogin) {
      // Client login - send OTP
      if (!phone) {
        setError("Please enter your phone number.");
        return;
      }

      const formData = new FormData();
      formData.append("number", phone);

      try {
        await clientSignIn(formData).unwrap();
        // Navigate to OTP verification page with phone number
        navigate("/verify-number", {
          state: {
            number: phone,
            type: "client"
          }
        });
      } catch (err) {
        console.error("Client sign-in failed:", err);
        setError(
          err.data?.message ||
            err.data?.detail ||
            "Failed to send OTP. Please try again."
        );
      }
    } else {
      // Seller login - direct login with password
      const password = e.target.password.value;

      if (!phone || !password) {
        setError("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("number", phone);
      formData.append("password", password);

      try {
        const tokenData = await login(formData).unwrap();

        if (!tokenData?.access_token || !tokenData?.refresh_token) {
          throw new Error("Invalid token response from server");
        }

        dispatch(
          setTokens({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
          })
        );
        console.log("Login successful! Redirecting to dashboard...");
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Login failed:", err);
        setError(
          err.data?.message ||
            err.data?.detail ||
            err.message ||
            "Invalid credentials. Please try again."
        );
      }
    }
  };

  return (
    <div className="bg-gray-100 font-golos">
      <div className="sm:hidden flex items-center gap-2 px-4 pt-6">
        <Link to="/auth" className="flex items-center text-[#0f0528] font-medium hover:underline">
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
          className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
        >
          <div className="flex items-center mb-6">
            <Link className="hidden sm:block" to={"/auth"}>
              <ArrowLeft size={24} />
            </Link>
            <h2 className="text-[20px] font-semibold text-center w-full">
              {isClientLogin ? "Enter Your Number" : "Sign in"}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center mb-4">
              {error}
            </div>
          )}

          {/* Phone Number Input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
              Phone Number <span className="text-orange-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Your phone number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
              required
              disabled={isLoading}
            />
          </div>

          {!isClientLogin && (
            <>
              {/* Password Input with Eye Icon */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Password <span className="text-orange-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
                    required
                    disabled={isLoading}
                  />
                  <span
                    className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="accent-[#744CDB]"
                    disabled={isLoading}
                  />
                  Remember me
                </label>
                <Link to={"/auth/forgot-password"}>
                  <button
                    type="button"
                    className="text-[#744CDB] font-medium hover:underline disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </Link>
              </div>
            </>
          )}

          {/* Signin Button */}
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-x-100"
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : isClientLogin
              ? "Continue"
              : "Sign in"}
          </button>

          {/* Signup Navigation */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to={"/auth/signup"}>
              <span className="text-[#744CDB] font-medium hover:underline">
                Signup
              </span>
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signin;