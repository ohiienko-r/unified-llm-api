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
   * @param {Message[]} messages - an array with conversation messages object/s;
   * @param {RequestOptions}options - optional model request options;
   * @returns - model response for the given chat conversation;
   */
  async completions(messages: Message[], options?: RequestOptions) {
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
      throw new Error(`THE FOLLOWING ERROR OCCURED: ${error}`);
    }
  }
}

export default ChatGPT;
