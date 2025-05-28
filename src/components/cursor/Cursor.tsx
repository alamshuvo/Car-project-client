"use client";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        setHovered(
          target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            !!target.closest("button") ||
            !!target.closest("a")
        );
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleHover);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      {/* Outer glow ring */}
      <div
        className={`fixed z-[9999] w-10 h-10 rounded-full pointer-events-none border-2 transition-all duration-200 ease-out ${
          hovered
            ? "scale-125 border-purple-500"
            : "scale-100 border-purple-300"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Inner core dot */}
      <div
        className={`fixed z-[9999] w-2.5 h-2.5 rounded-full pointer-events-none transition-all duration-200 ease-out ${
          hovered ? "scale-150 bg-purple-700" : "scale-100 bg-purple-500"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
