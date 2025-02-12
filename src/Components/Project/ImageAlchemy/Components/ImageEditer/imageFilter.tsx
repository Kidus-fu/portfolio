import { DownloadOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";
import React, { useEffect, useState, useRef } from "react";

interface ImageFilterEditorProps {
  image: string;
  isclose?: boolean;
}

const filters = [
  { name: "Original", class: "" },
  { name: "Bright", class: "brightness-150" },
  { name: "High Contrast", class: "contrast-200" },
  { name: "Grayscale", class: "grayscale" },
  { name: "Sepia", class: "sepia" },
  { name: "Blur", class: "blur-md" },
  { name: "Hue Rotate", class: "hue-rotate-180" },
  { name: "Saturate", class: "saturate-200" },
  { name: "Invert", class: "invert" },
  { name: "Opacity", class: "opacity-30" },
  { name: "Warm", class: "brightness-110 sepia" },
  { name: "Cool", class: "contrast-125 hue-rotate-90" },
];

const ImageFilterEditor: React.FC<ImageFilterEditorProps> = ({
  image,
  isclose,
}) => {
  const [activeFilter, setActiveFilter] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filterClass: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveFilter(filterClass);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (isclose) {
      setActiveFilter("");
    }
  }, [isclose]);

  // Dragging Logic for Filters
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const positionX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = positionX - (carouselRef.current?.offsetLeft || 0);
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;
  };

  const onDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const positionX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const walk = (positionX - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  // Download Filtered Image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.filter = getComputedStyle(img).filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 mt-3 dark:bg-gray-800 rounded-lg shadow-lg max-w-xs sm:max-w-full">
        {/* Floating Download Button Disktop*/}
        <Tooltip title="Download Image" className=" hidden lg:block">
          <button
            onClick={handleDownload}
            className="fixed bottom-12 right-72 p-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg transition-all transform hover:scale-110"
            aria-label="Download Image"
          >
            <DownloadOutlined className="text-xl" />
          </button>
        </Tooltip>
        {/* Moble */}
        <Tooltip title="Download Image" className=" block lg:hidden">
          <button
            onClick={handleDownload}
            className="fixed bottom-10 animate-pulse right-5 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all transform hover:scale-110"
            aria-label="Download Image"
          >
            <DownloadOutlined className="text-xl" />
          </button>
        </Tooltip>
        {/* Image Preview */}
        <div className="relative flex justify-center w-full max-w-md mb-4">
          {loading && (
            <div className="absolute mt-10 flex justify-center z-50 w-[200px] h-[200px] bg-black/30 backdrop-blur-sm ">

              <Spin  className="absolute z-50 top-2/4 " size="small" />
            </div>
          )}
          <img
            ref={imgRef}
            src={image}
            onDragStart={(e) => e.preventDefault()}
            alt="Preview"
            className={`w-[200px] h-[200px] mt-10 dark:shadow-gray-600 object-cover rounded-lg shadow-lg transition-all duration-200 ${activeFilter}`}
          />
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Filter Carousel */}
        <div className="relative w-full max-w-md select-none">
          <div
            ref={carouselRef}
            className="overflow-hidden flex gap-4 p-2 whitespace-nowrap cursor-pointer"
            onMouseDown={startDragging}
            onMouseMove={onDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onTouchStart={startDragging}
            onTouchMove={onDragging}
            onTouchEnd={stopDragging}
          >
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => handleFilterChange(filter.class)}
                className={`flex flex-col items-center min-w-[80px] p-2 rounded-lg transition-all duration-200 ${activeFilter === filter.class
                    ? "bg-blue-500 text-white shadow-lg scale-110"
                    : "bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-600/80"
                  }`}
              >
                <img
                  src={image}
                  alt={filter.name}
                  onDragStart={(e) => e.preventDefault()}
                  className={`w-16 h-16 rounded-lg p-1  object-cover ${filter.class}`}
                />
                <span className="text-xs mt-1">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageFilterEditor;
