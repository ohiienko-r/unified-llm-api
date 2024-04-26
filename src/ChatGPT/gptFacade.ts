import OpenAI from "openai";
import { MODEL_NAME, ROLE } from "./gpt.dto";
import { Message, RequestOptions, GPTConfig } from "./gpt.types";

/**
 * Facade for the interaction with ChatGPT through the OpenAI API;
 */
class ChatGPT {
  private model: OpenAI;
  private modelName: (typeof MODEL_NAME)[keyof typeof MODEL_NAME];
  private systemMessage?: Message;

  constructor({
    APIkey,
    modelName = "gpt-3.5-turbo",
    systemMessage,
  }: GPTConfig) {
    this.model = new OpenAI({ apiKey: APIkey });
    this.modelName = modelName;
    this.systemMessage = { role: ROLE.SYSTEM, content: systemMessage ?? "" };
  }

  /**
   *
   * @param {string} prompt - user's prompt to model;
   * @param {RequestOptions} options - request options with model settings
   * @returns model response for the given chat prompt;
   */
  async generateContent(
    prompt: string,
    options?: RequestOptions
  ): Promise<string | null> {
    const messages = [{ role: ROLE.USER, content: prompt }] as Message[];
    try {
      const response = await this.chat(messages, options);
      return response;
    } catch (error) {
      throw new Error("Unexpected type returned from completions");
    }
  }

  /**
   *
   * @param {Message[]} messages - an array with conversation messages object/s;
   * @param {RequestOptions}options - optional model request options;
   * @returns model response for the given chat conversation;
   */
  async chat(
    messages: Message[],
    options?: RequestOptions
  ): Promise<string | null> {
    this.systemMessage?.content && messages.unshift(this.systemMessage);
    try {
      const completions = await this.model.chat.completions.create({
        messages: messages,
        model: this.modelName,
        ...options,
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
