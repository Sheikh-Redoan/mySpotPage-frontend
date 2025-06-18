import { useState, useRef } from "react";
import { Carousel, Modal } from "antd";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Images
import after1 from "../../assets/images/after1.png";
import after2 from "../../assets/images/after2.png";
import after3 from "../../assets/images/after3.png";
import after4 from "../../assets/images/after4.png";
import ClassicBalayage from "../../assets/images/Classic-Balayage.png";
import toner from "../../assets/images/Toner.png";
import rootShadow from "../../assets/images/balayang-root.png";
import smoting from "../../assets/images/smoting.png";
import smoting3 from "../../assets/images/smoting3.png";
import smoting4 from "../../assets/images/smoting4.png";
import smoting5 from "../../assets/images/smoting5.png";
import smoting6 from "../../assets/images/smoting6.png";
import smoting7 from "../../assets/images/smoting7.png";
import toner1 from "../../assets/images/toner1.png";
import toner2 from "../../assets/images/toner2.png";
import toner3 from "../../assets/images/toner3.png";
import toner4 from "../../assets/images/toner4.png";
import { useEffect } from "react";

// Category Data
const data = [
    {
        title: "Classic Balayage",
        images: [
            { after: ClassicBalayage },
            { after: after1 },
            { after: after2 },
            { after: after3 },
            { after: after4 },
        ],
    },
    {
        title: "Balayage with Toner",
        images: [
            { after: toner },
            { after: toner1 },
            { after: toner2 },
            { after: toner3 },
            { after: toner4 },
        ],
    },
    {
        title: "Smoothing Keratin Treatment",
        images: [
            { after: smoting },
            { after: smoting3 },
            { after: smoting4 },
            { after: smoting5 },
            { after: smoting6 },
            { after: smoting7 },
            { after: smoting5 },
            { after: smoting6 },
            { after: smoting7 },
        ],
    },
    {
        title: "Balayage & Root Shadow",
        images: [{ after: rootShadow }],
    },
];

// Helper to chunk image groups
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Custom Arrow Component for main page
const CustomArrow = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`
      absolute top-1/2 transform -translate-y-1/2 z-10 
      ${direction === "left" ? "-left-3" : "-right-3"} 
      bg-highlight01 p-0 rounded-full shadow-lg 
      transition-all duration-300 cursor-pointer
    `}
    >
        {direction === "left" ? (
            <MdKeyboardArrowLeft className="text-2xl" />
        ) : (
            <MdKeyboardArrowRight className="text-2xl" />
        )}
    </button>
);

const OnlyOutcome = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const carouselRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((category, index) => {
                const chunkedImages = chunkArray(category.images, 1);

                return (
                    <div
                        className="w-full"
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Clickable Title */}
                        <div
                            className="text-center text-primary01 font-semibold bg-highlight01 py-2 cursor-pointer rounded-lg"
                            onClick={() => {
                                setActiveCategory(category);
                                setOpenModal(true);
                            }}
                        >
                            {category.title}
                        </div>

                        {/* Carousel on Main Page */}
                        <Carousel
                            dots={false}
                            arrows={isMobile || hoveredIndex === index}
                            prevArrow={<CustomArrow direction="left" />}
                            nextArrow={<CustomArrow direction="right" />}
                            className="w-full relative"
                        >
                            {chunkedImages.map((group, i) => (
                                <div key={i} className="flex w-full gap-2 py-3">
                                    {group.map((img, j) => (
                                        <div key={j} className="flex gap-2 w-full">
                                            <div className="flex-1">
                                                <img
                                                    src={img.after}
                                                    alt="After"
                                                    className={`w-full object-cover rounded ${isMobile ? "h-[350px]" : "h-72"}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                    </div>
                );
            })}

            {/* Modal with Carousel */}
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                title={activeCategory?.title}
                width={900}
                centered
            >
                {/* Carousel inside Modal: 6 images (2 rows x 3 columns) per slide */}
                <Carousel ref={carouselRef} dots={false}>
                    {chunkArray(activeCategory?.images || [], 6).map((group, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {group.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img.after}
                                        alt={`After ${i + 1}`}
                                        className="w-full lg:h-[250px] object-cover rounded-xl"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </Carousel>

                {/* Arrows in bottom-right corner */}
                <div className="bottom-4 right-4 flex justify-end gap-2 z-20">
                    <button
                        onClick={() => carouselRef.current?.prev()}
                        className="bg-highlight01 p-2 rounded-full shadow text-primary01"
                    >
                        <MdKeyboardArrowLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => carouselRef.current?.next()}
                        className="bg-highlight01 p-2 rounded-full shadow text-primary01"
                    >
                        <MdKeyboardArrowRight className="text-2xl" />
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default OnlyOutcome;
