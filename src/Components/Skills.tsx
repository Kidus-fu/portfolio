import React, { useState, useEffect } from "react";
import skillsdata from "../Data/skill.json";
import {
  Card,
  Modal,
  Image,
  Rate,
  Button,
  Popover,
  Divider,
  Input,
  Tag,
  Empty,
  Segmented,
  Progress
} from "antd";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router";
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import WritingAnimation from "./WritingAnimation";
import Fuse from "fuse.js";

const data = skillsdata.sort((a, b) => a.title.localeCompare(b.title));
const lenofdis = (description: string) => {
  if (!description) {
    return ""
  }
  return description.length > 70
    ? description.substring(0, 100) + "..."
    : description;
};

const SkillCard: React.FC<{ skill: any; showModal: (skill: any) => void }> = ({
  skill,
  showModal,
}) => {
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
      className={`m-1 shadow-lg p-1 ${isLargeScreen ? "w-80" : ""}`}
      initial="hidden"
      animate={controls}
      onClick={() => showModal(skill)}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      <Card
        key={skill.title}
        className="m-2 shadow-lg p-2"
        
        hoverable
        cover={<Image preview={false} alt={skill.title} src={skill.image} onDragStart={(e) => e.preventDefault()} />}
      >
        
        <h3 className="text-center">{skill.title}</h3>
        <p>{lenofdis(skill.discrption)}</p>

        {/* Ensure category is always an array */}
        <div className="flex-1 gap-1 mt-2">
          {(Array.isArray(skill.category) ? skill.category : [skill.category]).map((cat: string, index: number) => (
            <Tag key={index} className="m-1" color="blue">
              {cat}
            </Tag>
          ))}
        </div>
        <Progress percent={skill.Progress} steps={3} />
      </Card>
    </motion.div>
  );
};

const SkillsCard = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [selectedSkill, setSelectedSkill] = useState<any>(null); // State to store the selected skill
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modelqurey = queryParams.get("model");
  const hasModel = queryParams.has("model");
  const navigate = useNavigate();
  const { Search } = Input;
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(skillsdata);

  const [lastSearch, setLastSearch] = useState("");
  const [search, setSearch] = useState("");

  const fuse = new Fuse(skillsdata, {
    keys: ["category", "title"],
    threshold: 0.3, // Adjust threshold for fuzziness
  });
  const catogories = [
    "All",
    "Web Development",
    "Programming Foundations",
    "Future Skills",
    "Professional Skills",
    "Data Analysis",
    "AI"
  ];
  const handleFilterQuery = () => {
    const queryParams = new URLSearchParams(location.search);
    const filterQuery = queryParams.get("filter");

    if (filterQuery) {
      try {
        const parsedFilters = JSON.parse(filterQuery);
        if (Array.isArray(parsedFilters)) {
          setFilters(parsedFilters);

          const results = fuse.search(parsedFilters.join(" "));
          setFilteredData(results.map((result) => result.item));
        }
      } catch (error) {
        console.error("Failed to parse filters:", error);
      }
    }
  };

  useEffect(() => {
    handleFilterQuery();
  }, [location]);

  // Function to clear filters and reset
  const clearFilters = () => {
    navigate(`${modelqurey ? `?model=${modelqurey}` : ""}`);
    setFilters([]);
    setFilteredData(skillsdata);
  };

  const openModelinurl = () => {
    const modelqureys = modelqurey;

    if (hasModel) {
      const skill = modelqureys ? fuse.search(modelqureys)[0]?.item : null;
      if (skill) {
        showModal(skill);
      }
    }
  };
  useEffect(() => {
    openModelinurl();
  }, [modelqurey]);
  // Function to show the modal with selected skill
  const showModal = (skill: any) => {
    navigate(
      `?model=${skill.title} ${filters.length > 0 ? `&filter=["${filters}"]` : ""
      }`
    );
    setSelectedSkill(skill);
    setOpenResponsive(true);
  };
  const nextSkill = () => {
    if (filteredData) {
      const index = filteredData.findIndex(
        (skill) => skill.title === selectedSkill.title
      );
      if (index < filteredData.length - 1) {
        setSelectedSkill(filteredData[index + 1]);
        navigate(
          `?model=${filteredData[index + 1].title} ${filters.length > 0 ? `&filter=["${filters}"]` : ""
          }`
        );
      }
    } else {
      const index = data.findIndex(
        (skill) => skill.title === selectedSkill.title
      );
      if (index < data.length - 1) {
        setSelectedSkill(data[index + 1]);
        navigate(
          `?model=${data[index + 1].title} ${filters.length > 0 ? `&filter=["${filters}"]` : ""
          }`
        );
      }
    }
  };
  const prevSkill = () => {
    if (filteredData) {
      const index = filteredData.findIndex(
        (skill) => skill.title === selectedSkill.title
      );
      if (index > 0) {
        setSelectedSkill(filteredData[index - 1]);
        navigate(
          `?model=${filteredData[index - 1].title} ${filters.length > 0 ? `&filter=["${filters}"]` : ""
          }`
        );
      }
    } else {
      const index = data.findIndex(
        (skill) => skill.title === selectedSkill.title
      );
      if (index > 0) {
        setSelectedSkill(data[index - 1]);
        navigate(
          `?model=${data[index - 1].title}${filters.length > 0 ? `&filter=${filters}` : ""
          }`
        );
      }
    }
  };
  // Handle closing the modal
  const handleCancel = () => {
    navigate(`${filters.length > 0 ? `?filter=["${filters}"]` : ""}`);
    setOpenResponsive(false); // Close the modal
    setSelectedSkill(null); // Clear the selected skill
  };
  const searchSkill = (value: string) => {
    setLastSearch(value);
    navigate(
      `${modelqurey ? `?model=${modelqurey}` : ""}${filters ? `?filter=["${value}"]` : ""
      }`
    );
    setSearch("");
  };
  const setFilter = (value: string) => {
    navigate(
      `${modelqurey ? `?model=${modelqurey}` : ""}${filters ? `?filter=["${value}"]` : ""
      }`
    );
  };

  return (
    <>
      {/* Affix for Theme Switch */}
      {/* <Affix offsetTop={100} className="float-end"></Affix> */}
      <Divider />
      {isLargeScreen ? (
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Segmented<String>
              options={catogories}
              onChange={(value) => {
                if (value === "All") {
                  clearFilters();
                } else {
                  setFilter(value as string);
                }
              }}
              value={filters.length > 0 ? filters[0] : "All"}
            />
          </div>
          <div className="flex justify-end">
            <Search
              placeholder={`${lastSearch ? `Last Search '${lastSearch}'` : "Search"
                }`}
              enterButton
              allowClear
              onSearch={() => searchSkill(search)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 justify-center gap-3">
          <Search
            placeholder={`${lastSearch ? `Last Search '${lastSearch}'` : "Search"
              }`}
            enterButton
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onSearch={() => searchSkill(search)}
          />
          <Segmented<String>
            options={["All", "Web Deve", "Future ", "Data Analysis","AI"]}
            onChange={(value) => {
              if (value === "All") {
                clearFilters();
              } else {
                setFilter(value as string);
              }
            }}
            value={filters.length > 0 ? filters[0] : "All"}
          />
        </div>
      )}
      <Divider />
      <div className="mb-4">
        {filters.length > 0 ? (
          filters.map((filter) => (
            <>
              <Tag key={filter} color="blue">
                {filter}
              </Tag>
              <Button onClick={clearFilters} type="text">
                Clear Filters
              </Button>
              {filteredData.length === 0 ? (
                <Empty
                  description="No skills found "
                  children="please try again"
                />
              ) : (
                <></>
              )}
              {/* Cards */}
              <div className=" flex flex-wrap justify-center gap-4">
                {filteredData.map((skill: any) => (
                  <SkillCard
                    key={skill.title}
                    skill={skill}
                    showModal={showModal}
                  />
                ))}
              </div>
            </>
          ))
        ) : (
          <>
            {/* Cards */}
            <div className=" flex flex-wrap justify-center gap-4">
              {data.map((skill: any) => (
                <SkillCard
                  key={skill.title}
                  skill={skill}
                  showModal={showModal}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal
        title="Skill Details"
        centered
        open={openResponsive}
        footer={null}
        onCancel={handleCancel}
        width={isLargeScreen ? "80%" : "100%"}
      >
        {selectedSkill && (
          <>
            {isLargeScreen ? (
              <>
                <div className="flex justify-between items-center ">
                  <Image
                    width={500}
                    height={500}
                    src={selectedSkill.image}
                    onDragStart={(e) => e.preventDefault()}
                    preview={false}
                  />
                  <div className="flex items-center justify-center gap-4 m-2">
                    {/* Previous Button with Popover */}
                    <div className="flex-1 gap-3 m-2">
                      {filteredData.length > 0 ? (
                        <>
                          {selectedSkill.title === filteredData[0].title ||
                            selectedSkill.title === filteredData[0].title ? (
                            <Button className="mb-2 rounded-full border-none py-4 opacity-15">
                              <UpOutlined className="text-lg" />
                            </Button>
                          ) : (
                            <Popover
                              content="Prev"
                              placement="top"
                              trigger="hover"
                            >
                              <Button
                                className="mb-2 rounded-full py-4 border-none"
                                onClick={() => prevSkill()}
                              >
                                <UpOutlined className="text-lg" />
                              </Button>
                            </Popover>
                          )}

                          {selectedSkill.title ===
                            filteredData[filteredData.length - 1].title ? (
                            <Button className="mb-2 rounded-full py-4 opacity-15 border-none">
                              <DownOutlined className="text-lg" />
                            </Button>
                          ) : (
                            <Popover
                              content="Next"
                              placement="bottom"
                              trigger="hover"
                            >
                              <Button
                                className="mb-2 rounded-full py-4 border-none"
                                {...(selectedSkill.title ===
                                  filteredData[filteredData.length - 1].title
                                  ? { disabled: true }
                                  : {})}
                                onClick={() => nextSkill()}
                              >
                                <DownOutlined className="text-lg" />
                              </Button>
                            </Popover>
                          )}
                        </>
                      ) : (
                        <>
                          {selectedSkill.title === data[0].title ||
                            selectedSkill.title === filteredData[0].title ? (
                            <Button className="mb-2 rounded-full py-4 opacity-15 border-none">
                              <UpOutlined className="text-lg" />
                            </Button>
                          ) : (
                            <Popover
                              content="Prev"
                              placement="top"
                              trigger="hover"
                            >
                              <Button
                                className="mb-2 rounded-full py-4 border-none"
                                onClick={() => prevSkill()}
                              >
                                <UpOutlined className="text-lg" />
                              </Button>
                            </Popover>
                          )}

                          {selectedSkill.title ===
                            data[data.length - 1].title ? (
                            <Button className="mb-2 rounded-full py-4 opacity-15 border-none">
                              <DownOutlined className="text-lg" />
                            </Button>
                          ) : (
                            <Popover
                              content="Next"
                              placement="bottom"
                              trigger="hover"
                            >
                              <Button
                                className="mb-2 rounded-full py-4 border-none"
                                {...(selectedSkill.title ===
                                  data[data.length - 1].title
                                  ? { disabled: true }
                                  : {})}
                                onClick={() => nextSkill()}
                              >
                                <DownOutlined className="text-lg" />
                              </Button>
                            </Popover>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 p-4">
                    <h2 className="text-2xl">
                      <WritingAnimation paragraph={selectedSkill.title} />
                    </h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {selectedSkill.discrption}
                      <br />
                      <div className="flex-1 gap-1 mt-2">
                        {(Array.isArray(selectedSkill.category) ? selectedSkill.category : [selectedSkill.category]).map((cat: string, index: number) => (
                          <Tag key={index} className="m-1" color="blue">
                            {cat}
                          </Tag>
                        ))}
                      </div>
                      <div className="flex just">
                      <Progress type="circle" percent={(selectedSkill.Progress)} />
                        </div>
                    </motion.p>
                  </div>
                </div>
                <div className="float-right mb-4 ">
                  <Rate value={selectedSkill.Rate} />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center rounded-3xl">
                  {filteredData.length > 0 ? (
                    <>
                      {selectedSkill.title === filteredData[0].title ? (
                        <i
                          className="mb-2 cursor-pointer rounded-full opacity-15 py-6 px-6 absolute top-24 left-0"
                          onClick={() => prevSkill()}
                        >
                          <LeftOutlined className="text-lg" />
                        </i>
                      ) : (
                        <i
                          className="mb-2 cursor-pointer rounded-full py-6 px-6 absolute top-24 left-0"
                          onClick={() => prevSkill()}
                        >
                          <LeftOutlined className="text-lg" />
                        </i>
                      )}
                      {selectedSkill.title ===
                        filteredData[filteredData.length - 1].title ? (
                        <i
                          className="mb-2 cursor-pointer  rounded-full opacity-15 py-6 px-6 absolute top-24 right-0"
                          onClick={() => nextSkill()}
                        >
                          <RightOutlined className="text-lg" />
                        </i>
                      ) : (
                        <i
                          className="mb-2 cursor-pointer rounded-full py-6 px-6 absolute top-24 right-0"
                          onClick={() => nextSkill()}
                        >
                          <RightOutlined className="text-lg" />
                        </i>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedSkill.title === data[0].title ? (
                        <i
                          className="mb-2 cursor-pointer rounded-full opacity-15 py-6 px-6 absolute top-24 left-0"
                          onClick={() => prevSkill()}
                        >
                          <LeftOutlined className="text-lg" />
                        </i>
                      ) : (
                        <i
                          className="mb-2 cursor-pointer rounded-full py-6 px-6 absolute top-24 left-0"
                          onClick={() => prevSkill()}
                        >
                          <LeftOutlined className="text-lg" />
                        </i>
                      )}
                      {selectedSkill.title === data[data.length - 1].title ? (
                        <i
                          className="mb-2 cursor-pointer  rounded-full opacity-15 py-6 px-6 absolute top-24 right-0"
                          onClick={() => nextSkill()}
                        >
                          <RightOutlined className="text-lg" />
                        </i>
                      ) : (
                        <i
                          className="mb-2 cursor-pointer rounded-full py-6 px-6 absolute top-24 right-0"
                          onClick={() => nextSkill()}
                        >
                          <RightOutlined className="text-lg" />
                        </i>
                      )}
                    </>
                  )}

                  <Image
                    width={200}
                    height={200}
                    src={selectedSkill.image}
                    draggable
                    preview={false}
                  />
                  <div className="m-8">
                    <h2 className="text-2xl  mt-4">
                      <WritingAnimation paragraph={selectedSkill.title} />
                    </h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      {selectedSkill.discrption}
                      <br />
                      <Tag color="blue" className="m-3">
                        {selectedSkill.category}
                      </Tag>
                    </motion.p>
                  </div>
                </div>
                <div className="float-right ">
                  <Rate value={selectedSkill.Rate} />
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
