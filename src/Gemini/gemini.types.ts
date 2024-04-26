import {
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
} from "@google/generative-ai";
import { MODEL_NAME, BLOCK_THRESHOLD } from "./gemini.dto";

export type GeminiConfig = {
  APIkey: string;
  modelName: (typeof MODEL_NAME)[keyof typeof MODEL_NAME];
  safetyBlockThreshold: (typeof BLOCK_THRESHOLD)[keyof typeof BLOCK_THRESHOLD];
  generationConfig?: GenerationConfig;
};

export type SafetySetting = {
  category: (typeof HarmCategory)[keyof typeof HarmCategory];
  threshold: (typeof HarmBlockThreshold)[keyof typeof HarmBlockThreshold];
};
