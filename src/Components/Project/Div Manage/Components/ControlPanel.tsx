import React from "react";
import { Slider, Button, Switch } from "antd";
import {
  StopOutlined,
  LoadingOutlined,
  BorderRightOutlined,
  MoonFilled,
  UpOutlined,
  DashOutlined,
  LineOutlined,
  BorderBottomOutlined,
} from "@ant-design/icons";

interface ControlPanelProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  radius: number;
  setRadius: (value: number) => void;
  opacity: number;
  setOpacity: (value: number) => void;
  rotateZ: number;
  setrotateZ: (value: number) => void;
  shadow: boolean;
  setShadow: (value: boolean) => void;
  border: boolean;
  setBorder: (value: boolean) => void;
  animation: string;
  setAnimation: (value: string) => void;
  isdark: boolean;
  bordercolor: string;
  setBordercolor: (value: string) => void;
  bordersize: number;
  setBordersize: (value: number) => void;
  borderstyle: string;
  setBorderstyle: (value: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  width,
  setWidth,
  height,
  setHeight,
  radius,
  setRadius,
  opacity,
  setOpacity,
  rotateZ,
  setrotateZ,
  shadow,
  setShadow,
  border,
  setBorder,
  animation,
  setAnimation,
  isdark,
  bordercolor,
  setBordercolor,
  bordersize,
  setBordersize,
  borderstyle,
  setBorderstyle,
}) => {
  return (
    <div className={`flex-1 p-11 ${isdark ? "text-gray-400" : ""}`}>
      <div className="flex-1">
        <div>
          <label>Width</label>
          <Slider min={5} max={400} value={width} onChange={setWidth} />
          <small>value: {width}</small>
        </div>
        <div>
          <label>Height</label>
          <Slider min={5} max={400} value={height} onChange={setHeight} />
          <small>value: {height}</small>
        </div>
      </div>
      <div className="flex-1 gap-4 my-2">
        <div className="m-2">
          <label>RotateZ</label>
        </div>
        <div>
          <Slider min={0} max={100} value={rotateZ} onChange={setrotateZ} />
        </div>
        <small>{rotateZ ? `value  : ${rotateZ} px` : "value : 0 px"}</small>
      </div>
      <div className="my-2">
        <label>Radius</label>
        <Slider min={0} max={130} value={radius} onChange={setRadius} />
        <small>value : {radius} px</small>
      </div>
      <div>
        <label>opacity</label>
        <div className="flex gap-4 my-2">
          <Button
            onClick={() => setOpacity(0.1)}
            className={`${opacity === 0.1 ? "bg-blue-700 border-none" : ""}`}
          >
            10%
          </Button>
          <Button
            onClick={() => setOpacity(0.5)}
            className={`${opacity === 0.5 ? "bg-blue-700 border-none" : ""}`}
          >
            50%
          </Button>
          <Button
            onClick={() => setOpacity(1)}
            className={`${opacity === 1 ? "bg-blue-700 border-none" : ""}`}
          >
            100%
          </Button>
        </div>
        <label>Animations</label>
        <div className="flex gap-4 my-2">
          <Button
            className={`${animation === "none" ? "bg-blue-700 border-none" : ""}`}
            onClick={() => setAnimation("none")}
          >
            <StopOutlined />
          </Button>
          <Button
            className={`${animation === "spin" ? "bg-blue-700 border-none" : ""}`}
            onClick={() => setAnimation("spin")}
          >
            <LoadingOutlined className="animate-spin" />
          </Button>
          <Button
            className={`${animation === "ping" ? "bg-blue-700 border-none" : ""}`}
            onClick={() => setAnimation("ping")}
          >
            <BorderRightOutlined className="animate-ping" />
          </Button>
          <Button
            className={`${animation === "pulse" ? "bg-blue-700 border-none" : ""}`}
            onClick={() => setAnimation("pulse")}
          >
            <MoonFilled className="animate-pulse" />
          </Button>
          <Button
            className={`${animation === "bounce" ? "bg-blue-700 border-none" : ""}`}
            onClick={() => setAnimation("bounce")}
          >
            <UpOutlined className="animate-bounce" />
          </Button>
        </div>
        <div className="flex gap-4 my-2">
          <label>Shadow</label>
          <Switch checked={shadow} onChange={setShadow} />
        </div>
        <div className="flex-1 gap-4">
          <label>Border:</label>
          <Switch checked={border} onChange={setBorder} />
          {border && (
            <div className="border border-gray-500 rounded-md mt-3 p-2">
              <div className="flex">
                <label>Color : </label>
                <Button.Group className="gap-2 m-2">
                  <Button
                    className={`${
                      bordercolor === "blue" ? "bg-blue-700 border-none" : "bg-blue-400"
                    }`}
                    title="Blue"
                    onClick={() => setBordercolor("blue")}
                  />
                  <Button
                    className={`${
                      bordercolor === "black" ? "bg-black border-none" : "bg-slate-800"
                    }`}
                    title="Black"
                    onClick={() => setBordercolor("black")}
                  />
                  <Button
                    className={`${
                      bordercolor === "white" ? "bg-white border-none" : "bg-gray-300"
                    }`}
                    title="White"
                    onClick={() => setBordercolor("white")}
                  />
                  <Button
                    className={`${
                      bordercolor === "gray" ? "bg-gray-700 border-none" : "bg-gray-600"
                    }`}
                    title="Gray"
                    onClick={() => setBordercolor("gray")}
                  />
                  <Button
                    className={`${
                      bordercolor === "red" ? "bg-red-700 border-none" : "bg-red-500"
                    }`}
                    onClick={() => setBordercolor("red")}
                    title="Red"
                  />
                  <Button
                    className={`${
                      bordercolor === "green" ? "bg-green-700 border-none" : "bg-green-500"
                    }`}
                    onClick={() => setBordercolor("green")}
                    title="Green"
                  />
                </Button.Group>
              </div>
              <div className="flex-1 gap-4">
                <label>Style:</label>
                <Button.Group className="gap-2 m-2">
                  <Button
                    className={`${borderstyle === "" ? "bg-blue-400" : ""}`}
                    onClick={() => setBorderstyle("")}
                  >
                    <StopOutlined />
                  </Button>
                  <Button
                    className={`${borderstyle === "dashed" ? "bg-blue-400" : ""}`}
                    onClick={() => setBorderstyle("dashed")}
                  >
                    <DashOutlined />
                  </Button>
                  <Button
                    className={`${borderstyle === "solid" ? "bg-blue-400" : ""}`}
                    onClick={() => setBorderstyle("solid")}
                  >
                    <LineOutlined />
                  </Button>
                  <Button
                    className={`${borderstyle === "dotted" ? "bg-blue-400" : ""}`}
                    onClick={() => setBorderstyle("dotted")}
                  >
                    <BorderBottomOutlined />
                  </Button>
                </Button.Group>
              </div>
              <div className="flex-1 gap-4">
                <label>Width:</label>
                <Slider min={0} max={10} value={bordersize} onChange={setBordersize} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;