import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { Result } from "antd";
import FirstContent from "./Components/FirstContent.tsx";
import SecondContent from "./Components/SecondContent.tsx";
import Skills from "./Components/Skills.tsx";
import FrontEnd from "./Components/FrontEnd.tsx";
import BackEnd from "./Components/BackEnd.tsx";
import Fullstack from "./Components/Fullstack.tsx";
import Gallery from "./Components/Project/Gallert App/Gallery.app.tsx";
import Camera from "./Components/Project/Gallert App/components/Camera/Camera.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FirstContent />} />
          <Route path="/aboutme" element={<SecondContent />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/frontend" element={<FrontEnd />} />
          <Route path="/backend" element={<BackEnd />} />
          <Route path="/fullstack" element={<Fullstack />} />
        </Route>
        <Route path="/projects/gallery.app" element={<Gallery />} >
        <Route path="camera" element={<Camera /> } />
        </Route>
        <Route
          path="*"
          element={
            <Result
              status={"404"}
              title="404"
              subTitle={<Link to={"/"}>Home</Link>}
            ></Result>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
