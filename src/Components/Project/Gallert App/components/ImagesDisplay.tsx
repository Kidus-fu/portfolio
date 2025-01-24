import { Card, Image } from "antd";
import React from "react";
import { Image as ImageType } from "../types/types";

const ImagesDisplay: React.FC<{ Images: [] }> = ({ Images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Images.map((Img: ImageType) => (
        <Card
          key={Img.id}
          className="hover:scale-105 hover:shadow-lg transition-transform duration-300"
          cover={
            <Image
              width="100%"
              height={200}
              src={Img.src}
              alt={Img.title}
              placeholder={<div className="text-gray-400">Loading...</div>}
              preview={true} // Enables image preview on click
            />
          }
        >
          {/* Title and description */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">{Img.title}</h3>
            <p className="text-sm text-gray-600">{Img.location}\{Img.title}.{Img.typeoffile}</p>
            <small>{Img.size}</small>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ImagesDisplay;
