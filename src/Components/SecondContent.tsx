import { Affix, Divider, Flex, Image, theme } from "antd";
import React, { useState } from "react";
import me1 from "../Media/images/me2-removebg-preview.png"; // Profile picture
import WritingAnimation from "./WritingAnimation"; // Animation component
import { motion } from "framer-motion"
import { FacebookFilled, InstagramOutlined, LinkedinFilled, TranslationOutlined, TwitterCircleFilled } from "@ant-design/icons";

const Amharic = "በራሴ የተማርኩኝ፣ 16 ዓመት የሆንኩ የዌብ አቀናጆ (web developer) ከአንድ አመት በላይ  ልምድ ያለኝ። በReact እና JavaScript ላይ በሚያተኩሩ ተንቀሳቃሽ እና ተለዋዋጭ (dynamic እና responsive) የዌብ መተግበሪያዎች ለመገንባት እችላለሁ፣ እነዚህም ልዩ የተጠቃሚ ልምድ (user experience) ይሰጣሉ። በተጨማሪም በDjango  (backend) ልማት ልምድ አለኝ፣ ይህም ጠንካራ እና ሙሉ ስርዓት (full-stack) መፍትሄዎችን ለመገንባት ያስችለኛል። አዲስ ነገር መማር፣ ንጹህ እና ከፍተኛ ጥራት ያለው ኮድ መጻፍ፣ እንዲሁም ፈጠራዊ ሀሳቦችን ወደ ተግባራዊ ማምጣት የሚገባኝ ቁርጠኛ እና ተነሳሽነት ያለኝ ነው። አብረን በመሆን አንድ አስደናቂ ነገር እንፍጠር!"
const English = "a self-taught, 16-year-old web developer with over a year of hands-on experience.     I specialize in React and JavaScript, creating dynamic and responsive web applications that deliver exceptional user experiences.Alongside my front-end expertise, I have experience with Django for back-end development, enabling me to build robust full-stack solutions.I’m passionate about learning, committed to writing clean, high-quality code, and dedicated to bringing innovative ideas to life.Let’s collaborate and create something amazing together!"
// Profile summary with a typing animation

// Profile photo with gradient background
const Phonto: React.FC = () => (
  <div className="relative">
    <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

    <Image

      src={me1}
      alt="me1"
      height={550}
      width={400}
      preview={false}
      className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl scale-110 transform delay-150 hover:filter-none  hue-rotate-90" />
  </div>
);


// Main content component with responsive layout
const SecondContent: React.FC = () => {
  const [isAmharic ,setAmharic] = useState(true)
  const handelLangChange = () => {
    setAmharic(!isAmharic)
  }
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      className="p-5 bg-white rounded-lg shadow-md"
      style={{ minHeight: "360px", borderRadius: borderRadiusLG }} // Rounded corners
    >
      <Affix className="fixed" ><i title="Transltion" onClick={handelLangChange}><TranslationOutlined  className={`${isAmharic ? "text-violet-950 border":""} p-2 cursor-pointer text-xl`} /></i></Affix>
      <div className=" fixed top-2/4  sm:inline-block  flex-1 right-0 animate-pulse hover:animate-none shadow-2xl ">
        <motion.a

          href="https://www.facebook.com/adama.kable" target="_blank" className="text-blue-700 hover:text-blue-900 "><FacebookFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
        <br />
        <motion.a href="https://www.twitter.com/adamakable" target="_blank" className="text-blue-700 hover:text-blue-900"><TwitterCircleFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
        <br />
        <motion.a href="#" target="_blank" className="text-red-500  hover:text-red-600"><InstagramOutlined className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
        <br />
        <motion.a href="https://www.linkedin.com/in/kidus-panda/" target="_blank" className="text-blue-700 hover:text-blue-900"><LinkedinFilled className='p-2  transform delay-75 text-xl hover:scale-105 hover:shadow-sm border rounded-full border-opacity-40 ' /></motion.a>
        <br />
      </div>
      <>
        <Flex justify="center" align="middle" className="text-2xl">
          <WritingAnimation paragraph={`${isAmharic ? "ስለ እኔ":"About Me"}`} />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="middle" className="text-lg">

          <section className="pt-10 overflow-hidden   md:pt-0 sm:pt-16 2xl:pt-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="grid items-center grid-cols-1 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold leading-tight text-black  sm:text-4xl lg:text-5xl">
                    <WritingAnimation paragraph={ isAmharic ? "ሰላም 👋 እኔ ቅዱሱ ሱራፌል ነኝ":`Hey 👋 I  am Kidus Surafel `}/>
                  </h2>
                  <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                    <div className="w-[500px] select-text selection:bg-blue-300 selection:text-slate-600">
                      <WritingAnimation paragraph={isAmharic ? Amharic : English} />
                    </div>
                  </p>
                </div>
                <Phonto />
              </div>
            </div>
          </section>
        </Flex>
      </>

    </div>
  );
};

export default SecondContent;