import { ChatGPT, Gemini } from "./models";
import { GPT_MODEL_NAME } from "./models/ChatGPT/gpt.dto";
import { GEMINI_MODEL_NAME, BLOCK_THRESHOLD } from "./models/Gemini/gemini.dto";
import { ROLE, MODEL_VENDOR } from "./index.dto";
import { GenerationConfig } from "@google/generative-ai";
import { RequestOptions } from "./models/ChatGPT/gpt.types";

export type GPTModelName = (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME];

export type GeminiModelName =
  (typeof GEMINI_MODEL_NAME)[keyof typeof GEMINI_MODEL_NAME];

export type ModelNameUnion = GPTModelName | GeminiModelName;

export type Model = ChatGPT | Gemini;

export type ModelVendor = (typeof MODEL_VENDOR)[keyof typeof MODEL_VENDOR];

export type GenerationConfigUnion =
  | RequestOptions
  | GenerationConfig
  | undefined;

export type LLMConfig = {
  model: ModelNameUnion;
  APIkey: string;
  geminiSafetyBlockThreshold?: (typeof BLOCK_THRESHOLD)[keyof typeof BLOCK_THRESHOLD];
};

export interface TextGenerationProps {
  prompt: string;
  systemMessage?: string;
  generationConfig?: GenerationConfigUnion;
}

export interface ChatProps extends TextGenerationProps {
  history?: History;
  onHistoryChange?: HistoryActionCallback;
}

export type GeneralMessage = {
  role: (typeof ROLE)[keyof typeof ROLE];
  content: string | null;
};

export type History = GeneralMessage[];

export interface IHistory {
  get: () => History;
  clear: () => void;
}

export type HistoryActionCallback = (history: History) => void;
