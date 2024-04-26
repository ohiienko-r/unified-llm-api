import OpenAI from "openai";
import { ModelName, ROLE } from "./gpt.dto";
import { Message, RequestOptions } from "./gpt.types";

/**
 * Facade for the interaction with ChatGPT through the OpenAI API;
 */
class ChatGPT {
  private model: OpenAI;
  private modelName: (typeof ModelName)[keyof typeof ModelName];
  private systemMessage?: Message;

  constructor(
    APIkey: string,
    modelName: (typeof ModelName)[keyof typeof ModelName],
    systemMessage?: string
  ) {
    this.model = new OpenAI({ apiKey: APIkey });
    this.modelName = modelName;
    this.systemMessage = { role: ROLE.SYSTEM, content: systemMessage ?? "" };
  }

  /**
   *
   * @param {Message[]} messages - an array with conversation messages object/s;
   * @param {RequestOptions}options - optional model request options;
   * @returns
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
