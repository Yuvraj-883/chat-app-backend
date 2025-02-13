import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: 'pcsk_5XTLgs_N9PX73aQo3DhQR3CRSC6Z3ZDkCminxmT4LsarftiC7cgaEDjGH5AL1XaqRDFcjf',
});

export const pineconeIndex = pinecone.Index("chatbot-memory");
