import {
  ArrowLeftOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import useMediaQuery from "../../../hooks/useMediaQuery";

const { Header, Content, Sider } = Layout;

const NavBar = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/frontend");
  };
  return (
    <div className="flex fixed  bottom-0 right-0 m-3  rounded-full w-50 h-14 bg-gray-600 shadow-lg text-white items-center  px-3">
      <i onClick={handleClickBack} className="cursor-pointer animate-pulse">
        <ArrowLeftOutlined />
      </i>
    </div>
  );
};
function GalleryNavbar() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className="bg-white  shadow-md sticky z-50 w-full top-0 right-0  ">
      <div className="flex items-center justify-between">
        <div className=" text-xl">My Website</div>
        <div className="lg:hidden">
          <button className=" text-2xl" onClick={toggleMenu}>
            {collapsed ? <MenuOutlined /> : <CloseOutlined />}
          </button>
        </div>
        <div className={`lg:flex ${collapsed ? "hidden" : "block"}`}>
          <Menu mode="horizontal" className="">
            <Menu.Item key="home">
              <a href="#1">Home</a>
            </Menu.Item>
            <Menu.Item key="about">
              <a href="#g">About</a>
            </Menu.Item>
            <Menu.Item key="projects">
              <Link to="/projects">Projects</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
  );
}
const Gallery: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <NavBar />
      <div className=" bg-white p-4 m-4 ">
        <GalleryNavbar />
        {isLargeScreen ? (
          <>
            <Layout>
              <Layout>
                <Sider className="bg-white h-[100vh] p-4 ">
                  <div className="flex-1">
                    <Link to={"camera"}>
                      <div className="flex gap-3 p-2 cursor-pointer m-2 border rounded-lg hover:border-blue-500">
                        <Image
                          src="https://th.bing.com/th/id/OIP.2h-qj8WWI0eg8eXQ8j_VggAAAA?rs=1&pid=ImgDetMain"
                          preview={false}
                          height={50}
                        />
                        <h2 className="text-center"> Camera</h2>
                      </div>
                    </Link>
                    <Link to={"favorites"}>
                      <div className="flex gap-3 p-2 cursor-pointer m-2 border rounded-lg hover:border-blue-500">
                        <Image
                          src="https://cdn.thememylogin.com/uploads/edd/2019/03/favorites.png"
                          preview={false}
                          height={50}
                        />
                        <h2 className="text-center"> Favorites</h2>
                      </div>
                    </Link>
                  </div>
                </Sider>
                <Content className="p-4 m-4">
                  <div className="bg-white">
                    <Outlet />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </>
        ) : (
          <>
            <p>small</p>
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
