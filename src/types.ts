export type ChallengeType = "precision" | "speed" | "weight" | "connectivity";

export interface ChallengeData {
  id: ChallengeType;
  title: string;
  description: string;
  instruction: string;
  unlockedTitle: string;
  unlockedContent: string;
  icon: string;
}

export interface UnlockedSection {
  id: ChallengeType;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
}
