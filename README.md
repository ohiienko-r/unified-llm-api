# Unifed LLM API

"One Class to rule them all"

Unified LLM API is a simple way to implement a LLM to your Node JS project. 

## Usage

### Install

Install package in your project:

```bash
npm i unified-llm-api
```

### Import

```javascript
import { LLM } from "unified-llm-api";
```

### Initialize

```javascript
const model = new LLM({model: "LLM model name", APIkey: "Your API key for specified LLM"});
```

Avaliable models: 
 * Google: 
    - "gemini-1.5-pro-latest"
 * OpenAI:
    - "gpt-3.5-turbo"
    - "gpt-3.5-turbo-0125"
    - "gpt-3.5-turbo-16k"
    - "gpt-4"
    - "gpt-4-turbo"

### Make a request

Example: 
```javascript
const main = async () => {
const response = await model.generateContent({prompt: "What's the meaning of life?"})
console.log(response)
}

main()
```

#### Available methods

>  **generateContent({prompt: `string`, systemMessage?: `string`}) => `Promise<string | null>`**
>
>    Retrieves a single response from the model based on the provided prompt.
>  
>      Parameters: 
>    - `prompt` — The user's input prompt for the model.
>    - `systemMessage (optional)` — Optional text instructions guiding the behavior of the language model.
>  
>  Returns the model's response to the given prompt.

-  **chat({prompt: `string`, systemMessage?: `string`}) => `Promise<string | null>`**

  Initiates a chat conversation with the Language Model (LLM). LLM maintains the conversation context and tracks chat history.
  
      Parameters: 
    * prompt — The user's input prompt for the model.
    * systemMessage (optional) — Optional text instructions guiding the behavior of the language model.
  

  Returns the model's response to the provided chat prompt.
    

