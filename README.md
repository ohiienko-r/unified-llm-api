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
const model = new LLM({
  model: "LLM model name",
  APIkey: "Your API key for specified LLM",
});
```

Avaliable models:

- Google:
  - "gemini-1.5-pro-latest"
- OpenAI:
  - "gpt-3.5-turbo"
  - "gpt-3.5-turbo-0125"
  - "gpt-3.5-turbo-16k"
  - "gpt-4"
  - "gpt-4-turbo"

### Make a request

Example:

```javascript
const main = async () => {
  const response = await model.generateContent({
    prompt: "What's the meaning of life?",
  });
  console.log(response);
};

main();
```

#### Available methods

1. ```javascript
   generateContent({prompt: string, systemMessage?: string}) => Promise<string | null>
   ```

   Retrieves a single response from the model based on the provided prompt.

   Parameters:

   - prompt — The user's input prompt for the model.
   - systemMessage (optional) — Optional text instructions guiding the behavior of the language model.

   Returns the model's response to the given prompt.

2. ```javascript
   chat({prompt: string, systemMessage?: string, history?: GeneralMessage[], historyCallback: (history: GeneralMessage[]) => void}) => Promise<string | null>
   ```

   Initiates a chat conversation with the Language Model (LLM). LLM maintains the conversation context and tracks chat history.

   Parameters:

   - prompt — The user's input prompt for the model.
   - systemMessage (optional) — Optional text instructions guiding the behavior of the language model.
   - history (optional) — Optional chat history. Allows to have a full control over chat history on your own.
   - historyCallback(optional) — Optional callback function for interaction with internal chat history after model's reponse.

   Returns the model's response to the provided chat prompt.

### Chat history

To simplify the chat interactions with LLM Unified API handles chat history for you so you don't have to deal with it.
However, there are also a few methods to interact with chat history because at least you have to cear it on your own :)

#### Available methods

1. ```javascript
   get();
   ```

   Retrieves a chat history as an array of messages:

   ```javascript
   const chatHistory = model.history.get();
   ```

   Return type:

   ```javascript
    Array<{role: string, content: string}>
   ```

   which itself is a

   ```javascript
   GeneralMessage[]
   ```

2. ```javascript
   clear();
   ```

   Clears a chat history array:

   ```javascript
   model.history.clear();
   ```

#### Nota bene

Internal chat history is not protected from server crashes or reboots. Thus, if you want to keep it safe please consider to pass your own chat history array as a prop to `chat()` method as long as it has it as an optional prop **OR** you also have an option to pass a callback function as a prop to `chat()` to carry out manipulations with internal chat history after model's response, for example to cache chat history or save it on your side.

Enjoy!
