import { ROLE, GPT_MODEL_NAME } from "./gpt.dto";

export type GPTConfig = {
  APIkey: string;
  modelName?: (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME];
  systemMessage?: string;
};

export type Message = {
  role: (typeof ROLE)[keyof typeof ROLE];
  content: string;
};

export type RequestOptions = {
  frequency_penalty?: number | null;
  max_tokens?: number | null;
  presence_penalty?: number | null;
  temperature?: number | null;
  top_p?: number | null;
};
