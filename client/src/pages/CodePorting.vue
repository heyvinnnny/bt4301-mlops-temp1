<template>
  <div id="app">
    <h1>Java to Python Converter</h1>
    <textarea v-model="javaCode" placeholder="Enter Java code here"></textarea>
    <button @click="convertCode">Convert to Python</button>
    <textarea v-model="pythonCode" placeholder="Python code will appear here" readonly></textarea>
  </div>
</template>

<script>
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default {
  data() {
    return {
      javaCode: "",
      pythonCode: "",
    };
  },
  methods: {
    async convertCode() {
      try {
        const prompt = `Translate the following Java code to Python:\n\n${this.javaCode}\n\nPython code:`;
        const response = await openai.createCompletion({
          model: "davinci-codex",
          prompt,
          max_tokens: 200,
          n: 1,
          stop: null,
          temperature: 0.5,
        });

        if (response.choices && response.choices.length > 0) {
          this.pythonCode = response.choices[0].text.trim();
        } else {
          this.pythonCode = "Error: No conversion found";
        }
      } catch (error) {
        console.error(error);
        this.pythonCode = "Error: Conversion failed";
      }
    },
  },
};
</script>

<style>

textarea {
  width: 100%;
  height: 200px;
  resize: none;
  margin-bottom: 1rem;
}
</style>
