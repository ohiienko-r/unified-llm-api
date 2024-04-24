import OpenAI from "openai";
import { ModelName, ROLE, Message } from "./gpt.dto";

class ChatGPT {
  model: OpenAI;
  modelName: (typeof ModelName)[keyof typeof ModelName];
  systemMessage: Message;
  constructor(
    APIkey: string,
    modelName: (typeof ModelName)[keyof typeof ModelName],
    systemMessage: string
  ) {
    this.model = new OpenAI({ apiKey: APIkey });
    this.modelName = modelName;
    this.systemMessage = { role: ROLE.SYSTEM, content: systemMessage };
  }
}

export default ChatGPT;
