import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import before1 from "../../assets/images/before1.png";
import before2 from "../../assets/images/before2.png";
import before3 from "../../assets/images/before3.png";
import before4 from "../../assets/images/before4.png";
import after1 from "../../assets/images/after1.png";
import after2 from "../../assets/images/after2.png";
import after3 from "../../assets/images/after3.png";
import after4 from "../../assets/images/after4.png";
import tonerBefore1 from "../../assets/images/tonarBefore1.png";
import tonerAfter1 from "../../assets/images/tonerAfter1.png";
import rootShadowBefore1 from "../../assets/images/shadowBefore1.png";
import rootShadowAfter1 from "../../assets/images/shadowAfter1.png";
import { Carousel } from "antd";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect } from "react";


const transformations = [
    {
        title: "Classic Ombre",
        images: [
            { before: before1, after: after1 },
            { before: before2, after: after2 },
            { before: before3, after: after3 },
            { before: before4, after: after4 },
            { before: before1, after: after1 },
            { before: before2, after: after2 },
            { before: before3, after: after3 },
            { before: before4, after: after4 },
            { before: before1, after: after1 },
            { before: before2, after: after2 },
            { before: before3, after: after3 },
            { before: before4, after: after4 },
        ],
    },
    {
        title: "Balayage with Toner",
        images: [{ before: tonerBefore1, after: tonerAfter1 }],
    },
    {
        title: "Balayage & Root Shadow",
        images: [{ before: rootShadowBefore1, after: rootShadowAfter1 }],
    },
];

// Helper to chunk image pairs for your main carousel (unchanged)
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Custom Arrow Component for main carousel (unchanged)
const CustomArrow = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`
      absolute top-1/2 transform -translate-y-1/2 z-10 
      ${direction === "left" ? "-left-2" : "-right-2"} 
      bg-highlight01 p-0 rounded-full shadow-lg 
      transition-all duration-300 cursor-pointer
    `}
    >
        {direction === "left" ? (
            <MdKeyboardArrowLeft className="text-3xl text-primary01" />
        ) : (
            <MdKeyboardArrowRight className="text-3xl text-primary01" />
        )}
    </button>
);

export default function OurWork() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((category, index) => {
                const chunkedImages = chunkArray(category.images, 1);

                return (
                    <div
                        key={index}
                        className="w-full relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Clickable Title */}
                        <div
                            className="text-center text-primary01 font-semibold bg-highlight01 py-2 cursor-pointer rounded-lg"
                        >
                            {category.title}
                        </div>

                        {/* Carousel */}
                        <Carousel
                            dots={false}
                            arrows={isMobile}
                            prevArrow={<CustomArrow direction="left" />}
                            nextArrow={<CustomArrow direction="right" />}
                            className="w-full relative"
                        >
                            {chunkedImages.map((group, i) => (
                                <div key={i} className="flex gap-2 py-3">
                                    {group.map((img, j) => (
                                        <div key={j} className={`flex gap-2 ${isMobile ? 'items-center justify-center' : ''}`}>
                                            {/* Before */}
                                            <div className={`${isMobile ? '' : 'flex-1'}`}>
                                                <img
                                                    src={img.before}
                                                    alt="Before"
                                                    className={`w-full items-center object-cover rounded ${isMobile ? 'h-68' : 'h-48'}`}
                                                />
                                                <p className="text-center text-sm mt-2">Before</p>
                                            </div>

                                            {/* After */}
                                            <div className={`${isMobile ? '' : 'flex-1'}`}>
                                                <img
                                                    src={img.after}
                                                    alt="After"
                                                    className={`w-full object-cover rounded  ${isMobile ? 'h-68' : 'h-48 '}`}
                                                />
                                                <p className="text-center text-sm mt-2 ">After</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                    </div>
                );
            })}
        </section>
    );
}
