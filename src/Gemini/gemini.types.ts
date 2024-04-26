import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export type SafetySetting = {
  category: (typeof HarmCategory)[keyof typeof HarmCategory];
  threshold: (typeof HarmBlockThreshold)[keyof typeof HarmBlockThreshold];
};
