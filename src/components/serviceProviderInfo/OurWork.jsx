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


const transformations = [
    {
        title: "Classic Ombre",
        before: before1,
        after: after1,
    },
    {
        title: "Balayage with Toner",
        before: tonerBefore1,
        after: tonerAfter1,
    },
    {
        title: "Balayage & Root Shadow",
        before: rootShadowBefore1,
        after: rootShadowAfter1,
    },
];

export default function OurWork() {


    return (
        <div className="w-full font-golos">
            <div className="flex gap-6 bg-white">
                {transformations.map((item, idx) => (
                    <div key={idx} className="text-center">
                        <h3 className="text-sm font-semibold text-primary01 mb-2 bg-highlight01 py-1 rounded">
                            {item.title}
                        </h3>
                        <div className="flex gap-2">
                            <div>
                                <img
                                    src={item.before}
                                    alt={`${item.title} Before`}
                                    className="w-36 h-44 object-cover rounded"
                                />
                                <p className="text-sm mt-2">Before</p>
                            </div>
                            <div>
                                <img
                                    src={item.after}
                                    alt={`${item.title} After`}
                                    className="w-36 h-44 object-cover rounded"
                                />
                                <p className="text-sm mt-2">After</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
