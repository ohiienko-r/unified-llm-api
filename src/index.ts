import { ChatGPT, Gemini, GPT_MODEL_NAME, GEMINI_MODEL_NAME } from "./models";
import { ROLE, MODEL_VENDOR } from "./index.dto";
import { RequestOptions, Message } from "./models/ChatGPT/gpt.types";
import { Content, GenerationConfig } from "@google/generative-ai";
import {
  LLMConfig,
  TextGenerationProps,
  History,
  GPTModelName,
  GeminiModelName,
  Model,
  ModelVendor,
  IHistory,
} from "./types";

/**
 * Class provides simple access to basic text interactions with the following LLMs: ChatGPT, Gemini;
 *
 * IMPORTANT NOTE: Gemini API is available in the following regions:, Algeria, American Samoa, Angola, Anguilla, Antarctica, Antigua and Barbuda, Argentina, Armenia, Aruba, Australia, Azerbaijan, The Bahamas, Bahrain, Bangladesh, Barbados, Belize, Benin, Bermuda, Bhutan, Bolivia, Botswana, Brazil, British Indian Ocean Territory, British Virgin Islands, Brunei, Burkina Faso, Burundi, Cabo Verde, Cambodia, Cameroon, Canada, Caribbean Netherlands, Cayman Islands, Central African Republic, Chad, Chile, Christmas Island, Cocos (Keeling) Islands, Colombia, Comoros, Cook Islands, Côte d'Ivoire, Costa Rica, Curaçao, Democratic Republic of the Congo, Djibouti, Dominica, Dominican Republic, Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Eswatini, Ethiopia, Falkland Islands (Islas Malvinas), Fiji, Gabon, The Gambia, Georgia, Ghana, Gibraltar, Grenada, Guam, Guatemala, Guernsey, Guinea, Guinea-Bissau, Guyana, Haiti, Heard Island and McDonald Islands, Honduras, India, Indonesia, Iraq, Isle of Man, Israel, Jamaica, Japan, Jersey, Jordan, Kazakhstan, Kenya, Kiribati, Kyrgyzstan, Kuwait, Laos, Lebanon, Lesotho, Liberia, Libya, Madagascar, Malawi, Malaysia, Maldives, Mali, Marshall Islands, Mauritania, Mauritius, Mexico, Micronesia, Mongolia, Montserrat, Morocco, Mozambique, Namibia, Nauru, Nepal, New Caledonia, New Zealand, Nicaragua, Niger, Nigeria, Niue, Norfolk Island, Northern Mariana Islands, Oman, Pakistan, Palau, Palestine, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Pitcairn Islands, Puerto Rico, Qatar, Republic of the Congo, Rwanda, Saint Barthélemy, Saint Kitts and Nevis, Saint Lucia, Saint Pierre and Miquelon, Saint Vincent and the Grenadines, Saint Helena, Ascension and Tristan da Cunha, Samoa, São Tomé and Príncipe, Saudi Arabia, Senegal, Seychelles, Sierra Leone, Singapore, Solomon Islands, Somalia, South Africa, South Georgia and the South Sandwich Islands, South Korea, South Sudan, Sri Lanka, Sudan, Suriname, Taiwan, Tajikistan, Tanzania, Thailand, Timor-Leste, Togo, Tokelau, Tonga, Trinidad and Tobago, Tunisia, Türkiye, Turkmenistan, Turks and Caicos Islands, Tuvalu, Uganda, United Arab Emirates, United States, United States Minor Outlying Islands, U.S. Virgin Islands, Uruguay, Uzbekistan, Vanuatu, Venezuela, Vietnam, Wallis and Futuna, Western Sahara, Yemen, Zambia, Zimbabwe
 */

class LLM {
  private modelName;
  private APIkey;
  private model;
  private generationConfig;
  private safetyBlockThreshold;
  private chatHistory: History;
  public history: IHistory;

  constructor({
    model,
    APIkey,
    generationConfig,
    geminiSafetyBlockThreshold,
  }: LLMConfig) {
    this.modelName = model;
    this.APIkey = APIkey;
    this.model = this.getModelInstance();
    this.generationConfig = generationConfig;
    this.safetyBlockThreshold = geminiSafetyBlockThreshold;
    this.chatHistory = [];
    this.history = {
      setNewMessage: (newMessage) => {
        this.chatHistory.push(newMessage);
      },
      get: () => {
        return this.chatHistory;
      },
      clear: () => {
        this.chatHistory.length = 0;
      },
    };
  }

  /**
   * Retrieves a single response from the model based on the provided prompt.
   *
   * @param {string} prompt - The user's input prompt for the model.
   * @param {string} systemMessage - Optional text instructions guiding the behavior of the language model.
   * @returns The model's response to the given prompt.
   */
  async generateContent({
    prompt,
    systemMessage,
  }: TextGenerationProps): Promise<string | null> {
    this.history.setNewMessage({ role: ROLE.USER, content: prompt });
    const response = await this.model?.generateContent(prompt, systemMessage);
    this.history.setNewMessage({
      role: ROLE.SYSTEM,
      content: response as string,
    });
    return response;
  }

  /**
   * Initiates a chat conversation with the Language Model (LLM).
   * LLM maintains the conversation context and tracks chat history.
   *
   * @param {string} prompt - The user's prompt to the model.
   * @param {string} systemMessage - Optional text instructions guiding the behavior of the language model.
   * @returns The model's response to the provided chat prompt.
   */

  async chat({ prompt, systemMessage }: TextGenerationProps) {
    this.history.setNewMessage({ role: ROLE.USER, content: prompt });
    const chatHistory = this.mapHistory(this.chatHistory);
    let response;
    if (this.model instanceof ChatGPT) {
      response = await this.model.chat(chatHistory as Message[], systemMessage);
    } else if (this.model instanceof Gemini) {
      response = await this.model.chat(
        chatHistory as Content[],
        prompt,
        systemMessage
      );
    } else {
      throw new Error("AN ERROR HAS OCCURED WHILE FETCHING THE RESPONSE");
    }
    this.history.setNewMessage({ role: ROLE.SYSTEM, content: response });
    return response;
  }

  private getModelInstance(): Model {
    switch (this.defineModelVendor()) {
      case MODEL_VENDOR.OPENAI:
        return new ChatGPT({
          APIkey: this.APIkey,
          modelName: this.modelName as GPTModelName,
          options: this.generationConfig as RequestOptions,
        });
      case MODEL_VENDOR.GOOGLE:
        return new Gemini({
          APIkey: this.APIkey,
          modelName: this.modelName as GeminiModelName,
          safetyBlockThreshold: this.safetyBlockThreshold,
          generationConfig: this.generationConfig as GenerationConfig,
        });
      default:
        throw new Error("AN ERROR HAS OCCURED: Unsupported model type.");
    }
  }

  private mapHistory(history: History): Message[] | Content[] {
    if (this.model instanceof ChatGPT) {
      return history as Message[];
    } else if (this.model instanceof Gemini) {
      return history.map((message) => {
        let role;
        if (message.role === ROLE.SYSTEM || message.role === ROLE.ASSISTANT) {
          role = ROLE.MODEL;
        } else {
          role = message.role;
        }
        return {
          role: role,
          parts: [{ text: message.content }],
        };
      }) as Content[];
    } else {
      throw new Error("AN ERROR OCCURED WHILE CONVERTING CHAT HISTORY!");
    }
  }

  private defineModelVendor = (): ModelVendor => {
    if (
      Object.values(GPT_MODEL_NAME).includes(this.modelName as GPTModelName)
    ) {
      return MODEL_VENDOR.OPENAI;
    } else if (
      Object.values(GEMINI_MODEL_NAME).includes(
        this.modelName as GeminiModelName
      )
    ) {
      return MODEL_VENDOR.GOOGLE;
    } else {
      throw new Error("AN ERROR HAS OCCURED: Unsupported model type.");
    }
  };
}

export { LLM };
export type { LLMConfig };
export type { TextGenerationProps };
