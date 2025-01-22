import React, { useState, useEffect } from "react";
import skillsdata from "../Data/skill.json";
import { Affix, Card, Modal, Image, Rate } from "antd";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const data = skillsdata.sort((a, b) => a.title.localeCompare(b.title));

const lenofdis = (description: string) => {
  return description.length > 70
    ? description.substring(0, 100) + "..."
    : description;
};

const SkillCard: React.FC<{ skill: any; showModal: (skill: any) => void }> = ({ skill, showModal }) => {
  const controls = useAnimation();
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      key={skill.title}
      className={`m-2 shadow-lg p-2 ${isLargeScreen ? "w-80":""}`} // Ensure cards are full-width on mobile
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      <Card
        key={skill.title}
        className="m-2 shadow-lg p-2"
        onClick={() => showModal(skill)} // Open modal with the selected skill
        hoverable
        cover={<Image preview={false} alt="example" src={skill.image}  />}
      >
        <h3 className="text-center">{skill.title}</h3>
        <p>{lenofdis(skill.discrption)}</p>
      </Card>
    </motion.div>
  );
};

const SkillsCard = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [selectedSkill, setSelectedSkill] = useState<any>(null); // State to store the selected skill

  // Function to show the modal with selected skill
  const showModal = (skill: any) => {
    setSelectedSkill(skill); // Set the selected skill
    setOpenResponsive(true); // Open the modal
  };

  // Handle closing the modal
  const handleCancel = () => {
    setOpenResponsive(false); // Close the modal
    setSelectedSkill(null); // Clear the selected skill
  };

  return (
    <>
      {/* Affix for Theme Switch */}
      {/* <Affix offsetTop={100} className="float-end"></Affix> */}

      {/* Cards */}
      <div className=" flex flex-wrap justify-center gap-4">
        {data.map((skill: any) => (
          <SkillCard key={skill.title} skill={skill} showModal={showModal} />
        ))}
      </div>

      {/* Modal */}
      <Modal
        title="Skill Details"
        centered
        open={openResponsive}
        footer={null}
        onCancel={handleCancel} // Ensure clicking on cancel or outside closes the modal
        width={isLargeScreen ? "70%" : "90%"}
      >
        {selectedSkill && (
          <>
            {isLargeScreen ? (
                <>
              <div className="flex justify-between items-center">
                <Image width={500} height={500} src={selectedSkill.image} preview={false} />
                <div className="w-1/2 p-4">
                  <h2 className="text-2xl">{selectedSkill.title}</h2>
                  <p>{selectedSkill.discrption}</p>
                </div>
              </div>
                  <div className="float-right mb-4 ">
                    <Rate value={4} />
                  </div>
                  </>
            ) : (
                <>
              <div className="flex flex-col items-center rounded-3xl">
                <Image width={150} src={selectedSkill.image} preview={false} />
                <h2 className="text-2xl  mt-4">{selectedSkill.title}</h2>
                <p>{selectedSkill.discrption}</p>
              </div>
                <div className="float-right ">
                  <Rate value={4} />
                </div>
                </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

const Skills: React.FC = () => {
  return (
    <div>
      <h1 className="text-center mb-6 text-3xl">Skills</h1>
      <SkillsCard />
    </div>
  );
};

export default Skills;
