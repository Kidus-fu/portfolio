import React, { useState } from "react";
import Draggable from "react-draggable"; // Import Draggable
import { ResizableBox } from "react-resizable";
import { motion } from "framer-motion";
import "react-resizable/css/styles.css"; // Import required CSS for react-resizable

const BackEnd: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStop = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div>
      <h1>Image Editing Flow</h1>
      <Draggable position={position} onStop={handleStop}>
        <div
          className="draggable-box"
          style={{ width: 200, height: 200, backgroundColor: "lightblue" }}
        >
          Drag me around!
        </div>
      </Draggable>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      >
        <ResizableBox
          width={600}
          height={400}
          minConstraints={[300, 200]}
          maxConstraints={[1000, 700]}
          axis="both" // Ensures resizing in both directions
          resizeHandles={["se"]} // Enables resizing from bottom-right
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 relative"
        >
          <div className="relative h-full w-full">
            <h3 className="text-xl font-semibold">Resizable Modal</h3>
            <p>Drag the bottom-right corner to resize.</p>
          </div>
        </ResizableBox>
      </motion.div>
    </div>
  );
};

export default BackEnd;
