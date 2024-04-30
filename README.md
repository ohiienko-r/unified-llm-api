# Unifed LLM API

"One Class to rule them all"

Unified LLM API is a simple way to implement an AI to your Node JS project. 

## Usage

### Install

Install package in your project:

> npm i unified-llm-api

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

- **generateContent()**
  Retrieves a single response from the model based on the provided prompt.
      Parameters: 
    * prompt `string` — The user's input prompt for the model.
    * systemMessage (optional) `string` — Optional text instructions guiding the behavior of the language model.
  

Returns `string` the model's response to the given prompt.
    

