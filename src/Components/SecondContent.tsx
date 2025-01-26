import { Divider, Flex, Image, theme } from "antd";
import React from "react";
import me1 from "../Media/images/me1.jpg"; // Profile picture
import useMediaQuery from "../hooks/useMediaQuery"; // Custom hook to check screen size
import WritingAnimation from "./WritingAnimation"; // Animation component

// Profile summary with a typing animation
const ProfileSummary: React.FC = () => (
  <div className="w-[500px] select-text selection:bg-blue-300 selection:text-slate-600">
    <WritingAnimation paragraph="Hi, I'm Kidus, a self-taught, 16-year-old web developer with over a year of hands-on experience. I specialize in React and JavaScript, creating dynamic and responsive web applications that deliver exceptional user experiences. Alongside my front-end expertise, I have experience with Django for back-end development, enabling me to build robust full-stack solutions. I’m passionate about learning, committed to writing clean, high-quality code, and dedicated to bringing innovative ideas to life. Let’s collaborate and create something amazing together!" />
  </div>
);

// Profile photo with gradient background
const Phonto: React.FC = () => (
  <div className="me-4 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-300 to-red-800">
    <Image
      src={me1} // Profile image path
      alt="me1"
      height={550} // Image height
      className="rounded-full" // Circular image
      width={400} // Image width
      preview={false} // Disable image preview
    />
  </div>
);

// DashboardWelcome component for smaller screens
const DashboardWelcome: React.FC = () => (
  <>
    <Flex justify="center" align="middle" className="text-2xl">
      <WritingAnimation paragraph="About Me" />
    </Flex>
    <Divider />
    <Flex justify="space-between" align="middle" className="text-lg">
      <div className="selection:bg-blue-300 selection:opacity-65 selection:text-slate-600">
        <WritingAnimation paragraph="Hi, I'm Kidus, a self-taught, 16-year-old web developer with over a year of hands-on experience. I specialize in React and JavaScript, creating dynamic and responsive web applications that deliver exceptional user experiences. Alongside my front-end expertise, I have experience with Django for back-end development, enabling me to build robust full-stack solutions. I’m passionate about learning, committed to writing clean, high-quality code, and dedicated to bringing innovative ideas to life. Let’s collaborate and create something amazing together!" />
      </div>
    </Flex>
    <Phonto />
  </>
);

// Main content component with responsive layout
const SecondContent: React.FC = () => {
  // Custom hook for checking screen size
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md"
      style={{ minHeight: "360px", borderRadius: borderRadiusLG }} // Rounded corners
    >
      {isLargeScreen ? (
        <>
          <Flex justify="center" align="middle" className="text-2xl">
            <WritingAnimation paragraph="About Me" />
          </Flex>
          <Divider />
          <Flex justify="space-between" align="middle" className="text-lg">
            <Phonto />
            <ProfileSummary />
          </Flex>
        </>
      ) : (
        // For smaller screens, render a simpler layout
        <DashboardWelcome />
      )}
    </div>
  );
};

export default SecondContent;