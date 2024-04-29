import { Content } from "@google/generative-ai";
import { Message } from "./ChatGPT/gpt.types";

export interface IModel {
  generateContent(
    prompt: string,
    systemMessage?: string
  ): Promise<string> | Promise<string | null>;
  chat(
    history: Content[] | Message[],
    prompt: string
  ): Promise<string> | Promise<string | null>;
}
