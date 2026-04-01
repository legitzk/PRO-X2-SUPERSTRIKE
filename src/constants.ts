import { ChallengeData } from "./types";

export const CHALLENGES: ChallengeData[] = [
  {
    id: "precision",
    title: "Precision Challenge",
    description: "The PRO X2 SUPERSTRIKE features the HERO 25K sensor. Test your precision.",
    instruction: "Click the target 5 times as it moves.",
    unlockedTitle: "HERO 25K Sensor",
    unlockedContent: "Unmatched precision with 25,600 DPI, zero smoothing, filtering, or acceleration. The ultimate sensor for professional gaming.",
    icon: "Target",
  },
  {
    id: "speed",
    title: "Speed Challenge",
    description: "LIGHTSPEED wireless technology offers pro-grade performance. Test your speed.",
    instruction: "Scroll fast to reach 100% speed.",
    unlockedTitle: "LIGHTSPEED Wireless",
    unlockedContent: "A complete end-to-end wireless solution designed for high performance and reliability. Faster than many wired mice.",
    icon: "Zap",
  },
  {
    id: "weight",
    title: "Weight Challenge",
    description: "At under 60g, it's our lightest mouse yet. Test your agility.",
    instruction: "Drag the mouse to the target area.",
    unlockedTitle: "Ultra-Lightweight Design",
    unlockedContent: "Meticulously engineered to weigh less than 60 grams without compromising performance or structural integrity.",
    icon: "Feather",
  },
  {
    id: "connectivity",
    title: "Connectivity Challenge",
    description: "Dual connectivity for any setup. Test your connection.",
    instruction: "Connect the dots to power up.",
    unlockedTitle: "Dual Connectivity",
    unlockedContent: "Switch between LIGHTSPEED wireless and Bluetooth with a single button. Versatility for gaming and productivity.",
    icon: "Wifi",
  },
];

export const MOUSE_SPECS = {
  name: "Logitech PRO X2 SUPERSTRIKE",
  weight: "58g",
  sensor: "HERO 25K",
  dpi: "25,600",
  battery: "Up to 95 hours",
  pollingRate: "4,000Hz",
};
