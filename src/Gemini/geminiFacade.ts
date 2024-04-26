import { GoogleGenerativeAI } from "@google/generative-ai";

class Gemini {
  model: GoogleGenerativeAI;
  constructor(APIkey: string) {
    this.model = new GoogleGenerativeAI(APIkey);
  }
}

export default Gemini;
