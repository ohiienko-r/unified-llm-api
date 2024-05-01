import { Content, GenerationConfig } from "@google/generative-ai";
import { Message, RequestOptions } from "./ChatGPT/gpt.types";

export interface IModel {
  generateContent(
    prompt: string,
    systemMessage?: string,
    options?: RequestOptions | GenerationConfig | undefined
  ): Promise<string> | Promise<string | null>;
  chat(
    history: Content[] | Message[],
    prompt: string,
    systemMessage?: string,
    options?: RequestOptions | GenerationConfig | undefined
  ): Promise<string> | Promise<string | null>;
}
