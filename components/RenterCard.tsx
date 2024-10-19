'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardDescription, CardTitle, CardContent, CardFooter, CardHeader } from './ui/card'
import Image from 'next/image';
import anime from "animejs/lib/anime.es.js";

type RenterCardProps = {
    img: string,
    title: string,
    description: string,
    footerColorMain: string,
    footerColorSecondary: string,
    index?: number,
};
const RenterCard = ({ img, title, description, footerColorMain, footerColorSecondary, index = 0 }: RenterCardProps) => {
    return (
        <Card className="absolute w-[10rem] h-[12rem] lg:w-[18rem] lg:h-[21rem] top-0 left-0 rounded-3xl shadow-lg py-4 group-hover:w-[20rem] group-hover:h-[24rem] transition-all group-hover:shadow-2xl">
            <div className="group-hover:hidden">
                <CardTitle className="font-normal pt-2 px-5 ">
                    <div className='text-sm lg:text-lg font-semibold'>{title}</div>
                    <CardDescription className='text-[0.5rem] lg:text-xs'>{description}</CardDescription>
                </CardTitle>
                <CardContent className="flex items-center justify-center lg:h-[12rem] lg:w-[18rem] transition-all">
                    <Image src={`/persons/${img}`} width={180} height={200} alt='camera image' className="object-cover aspect-square z-0" />
                </CardContent>
                <CardFooter>
                    <div className="relative w-full h-10 invisible lg:visible">
                        <Image src="/persons/person3.jpg" width={40} height={50} alt='person' className="rounded-full absolute left-0 z-10" />
                        <Image src="/persons/person2.jpg" width={40} height={50} alt='person' className="rounded-full absolute left-8 z-10" />
                        <Image src="/persons/person1.jpg" width={40} height={50} alt='person' className="rounded-full absolute left-16 z-10" />
                        <div className="h-10 w-auto absolute left-24 rounded-full text-xs flex items-center justify-center px-5 z-0" style={{ background: footerColorMain, color: footerColorSecondary }}>1K+ Active Listers</div>
                    </div>
                </CardFooter>
            </div>
            <div className="w-[20rem] h-full group-hover:visible invisible">
                <Image src={`/persons/${img}`} width={500} height={500} alt='camera image' className="object-cover aspect-square z-0" />
            </div>
        </Card>
    )
}
const RachetRenterCards = () => {
    const initCards: RenterCardProps[] = [
        {
            img: "drill.png",
            title: "Others",
            description: "Home appliances, Musical instruments & More..",
            footerColorMain: "#004537",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "car.png",
            title: "Fashion",
            description: "Luxury Apparels, Runway Items & More..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "laptop.png",
            title: "Electronics",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#C7DDDC",
            footerColorMain: "#545D5C",
        },
        {
            img: "chair.png",
            title: "Events",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#626023",
            footerColorMain: "#D4CF4C",
        },
        {
            img: "car.png",
            title: "Vehicles",
            description: "Cars, Scoters, Jet skis & More..",
            footerColorMain: "#E87F2B",
            footerColorSecondary: "#FFFFFF",
        }, {
            img: "camera.png",
            title: "Film & Photography",
            description: "DSLR Cameras, Audio Recorders & More..",
            footerColorMain: "#019D45",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "spaces.jpg",
            title: "Spaces",
            description: "Event Spaces, Halls, grounds & more..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "drill.png",
            title: "Others",
            description: "Home appliances, Musical instruments & More..",
            footerColorMain: "#004537",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "car.png",
            title: "Fashion",
            description: "Luxury Apparels, Runway Items & More..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "laptop.png",
            title: "Electronics",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#C7DDDC",
            footerColorMain: "#545D5C",
        },
        {
            img: "chair.png",
            title: "Events",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#626023",
            footerColorMain: "#D4CF4C",
        },
        {
            img: "car.png",
            title: "Vehicles",
            description: "Cars, Scoters, Jet skis & More..",
            footerColorMain: "#E87F2B",
            footerColorSecondary: "#FFFFFF",
        }, {
            img: "camera.png",
            title: "Film & Photography",
            description: "DSLR Cameras, Audio Recorders & More..",
            footerColorMain: "#019D45",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "spaces.jpg",
            title: "Spaces",
            description: "Event Spaces, Halls, grounds & more..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },

        {
            img: "drill.png",
            title: "Others",
            description: "Home appliances, Musical instruments & More..",
            footerColorMain: "#004537",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "car.png",
            title: "Fashion",
            description: "Luxury Apparels, Runway Items & More..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "laptop.png",
            title: "Electronics",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#C7DDDC",
            footerColorMain: "#545D5C",
        },
        {
            img: "chair.png",
            title: "Events",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#626023",
            footerColorMain: "#D4CF4C",
        },
        {
            img: "car.png",
            title: "Vehicles",
            description: "Cars, Scoters, Jet skis & More..",
            footerColorMain: "#E87F2B",
            footerColorSecondary: "#FFFFFF",
        }, {
            img: "camera.png",
            title: "Film & Photography",
            description: "DSLR Cameras, Audio Recorders & More..",
            footerColorMain: "#019D45",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "spaces.jpg",
            title: "Spaces",
            description: "Event Spaces, Halls, grounds & more..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },

        {
            img: "drill.png",
            title: "Others",
            description: "Home appliances, Musical instruments & More..",
            footerColorMain: "#004537",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "car.png",
            title: "Fashion",
            description: "Luxury Apparels, Runway Items & More..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "laptop.png",
            title: "Electronics",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#C7DDDC",
            footerColorMain: "#545D5C",
        },
        {
            img: "chair.png",
            title: "Events",
            description: "Laptops, Monitors, Projectors & More..",
            footerColorSecondary: "#626023",
            footerColorMain: "#D4CF4C",
        },
        {
            img: "car.png",
            title: "Vehicles",
            description: "Cars, Scoters, Jet skis & More..",
            footerColorMain: "#E87F2B",
            footerColorSecondary: "#FFFFFF",
        }, {
            img: "camera.png",
            title: "Film & Photography",
            description: "DSLR Cameras, Audio Recorders & More..",
            footerColorMain: "#019D45",
            footerColorSecondary: "#FFFFFF",
        },
        {
            img: "spaces.jpg",
            title: "Spaces",
            description: "Event Spaces, Halls, grounds & more..",
            footerColorMain: "#8E6FBF",
            footerColorSecondary: "#FFFFFF",
        },
    ];

    const [cards, setCards] = useState<RenterCardProps[]>(initCards);

    const containerRef = useRef<any>();

    const isMobile = () => {
        let check = false;
        (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
        return check;
    };
    useEffect(() => {

        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".card");
            (cards as NodeListOf<HTMLDivElement>).forEach((card, index) => {
                const angle = (index * 360) / initCards.length;
                const radius = isMobile() ?  window.innerWidth * 2.0 : window.innerWidth * 0.8;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                card.style.transform = `translate(${x}px, ${y}px)`;
                const rotateToCenter = angle - 90; // Rotate by 90 degrees to make the card face the center
                card.style.transform += ` rotate(${rotateToCenter}deg)`;
            });
        }

        const startAnimation = () => {
            anime({
                targets: ".card-container",
                duration: 1400,
                rotate: `-=${360 / cards.length}deg`,
                easing: "easeInOutQuad",
                complete: () => {
                    setTimeout(() => {
                        startAnimation();
                    }, 2100);
                }
            });
        }
        startAnimation();
    }, []);

    return (
        <>
            <div className="w-[30rem] h-[30rem] absolute top-1/3 left-[14rem] -translate-x-1/2 -translate-y-1/2 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-200/30 from-0% to-transparent to-70%" />
            <div className="w-[30rem] h-[30rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-200 from-0% to-transparent to-70%" />
            <div className="absolute top-1/2 flex flex-col items-center justify-center ">
            {/* <div className="text-[#7F8080] text-base text-center z-10 -translate-y-10"> Browse through a collection of over 20,000+ <br /> listed items and more.</div> */}

                <div className="w-screen h-screen flex items-center justify-center -translate-y-[130%] lg:-translate-y-[190%]">
                    <div className="flex items-center justify-center gap-14 w-screen h-[100vh] rounded-full card-container" ref={containerRef} style={{ transformOrigin: 'center center' }}>
                        {

                            cards.map((cardProps, idx) =>

                                <div className="min-w-[10rem] lg:min-w-[18rem] lg:h-[21rem] h-[10rem] group absolute card" >
                                    <RenterCard {...cardProps} key={idx} index={idx} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RachetRenterCards;
