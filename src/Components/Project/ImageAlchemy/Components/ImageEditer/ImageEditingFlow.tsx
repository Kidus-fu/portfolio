import React, { useState, useCallback, useEffect } from "react";
import ImageEditor from "./ImageEditor";
import { ArrowLeftOutlined, DownloadOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { Image, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import ImageFilterEditor from "./imageFilter";

interface ImageEditingFlowProps {
  isclose?: boolean;
  
}

const ImageEditingFlow: React.FC<ImageEditingFlowProps> = ({ isclose = false }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState(false)

  // Reset state when isclose changes
  useEffect(() => {
    if (isclose) {
      setUploadedImage(null);
      setEditedImage(null);
      if (editedImage) {
        URL.revokeObjectURL(editedImage)
      }
    }
  }, [isclose]);

  // Handle image upload
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(acceptedFiles[0]);
    }
  }, []);

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

  // Handle paste event
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image")) {
            const blob = item.getAsFile();
            if (blob) {
              handleImageUpload(blob);
              break;
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // Handle edit completion
  const handleEditComplete = (croppedImage: string) => {
    setEditedImage(croppedImage);
  };

  // Handle download of the edited image
  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement("a");
      link.href = editedImage;
      link.download = "edited-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset the flow
  const handleReset = () => {
    setUploadedImage(null);
    setEditedImage(null);
  };
  const handleEdit = () => {
    setFilter(true)
  }
  const handleEditBack = () => {
    setFilter(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* File upload section */}
      {!uploadedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <label className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-200">
            Upload an Image
          </label>
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-500 rounded-lg shadow-xl tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out max-w-xs sm:max-w-full"
          >
            <input {...getInputProps()} aria-label="Upload image" />
            {isDragActive ? (
              <p className="text-blue-500">Drop the image here...</p>
            ) : (
              <>
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal text-center">
                  Drag & drop an image, paste, or click to select
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Image Editor section */}
      {uploadedImage && !editedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={uploadedImage} // Force re-render when uploadedImage changes
        >
          <ImageEditor imageSrc={uploadedImage} onComplete={handleEditComplete} />
        </motion.div>
      )}

      {/* Edited image preview and actions */}
      {editedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center "
          key={editedImage} // Force re-render when editedImage changes
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">
            {filter ? "Edited Image":"Edited Image Preview"}
          </h2>
          <div
            className=" inline-block"
          >
            {/* Buttons overlay */}
            
            { filter ? (
               <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.2 }}
               className="top-2 right-2 flex gap-4"
             >
               
               <Tooltip title="Back">
                 <button
                   onClick={handleEditBack}
                   className="p-3  shadow-md dark:text-white dark:shadow-gray-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2"
                   aria-label="Reset image editor"
                 >
                   <ArrowLeftOutlined  className="text-lg" />
                 </button>
               </Tooltip>
               
             </motion.div>
             ):
             (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="top-2 right-2 flex gap-4"
            >
              <Tooltip title="Download Image">
                <button
                  onClick={handleDownload}
                  className="p-3    shadow-md dark:text-white dark:shadow-gray-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 "
                  aria-label="Download edited image"
                >
                  <DownloadOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Filter">
                <button
                  onClick={handleEdit}
                  className="p-3  shadow-md dark:text-white dark:shadow-gray-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2"
                  aria-label="Reset image editor"
                >
                  <EditOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Reset">
                <button
                  onClick={handleReset}
                  className="p-3  shadow-md text-red-700 dark:shadow-gray-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2"
                  aria-label="Reset image editor"
                >
                  <ReloadOutlined className="text-lg" />
                </button>
              </Tooltip>
            </motion.div>
             )}
            {filter ? 
             (
              <>
             <Tooltip title="Apply Filter"></Tooltip>
            <ImageFilterEditor image={editedImage}  isclose={isclose}/>
            </>
            ):
            (
              <Image
              src={editedImage}
              height={300}
              width={300}
              
              alt="Edited"
              className="mb-4 rounded-lg mt-3 p-3 hover:backdrop-blur-2xl  shadow-lg border border-gray-200 dark:border-gray-700"
            />
            )
            }
            
            
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageEditingFlow;