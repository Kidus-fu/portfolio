import "./App.css";
import {
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {  Layout, Menu, Spin } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { motion } from "framer-motion"; // Import motion from Framer Motion

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

const items: MenuItem[] = [
  getItem(<Link to="/">Profile Summary</Link>, "1", <DashboardOutlined />),
  getItem(<Link to="/skills">Skills</Link>, "2", <BookOutlined />),
  getItem(<Link to="/aboutme">Aboutme</Link>, "sub1", <UserOutlined />),
  getItem(<Link to="/team">Team</Link>, "sub2", <TeamOutlined />, [
    getItem(<Link to="/team1">Team 1</Link>, "6"),
    getItem(<Link to="/team2">Team 2</Link>, "8"),
  ]),
  getItem(<Link to="/files">Files</Link>, "9", <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadingset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <Layout className="min-h-screen bg-gray-100">
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
          defaultSelectedKeys={["1"]}
          onClick={loadingset}
          mode="inline"
          items={items}
        />
      </Sider>
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

        <Footer className="text-center bg-gray-800 text-white p-4">
          © {new Date().getFullYear()} React Project by Panda | Learning Never
          Stops 🚀
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
