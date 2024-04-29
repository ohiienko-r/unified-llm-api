import OpenAI from "openai";
import { GPT_ROLE } from "./gpt.dto";
import { defaultSystemMesage } from "../models.dto";
import { Message, GPTConfig } from "./gpt.types";
import { IModel } from "../types";

/**
 * Facade for the interaction with ChatGPT through the OpenAI API;
 */
class ChatGPT implements IModel {
  private model: OpenAI;
  private modelName;
  private requestOptions;

  constructor({ APIkey, modelName = "gpt-3.5-turbo", options }: GPTConfig) {
    this.model = new OpenAI({ apiKey: APIkey });
    this.modelName = modelName;
    this.requestOptions = options;
  }

  /**
   *
   * @param {string} prompt - user's prompt to model;
   * @param {string} systemMessage - text instructions to LLM on how to behave;
   * @returns model response for the given chat prompt;
   */
  async generateContent(
    prompt: string,
    systemMessage?: string
  ): Promise<string | null> {
    const messages = [
      { role: GPT_ROLE.SYSTEM, content: systemMessage ?? defaultSystemMesage },
      { role: GPT_ROLE.USER, content: prompt },
    ] as Message[];

    try {
      const completions = await this.model.chat.completions.create({
        messages: messages,
        model: this.modelName,
        ...this.requestOptions,
      });

      if ("choices" in completions) {
        return completions.choices[0].message.content;
      } else {
        throw new Error("Unexpected type returned from completions");
      }
    } catch (error) {
      throw new Error("Unexpected type returned from completions");
    }
  }
  //TODO: reimplement system message
  /**
   *
   * @param {Message[]} messages - an array with conversation messages object/s;
   * @returns model response for the given chat conversation;
   */
  async chat(messages: Message[], prompt: string): Promise<string | null> {
    messages.push({ role: GPT_ROLE.USER, content: prompt });

    try {
      const completions = await this.model.chat.completions.create({
        messages: messages,
        model: this.modelName,
        ...this.requestOptions,
      });

      if ("choices" in completions) {
        return completions.choices[0].message.content;
      } else {
        throw new Error("Unexpected type returned from completions");
      }
    } catch (error) {
      throw new Error(`AN ERROR HAS OCCURED: ${error}`);
    }
  }
}

export default ChatGPT;
