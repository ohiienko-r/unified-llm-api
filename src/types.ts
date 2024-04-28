import { ChatGPT, Gemini } from "./models";
import { GPT_MODEL_NAME } from "./models/ChatGPT/gpt.dto";
import { GEMINI_MODEL_NAME } from "./models/Gemini/gemini.dto";
import { ROLE, MODEL_VENDOR } from "./index.dto";

export type GPTModelName = (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME];

export type GeminiModelName =
  (typeof GEMINI_MODEL_NAME)[keyof typeof GEMINI_MODEL_NAME];

export type ModelNameUnion = GPTModelName | GeminiModelName;

export type Model = ChatGPT | Gemini;

export type ModelVendor = (typeof MODEL_VENDOR)[keyof typeof MODEL_VENDOR];

export type LLMConfig = {
  model: ModelNameUnion;
  APIkey: string;
};

export type Message = {
  role: (typeof ROLE)[keyof typeof ROLE];
  content: string;
};

export type History = Message[];

export interface IHistory {
  setSystemMessage: (systemMessage: string) => void;
  setNewMessage: (newMessage: string) => void;
  get: () => History;
  clear: () => void;
}
