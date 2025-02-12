import React, { useState } from "react";
import { motion } from "framer-motion";
import imageUrl from "./c5dc1519-e784-4b98-80c3-014d87c61ba0.webp";
import TextToImageComponent from "./AiImageGenerter";
import { CloseOutlined, CompressOutlined, ExpandOutlined, MinusOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const AiImageView: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isclose, setIscolse] = useState(false);
    const [isMinminus, setIsMinminus] = useState(false);

    // Open modal
  const openModal = () => {
    setIsMinminus(false);
    setIsOpen(true);
  };

    const closeModal = () => {
        setIsMinminus(false)
        setIsOpen(false)
    };
   



    const [isFullScreen, setIsFullScreen] = useState(false);
    const minimizeModal = () => {
        setIsOpen(false)
        setIsMinminus(true)
    };
    const handleClose = () => {
        setIscolse(true);
        setTimeout(() => {
            setIsMinminus(false)
            setIscolse(false);
            setIsOpen(false);
        }, 50); // Small delay to allow state change detection
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-white dark:bg-gray-900 py-12 px-6 border border-gray-200 dark:border-gray-700 shadow-xl mt-6 rounded-lg"
            >
                {/* Title Section */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8"
                >
                    AI Generated Image
                </motion.h2>

                <motion.div className="px-2 py-10 w-full flex justify-center">
                    <motion.div
                        className="bg-white dark:bg-gray-900 dark:text-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-xl rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Image Section */}
                        <div className="lg:w-1/2  sm:hidden">
                            <motion.div
                                className="h-80 bg-cover lg:h-full rounded-lg border dark:border-none"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                                initial={{ opacity: 0.1, x: -200 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{once:true}}
                                transition={{ delay: 0.2, duration: 1.5 }}
                            ></motion.div>
                        </div>


                        {/* Content Section */}
                        <motion.div
                            className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none 
                            shadow-xl dark:border-none border lg:rounded-lg dark:shadow-gray-600"
                            initial={{ opacity: 0.1, x: 500 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold">
                                Explore Stunning <span className="text-indigo-600">AI Art</span>
                            </h2>
                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                Unleash your creativity with our powerful AI-driven image generation and editing platform. Whether you're a designer, marketer, or hobbyist, our intuitive tools help you craft breathtaking visuals in minutes. Perfect for personal projects, professional presentations, and social media content—effortlessly generate, refine, and download stunning AI-crafted images to bring your ideas to life!
                            </p>
                            <div className="mt-8">
                                <motion.button
                                    className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 font-semibold rounded-lg shadow-lg"
                                    onClick={openModal}
                                    initial={{rotateZ:"3deg"}}
                                    whileHover={{ scale: 1.05,rotateZ:"0deg" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Generat
                                </motion.button>
                            </div>
                        </motion.div>
                        {/* Image Section */}
                        <div className="lg:w-1/2 hidden md:block">
                            <motion.div
                                className="h-80 bg-cover lg:h-full rounded-lg border dark:border-none"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                                initial={{ opacity: 0.1, x: -200 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{once:true}}
                                transition={{ delay: 0.2, duration: 1.5 }}
                            ></motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Modal */}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "block" : "hidden"
                    } w-full h-full bg-black/30 backdrop-blur-sm`}
            >
                <motion.div
                    className={`relative ${isFullScreen ? "w-full h-full max-w-none rounded-none" : "w-[100vh] max-w-2xl rounded-lg"
                        } bg-white dark:bg-gray-700 shadow-xl transition-all duration-300`}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between p-5 bg-gray-800">
                        <h3 className="text-xl font-semibold text-white lg:text-2xl">Edited Image</h3>
                        <div className="flex gap-3">
                            <button title="minimize" onClick={minimizeModal} className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                <MinusOutlined />
                            </button>
                            <button title="" onClick={() => setIsFullScreen(!isFullScreen)} className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                {isFullScreen ? <CompressOutlined /> : <ExpandOutlined />}
                            </button>
                            <button title="close" onClick={handleClose} className="h-8 w-8 text-gray-400 hover:text-red-600">
                                <CloseOutlined />
                            </button>
                        </div>
                    </div>

                    {/* Modal body */}
                    <div className="h-auto ">
                        <TextToImageComponent isclose={isclose} />
                    </div>
                </motion.div>
            </motion.div>
            {/* Minminus modal */}
            {isMinminus && (
                <Popover
                    style={{ width: 12 }}
                    title={
                        <>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    title="Close"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm hover:bg-red-600 hover:text-gray-900 dark:hover:bg-red-600 dark:hover:text-white"
                                >
                                    <CloseOutlined />
                                </button>
                                <p className=" mt-2">AI Generated Image</p>
                            </div>
                        </>
                    }

                >
                    <div
                        className="w-[80px] h-[80px] hover:scale-110 transform delay-300 shadow-gray-900 hover:opacity-100 opacity-45 fixed  shadow-lg dark:shadow-gray-600  flex  overflow-hidden m-4  bg-black/30 backdrop-blur-sm left-24 bottom-0 bg-cover rounded-2xl cursor-pointer"
                        style={{
                            backgroundImage:
                                `url(${imageUrl})`,
                        }}
                        onClick={() => openModal()}
                    >



                    </div>
                </Popover>
            )}
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
                    onClick={closeModal}
                ></div>
            )}
        </>
    );
};

export default AiImageView;