import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";
import service3 from "../../assets/images/service3.png";
import service4 from "../../assets/images/service4.png";
import service5 from "../../assets/images/service5.png";
import Translator from "../shared/Translator";

const services = [
  {
    id: 1,
    title: "Classic Ombre",
    description:
      "Classic Ombre is a hair coloring technique that gradually transitions from a darker shade at the roots to a lighter shade at the ends, creating a natural, sun-kissed effect.",
    duration: "1h",
    price: "70.00",
    image: service1,
    treatments: [
      { name: "Smooth / Scalp Treatment", duration: "1h", price: "70.00" },
      { name: "Shadow Root", duration: "1h 15m", price: "80.00" },
      { name: "Keratin Treatment", duration: "1h 30m", price: "100.00" },
      { name: "Perm / Texture Wave", duration: "1h 45m", price: "110.00" },
      {
        name: "Deep Conditioning Treatment",
        duration: "1h 20m",
        price: "90.00",
      },
      { name: "Hair Botox", duration: "1h 40m", price: "120.00" },
    ],
  },
  {
    id: 2,
    title: "Reverse Ombre",
    description:
      "Reverse Ombre is a hair coloring style where the hair fades from a lighter shade at the roots to a darker shade at the ends, offering a bold and modern contrast.",
    duration: "1h 45m",
    price: "100.00",
    image: service2,
    treatments: [
      { name: "Smooth ", duration: "1h", price: "70.00" },
      { name: "Shadow Root", duration: "1h 15m", price: "80.00" },
      { name: "Keratin Treatment", duration: "1h 30m", price: "100.00" },
      { name: "Perm ", duration: "1h 45m", price: "110.00" },
      {
        name: "Deep Conditioning Treatment",
        duration: "1h 20m",
        price: "90.00",
      },
      { name: "Hair Botox", duration: "1h 40m", price: "120.00" },
    ],
  },
  {
    id: 3,
    title: "Smoothing Keratin Treatment",
    description:
      "Smoothing Keratin Treatment is a hair treatment that smooths and strengthens hair by infusing keratin protein, reducing frizz, enhancing shine, and making hair more manageable.",
    duration: "1h 30m",
    price: "80.00",
    image: service3,
    treatments: [
      { name: "Smooth / Scalp Treatment", duration: "1h", price: "70.00" },
      { name: "Shadow Root", duration: "1h 15m", price: "80.00" },
      { name: "Keratin Treatment", duration: "1h 30m", price: "100.00" },
      { name: "Perm / Texture Wave", duration: "1h 45m", price: "110.00" },
      {
        name: "Deep Conditioning Treatment",
        duration: "1h 20m",
        price: "90.00",
      },
      { name: "Hair Botox", duration: "1h 40m", price: "120.00" },
    ],
  },
  {
    id: 4,
    title: "Balayage with Toner",
    description:
      "Balayage with Toner is a freehand hair-coloring technique that creates soft, natural highlights, with a toner applied to refine the shade and ensure a seamless, blended finish.",
    duration: "30m",
    price: "100.00",
    image: service4,
    treatments: [
      { name: "Smooth / Scalp Treatment", duration: "1h", price: "70.00" },
      { name: "Shadow Root", duration: "1h 15m", price: "80.00" },
      { name: "Keratin Treatment", duration: "1h 30m", price: "100.00" },
      { name: "Perm / Texture Wave", duration: "1h 45m", price: "110.00" },
      {
        name: "Deep Conditioning Treatment",
        duration: "1h 20m",
        price: "90.00",
      },
      { name: "Hair Botox", duration: "1h 40m", price: "120.00" },
    ],
  },
  {
    id: 5,
    title: "Balayage & Root Shadow",
    description:
      "Balayage & Root Shadow is a balayage technique combined with a root shadow, where a darker shade is blended into the roots for a soft, natural transition and effortless regrowth.",
    duration: "2h 30m",
    price: "90.00",
    image: service5,
    treatments: [
      { name: "Smooth / Scalp Treatment", duration: "1h", price: "70.00" },
      { name: "Shadow Root", duration: "1h 15m", price: "80.00" },
      { name: "Keratin Treatment", duration: "1h 30m", price: "100.00" },
      { name: "Perm / Texture Wave", duration: "1h 45m", price: "110.00" },
      {
        name: "Deep Conditioning Treatment",
        duration: "1h 20m",
        price: "90.00",
      },
      { name: "Hair Botox", duration: "1h 40m", price: "120.00" },
    ],
  },
];

export default function ServicesList({
  selected,
  setSelected,
  label = "Our Services",
}) {
  const toggleSelect = (service) => {
    const isSelected = selected.some((item) => item.id === service.id);
    if (isSelected) {
      setSelected((prev) => prev.filter((item) => item.id !== service.id));
    } else {
      setSelected((prev) => [...prev, service]);
    }
  };

  return (
    <div className="font-golos">
      <h2 className="text-2xl font-semibold mb-4">
        <Translator text={label} />
      </h2>
      <div className="space-y-4">
        {services.map((service, index) => {
          const isChecked = selected.some((item) => item.id === service.id);
          return (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-start gap-4 border rounded-lg border-border p-4 shadow-xs">
              <img
                src={service.image}
                alt={service.title}
                className="size-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  <Translator text={service.title} />
                </h3>
                <p className="text-sm text-description mt-1">
                  <Translator text={service.description} />
                </p>
                <div className=" flex items-center gap-3 mt-4 md:mt-2">
                  <p className="text-sm">
                    <Translator text={service.duration} />
                  </p>
                  <p className="bg-[#d1d1d1] size-2 rounded-full"></p>
                  <div className="flex items-center">
                    <p className="text-primary01 font-semibold text-base">
                      <Translator text={"Price"} />
                    </p>
                    <p className="font-semibold text-lg text-primary01 ml-2">
                      &#8362;
                    </p>
                    <p className="text-primary01 font-semibold">
                      <Translator text={service.price} />
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                className="absolute top-4 right-4 size-5 accent-primary01 cursor-pointer"
                checked={isChecked}
                onChange={() => toggleSelect(service)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
