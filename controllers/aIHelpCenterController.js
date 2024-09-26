const AIHelpCenter = require("../schemas/AIHelpCenter");
const fetch = require("node-fetch");

exports.createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const aiHelpCenter = new AIHelpCenter({
      messages: [
        { role: "system", content: "I am fine" },
        { role: "user", content: message },
        { role: "assistant", content: " assistant response" },
      ],
    });
    await aiHelpCenter.save();

    const response = await fetchChatCompletion(aiHelpCenter.messages);
    aiHelpCenter.messages.push({ role: "assistant", content: response });
    await aiHelpCenter.save();

    res.status(201).json(aiHelpCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const aiHelpCenter = await AIHelpCenter.findById(req.params.id);
    if (!aiHelpCenter) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.json(aiHelpCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function fetchChatCompletion(messages) {
  const url = "https://api.perplexity.ai/chat/completions";
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-large-128k-chat",
      messages: messages,
      max_tokens: 1024,
      temperature: 0.0,
      stream: true,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
