// import { deepSeekConfig } from "../config/deepseek.config";

export async function callDeepSeek(messages: any[]) {
  const requestPayload = {
    model: "deepseek-r1:8b",
    messages,
    stream: false,
  };
  
    try {
      const response = await fetch("http://127.0.0.1:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY",
        },
        body: JSON.stringify(requestPayload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        // res.status(response.status).json(errorData);
        return;
      }
  
      const data:any = await response.json();
      console.log(data?.message.content);
    
    // console.log(messages);

  
   
    return data?.message?.content || "Hmm... not sure.";
    
  } catch (error) {
    console.error({ error })
  }
}
