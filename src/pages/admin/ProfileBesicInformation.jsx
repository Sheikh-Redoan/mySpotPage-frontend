import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfileBesicInformation = () => {
    const [gender, setGender] = useState("Female");
    const user = null;

    return (
        <section className='bg-white h-full rounded-xl p-4'>
            <div className="">
                {/* Avatar Section */}
                <div className="mb-6 flex gap-20">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                    <div>
                        <div className="relative w-16 h-16">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                                alt="Avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow">
                                <FiEdit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Joined date: 01/01/2025</p>
                    </div>
                </div>

                {/* Name Fields */}
                <div className="flex gap-4 mb-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            defaultValue="Tran"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1 invisible">Last</label>
                        <input
                            type="text"
                            defaultValue="Huyen"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                </div>

                {/* Role Dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200">
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Editor</option>
                    </select>
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="text"
                        disabled
                        value="(+1) 987 654 321"
                        className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-400 cursor-not-allowed"
                    />
                </div>

                {/* Gender Radio Buttons */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="flex gap-6 mt-2">
                        {["Male", "Female", "Other"].map((g) => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={gender === g}
                                    onChange={() => setGender(g)}
                                    className="accent-indigo-600"
                                />
                                <span>{g}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button Fixed Bottom Right */}
            <div className="fixed bottom-10 right-10">
                <button className="bg-black text-white px-5 py-2 rounded-md hover:opacity-90 transition">
                    Save changes
                </button>
            </div>
        </section>
    );
};

export default ProfileBesicInformation;