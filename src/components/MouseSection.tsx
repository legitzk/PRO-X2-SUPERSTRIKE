import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { UnlockedSection } from "../types";

interface MouseSectionProps {
  section: UnlockedSection;
  index: number;
}

export const MouseSection: React.FC<MouseSectionProps> = ({ section, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center",
        !isEven && "md:flex-row-reverse"
      )}
    >
      <div className={cn("flex flex-col gap-6", !isEven && "md:order-2")}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold w-fit"
        >
          FEATURE UNLOCKED
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          {section.title}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
          {section.content}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-900/20 w-fit"
        >
          LEARN MORE
        </motion.button>
      </div>

      <div className={cn(
        "relative aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shadow-2xl",
        !isEven && "md:order-1"
      )}>
        {section.videoUrl ? (
          <video
            src={section.videoUrl}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-12">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full bg-gray-300 rounded-2xl shadow-inner flex items-center justify-center"
            >
              <div className="text-gray-400 font-bold text-xl text-center">
                PRO X2<br/>SUPERSTRIKE<br/>{section.id.toUpperCase()}
              </div>
            </motion.div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </motion.section>
  );
};
