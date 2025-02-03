import React, { useState } from "react";
import { Button, Modal, Spin, Affix, Switch, notification,  } from "antd";
import {
  CodeOutlined,
  CopyFilled,
  JavaScriptOutlined,
  Html5Filled,
  LoadingOutlined,
} from "@ant-design/icons";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

interface DevToolProps {
  isdark: boolean;
  GetACode: (isjsx: boolean, code?: boolean) => string;
  showaxis: boolean;
  setShoeaxis: React.Dispatch<React.SetStateAction<boolean>>;
  openNotificationSucc: (mess: string) => void; // Add this prop
}

const DevTool: React.FC<DevToolProps> = ({ 
    isdark,
  GetACode,
  showaxis,
  setShoeaxis,
 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelLoading, setisModelLoading] = useState(false);
  const [getcodetheme, setgetcodetheme] = useState("jsx");
  const [contextMenuinGetCode, setContextMenuinGetCode] = useState({
    x: 0,
    y: 0,
    show: false,
  });

  const showModal = () => {
    setisModelLoading(true);
    setTimeout(() => {
      setisModelLoading(false);
    }, 2000);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleContextMenuinGetCode = (e:any) => {
    e.preventDefault();
    setContextMenuinGetCode({
      x: e.clientX - 330,
      y: e.clientY - 130,
      show: true,
    });
  };

  const handleClickinGetCode = () => {
    setContextMenuinGetCode({ ...contextMenuinGetCode, show: false });
  };
    

  const openNotificationSucc = (message: string) => {
    notification.success({
      message: "Success",
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <div className={`flex-1 gap-4 ${isdark ? "text-gray-400" : ""} p-5`}>
      <div className="flex gap-4 my-3">
        <label>Show Axis</label>
        <Switch checked={showaxis} onChange={setShoeaxis} />
      </div>
      <div>
        <Button className="flex items-center gap-2" onClick={showModal}>
          <CodeOutlined />
          <span>Get A Code</span>
        </Button>
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={640}
      >
        {isModelLoading ? (
          <div className="flex justify-center h-[300px] items-center">
            <Spin indicator={<LoadingOutlined />} />
            <small className="text-center">
              Code is generted please with <i className="animate-ping">...</i>
            </small>
          </div>
        ) : (
          <div className="flex-1 gap-7 bg-white p-2">
            <Affix className="m-4">
              <i className="float-end">
                <CopyFilled
                  className="cursor-pointer hover:text-gray-800 text-gray-950"
                  onClick={() => {
                    navigator.clipboard.writeText(GetACode(true, true));
                    openNotificationSucc("Copied!");
                  }}
                />
              </i>
              <i
                className={`p-2 border-b-2 ${
                  getcodetheme === "jsx" ? "border-b-blue-600" : ""
                } hover:border-b-blue-600 cursor-pointer`}
                onClick={() => setgetcodetheme("jsx")}
              >
                <JavaScriptOutlined className="text-yellow-500 mx-1 text-sm" />
                div.jsx
              </i>
              <i
                className={`p-2 border-b-2 ${
                  getcodetheme === "js" ? "border-b-blue-600" : ""
                } mx-2 hover:border-b-blue-600 transition-all cursor-pointer`}
                onClick={() => setgetcodetheme("js")}
              >
                <Html5Filled className="text-red-700 mx-1 text-sm" />
                div.html
              </i>
            </Affix>
            {getcodetheme === "jsx" ? (
              <div
                onClick={handleClickinGetCode}
                onContextMenu={handleContextMenuinGetCode}
                className="relative"
              >
                <AceEditor
                  mode="jsx"
                  theme="dawn"
                  name="code-editor"
                  value={GetACode(true)}
                  readOnly={true}
                  fontSize={12}
                  maxLines={GetACode(true).length}
                />
              </div>
            ) : (
              <div
                onClick={handleClickinGetCode}
                onContextMenu={handleContextMenuinGetCode}
                className="relative"
              >
                <AceEditor
                  mode="html"
                  theme="github"
                  name="code-editor"
                  value={GetACode(false)}
                  readOnly={true}
                  fontSize={12}
                  maxLines={GetACode(true).length}
                />
              </div>
            )}
            {contextMenuinGetCode.show && (
              <div
                className="absolute z-50 bg-gray-300 shadow-lg rounded-lg px-1 py-3 h-[200px] w-[200px]"
                style={{
                  top: `${contextMenuinGetCode.y}px`,
                  left: `${contextMenuinGetCode.x}px`,
                }}
              >
                <ul className="space-y-2">
                  <li
                    className="cursor-pointer hover:bg-slate-600 hover:rounded-lg p-2"
                    onClick={() => {
                      navigator.clipboard.writeText(GetACode(true, true));
                      openNotificationSucc("Copied!");
                      handleClickinGetCode();
                    }}
                  >
                    <CopyFilled className="text-sm cursor-pointer" />
                    Copy
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DevTool;