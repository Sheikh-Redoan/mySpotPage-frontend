import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Breadcrumb from '../../components/client/Breadcrumb';
import { getBreadcrumbs } from '../../lib/staticData';
import { Move } from 'lucide-react';

const MenuCategory = () => {

    const [categories, setCategories] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    console.log(categories)

    // Fetch category names from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const res = await fetch('/api/categories');
                // const data = await res.json();
                const data = defaultCategories;
                const formatted = data.map((cat) => ({
                    name: cat,
                    services: [],
                }));
                setCategories(formatted);
            } catch (err) {
                console.error('Error fetching categories', err);
            }
        };

        fetchCategories();
    }, []);

    // Toggle collapse
    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Add a new service to a category
    const handleAddService = (catIndex) => {
        const updated = [...categories];
        updated[catIndex]?.services?.push({
            id: updated[catIndex].services.length + 1,
            english: '',
            hebrew: '',
        });
        setCategories(updated);
    };

    // Handle input change
    const handleServiceChange = (catIndex, serviceIndex, field, value) => {
        const updated = [...categories];
        updated[catIndex].services[serviceIndex][field] = value;
        setCategories(updated);
    };

    // Save all to backend
    const handleSave = async () => {
        try {
            const res = await fetch('/api/save-services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categories),
            });

            if (res.ok) {
                alert('Services saved successfully!');
            } else {
                alert('Failed to save.');
            }
        } catch (err) {
            console.error('Save error', err);
        }
    };


    return (
        <div>
            <Breadcrumb breadcrumbs={getBreadcrumbs(0, 3, [
                { name: "Data Management", link: "" },
                { name: "Menu Category", link: "/data-management/menu-category" }
            ])} />

            <div className="">

                <div className="space-y-4">
                    {categories.map((cat, catIndex) => (
                        <div key={cat.name} className="bg-white rounded-lg">
                            {/* Header */}
                            <div
                                className="flex justify-between items-center px-4 py-3 text-gray-700 cursor-pointer"
                                onClick={() => toggleOpen(catIndex)}
                            >
                                <span className="">{cat.name}</span>
                                <ChevronUp size={18} className={`text-gray-500 size-6 transform transition-transform duration-400 ease-in-out ${openIndex === catIndex ? "rotate-0" : "rotate-180"}`}/>
                            </div>

                            {/* Content */}
                            {openIndex === catIndex && (
                                <div className='px-4'>
                                    <table className="w-full table-auto border-separate border-spacing-y-2">
                                        <thead>
                                            <tr className="text-sm text-description ">
                                                <th className="w-10 text-left">#</th>
                                                <th className='text-left'>English</th>
                                                <th className='text-right'>Hebrew</th>
                                                <th className="w-20 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cat.services.map((service, serviceIndex) => (
                                                <tr key={service.id}>
                                                    <td className="text-description text-sm">{service.id}</td>
                                                    <td className='pr-2'>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary01 bg-white"
                                                            placeholder="English"
                                                            value={service.english}
                                                            onChange={(e) =>
                                                                handleServiceChange(
                                                                    catIndex,
                                                                    serviceIndex,
                                                                    'english',
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className='pl-2'>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-right text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary01 bg-white"
                                                            placeholder="Hebrew"
                                                            value={service.hebrew}
                                                            onChange={(e) =>
                                                                handleServiceChange(
                                                                    catIndex,
                                                                    serviceIndex,
                                                                    'hebrew',
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <Move className="w-4 h-4 text-gray-400 cursor-move mx-auto ml-12" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        onClick={() => handleAddService(catIndex)}
                                        className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer ml-10 pb-3"
                                    >
                                        <span className="text-xl">+</span> Add more service
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className='flex justify-end '>
                    <button
                        onClick={handleSave}
                        className=" bg-black text-white px-4 py-2 rounded mt-6 cursor-pointer"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;


const defaultCategories = [
    'Nail',
    'Hair & Barber',
    'Makeup',
    'Lash & Brow',
    'Waxing',
    'Tanning',
    'Massage',
    'Skincare',
    'Spas & Wellness',
    'Fitness',
    'Tattoo & Piercing',
    'Teeth White',
    'Holistic',
];

const initialServices = [
    'Manicure',
    'Pedicure',
    'Gel Manicure',
    'Gel Pedicure',
    'Acrylic Nails',
    'Nail Extensions',
    'Nail Art & Designs',
    'Dip Powder Nails',
    'Nail Repair',
    'French Tips',
    'Cuticle Care',
    'Paraffin Wax Treatment',
    'Service',
];