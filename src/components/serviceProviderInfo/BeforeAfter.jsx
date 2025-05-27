import { useState } from "react";
import { Carousel, Modal } from "antd";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Images
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


// Category Data
const data = [
    {
        title: "Classic Ombre",
        images: [
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



// Helper to chunk image pairs
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Custom Arrow Component
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
        {direction === "left" ? <MdKeyboardArrowLeft className="text-2xl" /> : <MdKeyboardArrowRight className="text-2xl" />}
    </button>
);


const BeforeAfter = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <div className="flex flex-wrap gap-6">
            {data.map((category, index) => {
                const chunkedImages = chunkArray(category.images, 1); // 1 before-after pair per slide

                return (
                    <div
                        key={index}
                        className="w-80 relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Clickable Title */}
                        <div
                            className="text-center text-primary01 font-semibold bg-highlight01 py-2 cursor-pointer"
                            onClick={() => {
                                setActiveCategory(category);
                                setOpenModal(true);
                            }}
                        >
                            {category.title}
                        </div>

                        {/* Carousel */}
                        <Carousel
                            dots={false}
                            arrows={hoveredIndex === index}
                            prevArrow={<CustomArrow direction="left" />}
                            nextArrow={<CustomArrow direction="right" />}
                            className="w-full relative"
                        >
                            {chunkedImages.map((group, i) => (
                                <div key={i} className="flex gap-2 py-3">
                                    {group.map((img, j) => (
                                        <div key={j} className="flex gap-2 w-full">
                                            {/* Before */}
                                            <div className="flex-1">
                                                <img
                                                    src={img.before}
                                                    alt="Before"
                                                    className="w-full h-48 object-cover rounded"
                                                />
                                                <p className="text-center text-sm mt-2">
                                                    Before
                                                </p>
                                            </div>

                                            {/* After */}
                                            <div className="flex-1">
                                                <img
                                                    src={img.after}
                                                    alt="After"
                                                    className="w-full h-48 object-cover rounded"
                                                />
                                                <p className="text-center text-sm mt-2 ">
                                                    After
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                    </div>
                );
            })}
            {/* modal */}
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                title={activeCategory?.title}
                width={850}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeCategory?.images?.map((img, i) => (
                        <div key={i} className="flex items-center gap-2 text-center">
                            <div>
                                <img
                                src={img.before}
                                alt="Before"
                                className="w-full h-40 object-cover rounded"
                            />
                            <p className="text-sm text-gray-500 mt-1">Before</p>
                            </div>
                            <div>
                                <img
                                    src={img.after}
                                    alt="After"
                                    className="w-full h-40 object-cover rounded"
                                />
                                <p className="text-sm text-gray-500 mt-1">After</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    )
};

export default BeforeAfter;