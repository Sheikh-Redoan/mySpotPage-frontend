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
import { useEffect } from "react";

// Category Data
const data = [
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

const BeforeAfter = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Modal pagination state
  const [modalPage, setModalPage] = useState(0);

  // Images per page inside modal (2 rows * 3 cols = 6 pairs)
  const imagesPerPage = 6;

  // When modal opens or category changes, reset modal page to 0
  const onModalOpen = (category) => {
    setActiveCategory(category);
    setModalPage(0);
    setOpenModal(true);
  };

  // Calculate total pages for modal
  const totalModalPages = activeCategory
    ? Math.ceil(activeCategory.images.length / imagesPerPage)
    : 0;

  // Get current page images for modal
  const currentModalImages = activeCategory
    ? activeCategory.images.slice(
      modalPage * imagesPerPage,
      modalPage * imagesPerPage + imagesPerPage
    )
    : [];

  // Modal arrow handlers
  const handleModalPrev = () => {
    setModalPage((prev) => (prev === 0 ? totalModalPages - 1 : prev - 1));
  };

  const handleModalNext = () => {
    setModalPage((prev) => (prev === totalModalPages - 1 ? 0 : prev + 1));
  };



  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((category, index) => {
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
              onClick={() => onModalOpen(category)}
            >
              {category.title}
            </div>

            {/* Carousel */}
            <Carousel
              dots={false}
              arrows={isMobile || hoveredIndex === index}
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
                          className="w-full h-64 object-cover rounded"
                        />
                        <p className="text-center text-sm mt-2">Before</p>
                      </div>

                      {/* After */}
                      <div className="flex-1">
                        <img
                          src={img.after}
                          alt="After"
                          className="w-full h-64 object-cover rounded"
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

      {/* Modal */}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title={activeCategory?.title}
        width={850}
        centered
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
          {currentModalImages.map((img, i) => (
            <div key={i} className="flex items-center gap-2 text-center">
              <div>
                <img
                  src={img.before}
                  alt="Before"
                  className="w-full  lg:h-40 object-cover rounded"
                />
                <p className="text-sm mt-1">Before</p>
              </div>
              <div>
                <img
                  src={img.after}
                  alt="After"
                  className="w-full lg:h-40 object-cover rounded"
                />
                <p className="text-sm mt-1">After</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom right arrows */}
        <div className=" flex justify-end gap-4 mt-3">
          <button
            onClick={handleModalPrev}
            className="bg-highlight01 p-2 rounded-full shadow-lg hover:bg-highlight02 transition"
            aria-label="Previous"
            type="button"
          >
            <MdKeyboardArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={handleModalNext}
            className="bg-highlight01 p-2 rounded-full shadow-lg hover:bg-highlight02 transition"
            aria-label="Next"
            type="button"
          >
            <MdKeyboardArrowRight className="text-2xl" />
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default BeforeAfter;
