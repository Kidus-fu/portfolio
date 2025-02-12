import React from "react";
import { Card, Col, Row, Rate } from "antd";
import { motion } from "framer-motion";

const userComments = [
  {
    id: 1,
    name: "Abebe Teshome",
    avatar:
      "https://th.bing.com/th/id/OIP.AFaXVTfEw1837XMmzm_rkgHaI4?w=591&h=709&rs=1&pid=ImgDetMain",
    comment:
      "ይህ መሣሪያ በጣም ፈጣን እና ቀላል ነው፦ በቀጥታ እወደዋለሁ። Image Alchemy Converter makes image transformations effortless!",
    rating: 5,
  },
  {
    id: 2,
    name: "Mekdes Alemu",
    avatar:
      "https://th.bing.com/th/id/OIP.fxiCF84dDSqnLbihTcPWgAAAAA?w=276&h=276&rs=1&pid=ImgDetMain",
    comment:
      "በየቀኑ ምስሎቼን መቀየር አስፈላጊ ነበር። እንደዚህ የሆነ ፈጣን እና ቀላል converter አግኝቼ ደስ ብሎኛል።",
    rating: 5,
  },
  {
    id: 3,
    name: "Henok Getachew",
    avatar:
      "https://i1.rgstatic.net/ii/profile.image/1116447472394243-1643193228568_Q512/Abdi-Negeri-2.jpg",
    comment:
      "AI-powered image editing and real-time previews make this tool essential for my design workflow!",
    rating: 5,
  },
  {
    id: 4,
    name: "Liyu Bekele",
    avatar:
      "https://th.bing.com/th/id/OIP.8JJgtZuLx2dz2WNzx3NM4wHaGe?rs=1&pid=ImgDetMain",
    comment:
      "የምስል ጥራት ቀይረው ሳይጠፋ ስለሆነ የተሻለ Converter አላገኘሁም። በጣም እወደዋለሁ።",
    rating: 4,
  },
  {
    id: 5,
    name: "Samuel Tadesse",
    avatar:
      "https://th.bing.com/th/id/OIP.eQd6CvqcvPqtgzA8cUCUPgHaHa?w=2048&h=2048&rs=1&pid=ImgDetMain",
    comment:
      "Super easy to use! Drag-and-drop support is a game-changer. No more clunky image tools!",
    rating: 5,
  },
];

const UserComments: React.FC = () => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white dark:bg-gray-900 py-12 px-6 border border-gray-200 dark:border-gray-700 shadow-lg mt-6 rounded-lg"
    >
      {/* Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8"
      >
        What Our Users Say
      </motion.h2>

      {/* User Comments Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <Row gutter={[16, 16]} justify="center">
          {userComments.map(({ id, name, avatar, comment, rating }) => (
            <Col key={id} xs={24} sm={12} md={8}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  bordered={false}
                  className="relative transition-transform transform hover:scale-105 shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <img
                      alt={name}
                      src={avatar}
                      className="w-[80px] h-[80px] rounded-full border p-1 shadow-md"
                    />
                    <h3 className="text-lg font-semibold mt-3 text-gray-800 dark:text-gray-100">
                      {name}
                    </h3>
                    <Rate disabled defaultValue={rating} className="mt-2" />
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 text-center">
                      {comment}
                    </p>
                    
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </motion.div>
  );
};

export default UserComments;
