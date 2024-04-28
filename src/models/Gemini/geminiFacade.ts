import {
  GoogleGenerativeAI,
  GenerativeModel,
  Content,
} from "@google/generative-ai";
import { getSafetySettings } from "./gemini.helpers";
import { IModel } from "../types";
import { GeminiConfig } from "./gemini.types";

/**
 * Facade for the interaction with Gemini through the Google Generative AI API;
 */
class Gemini implements IModel {
  private model: GenerativeModel;

  constructor({
    APIkey,
    modelName = "gemini-1.0-pro",
    safetyBlockThreshold = "medium",
    generationConfig,
  }: GeminiConfig) {
    const genAI = new GoogleGenerativeAI(APIkey);
    this.model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: generationConfig,
      safetySettings: getSafetySettings(safetyBlockThreshold),
    });
  }
  //TODO: reimplement system message
  /**
   *
   * @param {string} prompt - user's prompt to model;
   * @returns text string assembled from all Parts of the first candidate of the response, if available. Throws Error if the prompt or candidate was blocked;
   */
  async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      throw new Error(`AN ERROR HAS OCCURED: ${error}`);
    }
  }
  //TODO: reimplement system message
  /**
   *
   * @param {Content[]} history - chat history array;
   * @param {string} prompt - user's prompt to model;
   * @returns text string assembled from all Parts of the first candidate of the response, if available. Throws Error if the prompt or candidate was blocked;
   */
  async chat(history: Content[], prompt: string): Promise<string> {
    try {
      const chat = this.model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      throw new Error(`AN ERROR HAS OCCURED: ${error}`);
    }
  }
}

export default Gemini;
