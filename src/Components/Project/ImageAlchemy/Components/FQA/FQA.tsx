import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is Image Alchemy Converter?",
    answer:
      "Image Alchemy Converter is a client-side tool for seamless image format conversion between JPG and PNG. It includes real-time previews, quality adjustments, and instant downloads, all processed locally without server uploads.",
  },
  {
    question: "What new features are available?",
    answer:
      "We now support advanced image editing (clipping) and AI-powered text-to-image generation for creative art.",
  },
  {
    question: "Is my image data secure?",
    answer:
      "Yes! All image processing happens in your browser, ensuring complete privacy without any server uploads.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes, but for the best experience, we recommend using a desktop browser.",
  },
  {
    question: "If a payment method is secure?",
    answer:
      "Yes chapa is very secure, but for now is test payment.",
  },
  {
    question: "Can I adjust JPG quality before downloading?",
    answer:
      "Yes, our converter allows you to fine-tune JPG compression settings to maintain optimal quality.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6"
      >
        Frequently Asked Questions
      </motion.h2>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
              <motion.span
                className="text-xl text-gray-600 dark:text-gray-300"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? "▲" : "▼"}
              </motion.span>
            </div>
            {openIndex === index && (
              <motion.p
                className="text-gray-700 dark:text-gray-300 mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
