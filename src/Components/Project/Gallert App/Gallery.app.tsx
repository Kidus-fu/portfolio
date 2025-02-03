import {
  ArrowLeftOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {  Drawer, Image, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import useMediaQuery from "../../../hooks/useMediaQuery";

const { Header, Content, Sider } = Layout;

const NavBar = () => {

  return (
    <div className="flex fixed z-50  bottom-0 right-0 m-3  rounded-full w-50 h-14 bg-gray-600 shadow-lg text-white items-center  px-3">
      <i className="cursor-pointer animate-pulse">
        <a href={"/frontend"}><ArrowLeftOutlined /></a>
      </i>
    </div>
  );
};
function GalleryNavbar() {
  
  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = "https://play-lh.googleusercontent.com/Sy_9xv0fpbnc6bJgYM_DGj7-BhleftZgjbeFmvcN5eMGnoizMl2igd5IfJEq82xKZw8"
    document.title = "Gallery App"
  })

  return (
    <Header className="bg-white bg-opacity-30  shadow-md sticky z-50 w-full top-5 right-0  ">
      <div className="flex items-center justify-between">
        <div className=" text-xl">My Website</div>
        
      </div>
    </Header>
  );
}
const Gallery: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>

      <NavBar />
      <div className=" bg-gray-100 p-4 ">
        <GalleryNavbar />
        {isLargeScreen ? (
          <>
            <Layout className="border shadow-2xl">
              <Layout>
                <Sider className="bg-white h-[100vh] p-4 border ">
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
                <Content
                  className="p-3 bg-gradient-to-br from-gray-300 to-white">

                  <Outlet />
                </Content>
              </Layout>
            </Layout>
          </>
        ) : (
          <>
            <div className="sticky top-7 cursor-pointer z-50 m-2 ">
              <i onClick={showDrawer} className="p-2">
            <MenuOutlined />

              </i>
            </div>
            <Drawer title="Basic Drawer" placement="left"  onClose={onClose} open={open}>
            <div className="flex-1">
                    <Link to={"camera"}>
                      <div className="flex gap-3 p-2 cursor-pointer m-2 border rounded-lg hover:border-blue-500"
                      onClick={onClose}
                      >
                        <Image
                          src="https://th.bing.com/th/id/OIP.2h-qj8WWI0eg8eXQ8j_VggAAAA?rs=1&pid=ImgDetMain"
                          preview={false}
                          
                          height={50}
                        />
                        <h2 className="text-center"> Camera</h2>
                      </div>
                    </Link>
                    <Link to={"favorites"}>
                      <div className="flex gap-3 p-2 cursor-pointer m-2 border rounded-lg hover:border-blue-500"
                      onClick={onClose}
                      >
                        <Image
                          src="https://cdn.thememylogin.com/uploads/edd/2019/03/favorites.png"
                          preview={false}
                          height={50}
                        />
                        <h2 className="text-center"> Favorites</h2>
                      </div>
                    </Link>
                  </div>
            </Drawer>
            <Outlet />
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
