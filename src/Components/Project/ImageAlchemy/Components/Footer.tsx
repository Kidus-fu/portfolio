import React from 'react';
import { InstagramOutlined, LinkedinFilled, MailOutlined, XOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"
import FAQ from './FQA/FQA';
import SponsorCarousel from './SponsorScroll/Sponsers';
const Footer: React.FC = () => {
    return (
        <>
        <div className="text-center shadow-lg p-2 my-1 dark:bg-gray-900 dark:text-white" >
        <FAQ />
        </div>
        <div className="text-center shadow-lg p-2 my-1 dark:bg-gray-900 dark:text-white" >
            <SponsorCarousel />
            </div>
        <div className="text-center shadow-lg p-2 my-1 dark:bg-gray-900 dark:text-white" >
            <h2 className="flex items-center justify-center mb-5 text-2xl font-semibold ">
                <img src="https://th.bing.com/th/id/R.f84376b56affbffa58d02d370e53ef86?rik=gOmcW56Pogs14Q&pid=ImgRaw&r=0" className="h-12 mr-3 sm:h-9" alt="Landwind Logo" />
                Image Alchemy
            </h2>

            <span className="block text-sm text-center text-gray-500">© 2025 Image Alchemy.Developed by Ethiopan Coder kidus
            </span>

            <ul className="flex justify-center mt-5 space-x-5 ">

                <li>


                    <motion.a href="https://x.com/KidusPanda1824" target="_blank" className="text-black hover:text-black"><XOutlined className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full scale-300 border-opacity-40 dark:border-none' /></motion.a>

                    <motion.a href="#" target="_blank" className="text-red-500  hover:text-red-600"><InstagramOutlined className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 dark:border-none' /></motion.a>

                    <motion.a href="https://www.linkedin.com/in/kidus-panda/" target="_blank" className="text-blue-700 hover:text-blue-900"><LinkedinFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 dark:border-none' /></motion.a>
                    <motion.a href="mailto:seeh51593@gamil.com" target="_blank" className="text-red-700 hover:text-red-900"><MailOutlined className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 dark:border-none' /></motion.a>


                </li>


            </ul>
        </div>
        </>
    );
};

export default Footer;