import OpenAI from "openai";
import { GPT_MODEL_NAME, ROLE } from "./gpt.dto";
import { Message, RequestOptions, GPTConfig } from "./gpt.types";

/**
 * Facade for the interaction with ChatGPT through the OpenAI API;
 */
class ChatGPT {
  private model: OpenAI;
  private modelName: (typeof GPT_MODEL_NAME)[keyof typeof GPT_MODEL_NAME];
  private requestOptions: RequestOptions | undefined;

  constructor({ APIkey, modelName = "gpt-3.5-turbo", options }: GPTConfig) {
    this.model = new OpenAI({ apiKey: APIkey });
    this.modelName = modelName;
    this.requestOptions = options;
  }
  //TODO: reimplement system message
  /**
   *
   * @param {string} prompt - user's prompt to model;
   * @param {RequestOptions} options - request options with model settings
   * @returns model response for the given chat prompt;
   */
  async generateContent(prompt: string): Promise<string | null> {
    const messages = [{ role: ROLE.USER, content: prompt }] as Message[];
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
   * @param {RequestOptions}options - optional model request options;
   * @returns model response for the given chat conversation;
   */
  async chat(
    messages: Message[],
    prompt: string,
    options?: RequestOptions
  ): Promise<string | null> {
    messages.push({ role: ROLE.USER, content: prompt });

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
