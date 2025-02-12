import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

const NavBar:React.FC = () => {
  return (
    <div className="flex fixed z-50 bottom-0 right-0 m-3 rounded-full w-50 h-14 bg-gray-600 shadow-lg text-white items-center px-3">
      <i className="cursor-pointer animate-pulse">
        <a title="back" href={"/frontend"}>
          <ArrowLeftOutlined />
        </a>
      </i>
    </div>
  );
};

export default NavBar;