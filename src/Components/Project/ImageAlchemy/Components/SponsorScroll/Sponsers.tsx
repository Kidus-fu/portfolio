import React from "react";
import "./sponsers.css"; // Import the CSS file
import Tailwindcss from "./Images/Tailwindcss.png"
import AntDesign from "./Images/Ant design logo.png"
import ETHO from "./Images/ETHO.png"
import Chapa from "./Images/Chapa.png"
import {motion } from "framer-motion"
const SponsorCarousel:React.FC = () => {
    const sponsors = [
        { id: 1, logo: `${Tailwindcss}`, alt: "Tailwind CSS" },
        { id: 2, logo: `${AntDesign}`, alt: "Ant Design" },
        { id: 3, logo: `${ETHO}`, alt: "ETHO" },
        { id: 4, logo: `${Chapa}`, alt: "Chapa" },
        
      ];

  // Duplicate the sponsors array for seamless looping
  const duplicatedSponsors = [...sponsors, ...sponsors,...sponsors,...sponsors,...sponsors];

  return (
    <div className="whitespace-nowrap  relative overflow-hidden dark:bg-gray-900 my-2">
      <p className="text-center text-2xl dark:text-slate-400 m-2">Powerd By </p>
      <div className="sponsor-track   p-3">
        {duplicatedSponsors.map((sponsor) => (
          <motion.div
            initial={{ opacity: 0, }}
            whileInView={{opacity : 1}}
            transition={{ duration: 1.5 }}
          key={sponsor.id} className="sponsor-logo">
            <img src={sponsor.logo}  className="h-[70px] w-auto" alt={sponsor.alt} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SponsorCarousel;