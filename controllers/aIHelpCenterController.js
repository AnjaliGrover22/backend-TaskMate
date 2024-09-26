const axios = require("axios");
const AIHelpCenter = require("../schemas/AIHelpCenter");

const openaiApiKey = process.env.OPENAI_API_KEY;

const aIHelpCenterController = {
  async getAIResponse(req, res) {
    const { message } = req.body;

    try {
      const response = await axios.post(
        "https://api.perplexity.ai/chat/completions",
        {
          model: "llama-3.1-sonar-large-128k-chat", // Use a valid model name
          stream: true, // Enable streaming mode
          max_tokens: 1024,
          frequency_penalty: 1,
          temperature: 0.0,
          prompt: message,
          max_tokens: 150,
        },
        {
          headers: {
            // OPENAI_API_KEY is sorted in .env
            Authorization: `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].text.trim();

      // Save the conversation to the database
      await AIHelpCenter.create({ role: "user", content: message });
      await AIHelpCenter.create({ role: "assistant", content: aiResponse });

      res.json({ response: aiResponse });
    } catch (error) {
      console.error("Error with AI request:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  },
};

module.exports = aIHelpCenterController;
