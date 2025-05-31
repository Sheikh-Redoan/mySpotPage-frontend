import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const BookingCart = ({ businessData: { studioName, label, rating, reviewCount, address, workingHours }, selected, selectedDay, setSelectedDay,setModalOpen, handleBookNow,}) => {

    const [showAll, setShowAll] = useState(false);
    const contentRef = useRef(null);
    // Track if it's mobile device (Tailwind-style)
    const [isMobile, setIsMobile] = useState(false);

    const maxVisibleItems = 0; // Show first 0 by default on mobile

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visibleHours = isMobile && !showAll ? workingHours.slice(0, maxVisibleItems) : workingHours;

    return (
        <section className="w-full max-w-sm p-5 rounded-xl border border-gray-200 shadow-sm space-y-5 bg-white font-golos mx-auto">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold mb-3">{studioName}</h2>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-semibold">{label}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center text-sm text-yellow-500 font-medium gap-1">
                        <Star size={16} fill="currentColor" stroke="currentColor" />
                        <span className='text-black'>{rating}</span>
                        <span className="text-description hover:underline text-sm cursor-pointer">({reviewCount})</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                    <MapPin size={16} />
                    <a
                        href={`https://maps.google.com/?q=${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-sm font-medium"
                    >
                        {address}
                    </a>
                </div>
            </div>

            <div className="border-1 border-dashed border-border"></div>

            {/* Working hours */}
            <div className="space-y-2">

                <div
                    ref={contentRef}
                    className="transition-all duration-500 overflow-hidden"
                    style={{
                        maxHeight: isMobile && !showAll
                            ? `${workingHours.length * 0}px`
                            : `${workingHours.length * 42}px`
                    }}
                >
                    <h3 className="font-semibold">Working hours</h3>
                    <ul className="space-y-1 text-sm">
                        {visibleHours.map(({ day, time }) => {
                            const isSelected = selectedDay === day;
                            return (
                                <li
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`flex justify-between items-center cursor-pointer rounded-md px-3 py-2 transition ${isSelected
                                        ? "text-primary01 font-semibold"
                                        : "text-gray-700"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-violet-600" : "bg-violet-200"}`} />
                                        {day}
                                    </span>
                                    <span className={isSelected ? "text-primary01 font-semibold" : ""}>
                                        {time}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Show toggle only on mobile */}
                {isMobile && workingHours.length > maxVisibleItems && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-sm text-primary01 font-semibold cursor-pointer flex items-center"
                    >
                        {showAll ? "View less" : "View more"}
                        <span className="ml-1">
                            {showAll ? <IoIosArrowUp className="text-lg" /> : <IoIosArrowDown className="text-lg" />}
                        </span>
                    </button>
                )}
            </div>

            {/* Footer */}
            <div className='hidden md:block'>
                <div className="text-sm text-center text-gray-500 mb-2.5">
                    {selected ? `${selected.length} service selected` : "0 service selected"}
                </div>
                <button
                    className={`w-full bg-gray-900 text-white py-2 rounded-lg transition ${selected?.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
                    disabled={selected?.length === 0}
                    onClick={handleBookNow}
                >
                    Book now
                </button>
            </div>
        </section>
    );
};

export default BookingCart;
