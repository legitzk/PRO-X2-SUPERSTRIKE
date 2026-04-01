import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Zap, Feather, Wifi, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";
import { ChallengeType, ChallengeData } from "../types";

interface ChallengeProps {
  challenge: ChallengeData;
  onComplete: () => void;
  isActive: boolean;
  isCompleted: boolean;
}

export const Challenge: React.FC<ChallengeProps> = ({
  challenge,
  onComplete,
  isActive,
  isCompleted,
}) => {
  const [progress, setProgress] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Precision Challenge: Click target 5 times
  const handleTargetClick = () => {
    if (challenge.id === "precision" && isActive && !isCompleted) {
      const newProgress = progress + 20;
      setProgress(newProgress);
      if (newProgress >= 100) {
        onComplete();
      } else {
        setTargetPos({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }
    }
  };

  // Speed Challenge: Scroll fast
  useEffect(() => {
    if (challenge.id === "speed" && isActive && !isCompleted) {
      let lastScrollTime = Date.now();
      let scrollAccumulator = 0;

      const handleWheel = (e: WheelEvent) => {
        const now = Date.now();
        const delta = Math.abs(e.deltaY);
        const timeDiff = now - lastScrollTime;

        if (timeDiff < 100) {
          scrollAccumulator += delta / 10;
          setProgress((prev) => {
            const next = Math.min(100, prev + delta / 50);
            if (next >= 100) onComplete();
            return next;
          });
        } else {
          scrollAccumulator = 0;
        }
        lastScrollTime = now;
      };

      window.addEventListener("wheel", handleWheel);
      return () => window.removeEventListener("wheel", handleWheel);
    }
  }, [challenge.id, isActive, isCompleted, onComplete]);

  // Weight Challenge: Drag to target
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  const handleDragEnd = (_: any, info: any) => {
    if (challenge.id === "weight" && isActive && !isCompleted) {
      const distance = Math.sqrt(Math.pow(info.point.x - window.innerWidth / 2, 2) + Math.pow(info.point.y - 300, 2));
      if (distance < 50) {
        setProgress(100);
        onComplete();
      }
    }
  };

  // Connectivity Challenge: Connect dots (simplified to clicking 3 dots)
  const [dots, setDots] = useState([false, false, false]);
  const handleDotClick = (index: number) => {
    if (challenge.id === "connectivity" && isActive && !isCompleted) {
      const newDots = [...dots];
      newDots[index] = true;
      setDots(newDots);
      const completedDots = newDots.filter(Boolean).length;
      const newProgress = (completedDots / 3) * 100;
      setProgress(newProgress);
      if (completedDots === 3) {
        onComplete();
      }
    }
  };

  const Icon = {
    precision: Target,
    speed: Zap,
    weight: Feather,
    connectivity: Wifi,
  }[challenge.id];

  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden",
        isActive ? "border-blue-500 bg-blue-50/50" : "border-gray-200 bg-white",
        isCompleted && "border-green-500 bg-green-50/50"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "p-3 rounded-xl",
          isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500",
          isCompleted && "bg-green-500 text-white"
        )}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
          <p className="text-gray-600">{challenge.description}</p>
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-green-500"
          >
            <CheckCircle2 size={32} />
          </motion.div>
        )}
      </div>

      <div className="h-2 w-full bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className={cn("h-full", isCompleted ? "bg-green-500" : "bg-blue-500")}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {isActive && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-64 bg-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center cursor-crosshair"
            ref={containerRef}
          >
            <p className="absolute top-4 left-4 text-blue-400 text-sm font-mono">
              {challenge.instruction}
            </p>

            {challenge.id === "precision" && (
              <motion.button
                onClick={handleTargetClick}
                className="absolute w-12 h-12 rounded-full bg-blue-500 border-4 border-white shadow-lg shadow-blue-500/50 flex items-center justify-center"
                animate={{
                  left: `${targetPos.x}%`,
                  top: `${targetPos.y}%`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </motion.button>
            )}

            {challenge.id === "speed" && (
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{
                    rotate: progress * 3.6,
                    scale: 1 + progress / 200,
                  }}
                  className="text-blue-500"
                >
                  <Zap size={64} />
                </motion.div>
                <p className="text-white font-bold text-2xl">{Math.round(progress)}%</p>
              </div>
            )}

            {challenge.id === "weight" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center">
                  <div className="text-blue-500/50 text-xs text-center">TARGET<br/>AREA</div>
                </div>
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  onDragEnd={handleDragEnd}
                  className="w-16 h-24 bg-blue-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center shadow-xl"
                >
                  <Feather className="text-white" />
                </motion.div>
              </div>
            )}

            {challenge.id === "connectivity" && (
              <div className="flex gap-12">
                {[0, 1, 2].map((i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={cn(
                      "w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center",
                      dots[i]
                        ? "bg-blue-500 border-white scale-110"
                        : "bg-transparent border-blue-500/50 hover:border-blue-500"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {dots[i] && <div className="w-2 h-2 rounded-full bg-white" />}
                  </motion.button>
                ))}
                {dots.every(Boolean) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-full h-1 bg-blue-500/50 absolute" />
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
