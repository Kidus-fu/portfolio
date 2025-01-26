import { Card, Image, Segmented, Drawer, Skeleton } from "antd";
import React, {  useState } from "react";
import { Image as ImageType } from "../types/types";
import { useLocation, useNavigate } from "react-router";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { DownloadOutlined } from "@ant-design/icons";

const ImagesDisplay: React.FC<{ Images: [] }> = ({ Images }) => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const queryset = new URLSearchParams(loaction.search); // get a url params
  const ishasdetails = queryset.has("isdetails"); //check isdetails in url params
  const [isDetails, setDetails] = useState(ishasdetails ? true : false); //is a toogle image view detail or not
  const [open, setOpen] = useState(false); // show a details is open
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [drawerloading,setDrawerloading] = useState<Boolean>(false)
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const handelDetails = () => {
    // handel isdetails change
    navigate(`?isdetails=true`);
    setDetails(true);
  };
  const removeDetails = () => {
    // remove a details in url params and set is false
    navigate("");
    setDetails(false);
  };

  const showDrawer = (Id:number) => {
    setDrawerloading(true)
    // make a Deatils open
    setOpen(true);
    setSelectedImage(Images.filter((item:ImageType) => item.id == Id ))
    setTimeout(() => {
      setDrawerloading(false)
    }, 3000)
  };

  const onClose = () => {
    // make a Deatils close
    setOpen(false);
  };
  function downloadImageFromBlob(imageUrl:string, imageName:string) {
    fetch(imageUrl)
        .then((response) => response.blob())  // Fetch image as blob
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);  // Create URL for the blob
            const link = document.createElement('a');
            link.href = url;
            link.download = imageName || 'image';  // Set download name
            link.click();
            window.URL.revokeObjectURL(url);  // Clean up the URL object after download
        })
        .catch((error) => {
            console.error('Error downloading the image:', error);
        });
}



  const DrawerModel = () => {
   
    console.log(selectedImage);
    
    return (
      <>
       <Drawer title="Images Details" onClose={onClose} open={open} width={800}>
        {isLargeScreen ? (
          <>
          {drawerloading ? (
          <>
          <div className="flex gap-3">
          <Skeleton.Image active={true}  style={{width:300,height:300}}/>
          <div className="flex-1">
          <Skeleton active={true}  />
          <Skeleton active={true}  />
          </div>
          </div>
          <Skeleton active={true}  />
          </>
        ) : (
          <>
          {selectedImage ? (
          <>
          {selectedImage.map((Item:ImageType) => (
            <>
            <div className="flex gap-3">
              <Image src={Item.src} width={400} height={400}/>
              <div className="flex-1">
                <p>{Item.title}</p>
                <small className="text-sm text-gray-600">
                    {Item.location}\{Item.title}.{Item.typeoffile}
                  </small>
              </div>
            </div>
            <div className="float-end sticky bottom-0 right-0">
              <div className="flex ">
                <i className="bg-blue-500 p-2 m-2 rounded text-white cursor-pointer hover:bg-blue-600" onClick={() => downloadImageFromBlob(Item.src,Item.title)}>
                <DownloadOutlined />
                </i>
              </div>
            </div>
            </>
          ))}
          </>
        ) :""}
          </>
        )}
          </>
        ) : (
          <>
          {drawerloading ? (
          <>
          <div className="flex-1">
          <Skeleton.Image active={true}  style={{width:300,height:300}} />
          <div className="flex-1">
          <Skeleton active={true}  />
          <Skeleton active={true}  />
          </div>
          </div>
          <Skeleton active={true}  />
          </>
        ) : (
          <>
          {selectedImage ? (
          <>
          {selectedImage.map((Item:ImageType) => (
            <>
            <div className="flex-1">
              <Image src={Item.src}/>
              <div className="flex-1">
                <p>{Item.title}</p>
                <small className="text-sm text-gray-600">
                    {Item.location}\{Item.title}.{Item.typeoffile}
                  </small>
              </div>
            </div>
            </>
          ))}
          </>
        ) :""}
          </>
        )}
          </>
        )}
        
      </Drawer>
      </>
    )
  } 
  return (
    <>
    <DrawerModel  />

      <Segmented<String>
        options={["Details", "Images"]}
        className="border shadow-xl sticky top-0 m-2 "
        onChange={(value) => {
          if (value == "Details") {
            handelDetails();
          } else {
            removeDetails();
          }
        }}
        value={ishasdetails ? "Details" : "Images"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {isDetails ? (
          <>
            {Images.map((Img: ImageType) => (
              <Card
                key={Img.id}
                onClick={() => showDrawer(Img.id)}
                className="hover:scale-105 cursor-pointer hover:shadow-lg transition-transform duration-300"
                cover={
                  <Image
                    width="100%"
                    height="auto"
                    src={Img.src}
                    alt={Img.title}
                    placeholder={
                      <div className="text-gray-400">Loading...</div>
                    }
                    preview={false}
                  />
                }
              >
                {/* Title and description */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {Img.title}
                  </h3>
                  
                  <small>{Img.size}</small>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <Image.PreviewGroup>
            {Images.map((Img: ImageType) => (
              <Image
                width="100%"
                src={Img.src}
                alt={Img.title}
                placeholder={<div className="text-gray-400">Loading...</div>}
                preview={true} // Enables image preview on click
              />
            ))}
          </Image.PreviewGroup>
        )}
      </div>
    </>
  );
};

export default ImagesDisplay;
