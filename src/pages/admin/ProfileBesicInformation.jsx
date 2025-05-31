import React, { useEffect, useRef, useState } from "react";
import { get, useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";
import { ChevronDown } from "lucide-react";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";

const ProfileBasicInformation = () => {
    const user = {
        firstName: "John",
        lastName: "Smith",
        phone: "(+1) 234 456 780",
        role: "Super Admin",
        gender: "Female",
        photoURL: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp",
        joined: "2023-01-01",
    };

    const [preview, setPreview] = useState(user?.photoURL || "");
    const fileInputRef = useRef(null);

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: user.firstName || "",
            lastName: user.lastName || "",
            role: user.role,
            gender: user.gender,
            photo: null,
        },
    });

    const photoFile = watch("photo");

    useEffect(() => {
        if (photoFile?.[0]) {
            const objectUrl = URL.createObjectURL(photoFile[0]);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [photoFile]);

    const handleGenderChange = (value) => {
        setValue("gender", value);
    };

    const onSubmit = (data) => {
        const fullName = `${data.name} ${data.lastName}`.trim();

        const formData = new FormData();
        formData.append("name", fullName);
        formData.append("role", data.role);
        formData.append("gender", data.gender);

        // Check if a new photo is selected
        if (data.photo?.[0]) {
            formData.append("photo", data.photo[0]);
        } else {
            // If no new photo, append the existing photo URL
            formData.append("photoURL", user.photoURL);
        }

        // Debug logs
        console.log("Full Name:", fullName);
        console.log("data:", data);

        // TODO: Submit the `formData` to backend
    };

    return (
        <div className="h-full">
            <Breadcrumb breadcrumbs={getBreadcrumbs(0, 3, [
                { name: "My Profile", link: "" },
                { name: "Basic Information", link: "/profile-management/my-profile/basic-information" }
            ])} />
            <div className="bg-white h-[94%] rounded-xl p-4 font-golos">
                <form onSubmit={handleSubmit(onSubmit)} >
                    {/* Avatar Section */}
                    <div className="mb-6 flex gap-36 items-start">
                        <label className="block text-sm font-medium text-description mb-1">Avatar</label>
                        <div>
                            <div className="relative size-18">
                                <img
                                    src={preview}
                                    alt="User Profile"
                                    className="size-18 rounded-full object-cover"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("photo")}
                                    ref={(e) => {
                                        register("photo").ref(e);
                                        fileInputRef.current = e;
                                    }}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 -right-2.5 p-2 rounded-full shadow border border-white bg-highlight01 cursor-pointer"
                                >
                                    <img className="size-4" src={imageProvider.pencile} alt="Edit Avatar" />
                                </button>
                            </div>
                            <p className="text-sm text-description mt-3">
                                Joined date: {new Date(user.joined).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Name Fields */}
                    <div className="flex items-center gap-36 mb-6">
                        <label className="block text-sm font-medium text-description mb-1">Name</label>
                        <div className="flex items-center justify-center w-full gap-3">
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    {...register("name")}
                                    className="w-full border text-gray-600 border-border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary01"
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    className="w-full border text-gray-600 border-border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary01"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role Dropdown */}
                    <div className="mb-6 flex items-center gap-[150px] relative w-full">
                        <label className="block text-sm font-medium text-description mb-1 whitespace-nowrap">Role</label>
                        <div className="relative w-full">
                            <select
                                {...register("role")}
                                className="appearance-none w-full border text-gray-600 border-border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-primary01"
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                onBlur={() => setIsSelectOpen(false)} // Close when clicking away
                            >
                                <option>Super Admin</option>
                                <option>Admin</option>
                                <option>Editor</option>
                            </select>

                            {/* Rotating icon */}
                            <ChevronDown
                                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 w-6 h-6 transform transition-transform duration-400 ease-in-out ${isSelectOpen ? "rotate-180" : "rotate-360"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4 flex items-center gap-20">
                        <label className="text-sm font-medium text-description ">Phone Number</label>
                        <input
                            type="text"
                            value={user.phone}
                            disabled
                            className="flex-1 w-full border text-gray-400 border-border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary01 bg-[#f6f6f6] disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Gender Radio Buttons */}
                    <div className="flex items-center gap-32">
                        <label className="block text-sm font-medium text-description mb-1">Gender</label>
                        <div className="flex gap-6 mt-2">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center gap-2 cursor-pointer text-gray-600">
                                    <input
                                        type="radio"
                                        value={g}
                                        checked={watch("gender") === g}
                                        onChange={() => handleGenderChange(g)}
                                        className="accent-indigo-600"
                                    />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="fixed bottom-10 right-10">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black text-white px-5 py-2 rounded-md hover:opacity-90 transition"
                        >
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileBasicInformation;
