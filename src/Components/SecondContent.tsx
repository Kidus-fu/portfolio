import { Divider, Flex, Image, theme } from "antd";
import React from "react";
import me1 from "../Media/images/me1.jpg";
import useMediaQuery from "../hooks/useMediaQuery";
import WritingAnimation from "./WritingAnimation";

const ProfileSummary: React.FC = () => (
  <div className="w-[500px] select-text selection:bg-blue-300 selection:text-slate-600">
    <WritingAnimation paragraph="Hi, I'm Kidus, a self-taught, 16-year-old web developer with over a year of hands-on experience. I specialize in React and JavaScript, creating dynamic and responsive web applications that deliver exceptional user experiences. Alongside my front-end expertise, I have experience with Django for back-end development, enabling me to build robust full-stack solutions. I’m passionate about learning, committed to writing clean, high-quality code, and dedicated to bringing innovative ideas to life. Let’s collaborate and create something amazing together!" />
  </div>
);

const Phonto: React.FC = () => (
  <div className="me-4 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-300 to-red-800">
    <Image
      src={me1}
      alt="me1"
      height={550}
      className="rounded-full"
      width={400}
      preview={false}
    />
  </div>
);

const DashboardWelcome: React.FC = () => (
  <>
    <Flex justify="center" align="middle" className="text-2xl ">
      <WritingAnimation paragraph="About Me" />
    </Flex>
    <Divider />
    <Flex justify="space-between" align="middle" className="text-lg ">
      <div className="selection:bg-blue-300 selection:opacity-65 selection:text-slate-600">
        <WritingAnimation paragraph="Hi, I'm Kidus, a self-taught, 16-year-old web developer with over a year of hands-on experience. I specialize in React and JavaScript, creating dynamic and responsive web applications that deliver exceptional user experiences. Alongside my front-end expertise, I have experience with Django for back-end development, enabling me to build robust full-stack solutions. I’m passionate about learning, committed to writing clean, high-quality code, and dedicated to bringing innovative ideas to life. Let’s collaborate and create something amazing together!" />
      </div>
    </Flex>
    <Phonto />
  </>
);

const SecondContent: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md"
      style={{ minHeight: "360px", borderRadius: borderRadiusLG }}
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
        <DashboardWelcome />
      )}
    </div>
  );
};

export default SecondContent;
