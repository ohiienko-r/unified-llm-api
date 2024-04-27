import { GPT_MODEL_NAME } from "./models/ChatGPT/gpt.dto";
import { GEMINI_MODEL_NAME } from "./models/Gemini/gemini.dto";
import { ROLE } from "./index.dto";

export type GPTModelName = (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME];
export type GeminiModelName =
  (typeof GEMINI_MODEL_NAME)[keyof typeof GEMINI_MODEL_NAME];

export type ModelNameUnion = GPTModelName | GeminiModelName;

export type LLMConfig = {
  model: ModelNameUnion;
  APIkey: string;
};

export type History = Array<{
  role: (typeof ROLE)[keyof typeof ROLE];
  content: string;
}>;
