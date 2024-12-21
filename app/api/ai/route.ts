import { db } from "@/lib/db";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOllama } from "@langchain/ollama";
import { NextRequest } from "next/server";

const llm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
});

const encoder = new TextEncoder();

function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export async function POST(req: NextRequest) {
  const { id, query } = await req.json();
  if (!id || !query) {
    return new Response("Missing id or query", { status: 400 });
  }
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  const message = new HumanMessage({
    content: `Intruction: Here is product context answer using it make answer as short as possible if asnwer is not in context return sorry i cant helop  Context: ${product.aiDetails} , Query: ${query}`,
  });

  async function* streamChunks() {
    const res = llm._streamResponseChunks([message], {});
    for await (const chunk of res) {
      yield encoder.encode(chunk.text);
    }
  }

  const stream = iteratorToStream(streamChunks());

  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
