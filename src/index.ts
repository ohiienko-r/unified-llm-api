import { ChatGPT, Gemini, GPT_MODEL_NAME, GEMINI_MODEL_NAME } from "./models";
import { ROLE } from "./index.dto";
import {
  LLMConfig,
  History,
  ModelNameUnion,
  GPTModelName,
  GeminiModelName,
} from "./types";

/**
 * Class provides simple access to basic text interactions with the following LLMs: ChatGPT, Gemini;
 *
 * IMPORTANT NOTE: Gemini API is available in the following regions:
 * - Algeria
 * - American Samoa
 * - Angola
 * - Anguilla
 * - Antarctica
 * - Antigua and Barbuda
 * - Argentina
 * - Armenia
 * - Aruba
 * - Australia
 * - Azerbaijan
 * - The Bahamas
 * - Bahrain
 * - Bangladesh
 * - Barbados
 * - Belize
 * - Benin
 * - Bermuda
 * - Bhutan
 * - Bolivia
 * - Botswana
 * - Brazil
 * - British Indian Ocean Territory
 * - British Virgin Islands
 * - Brunei
 * - Burkina Faso
 * - Burundi
 * - Cabo Verde
 * - Cambodia
 * - Cameroon
 * - Canada
 * - Caribbean Netherlands
 * - Cayman Islands
 * - Central African Republic
 * - Chad
 * - Chile
 * - Christmas Island
 * - Cocos (Keeling) Islands
 * - Colombia
 * - Comoros
 * - Cook Islands
 * - Côte d'Ivoire
 * - Costa Rica
 * - Curaçao
 * - Democratic Republic of the Congo
 * - Djibouti
 * - Dominica
 * - Dominican Republic
 * - Ecuador
 * - Egypt
 * - El Salvador
 * - Equatorial Guinea
 * - Eritrea
 * - Eswatini
 * - Ethiopia
 * - Falkland Islands (Islas Malvinas)
 * - Fiji
 * - Gabon
 * - The Gambia
 * - Georgia
 * - Ghana
 * - Gibraltar
 * - Grenada
 * - Guam
 * - Guatemala
 * - Guernsey
 * - Guinea
 * - Guinea-Bissau
 * - Guyana
 * - Haiti
 * - Heard Island and McDonald Islands
 * - Honduras
 * - India
 * - Indonesia
 * - Iraq
 * - Isle of Man
 * - Israel
 * - Jamaica
 * - Japan
 * - Jersey
 * - Jordan
 * - Kazakhstan
 * - Kenya
 * - Kiribati
 * - Kyrgyzstan
 * - Kuwait
 * - Laos
 * - Lebanon
 * - Lesotho
 * - Liberia
 * - Libya
 * - Madagascar
 * - Malawi
 * - Malaysia
 * - Maldives
 * - Mali
 * - Marshall Islands
 * - Mauritania
 * - Mauritius
 * - Mexico
 * - Micronesia
 * - Mongolia
 * - Montserrat
 * - Morocco
 * - Mozambique
 * - Namibia
 * - Nauru
 * - Nepal
 * - New Caledonia
 * - New Zealand
 * - Nicaragua
 * - Niger
 * - Nigeria
 * - Niue
 * - Norfolk Island
 * - Northern Mariana Islands
 * - Oman
 * - Pakistan
 * - Palau
 * - Palestine
 * - Panama
 * - Papua New Guinea
 * - Paraguay
 * - Peru
 * - Philippines
 * - Pitcairn Islands
 * - Puerto Rico
 * - Qatar
 * - Republic of the Congo
 * - Rwanda
 * - Saint Barthélemy
 * - Saint Kitts and Nevis
 * - Saint Lucia
 * - Saint Pierre and Miquelon
 * - Saint Vincent and the Grenadines
 * - Saint Helena, Ascension and Tristan da Cunha
 * - Samoa
 * - São Tomé and Príncipe
 * - Saudi Arabia
 * - Senegal
 * - Seychelles
 * - Sierra Leone
 * - Singapore
 * - Solomon Islands
 * - Somalia
 * - South Africa
 * - South Georgia and the South Sandwich Islands
 * - South Korea
 * - South Sudan
 * - Sri Lanka
 * - Sudan
 * - Suriname
 * - Taiwan
 * - Tajikistan
 * - Tanzania
 * - Thailand
 * - Timor-Leste
 * - Togo
 * - Tokelau
 * - Tonga
 * - Trinidad and Tobago
 * - Tunisia
 * - Türkiye
 * - Turkmenistan
 * - Turks and Caicos Islands
 * - Tuvalu
 * - Uganda
 * - United Arab Emirates
 * - United States
 * - United States Minor Outlying Islands
 * - U.S. Virgin Islands
 * - Uruguay
 * - Uzbekistan
 * - Vanuatu
 * - Venezuela
 * - Vietnam
 * - Wallis and Futuna
 * - Western Sahara
 * - Yemen
 * - Zambia
 * - Zimbabwe
 */

class LLM {
  private modelName: ModelNameUnion;
  private APIkey: string;

  constructor({ model, APIkey }: LLMConfig) {
    this.modelName = model;
    this.APIkey = APIkey;
  }

  async generateContent(prompt: string) {
    const model = this.getModelInstance();
    const response = await model?.generateContent(prompt);
    return response;
  }

  async chat(history: History) {
    const chatHistory = this.mapHistory(history);
    console.log(chatHistory);
  }

  private getModelInstance(systemMessage?: string) {
    if (
      Object.values(GPT_MODEL_NAME).includes(this.modelName as GPTModelName)
    ) {
      return new ChatGPT({
        APIkey: this.APIkey,
        modelName: this.modelName as GPTModelName,
        systemMessage: systemMessage,
      });
    } else if (
      Object.values(GEMINI_MODEL_NAME).includes(
        this.modelName as GeminiModelName
      )
    ) {
      return new Gemini({
        APIkey: this.APIkey,
        modelName: this.modelName as GeminiModelName,
      });
    } else {
      throw new Error(
        "AN ERROR HAS OCCURED: no such model available, please check if you stated the correct name of the model."
      );
    }
  }

  private mapHistory(history: History) {
    if (
      Object.values(GPT_MODEL_NAME).includes(this.modelName as GPTModelName)
    ) {
      return history;
    } else if (
      Object.values(GEMINI_MODEL_NAME).includes(
        this.modelName as GeminiModelName
      )
    ) {
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
      });
    }
  }
}

export default LLM;
