import { useState } from "react";
import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.png";
import service4 from "../../assets/images/service4.png";
import service5 from "../../assets/images/service5.png";

const services = [
  {
    title: "Classic Ombre",
    description:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter shade at the ends, creating a natural, sun-kissed effect.",
    duration: "1h",
    price: "from ₦70.00",
    image: service1,
  },
  {
    title: "Reverse Ombre",
    description:
      "Reverse Ombre is a hair coloring style where the hair fades from a lighter shade at the roots to a darker shade at the ends, offering a bold and modern contrast.",
    duration: "1h 45m",
    price: "from ₦100.00",
    image: service2,
  },
  {
    title: "Smoothing Keratin Treatment",
    description:
      "Smoothing Keratin Treatment is a hair treatment that smooths and strengthens hair by infusing keratin protein, reducing frizz, enhancing shine, and making hair more manageable.",
    duration: "1h 30m",
    price: "from ₦80.00",
    image: service3,
  },
  {
    title: "Balayage with Toner",
    description:
      "Balayage with Toner is a freehand hair-coloring technique that creates soft, natural highlights, with a toner applied to refine the shade and ensure a seamless, blended finish.",
    duration: "30m",
    price: "₦100.00",
    image: service4,
  },
  {
    title: "Balayage & Root Shadow",
    description:
      "Balayage & Root Shadow is a balayage technique combined with a root shadow, where a darker shade is blended into the roots for a soft, natural transition and effortless regrowth.",
    duration: "2h 30m",
    price: "from ₦90.00",
    image: service5,
  },
];

export default function ServicesList() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="font-golos">
      <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row items-start gap-4 border rounded-lg border-border p-4 shadow-xs "
          >
            <img
              src={service.image}
              alt={service.title}
              className="size-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-sm text-description mt-1">
                {service.description}
              </p>
              <div className="text-sm flex items-center gap-3 mt-4 md:mt-2">
                <span>{service.duration}</span>
                <span className="bg-[#d1d1d1] size-2 rounded-full"></span>
                <span className="text-primary01 font-semibold">{service.price}</span>
              </div>
            </div>
            <input
              type="checkbox"
              className="absolute top-4 right-4 size-5 accent-primary01"
              checked={selected.includes(index)}
              onChange={() => toggleSelect(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
