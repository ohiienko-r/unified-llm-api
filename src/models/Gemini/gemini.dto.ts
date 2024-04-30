export const BLOCK_THRESHOLD = {
  UNSPECIFIED: "unspecified",
  LOW_AND_ABOVE: "low",
  MEDIUM_AND_ABOVE: "medium",
  ONLY_HIGH: "high",
  NONE: "none",
} as const;

export const GEMINI_MODEL_NAME = {
  GEMINI_15_PRO_LATEST: "gemini-1.5-pro-latest",
} as const;

export const GEMINI_ROLE = {
  USER: "user",
  MODEL: "model",
} as const;
