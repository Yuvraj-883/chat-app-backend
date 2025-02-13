export const deepSeekConfig = {
    model: "deepseek-r1:8b",
    apiKey: process.env.DEEPSEEK_API_KEY || "sk-no-key-needed",
    basePath: process.env.DEEPSEEK_API_URL || "http://127.0.0.1:11434/api/chat",
  };
  