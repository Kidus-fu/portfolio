import { Carousel, ConfigProvider } from 'antd';
import ImageConverter from './ImageConverter';
import NavBar from './Navbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import Footer from './Footer';
import Features from './Features';
import { CloseOutlined, EditFilled, FileImageOutlined, HomeFilled, MenuOutlined, PaperClipOutlined, StarFilled } from '@ant-design/icons';
import UserComments from './Comments';
import { ThemeProvider, useTheme } from './ThemeContext';
import ImageEditingView from './ImageEditer/ImageEditingView';
import AiImageView from './Ai/AiImageView';
// ----------------------
// Navigation Component
// ----------------------
type NavProps = {
  scrollToConvert: () => void;
  scrollToFeaturs: () => void;
  scrollToImageEdite: () => void;
  scrollToAiArt: () => void;
};


const Nav: React.FC<NavProps> = ({ scrollToConvert, scrollToFeaturs , scrollToImageEdite,scrollToAiArt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };
  
  return (
    <ThemeProvider >
    <nav className="bg-white border-gray-200  bg-opacity-55 dark:bg-opacity-30 backdrop-blur-xl    py-2.5 fixed w-full top-0 z-50 shadow-xl dark:shadow-gray-600 dark:bg-gray-900 dark:border-gray-700">
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className="flex flex-wrap items-center container  justify-between max-w-screen-xl px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://th.bing.com/th/id/R.f84376b56affbffa58d02d370e53ef86?rik=gOmcW56Pogs14Q&pid=ImgRaw&r=0"
            className="h-6 mr-3 sm:h-9"
            alt="Image Alchemy"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Image Alchemy
          </span>
        </div>
  
        {/* Right Section */}
        <div className="flex items-center lg:order-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition"
            onClick={scrollToConvert}
          >
            Try Now
          </motion.button>
  
          
  
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-2 ml-3 text-gray-600 rounded-lg lg:hidden hover:bg-gray-200 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </motion.button>
        </div>
  
        {/* Mobile Menu - Animated */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden w-full bg-white bg-opacity-75 shadow-md absolute top-full left-0 py-4 dark:bg-gray-800 dark:bg-opacity-75"
            >
              <ul className="flex flex-col items-center space-y-4 font-medium">
                <li>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.scrollTo({ top: 0, left: 0 });
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-purple-700 transition"
                  >
                    <HomeFilled /> Home
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToConvert();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-purple-700 transition"
                  >
                    <EditFilled /> Convert
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToFeaturs();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-purple-700 transition"
                  >
                    <PaperClipOutlined /> Features
                  </motion.button>
                  
                </li>
                <li>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToImageEdite();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-purple-700 transition"
                  >
                    <FileImageOutlined /> Edited Image
                  </motion.button>
                </li>
                <li>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToAiArt()
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 dark:text-gray-200 hover:text-purple-700 transition"
                  >
                    <StarFilled className='text-blue-900 text-sm' /> AI Art
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium">
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, left: 0 })}
              className="text-white dark:text-white dark:hover:text-purple-700 hover:text-purple-700 transition"
            >
              <HomeFilled /> Home
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToConvert}
              className="text-gray-700 dark:text-white dark:hover:text-purple-700 hover:text-purple-700 transition"
            >
              <EditFilled /> Convert
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToFeaturs}
              className="text-gray-700 dark:text-white dark:hover:text-purple-700 hover:text-purple-700 transition"
            >
              <PaperClipOutlined /> Features
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToImageEdite}
              className="text-gray-700 dark:text-white dark:hover:text-purple-700 hover:text-purple-700 transition"
            >
              <FileImageOutlined /> Edited Image
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAiArt}
              className="text-gray-700 dark:text-white dark:hover:text-purple-700 hover:text-purple-700 transition"
            >
              <StarFilled className='text-blue-900 text-sm' /> AI Art
            </motion.button>
          </li>
        </ul>
      </motion.div>
    </nav>
    </ThemeProvider>
  );
};





type Position = {
  x: number;
  y: number;
};

const IMAGES = [
  {
    url: 'https://th.bing.com/th/id/OIP.60hUYFuBVI3Yd-EUdniE8AHaHa?rs=1&pid=ImgDetMain',
    width: '220%',
  },
  {
    url: 'https://img.freepik.com/premium-photo/old-wizard-his-laboratory_1031776-10552.jpg',
    width: '120%',
  },
  {
    url: 'https://img.freepik.com/premium-photo/scary-tshirt-design_759095-156977.jpg',
    width: '120%',
  },
  {
    url: 'https://th.bing.com/th/id/OIP.PTfp3gfi86Kz7OaJ3ZxfcwHaHa?rs=1&pid=ImgDetMain',
    width: '120%',
  },
];

const Content = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const speed = 0.03;
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animate = () => {
      setCurrentPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * speed,
        y: prev.y + (mousePosition.y - prev.y) * speed,
      }));
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [mousePosition.x, mousePosition.y]);

  const backgroundStyle = {
    transform: `translate(calc(-50% + ${currentPosition.x * 5}%), calc(-50% + ${currentPosition.y * 5}%)) scale(1.2)`,
    willChange: 'transform',
  };

  return (
    <ThemeProvider>
    <div className="relative w-full overflow-hidden">
  <Carousel autoplay className="h-full w-full" effect="fade" arrows dots={false} swipe={false}>
    {IMAGES.map((image, index) => (
      <div key={index} className="relative h-[660px] w-full overflow-hidden">
        <div className="absolute inset-0 top-0">
          <motion.img
            src={image.url}
            alt={`background-${index}`}
            className="absolute object-cover transform-gpu"
            style={{
              ...backgroundStyle,
              width: image.width,
              height: '660px',
              left: '50%',
              top: '50%',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/1920x1080';
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    ))}
  </Carousel>
  <motion.div
    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
    
  >
    <div className="bg-black/5 backdrop-blur-sm p-8 rounded-3xl text-center max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold text-white dark:text-gray-200 drop-shadow-lg mb-6">
        Welcome to Image Format Converter
      </h1>
      <p className="text-lg text-gray-200 dark:text-gray-300 drop-shadow-md leading-relaxed">
        Effortlessly convert images between JPG and PNG formats with precision. Enjoy real-time previews, adjustable quality, and smooth drag-and-drop functionality—all processed locally for complete privacy. Now with advanced image editing (clipping) and AI-powered text-to-image generation, giving you even more creative control over your visuals!
      </p>
    </div>
  </motion.div>
</div>
</ThemeProvider>
  );
};

// ----------------------
// Theme Consumer App
// ----------------------
type ThemeConsumerProps = {
  scrollToConvert: () => void;
  scrollToFeaturs: () => void;
  scrollToImageEdite: () => void;
  scrollToAiArt: () => void;
  ConvertRef: React.RefObject<HTMLDivElement>;
  FeatursRef: React.RefObject<HTMLDivElement>;
  ImageEditeRef: React.RefObject<HTMLDivElement>;
  AiArtRef: React.RefObject<HTMLDivElement>;
};

const ThemeConsumerApp = ({
  scrollToConvert,
  scrollToFeaturs,
  scrollToImageEdite,
  scrollToAiArt,
  ConvertRef,
  FeatursRef,
  ImageEditeRef,
  AiArtRef,
}: ThemeConsumerProps) => {
  const { theme } = useTheme();

  // Define tokens for Ant Design based on the theme
  const antdThemeTokens =
    theme === 'dark'
      ? {
          token: {
            colorPrimary: '#722ED1', // dark mode primary color
            borderRadius: 8,
          },
        }
      : {
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 8,
          },
        };

  return (
    <ThemeProvider>
    <>
      <div className={`dark:bg-slate-800 ${theme === 'dark' ? 'dark' : 'light'}`}>
        <NavBar />
        <ConfigProvider theme={antdThemeTokens}>
          <Nav
            scrollToConvert={scrollToConvert}
            scrollToFeaturs={scrollToFeaturs}
            scrollToImageEdite={scrollToImageEdite}
            scrollToAiArt={scrollToAiArt}
          />
          <Content />
          <div ref={FeatursRef}>
            <Features />
          </div>
          <div ref={ConvertRef} id="test" className="scroll-mt-20 dark:bg-gray-900">
            <ImageConverter />
          </div>
          {/* Ensure ImageEditingView is rendered and ref is attached */}
          <div ref={ImageEditeRef} className="scroll-mt-20">
            <ImageEditingView />
          </div>
        </ConfigProvider>
        <div className="" ref={AiArtRef} >

        <AiImageView />
        </div>
        <UserComments />

        
        <Footer />
      </div>
    </>
      </ThemeProvider>
  );
};
// ----------------------
// Main ImgMain Component
// ----------------------
function ImgMain() {
  const ConvertRef = useRef<HTMLDivElement>(null);
  const FeatursRef = useRef<HTMLDivElement>(null);
  const ImageEditeRef = useRef<HTMLDivElement>(null);
  const AiArtRef = useRef<HTMLDivElement>(null);

  const scrollToConvert = useCallback(() => {
    if (ConvertRef.current) {
      const navHeight = document.querySelector('nav')?.clientHeight || 80;
      const topPosition = ConvertRef.current.offsetTop - navHeight;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }, []);

  const scrollToFeaturs = useCallback(() => {
    if (FeatursRef.current) {
      const navHeight = document.querySelector('nav')?.clientHeight || 80;
      const topPosition = FeatursRef.current.offsetTop - navHeight;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }, []);

  const scrollToImageEdite = useCallback(() => {
    if (ImageEditeRef.current) {
      const navHeight = document.querySelector('nav')?.clientHeight || 80;
      const topPosition = ImageEditeRef.current.offsetTop - navHeight;
      console.log("Scrolling to Image Editing Section", topPosition); // Debugging
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    } else {
      console.error("ImageEditeRef is null"); // Debugging
    }
  }, []);
  const scrollToAiArt = useCallback(() => {
    if (ImageEditeRef.current) {
      const navHeight = document.querySelector('nav')?.clientHeight || 80;
    if (AiArtRef.current) {
      const topPosition = AiArtRef.current.offsetTop - navHeight;
      console.log("Scrolling to Image Editing Section", topPosition); // Debugging
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    } else {
      console.error("AiArtRef is null"); // Debugging
    }
    }
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href =
      "https://th.bing.com/th/id/R.f84376b56affbffa58d02d370e53ef86?rik=gOmcW56Pogs14Q&pid=ImgRaw&r=0";
    document.title = "Image Alchemy";
  }, []);

  return (
    <ThemeProvider>
      <ThemeConsumerApp
        scrollToConvert={scrollToConvert}
        scrollToFeaturs={scrollToFeaturs}
        scrollToImageEdite={scrollToImageEdite}
        scrollToAiArt={scrollToAiArt}
        ConvertRef={ConvertRef}
        FeatursRef={FeatursRef}
        ImageEditeRef={ImageEditeRef}
        AiArtRef={AiArtRef}
      />
    </ThemeProvider>
  );
}


export default ImgMain;