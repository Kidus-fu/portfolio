import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Select, Slider, Row, Col, message, Tooltip } from 'antd';
import { DownloadOutlined, SwapOutlined, LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import confetti from "canvas-confetti";
import FeedbackComponent from './Feedback';

const { Option } = Select;

const ImageConverter: React.FC = () => {
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<'jpg' | 'png'>('png');
  const [quality, setQuality] = useState<number>(90);
  const [fileName, setFileName] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [useruseapp, setUseruseapp] = useState(false);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (convertedImage) URL.revokeObjectURL(convertedImage);
    };
  }, [convertedImage]);

  // Handle image upload
  const handleImageUpload = (file: File) => {
    setIsConverting(true);
    setImageDimensions(null);

    // Cleanup previous conversion
    if (convertedImage) {
      URL.revokeObjectURL(convertedImage);
      setConvertedImage(null);
    }

    const reader = new FileReader();

    reader.onerror = () => {
      message.error('Failed to read file');
      setIsConverting(false);
    };

    reader.onload = (e) => {
      const img = new window.Image();

      img.onerror = () => {
        message.error('Failed to load image');
        setIsConverting(false);
      };

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          setImageDimensions({ width: img.width, height: img.height });

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas context not available');

          ctx.drawImage(img, 0, 0);

          const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : 'image/png';
          const qualityValue = targetFormat === 'jpg' ? quality / 100 : 1;

          canvas.toBlob((blob) => {
            if (!blob) throw new Error('Conversion failed');

            const newUrl = URL.createObjectURL(blob);
            setConvertedImage(newUrl);
            setFileName(file.name.replace(/\.[^/.]+$/, '') + `.${targetFormat}`);
            setTimeout(() => {
              setIsConverting(false);
            }, 2000);
          }, mimeType, qualityValue);
        } catch (error) {
          message.error(error instanceof Error ? error.message : 'Conversion failed');
          setIsConverting(false);
        }
      };

      if (e.target?.result) {
        img.src = e.target.result.toString();
      }
    };

    reader.readAsDataURL(file);
  };

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Validate file type based on target format
        if (targetFormat === 'png' && file.type === 'image/png') {
          message.error('You selected "JPG to PNG" but uploaded a PNG file. Please upload a JPG file.');
          return;
        }
        if (targetFormat === 'jpg' && file.type === 'image/jpeg') {
          message.error('You selected "PNG to JPG" but uploaded a JPG file. Please upload a PNG file.');
          return;
        }

        // Check if the file is a valid image type
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          message.error('Only JPG/PNG files are allowed!');
          return;
        }

        handleImageUpload(file);
      }
    },
    [targetFormat, quality]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    multiple: false
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white border shadow-lg mt-4  dark:bg-gray-900 dark:border-gray-700`}
        whileHover={{ opacity: 0.9 }}
      >
        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 mt-8"
        >
          Image Converter
        </motion.h2>
        <div
          className="p-6 bg-white dark:bg-gray-900 shadow-lg shadow-gray-300 dark:shadow-gray-700 rounded-3xl"
          
        >
          <div className="flex items-center gap-2 dark:text-gray-300 m-2">
            <SwapOutlined className="text-blue-500" />
            <span className="text-xl font-semibold">Image Format Converter</span>
          </div>

          {/* Format Selection */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={24}>
              <Select
                value={targetFormat}
                onChange={(value: 'jpg' | 'png') => setTargetFormat(value)}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="png">Convert JPG to PNG</Option>
                <Option value="jpg">Convert PNG to JPG</Option>
              </Select>
            </Col>

            {/* Quality Slider (for JPG) */}
            {targetFormat === 'jpg' && (
              <Col span={24}>
                <div className="flex items-center gap-2">
                  <span>Quality:</span>
                  <Slider
                    min={1}
                    max={100}
                    value={quality}
                    onChange={(value) => setQuality(value)}
                    style={{ flex: 1 }}
                  />
                  <Tooltip title="Image Quality">
                    <span>{quality}%</span>
                  </Tooltip>
                </div>
              </Col>
            )}
          </Row>

          {/* Upload Area */}
          <motion.div
            {...getRootProps({ onClick: (event) => event.stopPropagation() })}
            initial={{ scale: 1 }}
            animate={{ scale: isDragActive ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="rounded-md"
          >
            <input {...getInputProps()} />
            <div
              className="border-2 border-dashed border-blue-500 dark:border-blue-400 rounded-md p-8 text-center cursor-pointer transition-all duration-300 
                 w-full min-h-[200px] flex flex-col justify-center items-center mx-auto bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"

            >
              {isConverting ? (
                <div className="flex flex-col items-center gap-2">
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                  <p>
                    Converting {imageDimensions && `(${imageDimensions.width}x${imageDimensions.height})`}
                  </p>
                </div>
              ) : isDragActive ? (
                <p className="text-blue-500 font-semibold">Drop the image here!</p>
              ) : convertedImage ? (
                <div className="text-center">
                  <img
                    src={convertedImage}
                    alt="Converted preview"
                    className="rounded-lg shadow-md w-24 h-24 object-cover mx-auto mb-2"
                  />
                  <h2 className="text-lg font-semibold">{fileName}</h2>
                  <small className="text-gray-500">Try More</small>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Drag & drop an image, or click to select
                </p>
              )}
            </div>
          </motion.div>

          {/* Download Button */}
          {convertedImage && !isConverting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: 24 }}
            >
              <div className="flex justify-center items-center gap-3">
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="large"
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                  href={convertedImage}
                  download={fileName}
                  onClick={() => {
                    setTimeout(() => {
                      confetti()
                      message.success('Image saved successfully!');
                      setUseruseapp(true);
                    }, 500);
                  }}
                >
                  Download
                </Button>
              </div>
            </motion.div>
          )}
        </div>

      </motion.div>

      {/* Feedback Component */}
      {useruseapp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FeedbackComponent />
        </motion.div>
      )}
    </>
  );
};

export default ImageConverter;
