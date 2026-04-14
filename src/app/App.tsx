import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import HowItWorks from "../imports/HowItWorks1";

const cardsData = [
  {
    id: 0,
    number: "1",
    title: "Get started",
    description: "takes just a few minutes",
  },
  {
    id: 1,
    number: "2",
    title: "Choose amount",
    description: "select how much you want to exchange",
  },
  {
    id: 2,
    number: "3",
    title: "Complete transfer",
    description: "receive your funds instantly",
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevCard();
    } else if (info.offset.x < -swipeThreshold) {
      nextCard();
    }
  };

  const getCardPosition = (index: number) => {
    const diff = (index - currentIndex + cardsData.length) % cardsData.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(cardsData.length - 1)) return "right";
    if (diff === cardsData.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  const getRotation = (position: string) => {
    switch (position) {
      case "left":
        return -8;
      case "center":
        return 0;
      case "right":
        return 8;
      default:
        return 0;
    }
  };

  const getOpacity = (position: string) => {
    return position === "center" ? 1 : 0.6;
  };

  const getScale = (position: string) => {
    return position === "center" ? 1 : 0.85;
  };

  const getTranslateX = (position: string) => {
    switch (position) {
      case "left":
        return -120;
      case "center":
        return 0;
      case "right":
        return 120;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-[#fffef8] size-full flex items-center justify-center overflow-hidden">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[16px] py-[32px] w-full max-w-[500px]">
        <p className="font-['Labil_Grotesk:Black',sans-serif] leading-none min-w-full not-italic text-[#111a29] text-[44px] text-center tracking-[-0.88px] uppercase">
          HOW IT WORKS
        </p>

        <div className="relative w-full h-[480px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {cardsData.map((card) => {
              const position = getCardPosition(card.id);
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={card.id}
                  className="absolute w-[343px]"
                  initial={false}
                  animate={{
                    x: getTranslateX(position),
                    rotate: getRotation(position),
                    opacity: getOpacity(position),
                    scale: getScale(position),
                    zIndex: position === "center" ? 10 : 5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag={position === "center" ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{
                    cursor: position === "center" ? "grab" : "default",
                  }}
                >
                  <div className="bg-[#78a6ff] rounded-[32px] h-[280px] flex items-center justify-center shadow-lg">
                    <div className="text-[120px] font-bold text-white/20">
                      {card.number}
                    </div>
                  </div>

                  <motion.div
                    className="mt-[24px] px-[12px] h-[100px]"
                    initial={false}
                    animate={{
                      opacity: position === "center" ? 1 : 0,
                      filter: position === "center" ? "blur(0px)" : "blur(8px)",
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="flex gap-[12px] items-center justify-center mb-[12px]">
                      <div className="bg-[#111a29] rounded-full flex items-center justify-center w-[32px] h-[32px] flex-shrink-0">
                        <span className="text-white font-['Labil_Grotesk:Bold',sans-serif] text-[16px]">
                          {card.number}
                        </span>
                      </div>
                      <p className="font-['Labil_Grotesk:Medium',sans-serif] leading-[1.3] text-[#111a29] text-[24px] whitespace-nowrap">
                        {card.title}
                      </p>
                    </div>
                    <p className="font-['Labil_Grotesk:Regular',sans-serif] leading-[1.3] text-[#111a29] text-[18px] text-center tracking-[0.18px]">
                      {card.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center">
            <div className="flex gap-[12px] items-center bg-[#fffef8] p-[2px] rounded-[99px] border border-[#ecebe4] shadow-lg">
              <button
                onClick={prevCard}
                className="bg-[#fffef8] rounded-[99px] w-[40px] h-[40px] flex items-center justify-center hover:bg-[#f5f4ed] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex gap-[8px] items-center">
                {cardsData.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    className="w-[8px] h-[8px] rounded-full"
                    animate={{
                      backgroundColor:
                        idx === currentIndex ? "#111a29" : "#a4a4a4",
                      opacity: idx === currentIndex ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <button
                onClick={nextCard}
                className="bg-[#fffef8] rounded-[99px] w-[40px] h-[40px] flex items-center justify-center hover:bg-[#f5f4ed] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="bg-[#111a29] flex gap-[50px] items-center pl-[16px] pr-[4px] py-[4px] rounded-[99px] cursor-pointer hover:opacity-90 transition-opacity">
            <p className="font-['Labil_Grotesk:Bold',sans-serif] text-[#fffef8] text-[16px]">
              Try Venga Today
            </p>
            <div className="bg-[#fffef8] rounded-[40px] w-[40px] h-[40px] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#78A6FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
