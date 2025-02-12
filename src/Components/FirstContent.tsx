import { Divider, Flex, theme } from "antd";
import React from "react";
import codeingvideo from "../Media/video/codeing.mp4";
import useMediaQuery from "../hooks/useMediaQuery";
import WritingAnimation from "./WritingAnimation";
import { Outlet, useLocation } from "react-router";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import ContactForm from "./ContactForm";

const ProfileSummary: React.FC = () => (
  <div className="w-[500px] select-text selection:bg-blue-300 selection:opacity-65 selection:text-slate-600">
    <WritingAnimation paragraph="I’m a passionate web developer specializing in React and JavaScript with hands-on experience in building responsive and dynamic web applications. My expertise spans front-end development with React and back-end development with Django. I’m committed to delivering high-quality code, creating engaging user experiences, and ensuring client satisfaction. Let’s collaborate on your next project!" />
  </div>
);

const VideoPlayer: React.FC = () => (
  <div className="me-4 rounded-lg overflow-hidden">
    <video loop autoPlay muted width={400} height={200} disablePictureInPicture>
      <source src={codeingvideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

const DashboardWelcome: React.FC = () => (
  <>
    <Flex justify="center" align="middle" className="text-2xl">
      <WritingAnimation paragraph="Profile Summary" />
    </Flex>
    <Divider />
    <Flex justify="space-between" align="middle" className="text-lg">
      <div className="selection:bg-blue-300 selection:opacity-65 selection:text-slate-600">
        <WritingAnimation paragraph="I’m a passionate web developer specializing in React and JavaScript with hands-on experience in building responsive and dynamic web applications. My expertise spans front-end development with React and back-end development with Django. I’m committed to delivering high-quality code, creating engaging user experiences, and ensuring client satisfaction. Let’s collaborate on your next project!" />
      </div>
    </Flex>
  </>
);

const FirstContent: React.FC = () => {
  const l = useLocation();
  console.log(l.pathname);
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("name"));

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <>
    <motion.div
      className="first-content " // Class for the FirstContent
      initial={{ opacity: 0, y: 50,  }} // Initial state: hidden and moved down
      animate={{ opacity: 1, y: 0 ,  }} // Final state: visible and in place
      transition={{ duration: 1 }} // Duration of the animation
      whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and position
      viewport={{ once: true }} // Animate only once when the element enters the viewport
    >
      <div
        className="p-6 bg-white rounded-lg shadow-md"
        style={{ minHeight: "360px", borderRadius: borderRadiusLG }}
      >
        {isLargeScreen ? (
          <>
            <Flex justify="center" align="middle" className="text-2xl">
              <WritingAnimation paragraph="Profile Summary" />
            </Flex>
            <Divider />
            <Flex justify="space-between" align="middle" className="text-lg">
              <ProfileSummary />
              <VideoPlayer />
            </Flex>
            <Outlet />
          </>
        ) : (
          <DashboardWelcome />
        )}
      </div>
    </motion.div>
    <motion.div
      className="first-content m-2  " // Class for the FirstContent
      initial={{ opacity: 0, y: 50,   }} // Initial state: hidden and moved down
      animate={{ opacity: 1, y: 0 ,  }} // Final state: visible and in place
      transition={{ duration: 1 }} // Duration of the animation
      whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and position
      viewport={{ once: true }} // Animate only once when the element enters the viewport
    >
      <div
        className="p-6 bg-white rounded-lg shadow-lg border-black scale"
        style={{ minHeight: "360px", borderRadius: borderRadiusLG }}
      >
        {isLargeScreen ? (
          <>
            <Flex justify="center" align="middle" className="text-2xl">
              <WritingAnimation paragraph="Contact" />
            </Flex>
            <Divider />
            <ContactForm  />
          </>
        ) : (
          <>
          <Flex justify="center" align="middle" className="text-2xl">
              <WritingAnimation paragraph="Contact" />
            </Flex>
            <hr className="m-2"/>
          <ContactForm />
          </>
        )}
      </div>
    </motion.div>
    </>
  );
};

export default FirstContent;
