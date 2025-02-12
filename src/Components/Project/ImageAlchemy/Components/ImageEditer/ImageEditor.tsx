import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "antd";
import { ZoomInOutlined, RotateLeftOutlined } from "@ant-design/icons";
import getCroppedImg from "../cropImage";
import { motion } from "framer-motion";

type ImageEditorProps = {
  imageSrc: string;
  onComplete: (croppedImage: string) => void;
};

const ImageEditor: React.FC<ImageEditorProps> = ({ imageSrc, onComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPx: any) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  const getCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg w-full  mx-auto p-4 sm:p-6  max-w-xs sm:max-w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Crop Area (Center) */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="relative w-full h-[50vh] sm:h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              cropShape="rect"
              style={{ touchAction: "none" }} // Fix for mobile gestures
            />
          </div>
        </div>

        {/* Controls (Stacked on Mobile, Side-by-Side on Desktop) */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
          {/* Zoom Slider */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              <ZoomInOutlined /> Zoom
            </label>
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(value) => setZoom(value as number)}
              tooltip={{ formatter: (value) => `${Math.round(value * 100)}%` }}
              className="w-full"
              aria-label="Zoom slider"
            />
          </div>

          {/* Rotation Slider */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              <RotateLeftOutlined /> Rotation
            </label>
            <Slider
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(value) => setRotation(value as number)}
              tooltip={{ formatter: (value) => `${value}°` }}
              className="w-full"
              aria-label="Rotation slider"
            />
          </div>

          {/* Apply Crop Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getCroppedImage}
            className="mt-6 w-full lg:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Apply crop"
          >
            Apply Crop
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageEditor;
