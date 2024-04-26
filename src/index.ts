import { ChatGPT, Gemini } from "./models";
import { MODEL_NAME } from "./index.dto";
import { LLMConfig, ModelName } from "./types";

class LLM {
  private modelName: ModelName;
  private APIkey: string;

  constructor({ modelName, APIkey }: LLMConfig) {
    this.modelName = modelName;
    this.APIkey = APIkey;
  }

  async generateContent(prompt: string) {
    const model = this.getModelInstance();
    const response = await model?.generateContent(prompt);
    return response;
  }

  async chat() {}

  private getModelInstance() {
    if (this.modelName.includes(MODEL_NAME.CHAT_GPT)) {
      return new ChatGPT({ APIkey: this.APIkey });
    } else if (this.modelName.includes(MODEL_NAME.GEMINI)) {
      return new Gemini({ APIkey: this.APIkey });
    }
  }
}

export default LLM;
