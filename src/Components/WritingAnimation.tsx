import { motion } from 'framer-motion';

interface WritingAnimationProps {
  paragraph: string;
}

// Variants for animating the entire paragraph (opacity fade-in and staggered letters)
const paragraphVariants = {
  hidden: { opacity: 1 }, // Initial state is fully visible
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2, // Adds a small delay before the animation starts
      staggerChildren: 0.05, // Each letter animates with a delay of 0.05 seconds
    },
  },
};

// Variants for each individual letter's animation (fade-in)
const letterVariants = {
  hidden: { opacity: 0 }, // Initially, letters are invisible
  visible: { opacity: 1 }, // When visible, letters become fully opaque
};

const WritingAnimation: React.FC<WritingAnimationProps> = ({ paragraph }) => {
  return (
    <motion.p
      variants={paragraphVariants}
      initial="hidden"
      animate="visible"
    >
      {paragraph.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default WritingAnimation;