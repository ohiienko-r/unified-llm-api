import {
  GoogleGenerativeAI,
  GenerativeModel,
  Content,
  GenerationConfig,
} from "@google/generative-ai";
import { GEMINI_ROLE } from "./gemini.dto";
import { defaultSystemMesage } from "../models.dto";
import { getSafetySettings } from "./gemini.helpers";
import { GeminiConfig } from "./gemini.types";
import { IModel } from "../types";

/**
 * Facade for the interaction with Gemini through the Google Generative AI API;
 */
class Gemini implements IModel {
  private model: GenerativeModel;

  constructor({
    APIkey,
    modelName = "gemini-1.5-pro-latest",
    safetyBlockThreshold = "none",
  }: GeminiConfig) {
    const genAI = new GoogleGenerativeAI(APIkey);
    this.model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings: getSafetySettings(safetyBlockThreshold),
    });
  }

  /**
   *
   * @param {string} prompt - user's prompt to model;
   * @param {string} systemMessage - text instructions to LLM on how to behave;
   * @param {GenerationConfig} generationConfig - text generation options object for model instance;
   * @returns text string assembled from all Parts of the first candidate of the response, if available. Throws Error if the prompt or candidate was blocked;
   */
  async generateContent(
    prompt: string,
    systemMessage?: string,
    generationConfig?: GenerationConfig
  ): Promise<string> {
    try {
      const messages = [
        {
          role: GEMINI_ROLE.USER,
          parts: [{ text: systemMessage ?? defaultSystemMesage }],
        },
        {
          role: GEMINI_ROLE.USER,
          parts: [{ text: prompt }],
        },
      ] as Content[];

      const result = await this.model.generateContent({
        contents: messages,
        generationConfig: generationConfig,
      });
      const response = result.response;
      return response.text();
    } catch (error) {
      throw new Error(`AN ERROR HAS OCCURED: ${error}`);
    }
  }

  /**
   *
   * @param {Content[]} history - chat history array;
   * @param {string} prompt - user's prompt to model;
   * @param {string} systemMessage - text instructions to LLM on how to behave;
   * @param {GenerationConfig} generationConfig - text generation options object for model instance;
   * @returns text string assembled from all Parts of the first candidate of the response, if available. Throws Error if the prompt or candidate was blocked;
   */
  async chat(
    history: Content[],
    prompt: string,
    systemMessage?: string,
    generationConfig?: GenerationConfig
  ): Promise<string> {
    const systemInstructions = {
      role: GEMINI_ROLE.USER,
      parts: [{ text: systemMessage ?? defaultSystemMesage }],
    };
    try {
      const chat = this.model.startChat({
        history: history,
        systemInstruction: systemInstructions,
        generationConfig: generationConfig,
      });
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      throw new Error(`AN ERROR HAS OCCURED: ${error}`);
    }
  }
}

export default Gemini;
