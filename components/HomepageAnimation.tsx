"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomepageAnimation() {
  const radius = 450; // Radius of the circular motion
  const angle = (2 * Math.PI) / images.length; // Angle between each item
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateCarousel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(rotateCarousel, 2000); // Rotate every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ width: 1000, height: 700 }}
      className="absolute -translate-x-1/2 top-0 left-1/2 inset-0 md:flex justify-center items-center hidden"
    >
      {images.map((Icon, index) => {
        const x = radius * Math.cos(angle * (index + currentIndex));
        const y = radius * Math.sin(angle * (index + currentIndex));
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: "50%",
              left: "40%",
              width: "auto",
              height: "auto",
              x,
              y,
              transform: "translate(-40%, -50%)",
            }}
            animate={{
              x,
              y,
            }}
            transition={{
              duration: 1,
              ease: "linear",
            }}
          >
            <motion.div>{Icon.icon}</motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

const images: {
  key: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "1",
    icon: (
      <Image
        src="/images/Camera.png"
        width={173.03}
        height={180.77}
        alt="Camera"
        key="1"
        className="object-contain hidden md:block"
      />
    ),
  },
  {
    key: "2",
    icon: (
      <Image
        src="/images/laptop.png"
        width={175.93}
        height={144.85}
        alt="laptop"
        key="2"
        className="object-contain hidden md:block"
      />
    ),
  },
  {
    key: "3",
    icon: (
      <Image
        src="/images/printer.png"
        width={236.73}
        height={156.67}
        alt="printer"
        key="3"
        className="object-contain hidden md:block"
      />
    ),
  },
  {
    key: "4",
    icon: (
      <Image
        src="/images/projector.png"
        width={160.11}
        height={142.04}
        alt="projector"
        key="4"
        className="object-contain hidden md:block"
      />
    ),
  },
  {
    key: "5",
    icon: (
      <Image
        src="/images/video-camera.png"
        width={92.88}
        height={146.35}
        alt="Camera"
        key="1"
        className="object-contain hidden md:block"
      />
    ),
  },
  {
    key: "6",
    icon: (
      <Image
        src="/images/video-camera.png"
        width={92.88}
        height={146.35}
        alt="Camera"
        key="1"
        className="object-contain hidden md:block"
      />
    ),
  },
];
