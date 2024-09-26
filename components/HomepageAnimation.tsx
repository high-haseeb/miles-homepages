"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs/lib/anime.es.js";

export default function HomepageAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");

      // Set the initial positions of the cards
      (cards as NodeListOf<HTMLDivElement>).forEach((card, index) => {
        const angle = (index * 360) / images.length;
        const radius = 540;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius;
        card.style.transform = `translate(${x}px, ${y}px)`;
      });

      // Animate the rotation of the cards
      anime({
        targets: ".card-container",
        duration: 10000,
        loop: true,
        rotate: "360deg",
        easing: "linear",
        direction: "normal",
        autoplay: true,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute w-[1140.51px] h-[1100.99px] border rounded-full flex justify-center items-center card-container"
    >
      {images.map((Image, index) => (
        <div
          key={index}
          className="absolute card flex justify-center items-center"
        >
          {Image.icon}
        </div>
      ))}
    </div>
  );
}

const images: { key: string; icon: React.ReactNode }[] = [
  {
    key: "1",
    icon: (
      <Image
        src="/images/Camera.png"
        width={173.03}
        height={180.77}
        alt="Camera"
        className="object-contain"
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
        className="object-contain"
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
        className="object-contain"
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
        className="object-contain"
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
        className="object-contain"
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
        className="object-contain"
      />
    ),
  },
];
