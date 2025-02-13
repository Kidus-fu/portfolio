import React, { useState } from "react";
import ImageEditingFlow from "./ImageEditingFlow";
import { motion } from "framer-motion";
import { CloseOutlined, CompressOutlined, ExpandOutlined, MinusOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const ImageEditingView: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isclose, setIscolse] = useState(false)
  const [isMinminus, setIsMinminus] = useState(false)
   // Open modal
   const openModal = () => {
    setIsMinminus(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsMinminus(false)
    setIsOpen(false)
  };
  
  const minminusModal = () => {
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
        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl mt-6 rounded-lg"
      >
        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 mt-8"
        >
          Edited Image
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <div className="px-2 py-20 w-full flex justify-center">
            <motion.div
              className="bg-white dark:bg-gray-900 dark:text-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-xl rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Image Section */}
              <div className="lg:w-1/2">
                <motion.div
                  className="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
                  style={{
                    backgroundImage:
                      "url('https://wallpapercave.com/wp/wp8805431.jpg')",
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                ></motion.div>
              </div>

              {/* Content Section */}
              <motion.div
                className="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg
                dark:border-none dark:shadow-gray-600 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold">
                  Edit and Download
                  <span className="text-indigo-600"> Your Images</span>
                </h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  ur platform lets you upload, edit, and download high-quality images effortlessly. Use intuitive tools to crop, resize, and enhance your photos. Apply filters, adjust brightness, contrast, and more. Once satisfied, download your edited images in one click. Whether for personal or professional use, our seamless editing experience ensures your images look their best.
                </p>
                <div className="mt-8">
                  <motion.button
                    className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 cursor-pointer font-semibold rounded-lg shadow-lg transform transition duration-200"
                    onClick={openModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Editing Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "block" : "hidden"
          } w-full h-full bg-black/30 backdrop-blur-md`}
      >
        <motion.div
          className={`relative ${isFullScreen ? "w-full h-full max-w-none rounded-none" : "w-[100vh] max-w-2xl rounded-lg"
            } bg-white dark:bg-gray-700 shadow-xl transition-all duration-300`}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between p-5 bg-gray-800 dark:bg-gray-900">
            <h3 className="text-xl font-semibold text-white lg:text-2xl">Edited Image</h3>
            <div className="flex gap-3">


              {/* Minminus Button */}
              <button
                type="button"
                onClick={minminusModal}
                title="Minminus"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <MinusOutlined />
              </button>
              {/* Toggle Full-Screen Button */}
              <button
                type="button"
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {isFullScreen ? <CompressOutlined /> : <ExpandOutlined />}
              </button>
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                title="Close"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-red-600 dark:hover:text-white"
              >
                <CloseOutlined />
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div className={`w-full h-full  ${isFullScreen ? "" : ""}`}>
            <div className={`w-full h-full ${isFullScreen ? "" : ""} `}>
              <ImageEditingFlow isclose={isclose} />
            </div>
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
                <p className=" mt-2">Edited Image</p>
              </div>
            </>
          }
        >
          <motion.div
            className="w-[80px] h-[80px] hover:scale-110 transform delay-300 shadow-gray-900 hover:opacity-100 opacity-80 fixed  shadow-lg dark:shadow-gray-600  flex  overflow-hidden m-4  bg-black/30 backdrop-blur-sm bottom-0 bg-cover rounded-2xl z-50 cursor-pointer"
            style={{
              backgroundImage:
                "url('https://wallpapercave.com/wp/wp8805431.jpg')",
            }}
            onClick={() => openModal()}
          >



          </motion.div>
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

export default ImageEditingView;


