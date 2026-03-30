"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[80vh] pb-10 flex flex-col items-center py-0 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.6] sm:scale-[0.8]"
    >

      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="h-[22rem] w-[32rem] bg-[#e5e5e5] dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10 shadow-2xl">
        {/* above shadow */}
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 top-0 mx-auto w-[80%] h-4 bg-[#050505] opacity-20 blur-[2px] rounded-b-lg" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl opacity-50" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 rounded-lg flex items-center justify-center opacity-30"
        >
          <span className="text-white">
            <AcesLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <img
          src={src || "/linear.webp"}
          alt="aceternity logo"
          className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
        />
        {/* Screen Glare */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none rounded-lg" />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[38%] mx-auto h-32 rounded-xl my-2 bg-[#d4d4d4] dark:bg-[#202022]"
      style={{
        boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.2) inset, 0 1px 0 rgba(255,255,255,0.05)",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#1a1a1a] shadow-[0_0_8px_rgba(0,0,0,0.6)_inset] mx-1 p-1.5 border border-[#333]/30">
      {/* Row 1 - function keys */}
      <Row>
        <KBtn width="30px" align="start">esc</KBtn>
        {Array.from({ length: 12 }).map((_, i) => (
          <KBtn key={i} flex={1}>F{i + 1}</KBtn>
        ))}
        <KBtn width="24px" align="end">⏏</KBtn>
      </Row>

      {/* Row 2 - number row */}
      <Row>
        {["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map((k) => (
          <KBtn key={k} flex={1} isChar>{k}</KBtn>
        ))}
        <KBtn width="42px" align="end">delete</KBtn>
      </Row>

      {/* Row 3 */}
      <Row>
        <KBtn width="42px" align="start">tab</KBtn>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"].map((k) => (
          <KBtn key={k} flex={1} isChar>{k}</KBtn>
        ))}
      </Row>

      {/* Row 4 */}
      <Row>
        <KBtn width="52px" align="start">caps</KBtn>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"].map((k) => (
          <KBtn key={k} flex={1} isChar>{k}</KBtn>
        ))}
        <KBtn flex={1} align="end">return</KBtn>
      </Row>

      {/* Row 5 */}
      <Row>
        <KBtn width="72px" align="start">shift</KBtn>
        {["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"].map((k) => (
          <KBtn key={k} flex={1} isChar>{k}</KBtn>
        ))}
        <KBtn flex={1} align="end">shift</KBtn>
      </Row>

      {/* Row 6 - bottom row */}
      <Row>
        <KBtn width="28px" align="start">fn</KBtn>
        <KBtn width="28px" align="start">⌃</KBtn>
        <KBtn width="28px" align="start">⌥</KBtn>
        <KBtn width="38px" align="start">⌘</KBtn>
        <KBtn flex={2} />
        <KBtn width="38px" align="end">⌘</KBtn>
        <KBtn width="28px" align="end">⌥</KBtn>
        
        {/* Arrow Keys */}
        <div className="flex w-[82px] justify-between ml-1 text-neutral-300">
          <KBtn width="26px" align="center" className="mt-auto h-[12px] text-[5px]">◀</KBtn>
          <div className="flex flex-col justify-between w-[26px]">
            <KBtn width="26px" align="center" className="h-[11px] mb-[1px] text-[5px]">▲</KBtn>
            <KBtn width="26px" align="center" className="h-[12px] text-[5px]">▼</KBtn>
          </div>
          <KBtn width="26px" align="center" className="mt-auto h-[12px] text-[5px]">▶</KBtn>
        </div>
      </Row>
    </div>
  );
};

export const KBtn = ({
  width,
  flex,
  align = "center",
  children,
  isChar,
  className,
}: {
  width?: string;
  flex?: number;
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  isChar?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-[1px] rounded-[3px] bg-[#222] shadow-[0px_-0.5px_1px_0_#0a0a0a_inset,-0.5px_0px_1px_0_#0a0a0a_inset]",
        className
      )}
      style={{
        width: width || "auto",
        flex: flex ? flex : "none",
      }}
    >
      <div
        className={cn(
          "w-full h-full rounded-[2.5px] bg-[#111] font-body text-neutral-300 flex flex-col p-[3px]",
          align === "start" ? "items-start text-left" : align === "end" ? "items-end text-right" : "items-center text-center",
          isChar ? "justify-center text-[9px] uppercase font-medium" : "justify-end text-[6px]",
        )}
        style={{
          boxShadow: "0px 0px 0px 0.5px #1a1a1a inset, 0px 1px 1px 0 #0D0D0E inset",
        }}
      >
        <span>{children}</span>
      </div>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[2.5px] mb-[2.5px] w-full h-[24px] flex-shrink-0">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

const AceLibraLogo = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple book/library icon */}
      <rect x="8" y="6" width="24" height="28" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M20 6V34" stroke="white" strokeWidth="1" />
      <path d="M12 12H17" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 16H17" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 20H17" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M23 12H28" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M23 16H28" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M23 20H28" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.3446 9.05432 57.3446"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};

const AcesLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    </svg>
  );
};
