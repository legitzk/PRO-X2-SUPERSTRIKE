import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Mouse, ChevronDown, Trophy, Sparkles, ShoppingCart, Menu, X } from "lucide-react";
import { CHALLENGES, MOUSE_SPECS } from "./constants";
import { ChallengeType, UnlockedSection } from "./types";
import { Challenge } from "./components/Challenge";
import { MouseSection } from "./components/MouseSection";
import { cn } from "./lib/utils";

export default function App() {
  const [unlockedSections, setUnlockedSections] = useState<UnlockedSection[]>([]);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const challengesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const handleChallengeComplete = (id: ChallengeType) => {
    const challenge = CHALLENGES.find((c) => c.id === id);
    if (challenge && !unlockedSections.find((s) => s.id === id)) {
      const newSection: UnlockedSection = {
        id: challenge.id,
        title: challenge.unlockedTitle,
        content: challenge.unlockedContent,
      };
      setUnlockedSections((prev) => [...prev, newSection]);
      
      // Move to next challenge if available
      if (activeChallengeIndex < CHALLENGES.length - 1) {
        setTimeout(() => {
          setActiveChallengeIndex((prev) => prev + 1);
        }, 1000);
      }
    }
  };

  const scrollToChallenges = () => {
    challengesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const allChallengesCompleted = unlockedSections.length === CHALLENGES.length;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white">
              <Mouse size={24} />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">PRO X2</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#challenges" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">CHALLENGES</a>
            <a href="#features" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">FEATURES</a>
            <a href="#specs" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">SPECS</a>
            <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 flex items-center gap-2">
              <ShoppingCart size={16} />
              BUY NOW
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a href="#challenges" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black">CHALLENGES</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black">FEATURES</a>
              <a href="#specs" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black">SPECS</a>
              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                BUY NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 border border-blue-100"
          >
            <Sparkles size={16} />
            THE FUTURE OF GAMING IS HERE
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.9]">
            PRO X2<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SUPERSTRIKE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            The landing page is locked. Complete the challenges below to assemble the ultimate gaming weapon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToChallenges}
              className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-xl hover:bg-gray-800 transition-all shadow-2xl shadow-gray-900/20 flex items-center gap-3 group"
            >
              START CHALLENGE
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-bold text-xl hover:border-gray-900 transition-all">
              WATCH REVEAL
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 w-full max-w-5xl aspect-[21/9] bg-gradient-to-b from-gray-100 to-white rounded-t-[4rem] border-x border-t border-gray-200 shadow-[0_-40px_100px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center"
        >
          <div className="text-gray-300 font-black text-4xl md:text-6xl tracking-tighter opacity-50">
            LOCKED CONTENT
          </div>
        </motion.div>
      </motion.section>

      {/* Challenges Section */}
      <section id="challenges" ref={challengesRef} className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                PROVE YOUR SKILLS
              </h2>
              <p className="text-xl text-gray-600">
                Unlock each feature of the PRO X2 SUPERSTRIKE by completing these precision and speed tests.
              </p>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Trophy className="text-amber-500" />
              <span className="font-bold text-gray-900">
                {unlockedSections.length} / {CHALLENGES.length} UNLOCKED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {CHALLENGES.map((challenge, index) => (
                <Challenge
                  key={challenge.id}
                  challenge={challenge}
                  isActive={index === activeChallengeIndex}
                  isCompleted={unlockedSections.some((s) => s.id === challenge.id)}
                  onComplete={() => handleChallengeComplete(challenge.id)}
                />
              ))}
            </div>

            <div className="sticky top-32 h-fit">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xl">
                <h3 className="text-xl font-bold mb-6">LIVE ASSEMBLY</h3>
                <div className="space-y-4">
                  {CHALLENGES.map((c) => {
                    const isUnlocked = unlockedSections.some((s) => s.id === c.id);
                    return (
                      <div key={c.id} className="flex items-center gap-4">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          isUnlocked ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-gray-200"
                        )} />
                        <span className={cn(
                          "font-medium",
                          isUnlocked ? "text-gray-900" : "text-gray-400"
                        )}>
                          {c.unlockedTitle}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlocked Features Section */}
      <div id="features" className="bg-white">
        <AnimatePresence>
          {unlockedSections.map((section, index) => (
            <MouseSection key={section.id} section={section} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Specs Section (Unlocked when all challenges complete) */}
      <AnimatePresence>
        {allChallengesCompleted && (
          <motion.section
            id="specs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="inline-block p-4 rounded-2xl bg-blue-500/10 text-blue-400 mb-6"
                >
                  <Trophy size={48} />
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                  MISSION ACCOMPLISHED
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  You've unlocked the full potential of the PRO X2 SUPERSTRIKE. Here are the final specifications.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {Object.entries(MOUSE_SPECS).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">{key}</p>
                    <p className="text-2xl font-black">{value}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center shadow-2xl shadow-blue-600/20"
              >
                <h3 className="text-4xl font-black mb-8">READY TO STRIKE?</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button className="px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-2xl hover:scale-105 transition-transform shadow-xl">
                    PRE-ORDER NOW
                  </button>
                  <p className="text-blue-100 font-medium">Starting at $159.99</p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
              <Mouse size={18} />
            </div>
            <span className="font-black text-lg tracking-tighter uppercase">PRO X2</span>
          </div>
          
          <div className="flex gap-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-gray-900">PRIVACY</a>
            <a href="#" className="hover:text-gray-900">TERMS</a>
            <a href="#" className="hover:text-gray-900">SUPPORT</a>
          </div>

          <p className="text-sm text-gray-400">
            © 2026 LOGITECH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
