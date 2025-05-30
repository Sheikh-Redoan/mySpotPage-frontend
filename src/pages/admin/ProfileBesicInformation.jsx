import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";

const ProfileBasicInformation = () => {
    const user = {
        firstName: "John",
        lastName: "Smith",
        phone: "123-456-7890",
        role: "Super Admin",
        gender: "Female",
        photoURL: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp",
        joined: "2023-01-01",
    };

    const [preview, setPreview] = useState(user?.photoURL || "");
    const fileInputRef = useRef(null);

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
            role: user.role || "Super Admin",
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
        if (data.photo?.[0]) {
            formData.append("photo", data.photo[0]);
        }

        console.log("Full Name:", fullName);
        console.log("FormData:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white h-full rounded-xl p-4 font-golos">
            {/* Avatar Section */}
            <div className="mb-6 flex gap-36 items-start">
                <label className="block text-sm font-medium text-description mb-1">Avatar</label>
                <div>
                    <div className="relative w-16 h-16">
                        <img
                            src={preview}
                            alt="User Profile"
                            className="size-16 rounded-full object-cover"
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
                            className="absolute bottom-0 -right-1 p-2 rounded-full shadow border border-white bg-highlight01 cursor-pointer"
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
            <div className="mb-6 flex items-center gap-[150px]">
                <label className="block text-sm font-medium text-description mb-1">Role</label>
                <select
                    {...register("role")}
                    className="w-full border text-gray-600 border-border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary01"
                >
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Editor</option>
                </select>
            </div>

            {/* Phone Field */}
            <div className="mb-4 flex items-center gap-20">
                <label className="text-sm font-medium text-description ">Phone Number</label>
                <input
                    type="text"
                    value={user.phone}
                    disabled
                    className="flex-1 w-full border text-gray-600 border-border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary01"
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
    );
};

export default ProfileBasicInformation;
