import React from 'react';
import banner from '../../../assets/images/ClientBanner.png';
import ServicesList from '../../../components/serviceProviderInfo/ServicesList';
import OurWork from '../../../components/serviceProviderInfo/OurWork';
import { Link } from 'react-router';
import TestimonialsSection from '../../../components/serviceProviderInfo/TestimonialsSection';

const ServiceProviderInfo = () => {
    return (
        <section className='container mx-auto py-5 px-3'>
            {/* banner part */}
            <div className='mb-10'>
                <img className='w-full h-auto' src={banner} alt="Service Provider Banner" />
            </div>
            {/* content part */}
            <div className='grid lg:grid-cols-12 gap-4'>
                {/* Services List + about us  */}
                <div className='col-span-9'>
                    <ServicesList />
                    <div className='my-12 font-golos '>
                        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                        <p className='text-description text-sm md:text-base'>At TCL Beauty Studio 01, we’re passionate about delivering exceptional hair services with a personalized touch. Founded in 2020, our mission is to help every client feel confident and beautiful through expert styling and innovative techniques. What sets us apart? Our commitment to high-quality products, skilled professionals, and a welcoming atmosphere. Whether you visit our salon or book a home service, we ensure a top-tier experience tailored just for you.</p>
                    </div>
                    <div className='w-full '>
                        <div className='flex justify-between items-center font-golos mb-4'>
                            <h2 className="text-2xl font-semibold mb-4">Our Work</h2>
                            <Link to="/our-work" className="text-base font-semibold rounded text-white bg-primary01 px-4 py-2">View All</Link>
                        </div>
                        <OurWork />
                    </div>
                    <div>
                        <TestimonialsSection/>
                    </div>
                </div>

                {/* Booking part */}
                <div className='col-span-3'>
                    <h1>Booking</h1>
                </div>
            </div>
        </section>
    );
};

export default ServiceProviderInfo;