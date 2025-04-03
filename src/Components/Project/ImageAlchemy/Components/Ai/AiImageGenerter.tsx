import { DownloadOutlined, InfoCircleFilled, SendOutlined } from "@ant-design/icons";
import { Button, Image, Input, Space, Modal, Card, Typography, Spin, Alert } from "antd";
import React, { useState, useEffect } from "react";
import useTicketSystem from "./Hooks/TicketSystem"; // Adjust the import path as needed
import ChapaLogo from "./Chapa.png";
import Lottie from "lottie-react";
import animationData from "./loading.json";

const { Title, Text } = Typography;

interface QueryData {
  inputs: string;
}

interface TextToImageComponentProps {
  isclose?: boolean;
}

const TextToImageComponent: React.FC<TextToImageComponentProps> = ({ isclose = false }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputpromt, setinputpromt] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { tickets } = useTicketSystem();
  const [nowtickets, setNowtickets] = useState(0);
  const [buyTicketLoading, setBuyTicketLoading] = React.useState(false);

  useEffect(() => {
    if (isclose) {
      setImageUrl(null);
      setError(null);
      setLoading(false);
      setinputpromt("")
      setBuyTicketLoading(false);

    }
  }, [isclose])
  // Initialize nowtickets from localStorage
  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setNowtickets(parseInt(storedTickets, 10));
    } else {
      localStorage.setItem("tickets", "0"); // Initialize if not found
      setNowtickets(0);
    }
  }, [buyTicketLoading]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "tickets") {
        const newTickets = event.newValue ? parseInt(event.newValue, 10) : 0;
        console.log("Detected localStorage change:", newTickets); // Debugging
        setNowtickets(newTickets); // Update React state
      }
    };

    // Add event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  
  const query = async (data: QueryData) => {
    setLoading(true);
    setError(null);
    const API_KEY =  import.meta.env.AI_API_KEY
    console.log(API_KEY)
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setImageUrl(url);
    } catch (err) {
      setError("Error fetching image. Please try again.");
    } finally {

      setLoading(false);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = inputpromt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const get_img = (promt: string) => {
    console.log("nowticket", nowtickets);
    console.log("ticket", tickets);

    if (nowtickets > 0) {
      const updatedTickets = nowtickets - 1;
      localStorage.setItem("tickets", updatedTickets.toString());
      setNowtickets(updatedTickets);
      console.log("Generating image for:", promt);
      query({ inputs: promt });
    } else {
      setIsModalVisible(true);
    }
    const storedTickets = localStorage.getItem("tickets");
    setNowtickets(storedTickets ? parseInt(storedTickets, 10) : 0);
  };

  const handleBuyTickets = (size: number) => {
    setBuyTicketLoading(true)
    const paymentLink = `https://checkout.chapa.co/checkout/web/payment/PL-zqDbyRgMQke1`;

    const windowFeatures = "width=500,height=600,left=100,top=100,resizable=no";
    const paymentWindow = window.open(paymentLink, "_blank", windowFeatures);

    if (!paymentWindow) {
      console.error("Failed to open payment window.");
      return;
    }

    const checkPaymentWindow = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(checkPaymentWindow);

        // Update localStorage and React state immediately
        const storedTickets = localStorage.getItem("tickets");
        const currentTickets = storedTickets ? parseInt(storedTickets, 10) : 0;
        const newTicketCount = currentTickets + size;

        console.log("Updating tickets:", newTicketCount);
        localStorage.setItem("tickets", newTicketCount.toString());
        setNowtickets(newTicketCount); // <-- Update React state immediately
        setBuyTicketLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    // Function to update tickets state
    const updateTickets = () => {
      const storedTickets = localStorage.getItem("tickets");
      setNowtickets(storedTickets ? parseInt(storedTickets, 10) : 0);
    };

    updateTickets(); // Run once when component mounts

    // Listen for storage changes (only fires for other tabs/windows)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "tickets") {
        updateTickets();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);



  return (
    <>
      <Card className="dark:bg-gray-700 border-none">
        <p className="font-bold text-end text-green-400">Tickets available:{" "} {localStorage.getItem("tickets")}</p>
        <Title level={2} className="text-center text-white">
          Text-to-Image Generator
        </Title>
        <Text className="block text-center text-gray-400 mb-6">
          Effortlessly generate stunning AI-crafted images

        </Text>

        <Space direction="vertical" size="middle" className="w-full">
          <Space.Compact className="w-full">
            <Input
              placeholder="Enter your text prompt..."
              value={inputpromt}
              onChange={(e) => setinputpromt(e.target.value)}
              size="large"
              disabled={loading}
              className="dark:bg-gray-600 dark:text-white border-gray-600"
            />
            {nowtickets ? (
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => get_img(inputpromt)}
                size="large"
                loading={loading}
                disabled={!inputpromt || loading}
                className="bg-purple-700 hover:bg-purple-800 border-none"
              >
                Generate
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<InfoCircleFilled />}
                onClick={() => get_img(inputpromt)}
                size="large"
                loading={loading}
                className="bg-purple-700 hover:bg-purple-800 border-none"
              >
                No Tickets
              </Button>
            )}
          </Space.Compact>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="w-full bg-red-900 border-red-700 text-red-200"
            />
          )}

          {loading && (
            <div className="flex flex-col items-center">
              <div className=" h-[200px]  backdrop-blur-md w-[200px]">
                <Lottie animationData={animationData} loop />
              </div>
            </div>
          )}

          {imageUrl && !loading && (
            <div className="flex flex-col items-center">
              <Image
                width={200}
                height={200}
                alt="Generated"
                src={imageUrl}
                className="rounded-lg shadow-md border border-gray-600"
              />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => downloadImage(imageUrl)}
                className="mt-4 bg-green-600 hover:bg-green-700 border-none"
              >
                Download Image
              </Button>
            </div>
          )}

          {!imageUrl && !loading && (
            <Text className="flex justify-center text-gray-400">
              Enter a text prompt and click "Generate" to create an image.
            </Text>
          )}
        </Space>
      </Card>

      <Modal
        title="Buy More Tickets"
        width={350}
        bodyStyle={{ height: "160px", overflowY: "auto", padding: "10px" }}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p className="text-lg font-semibold text-center">You have no tickets left.</p>
        <p className="text-gray-600 text-center">
          Buy <span className="font-bold">3 tickets</span> for <span className="font-bold">100 ETB</span>
        </p>

        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            onClick={() => {
              handleBuyTickets(3);
              setIsModalVisible(false);
            }}
            className="px-6 py-2 w-full text-white bg-green-600 border border-green-600 rounded-lg transition-all hover:bg-green-700 active:scale-95 flex items-center justify-center gap-2"
          >
            <img src={ChapaLogo} alt="Chapa" className="w-8 h-4" />
            Pay 100 ETB with Chapa
          </button>

          <p className="text-sm text-gray-500 text-center">Next free ticket in 5 minutes.</p>
        </div>
      </Modal>


      <Spin spinning={buyTicketLoading} percent={0} fullscreen />
    </>
  );
};

export default TextToImageComponent;