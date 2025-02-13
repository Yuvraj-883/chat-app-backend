import { pineconeIndex } from "../config/pincone.config";

// const EXPECTED_DIMENSIONS = 1024; // Update this to match your Pinecone index's dimensions

export async function getEmbeddingFromCohere(text: string): Promise<number[] | null> {
  try {
    const response = await fetch("https://api.cohere.com/v1/embed", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: [text],
        model: "embed-multilingual-v2.0", // Updated model
        input_type: "search_document",
      }),
    });

    const rawResponse = await response.text();
    const data = JSON.parse(rawResponse);
    console.log(data);

    return data.embeddings[0] || null;
  } catch (error) {
    console.error("Error generating embedding from Cohere:", error);
    return null;
  }
}


export async function storeChatHistory(userMessage: string, botResponse: string) {
  const embedding = await getEmbeddingFromCohere(userMessage);

  if (embedding) {
    try {
      await pineconeIndex.upsert([
        {
          id: `msg-${Date.now()}`,
          values: embedding,
          metadata: { userMessage, botResponse },
        },
      ]);
    } catch (error) {
      console.error("Error upserting embedding to Pinecone:", error);
    }
  } else {
    console.error("Failed to generate embedding for chat history");
  }
}

export async function retrieveChatHistory(userMessage: string) {
  const embedding = await getEmbeddingFromCohere(userMessage);

  if (!embedding) {
    console.error("Failed to retrieve embedding for query");
    return [];
  }

  try {
    const results = await pineconeIndex.query({
      vector: embedding,
      topK: 3,
      includeMetadata: true,
    });

    return results.matches.map((match) => match.metadata?.userMessage);
  } catch (error) {
    console.error("Error querying Pinecone index:", error);
    return [];
  }
}
