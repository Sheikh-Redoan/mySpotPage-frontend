import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Breadcrumb from '../../components/client/Breadcrumb';
import { getBreadcrumbs } from '../../lib/staticData';

const ProfileSecurity = () => {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit = (data) => {
        console.log("Password data:", data);
    };

    return (
        <div className='h-full'>
            <Breadcrumb breadcrumbs={getBreadcrumbs(0, 3, [
                { name: "My Profile", link: "" },
                { name: "Security", link: "/profile-management/my-profile/security" }
            ])} />
            <div className="bg-white h-[94%] rounded-xl p-4 font-golos">
                <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg space-y-5 w-full">
                    {/* Current password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Current password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrent ? "text" : "password"}
                                {...register("currentPassword", { required: true })}
                                autoComplete="current-password" 
                                placeholder="Current password"
                                className="w-full border text-sm border-gray-300 rounded-md px-3 py-2.5 pr-10 focus:outline-none focus:ring focus:ring-primary01 mb-1"
                            />
                            <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                onClick={() => setShowCurrent(!showCurrent)}
                            >
                                {showCurrent ? <Eye /> : <EyeOff />}
                            </div>
                            {errors.currentPassword && <span className="text-sm text-red-500">Current password is required</span>}
                        </div>
                    </div>

                    {/* New password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            New password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                {...register("newPassword", { required: true })}
                                autoComplete="new-password"
                                placeholder="New password"
                                className="w-full border text-sm border-gray-300 rounded-md px-3 py-2.5 pr-10 focus:outline-none focus:ring focus:ring-primary01"
                            />
                            <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                onClick={() => setShowNew(!showNew)}
                            >
                                {showNew ? <Eye /> : <EyeOff />}
                            </div>
                            {errors.newPassword && <span className="text-sm text-red-500">New password is required</span>}
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Confirm password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === watch("newPassword") || "Passwords do not match",
                                })}
                                autoComplete="new-password"
                                placeholder="Re-enter new password"
                                className="w-full border text-sm border-gray-300 rounded-md px-3 py-2.5 pr-10 focus:outline-none focus:ring focus:ring-primary01"
                            />
                            <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <Eye /> : <EyeOff />}
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black text-white px-5 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
                        >
                            {isSubmitting ? "Updating..." : "Change password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSecurity;