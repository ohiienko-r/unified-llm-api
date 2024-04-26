import { GPT_MODEL_NAME } from "./models/ChatGPT/gpt.dto";
import { GEMINI_MODEL_NAME } from "./models/Gemini/gemini.dto";

export type ModelName =
  | (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME]
  | (typeof GEMINI_MODEL_NAME)[keyof typeof GEMINI_MODEL_NAME];

export type LLMConfig = {
  modelName: ModelName;
  APIkey: string;
};
