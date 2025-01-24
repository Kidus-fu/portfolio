import React from "react";
import Idata from "./data.json"
import ImagesDisplay from "../ImagesDisplay";
const Camera:React.FC = () => {
    const data:any = Idata;
    
    return (
        <div className="">
            <h1>Camera ss</h1>
            <ImagesDisplay Images={data} />
        </div>
    );
}

export default Camera;