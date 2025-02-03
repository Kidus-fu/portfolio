import React, { useState, useEffect } from "react";
import { Layout, Affix, Popover, Result, Image, notification, Tabs } from "antd";
import {
  SunOutlined,
  ReloadOutlined,
  LeftOutlined,
  RightOutlined,
  NodeExpandOutlined,
  ToolFilled,
  CodeOutlined,
  BulbFilled,
  EditFilled,
} from "@ant-design/icons";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import NavBar from "./NavBar";
import ControlPanel from "./ControlPanel";
import DevTool from "./DevTool";
import data from "../Data/Examples.json"
import { motion } from "framer-motion";

const components = data

const { Content, Sider } = Layout;

const DivManage: React.FC = () => {

  const [isdark, setIsdark] = useState(true);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [radius, setRadius] = useState(0);
  const [collaption, setCollaption] = useState(false);
  const [pageX, setPageX] = useState(418);
  const [pageY, setPageY] = useState(280);
  const [opacity, setOpacity] = useState(1);
  const [rotateZ, setrotateZ] = useState(0);
  const [shadow, setShadow] = useState(false);
  const [border, setBorder] = useState(false);
  const [animation, setAnimation] = useState("none");
  const [message, setMessage] = useState<string | null>(null);
  const [messagedes, setMessagedes] = useState<string | null>(null);
  const [ismoved, setIsmoved] = useState(false);
  const [showaxis, setShoeaxis] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 624px)");
  const [bordercolor, setBordercolor] = useState("");
  const [bordersize, setBordersize] = useState(1);
  const [borderstyle, setBorderstyle] = useState("");

  // A Code Ganerat Data Type
  // interface GetACodeProps {
  //   isjsx: boolean;
  //   code?: boolean;
  // }

  // Function to apply example properties
  const applyExample = (example: any) => {
    setWidth(example.setWidth);
    setHeight(example.setHeight);
    setRadius(example.setRadius);
    setOpacity(example.setOpacity);
    setrotateZ(example.setRotateZ);
    setShadow(example.setShadow);
    setAnimation(example.setAnimation);
    setBordercolor(example.setBordercolor);
    setBordersize(example.setBordersize);
    setBorderstyle(example.setBorderstyle);
  };

  const GetACode = (isjsx: boolean, code?: boolean): string => {
    // Comment Showing The User The Code Need Some Change
    let comment = `Please update the background color. 
          Also, I’ve automatically removed the
          translate-X, translate-Y properties,
          as they were causing issues for users
          on their web projects. Apologies for 
          the change! but if u went 'translate-x-[${pageX}px] translate-y-[${pageY}px]'`;
      
    let classNames = `bg-white animate-${animation}`;

    if (shadow) {
      classNames += ` ${isdark ? "shadow-gray-300 shadow-lg" : "shadow-gray-500 shadow-lg"
        }`;
    }

    if (width) classNames += ` w-[${width}px]`;
    if (height) classNames += ` h-[${height}px]`;
    if (border)
      classNames += ` border-${borderstyle} border-[${bordersize}px] border-${bordercolor === "black" || bordercolor === "white"
        ? bordercolor
        : `${bordercolor}-500`
        }`;
    if (radius) classNames += ` rounded-[${radius}px]`;
    if (opacity != 1) classNames += ` opacity-[${opacity}]`;
    if (rotateZ && animation != "spin")
      classNames += ` rotate-[${rotateZ}deg]`;
    if (animation === "spin" && rotateZ)
      comment += `you've animation-spin. I deleted a rotateZ but if u need the class is 'rotate-[${rotateZ}deg]'`;
    if (code) {
      return isjsx
        ? `
        <div 
            className="${classNames}">
        </div>
      `
        : `
        <div 
           class="${classNames}">
        </div>
      `;
    } else {
      return isjsx
        ? `
        {/* 
          ${comment}
        */}
        <div 
            className="${classNames}">
        </div>
      `
        : `
        <!-- 
        ${comment}
        -->
        <div 
           class="${classNames}">
        </div>
      `;
    }
  };
  // Rest A Div
  const Rest = () => {
    setWidth(50);
    setHeight(50);
    setRadius(0);
    setOpacity(1);
    setrotateZ(0);
    setPageX(387);
    setPageY(206);
    setShadow(false);
    setAnimation("none");
    setMessage(null);
    setMessagedes(null);
    setIsmoved(false);
    setBordercolor("");
    setBordersize(0);
    setBorderstyle("");
    setShoeaxis(false);
  };

  
  const ChangDark = () => {
    setIsdark(!isdark);
  };

  const setcollaption = () => {
    setCollaption(!collaption);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message =
        "Are you sure you want to leave? You have unsaved changes!";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

  const openNotificationError = () => {
    const notificationProps = {
      message: message || "Error",
      description: messagedes || "An error occurred.",
      onClick: () => console.log("Notification Clicked!"),
    };
    notification.error(notificationProps);
  };

  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href =
      "https://shotkit.com/wp-content/uploads/2020/09/luminar-presets-1.jpg";
    document.title = "Div Manage App";
  }, []);

  const openNotificationSucc = (mess: string) => {
    notification.success({
      message: "Success",
      description: mess,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <>
      {isLargeScreen ? (
        <div className={`${isdark ? "bg-slate-900 text-gray-300" : "bg-white"}`}>
          <NavBar />
          <Layout>
            <Layout>
              <Content
                className={`${isdark
                  ? "bg-gradient-to-br bg-opacity-55 overflow-hidden from-slate-950 to-slate-600 hover:to-slate-700 text-gray-500"
                  : "bg-slate-200"
                  } p-2`}
              >
                <div className="flex gap-4">
                  <Affix>
                    <Popover content={<p>Team</p>} title="">
                      <i
                        className={`${isdark ? "text-white" : ""} cursor-pointer`}
                        onClick={ChangDark}
                      >
                        <SunOutlined />
                      </i>
                    </Popover>
                  </Affix>
                  <Affix>
                    <Popover content={<p>Rest</p>} title="">
                      <i
                        className={`${isdark ? "text-white" : ""} cursor-pointer`}
                        onClick={Rest}
                      >
                        <ReloadOutlined />
                      </i>
                    </Popover>
                  </Affix>
                </div>

                <div className="flex-1 float-end text-opacity-65">
                  <div className="flex">
                    <small>Width : {width} px</small>
                  </div>
                  <div className="flex">
                    <small>Height : {height} px</small>
                  </div>
                  <div className="flex">
                    <small>Radius : {radius} px</small>
                  </div>
                  <div className="flex">
                    <small>
                      opacity :{" "}
                      {opacity === 0.1
                        ? "10%"
                        : opacity === 0.5
                          ? "50%"
                          : opacity === 1
                            ? "100%"
                            : ""}
                    </small>
                  </div>
                  <div className="flex">
                    <small> {pageX ? `X : ${pageX} px` : ""}</small>
                  </div>
                  <div className="flex">
                    <small> {pageY ? `Y : ${pageY} px` : ""}</small>
                  </div>
                  <div className="flex">
                    <small> {rotateZ ? `Z : ${rotateZ} px` : ""}</small>
                  </div>
                </div>
                <div className="relative w-full h-full">
                  {showaxis && (
                    <>
                      <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-gray-400 animate-pulse">
                        <span className="absolute left-0 -top-5 text-xs">X</span>
                      </div>
                      <div className="absolute border-dashed left-1/2 top-0 h-full border-l animate-pulse border-gray-400">
                        <span className="absolute -left-5 top-0 text-xs">Y</span>
                      </div>
                    </>
                  )}

                  <div
                    className={`absolute select-none bg-gray-400 animate-${animation} ${shadow
                      ? isdark
                        ? "shadow-gray-300 shadow-lg"
                        : "shadow-gray-500 shadow-lg"
                      : ""
                      } cursor-grab`}
                    id="l"
                    style={{
                      borderColor: bordercolor,
                      border: `${bordersize}px ${borderstyle} ${bordercolor}`,
                      width: width,
                      height: height,
                      borderRadius: radius,
                      opacity: opacity,
                      transform: `rotateZ(${rotateZ}deg)`,
                      top: `${pageY}px`,
                      left: `${pageX}px`,
                    }}
                    onMouseDown={(e) => {
                      if (height > 150 && width > 150) {
                        setIsmoved(true);
                        e.currentTarget.style.cursor = "grabbing";
                      } else {
                        setMessage("Error");
                        setMessagedes(
                          "Your div height and width must be greater than 150"
                        );
                        openNotificationError();
                      }
                    }}
                    onMouseMove={(e) => {
                      if (ismoved) {
                        setPageX(e.pageX - 130);
                        setPageY(e.pageY - 130);
                      }
                    }}
                    onMouseUp={(e) => {
                      setIsmoved(false);
                      e.currentTarget.style.cursor = "grab";
                    }}
                    onMouseLeave={(e) => {
                      setIsmoved(false);
                      e.currentTarget.style.cursor = "grab";
                    }}
                  ></div>
                </div>
              </Content>
              <Sider
                className={`${isdark
                  ? "bg-slate-900 text-gray-300"
                  : "bg-white shadow-lg border-x-2"
                  } overflow-auto h-[100vh]`}
                width={collaption ? 50 : 400}
              >
                <div className="sticky top-0 right-0 z-50">
                  {collaption ? (
                    <LeftOutlined
                      className="text-xl hover:border cursor-pointer py-5 px-3"
                      onClick={setcollaption}
                    />
                  ) : (
                    <RightOutlined
                      className="text-xl hover:border cursor-pointer p-5"
                      onClick={setcollaption}
                    />
                  )}
                </div>

                {collaption ? (
                  <div className="flex-1 p-2 text-2xl gap-60 cursor-pointer">
                    <Popover content={<p>Panels</p>} title="" placement="left">
                      <NodeExpandOutlined
                        className="mb-4"
                        onClick={setcollaption}
                      />
                    </Popover>
                    <Popover content={<p>Dev Tool</p>} title="" placement="left">
                      <ToolFilled className="mb-4" onClick={setcollaption} />
                    </Popover>
                    <CodeOutlined className="mb-4" onClick={setcollaption} />
                    <Popover content={<p>Examples</p>} title="" placement="left">
                      <BulbFilled className="mb-4" />
                    </Popover>
                  </div>
                ) : (
                  <>
                    <div className="text-center text-xl">
                      Editor Panel <EditFilled />
                    </div>
                    <Tabs
                      defaultActiveKey="1"
                      items={[
                        {
                          key: "1",
                          label: (
                            <Popover content={<p>Panels</p>} title="">
                              <div className={`${isdark ? "text-white" : ""}`}>
                                Panels <NodeExpandOutlined className="mx-1" />
                              </div>
                            </Popover>
                          ),
                          children: (
                            <ControlPanel
                              width={width}
                              setWidth={setWidth}
                              height={height}
                              setHeight={setHeight}
                              radius={radius}
                              setRadius={setRadius}
                              opacity={opacity}
                              setOpacity={setOpacity}
                              rotateZ={rotateZ}
                              setrotateZ={setrotateZ}
                              shadow={shadow}
                              setShadow={setShadow}
                              border={border}
                              setBorder={setBorder}
                              animation={animation}
                              setAnimation={setAnimation}
                              isdark={isdark}
                              bordercolor={bordercolor}
                              setBordercolor={setBordercolor}
                              bordersize={bordersize}
                              setBordersize={setBordersize}
                              borderstyle={borderstyle}
                              setBorderstyle={setBorderstyle}
                            />
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <Popover content={<p>Dev Tool</p>} title="">
                              <div className={`${isdark ? "text-white" : ""}`}>
                                Dev Tool <ToolFilled className="mx-1" />
                              </div>
                            </Popover>
                          ),
                          children: (
                            <DevTool
                              isdark={isdark}
                              GetACode={GetACode}
                              showaxis={showaxis}
                              setShoeaxis={setShoeaxis}
                              openNotificationSucc={openNotificationSucc}
                            />
                          ),
                        },
                        {
                          key: "3",
                          label: (
                            <Popover content={<p>Examples</p>} title="">
                              <div className={`${isdark ? "text-white" : ""}`}>
                                Examples{" "}
                                <BulbFilled className="mx-1 text-yellow-500" />
                              </div>
                            </Popover>
                          ),
                          children:

                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {components.map((component, index) => (
                                <motion.div
                                  key={index}
                                  className={`p-4 cursor-pointer ${isdark ? "bg-slate-800" : "bg-gray-100"
                                    } rounded-lg shadow-md transition-transform duration-300 ease-in-out`}
                                  whileHover={{
                                    scale: 1.05, // Slightly scale the card on hover
                                    zIndex: 2, // Keep the card on top of other elements
                                    borderColor:
                                      component.setBordercolor === "#dc2626" ? "#34D399" : "#dc2626",
                                  }}
                                  whileTap={{
                                    opacity: 0.2,
                                    scale: 1, // Return to original scale after tap
                                    zIndex: 1, // Keep the card on top of other elements
                                    transformOrigin: "center", // Center the transform origin
                                  }}
                                  onClick={() => applyExample(component)} // Trigger any action on click
                                >
                                  <h3 className="font-bold">{component.Name}</h3>
                                  <p>Width: {component.setWidth}px</p>
                                  <p>Height: {component.setHeight}px</p>
                                  <p>Radius: {component.setRadius}px</p>
                                  <p>Opacity: {component.setOpacity}</p>
                                  <p>RotateZ: {component.setRotateZ}deg</p>
                                  <p>Shadow: {component.setShadow ? "Yes" : "No"}</p>
                                </motion.div>
                              ))}

                            </div>


                          ,
                        },
                      ]}
                      className={`${isdark ? "text-gray-300" : ""}`}
                      animated
                    />
                  </>
                )}
              </Sider>
            </Layout>

          </Layout>

        </div>
      ) : (
        <div className="bg-white m-2 h-screen w-full border p-3">
          <Result
            title="Mobile Versions"
            extra={
              <div>
                <NavBar />
                <small>
                  Sorry, this app is not available in mobile view. Please open
                  it on a PC or switch to desktop mode
                </small>
                <br />
                <Image
                  src="https://www.milesweb.in/blog/wp-content/uploads/2020/07/mob-desktop-site-min-576x1024.jpg"
                  preview={false}
                  height={300}
                />
              </div>
            }
          />
        </div>
      )}
    </>
  );
};

export default DivManage;