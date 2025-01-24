import "./App.css";
import {
  DashboardOutlined,
  FileOutlined,
  UserOutlined,
  BookOutlined,
  CodepenCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {   Layout, Menu, Spin } from "antd";
import React, {  useState } from "react";
import {  NavLink, Outlet, useLocation } from "react-router";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import useMediaQuery from "./hooks/useMediaQuery";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}



const App: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const [activeLink,setActiveLink] = useState(pathname);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const isLargeScreen = useMediaQuery("(min-width: 654px)");
  
  const loadingset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleClicklink = (e: any) => {
    setActiveLink(e.key);
  };
  const items: MenuItem[] = [
    getItem(<NavLink to="/" onClick={() => handleClicklink("profile")}>Profile Summary</NavLink>, "profile", <DashboardOutlined />),
    getItem(<NavLink to="/skills" onClick={() => handleClicklink("skills")}>Skills</NavLink>, "skills", <BookOutlined />),
    getItem(<NavLink to="/aboutme" onClick={() => handleClicklink("aboutme")}>Aboutme</NavLink>, "aboutme", <UserOutlined />),
    getItem(<p>Team</p>, "sub2", <CodepenCircleOutlined />, [
      getItem(<NavLink to="/frontend">Front End</NavLink>, "frontend"),
      getItem(<NavLink to="/backend">Back End</NavLink>, "backend"),
      getItem(<NavLink to="/fullstack">Full Stack</NavLink>, "fullstack"),
    ]),
    getItem(<NavLink to="/files">Files</NavLink>, "9", <FileOutlined />),
  ];

  return (
    <Layout className="min-h-screen bg-gray-100">
      {isLargeScreen ? (
        <>
        <Sider
        collapsible
        collapsed={collapsed}
        style={siderStyle}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-800 text-white sticky top-0 bottom-0"
      >
        
        <div className="text-center py-4">
          <small className="font-semibold">My Portfolio</small>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[activeLink]}
          onClick={loadingset}
          mode="inline"
          items={items}
        />
      </Sider>
        </>
      ) :(
        <>
        <Menu
          theme="dark"
          defaultSelectedKeys={[activeLink]}
          onClick={loadingset}
          mode="inline"
          items={items}
          className="flex fixed bottom-0 left-0   w-full text-white text-center p-4 justify-around z-50"
        />

        </>
      )}
      <Layout>
        <Header className="bg-white sticky top-0 p-4 shadow-md z-50">
          <div className="text-xl font-semibold">My Porfolio</div>
        </Header>
        <Content className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Initial state: hidden and moved down
            animate={{ opacity: 1, y: 0 }} // Final state: visible and in place
            transition={{ duration: 1 }} // Duration of the animation
            whileInView={{ opacity: 1, y: 0 }} // When in view, animate to full opacity and position
            viewport={{ once: true }} // Animate only once when the element enters the viewport
          >
              <Outlet />
            <Spin spinning={loading} delay={500} fullscreen>
            </Spin>
          </motion.div>
        </Content>

        {isLargeScreen ? (
          <>
          <Footer className="text-center bg-gray-800 text-white p-4">
          © {new Date().getFullYear()} React Project by Panda | Learning Never
          Stops 🚀
        </Footer>
          </>
        ):(
          <>
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default App;
