# Unifed LLM API

"One Class to rule them all"

Unified LLM API is a simple way to implement an AI to your Node JS project. 

## Usage

### Install

Install package in your project:

> npm i unified-llm-api

### Import

> import { LLM } from "unified-llm-api";

### Initialize

> const model = new LLM({model: "LLM model name", APIkey: "Your API key for specified LLM"});

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
`const main = async () => {
 const response = await model.generateContent({prompt: "What's the meaning of life?"})
 console.log(response)<br>
 }

main()`

**Enjoy!**
