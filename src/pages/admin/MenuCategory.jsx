import React, { useEffect, useState } from 'react';
import { ChevronUp, Move } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Breadcrumb from '../../components/client/Breadcrumb';
import { getBreadcrumbs } from '../../lib/staticData';

const MenuCategory = () => {
    const [categories, setCategories] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    console.log(categories)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
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

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleAddService = (catIndex) => {
        const updated = [...categories];
        updated[catIndex]?.services?.push({
            id: Date.now(),
            english: '',
            hebrew: '',
        });
        setCategories(updated);
    };

    const handleServiceChange = (catIndex, serviceIndex, field, value) => {
        const updated = [...categories];
        updated[catIndex].services[serviceIndex][field] = value;
        setCategories(updated);
    };

    const handleDragEnd = (result, catIndex) => {
        if (!result.destination) return;
        const newCategories = [...categories];
        const items = Array.from(newCategories[catIndex].services);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        newCategories[catIndex].services = items;
        setCategories(newCategories);
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/save-services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categories),
            });
            if (res.ok) alert('Services saved successfully!');
            else alert('Failed to save.');
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

            <div className="space-y-4">
                {categories.map((cat, catIndex) => (
                    <div key={cat.name} className="bg-white rounded-lg">
                        <div
                            className="flex justify-between items-center px-4 py-3 text-gray-700 cursor-pointer"
                            onClick={() => toggleOpen(catIndex)}
                        >
                            <span className={`${openIndex === catIndex ? "text-primary01 font-semibold" : ""}`}>{cat.name}</span>
                            <ChevronUp size={18} className={`text-gray-500 size-6 transform transition-transform ${openIndex === catIndex ? "rotate-0" : "rotate-180"}`} />
                        </div>

                        {openIndex === catIndex && (
                            <div className='px-4'>
                                <DragDropContext onDragEnd={(result) => handleDragEnd(result, catIndex)}>
                                    <Droppable droppableId={`category-${catIndex}`} type="SERVICE">
                                        {(provided) => (
                                            <table className="w-full table-auto border-separate border-spacing-y-4">
                                                <thead>
                                                    <tr className="text-sm text-description">
                                                        <th className="w-10 text-left">#</th>
                                                        <th className='text-left'>English</th>
                                                        <th className='text-right'>Hebrew</th>
                                                        <th className="w-20 text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                                    {cat.services.map((service, serviceIndex) => (
                                                        <Draggable key={service.id} draggableId={`${cat.name}-${service.id}`} index={serviceIndex}>
                                                            {(provided) => (
                                                                <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white">
                                                                    <td className="text-description text-sm">{serviceIndex + 1}</td>
                                                                    <td className='pr-2'>
                                                                        <input
                                                                            type="text"
                                                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary01"
                                                                            value={service.english}
                                                                            onChange={(e) => handleServiceChange(catIndex, serviceIndex, 'english', e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className='pl-2'>
                                                                        <input
                                                                            type="text"
                                                                            className="w-full border border-border rounded-lg px-3 py-2 text-sm text-right text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary01"
                                                                            value={service.hebrew}
                                                                            onChange={(e) => handleServiceChange(catIndex, serviceIndex, 'hebrew', e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td className="text-center ">
                                                                        <Move className="w-4 h-4 text-gray-400 cursor-move mx-auto ml-12" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </tbody>
                                            </table>
                                        )}
                                    </Droppable>
                                </DragDropContext>
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

            <div className='flex justify-end'>
                <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded mt-6 cursor-pointer"
                >
                    Save changes
                </button>
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
