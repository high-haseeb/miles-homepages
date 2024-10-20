"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import anime from "animejs/lib/anime.es.js";

export default function HomepageAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = () => {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
    return check;
  };

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");

      (cards as NodeListOf<HTMLDivElement>).forEach((card, index) => {
        const angle = (index * 360) / images.length;
        const radius = isMobile() ? 250 : 540;
        const x = Math.sin((angle * Math.PI) / 180) * radius;
        const y = Math.cos((angle * Math.PI) / 180) * radius;
        card.style.transform = `translate(${x}px, ${y}px)`;
        card.style.visibility = 'visible';
      });

      // Animate the rotation of the cards
      const startAnimation = () => {
        anime({
          targets: ".card-container",
          duration: 500,
          rotate: `+=60deg`,
          easing: "easeInOutQuad",
          complete: () => {
            setTimeout(() => {
              startAnimation();
            }, 2100);
          }
        });
      }
      startAnimation();
    }
  }, []);

  return (
    <>
      <div className="h-24 absolute w-screen top-0 left-0 z-10 bg-pearl-400" />
      <div className="h-24 absolute w-1/4 bottom-0 left-1/2 -translate-x-1/2 z-10 bg-pearl-400" />
      <div className="rotate-[30deg] lg:rotate-0 absolute  top-1/4 lg:top-0 left-0 lg:left-auto" >
        <div
          ref={containerRef}
          className="w-screen lg:w-[1100px] h-[100vw] lg:h-[1100px] rounded-full flex justify-center items-center card-container top-1/4 left-0"
        >
          {images.map((Image, index) => (
            <div
              key={index}
              className="absolute card flex justify-center items-center w-20 h-20 lg:w-40 lg:h-40 invisible"
            >
              {Image.icon}
            </div>
          ))}
        </div>
      </div>
    </>
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
        className="object-cover rotate-[150deg]"
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
        className="object-cover rotate-[120deg]"
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
        className="object-cover rotate-[75deg]"
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
        className="object-cover"
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
        className="object-contain rotate-[120deg] w-full h-full"
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
        className="object-contain rotate-[60deg] w-full h-full"
      />
    ),
  },
];
