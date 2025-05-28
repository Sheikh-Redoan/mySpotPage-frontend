import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import testimonial1 from "/src/assets/images/testimonial1.png";
import testimonial2 from "/src/assets/images/testimonial2.png";
import { IoIosArrowDown } from "react-icons/io";

const testimonials = [
    {
        name: "John D.",
        date: "Jan 20, 2025",
        time: "16:23",
        avatar: "",
        images: [
            testimonial1,
            testimonial2
        ],
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 4.7
    },
    {
        name: "John D.",
        date: "Jan 20, 2025",
        time: "16:23",
        avatar: "",
        images: [
            testimonial1,
            testimonial2
        ],
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 3
    },
    {
        name: "John D.",
        date: "Jan 20, 2025",
        time: "16:23",
        avatar: testimonial1,
        images: [
            testimonial1,
            testimonial2
        ],
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 5
    },
    {
        name: "John D.",
        date: "Jan 20, 2025",
        time: "16:23",
        avatar: "",
        images: [
            testimonial1,
            testimonial2
        ],
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 4.5
    },
];

const TestimonialsSection = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleViewMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className="my-12 font-golos">
            <div className=" space-y-6">
                {/* Title & Rating */}
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2">
                    <h2 className="text-2xl font-semibold">What Our Clients Say</h2>
                    <a href="#" className="text-sm flex items-center gap-1">
                        <span className=" font-semibold">⭐ 4.8</span>
                        <span className="hover:underline text-description">(12.5K reviews)</span>
                    </a>
                </div>

                {/* Testimonials */}
                <div className="space-y-6">
                    {testimonials.slice(0, visibleCount).map((t, idx) => (
                        <TestimonialCard key={idx} {...t} />
                    ))}
                </div>

                {/* View More */}
                {
                    visibleCount < testimonials.length && (
                        <div>
                            <button onClick={handleViewMore} className="text-sm text-primary01 font-semibold cursor-pointer flex items-center">
                                View more <span className="ml-1"><IoIosArrowDown className="text-lg" /></span>
                            </button>
                        </div>
                    )
                }


            </div>
        </section>
    );
};

export default TestimonialsSection;
