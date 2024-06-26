import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GEMINI_MODEL_NAME, BLOCK_THRESHOLD } from "./gemini.dto";

export type GeminiConfig = {
  APIkey: string;
  modelName?: (typeof GEMINI_MODEL_NAME)[keyof typeof GEMINI_MODEL_NAME];
  safetyBlockThreshold?: (typeof BLOCK_THRESHOLD)[keyof typeof BLOCK_THRESHOLD];
};

export type SafetySetting = {
  category: (typeof HarmCategory)[keyof typeof HarmCategory];
  threshold: (typeof HarmBlockThreshold)[keyof typeof HarmBlockThreshold];
};
