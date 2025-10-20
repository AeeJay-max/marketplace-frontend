import React from 'react'
import Picture1 from '../assest/Picture1.jpg'

const About = () => {
    return (
        <div className='px-6 md:px-16 pb-10'>

            {/* Header */}
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>About <span className='text-gray-700 font-medium'>Us</span></p>
            </div>

            {/* About Section */}
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='w-full md:max-w-[360px] rounded-2xl shadow-md' src={Picture1} alt="About Aee Jay Electronics" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>
                        Welcome to <strong>Aee Jay Electronics</strong> — a secure, trusted, and modern online shop for all your
                        <strong> electronic gadgets and accessories</strong>. From smartphones and laptops to headphones, gaming gear, and more,
                        we make it simple and safe to shop for tech that fits your lifestyle.
                    </p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>
                        To provide high-quality electronics at affordable prices while ensuring convenience, trust,
                        and customer satisfaction with every purchase.
                    </p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>
                        To become Zimbabwe’s leading e-commerce platform for electronic gadgets — known for innovation,
                        reliability, and exceptional customer service. Our goal is to make technology accessible to everyone,
                        everywhere across Zimbabwe.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='text-xl my-4'>
                <p>Why <span className='text-gray-700 font-semibold'>Choose Us</span></p>
            </div>

            <div className='flex flex-col md:flex-row mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-sm cursor-pointer 
        hover:bg-blue-600 hover:text-white transition-all duration-300'>
                    <b className=''>Quality & Trust:</b>
                    <p>
                        All our products are sourced from trusted brands and verified suppliers to ensure you
                        receive only genuine and top-quality electronics.
                    </p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-sm cursor-pointer 
        hover:bg-blue-600 hover:text-white transition-all duration-300'>
                    <b>Fast & Reliable Delivery:</b>
                    <p>
                        Enjoy fast, safe, and reliable delivery right to your doorstep anywhere in Zimbabwe —
                        saving you time and effort.
                    </p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-sm cursor-pointer 
        hover:bg-blue-600 hover:text-white transition-all duration-300'>
                    <b>Customer Support:</b>
                    <p>
                        Our dedicated support team is always ready to assist you — whether you need help choosing
                        a gadget, tracking an order, or requesting a return.
                    </p>
                </div>
            </div>



            {/* Admin Access Info */}
            <div className='text-center text-gray-700 text-sm md:text-base mb-12'>
                <p>
                    Are you an admin or supplier who wants to upload products or manage listings? <br />
                    Contact us on <strong>+263 718 711 250</strong> or{' '}
                    <a
                        href="mailto:h240150p@hit.ac.zw"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        h240150p@hit.ac.zw
                    </a>{' '}
                    to get admin privileges and access to the seller dashboard.
                </p>

            </div>

        </div>
    )
}

export default About
