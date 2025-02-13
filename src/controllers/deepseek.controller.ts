import { Request, Response } from "express";
import { callDeepSeek } from "../services/deepseek.service";
import { storeChatHistory, retrieveChatHistory } from "../services/embeddings.service";

export const chatWithSunaina = async (req: Request, res: Response) => {
 try{
  const { message } = req.body;

  // Retrieve past chat context
  const pastMessages = await retrieveChatHistory(message);
  console.log(pastMessages);

  const messages = [
    // { role: "system", content: "You are Sunaina, a flirty chatbot." },
    // ...pastMessages.map((msg) => ({ role: "user", content: msg })),
    { role: "user", content: "Ola " },
  ];

  const botResponse = await callDeepSeek(messages);

  // Store new conversation
  await storeChatHistory(message, botResponse);

  res.json({ message: botResponse });
 }
 catch(err){
  console.log("Error in api call",err);
 }
};

