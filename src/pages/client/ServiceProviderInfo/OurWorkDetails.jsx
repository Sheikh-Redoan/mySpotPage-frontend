import React from "react";
import BeforeAfter from "../../../components/serviceProviderInfo/BeforeAfter";
import OnlyOutcome from "../../../components/serviceProviderInfo/OnlyOutcome";

// Main Component
const OurWorkDetails = () => {

    return (
        <section className="container mx-auto mt-16 px-4 font-golos">
            <h1 className="text-2xl font-bold mb-8">Our Work</h1>
            <BeforeAfter />

            <div>
                <h1 className="text-2xl font-bold mb-8 mt-10">Our Work</h1>
                <OnlyOutcome />
            </div>

        </section>
    );
};

export default OurWorkDetails;
