"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const teamMembers = [
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  },
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  },
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  },
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  },
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  },
  {
    name: "Kailas Mahavarkar",
    role: "Senior SDE at YodaPlus",
    ex: ["Ex-Pinelabs", "Ex-Carwale"],
    image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png"
  }
];

export function TeamCarousel() {
  return (
    <section 
      className="relative z-20 w-full flex flex-col pt-10 pb-20 font-sans bg-background"
      data-lenis-prevent="true"
    >
      <h2 className="text-[14px] font-medium leading-[20px] text-center text-foreground uppercase mb-12">
        (03) OUR TEAM
      </h2>
      
      {/* 
        Standard Shadcn Carousel integration
        - dragFree: true allows buttery smooth, non-snapping sweeps
        - loop: false
      */}
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0 w-full h-full pt-4 pb-8">
          
          {/* Spacer to simulate the initial 43px left padding natively */}
          <CarouselItem className="pl-0 basis-auto h-full !min-w-[43px] w-[43px]" aria-hidden="true" />
          
          {teamMembers.map((member, index) => (
            <CarouselItem 
              key={index} 
              className="pl-0 mr-[31px] basis-auto last:mr-0 h-full"
            >
              <div 
                className="relative w-[216px] h-[282px] overflow-hidden select-none touch-pan-x"
                style={{ backgroundImage: "linear-gradient(210.75deg, rgb(249, 249, 249) 45.489%, rgb(147, 147, 147) 99.431%)" }}
              >
                <div className="absolute left-[-46px] w-[272px] h-[272px] top-[10px] pointer-events-none overflow-hidden mix-blend-multiply">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover pointer-events-none"
                    sizes="272px"
                    priority={index < 2} 
                    draggable={false}
                  />
                </div>
                
                <div className="relative z-10 w-full pt-[19px] flex items-center flex-col pointer-events-none">
                  <h3 className="text-[16px] font-medium leading-[26px] text-black tracking-tight pointer-events-none">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-normal leading-[26px] text-black mt-[-4px] pointer-events-none">
                    {member.role}
                  </p>
                </div>
                
                <div className="absolute right-[12px] bottom-[16px] flex flex-col text-right z-10 gap-0 pointer-events-none">
                  {member.ex.map((item, i) => (
                    <span key={i} className="text-[12px] font-normal leading-[18px] text-black pointer-events-none">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}

          {/* Spacer to simulate the padding on the right end */}
          <CarouselItem className="pl-0 basis-auto h-full !min-w-[12px] w-[12px]" aria-hidden="true" />
        </CarouselContent>
      </Carousel>
    </section>
  );
}
