"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function MacbookMockup({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const lidRotate = useTransform(scrollYProgress, [0.3, 1], [-90, 0]);

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col items-center justify-center py-20", className)}
    >
      <div
        className="transform scale-[0.6] sm:scale-[0.8] lg:scale-100 origin-center"
        style={{ perspective: "800px" }}
      >
        {/* Lid */}
        <Lid src={src} rotate={lidRotate} />

        {/* Base area */}
        <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10 shadow-2xl">
          {/* Top area above keyboard with slight gradient/shadow */}
          <div className="h-10 w-full relative">
            <div className="absolute inset-x-0 top-0 mx-auto w-[80%] h-4 bg-[#050505] rounded-b-md blur-[2px] opacity-50" />
            <div className="absolute inset-x-0 top-0 mx-auto w-[80%] h-3 bg-[#050505] rounded-b-md" />
          </div>

          <div className="flex relative mt-1">
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
        </div>
      </div>
    </div>
  );
}

const Lid = ({
  rotate,
  src,
}: {
  rotate: MotionValue<number>;
  src: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      {/* Base hinge part */}
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px var(--neutral-900) inset" }}
          className="absolute inset-0 rounded-lg flex items-center justify-center opacity-30"
        />
      </div>

      {/* The actual flipping lid */}
      <motion.div
        style={{
          rotateX: rotate,
          transformStyle: "preserve-3d",
          transformOrigin: "bottom",
        }}
        className="h-96 w-[32rem] absolute bottom-0 inset-x-0 bg-[#010101] rounded-t-2xl p-3 border-t-2 border-x border-[#333] shadow-xl"
      >
        <div className="absolute top-1.5 inset-x-0 flex justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black border border-neutral-800" />
        </div>
        
        <div className="absolute inset-3 mt-2 rounded-lg bg-[#1a1a1a] overflow-hidden border border-[#222]">
          <img
            src={src}
            alt="Screen Content"
            className="w-full h-full object-cover object-top"
          />
          {/* Glare effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32 rounded-xl my-4 bg-[#202022] dark:bg-[#1a1a1b]"
      style={{
        boxShadow: "0px 0px 1px 1px #00000030 inset, 0 1px 0 rgba(255,255,255,0.05)",
      }}
    ></div>
  );
};

const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] p-1.5 mx-1 shadow-[0_0_10px_rgba(0,0,0,0.5)_inset]">
      {/* Row 1 - function keys */}
      <Row>
        <KBtn className="w-10 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">esc</KBtn>
        {Array.from({ length: 12 }).map((_, i) => (
          <KBtn key={i} className="w-6"><span className="block text-[5px]">F{i + 1}</span></KBtn>
        ))}
        <KBtn className="w-8"><span className="block text-[5px]">⏏</span></KBtn>
      </Row>
      <Row>
        {["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn className="flex-1 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </Row>
      <Row>
        <KBtn className="w-12 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">tab</KBtn>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"].map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
      </Row>
      <Row>
        <KBtn className="w-14 items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">caps</KBtn>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"].map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn className="flex-1 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </Row>
      <Row>
        <KBtn className="w-[4.2rem] items-end justify-start pl-[4px] pb-[2px]" childrenClassName="items-start">shift</KBtn>
        {["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"].map((k) => (
          <KBtn key={k}>{k}</KBtn>
        ))}
        <KBtn className="flex-1 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </Row>
      <Row>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <span className="block text-[6px]">fn</span>
          <span className="block text-[6px]">🌐</span>
        </KBtn>
        <KBtn className="w-8">⌃</KBtn>
        <KBtn className="w-8">⌥</KBtn>
        <KBtn className="w-12">⌘</KBtn>
        <KBtn className="flex-1"></KBtn>
        <KBtn className="w-12">⌘</KBtn>
        <KBtn className="w-8">⌥</KBtn>
        <KBtn className="w-[2.4rem] items-end justify-between px-[4px] pb-[2px]">
          <div className="flex gap-[1px]">
            <span className="block text-[5px]">◀</span>
            <div className="flex flex-col gap-[1px]">
              <span className="block text-[5px]">▲</span>
              <span className="block text-[5px]">▼</span>
            </div>
            <span className="block text-[5px]">▶</span>
          </div>
        </KBtn>
      </Row>
    </div>
  );
};

const KBtn = ({
  className,
  children,
  childrenClassName,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
}) => {
  return (
    <div
      className={cn("p-[1px] rounded-[4px] bg-[#222]", className)}
      style={{
        boxShadow: "0px -0.5px 1px 0 #0D0D0E inset, -0.5px 0px 1px 0 #0D0D0E inset",
      }}
    >
      <div
        className={cn(
          "h-6 rounded-[3.5px] flex items-center justify-center font-body bg-[#111]",
          childrenClassName
        )}
        style={{
          boxShadow: "0px 0px 0px 0.5px #1a1a1a inset, 0px 1px 1px 0 #0D0D0E inset",
        }}
      >
        <span className="text-[7px] text-neutral-300">
          {children}
        </span>
      </div>
    </div>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-[3px] mb-[3px] w-full flex-shrink-0">{children}</div>;
};

const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[1px] gap-[2px] mt-2 h-40 opacity-40"
      style={{
        backgroundImage: "radial-gradient(circle, #111 1px, transparent 1px)",
        backgroundSize: "4px 4px",
      }}
    ></div>
  );
};
