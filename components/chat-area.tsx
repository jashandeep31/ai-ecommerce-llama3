"use client";
import { ArrowUp, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Block {
  query: string;
  response: string;
}

const ChatArea = ({ id }: { id: string }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [isResponding, setIsResponding] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleQuery = async () => {
    setIsResponding(true);
    const res = await fetch(`/api/ai/`, {
      method: "POST",
      body: JSON.stringify({ query: currentMessage, id: id }),
    });

    if (!res.body) {
      console.error("No response body");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let response = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (done) {
        setBlocks((prev) => [
          ...prev,
          {
            query: currentMessage,
            response: response,
          },
        ]);
        setCurrentMessage("");
        setIsResponding(false);
        setCurrentResponse(null);
      }
      const chunkValue = decoder.decode(value, { stream: true });
      response += chunkValue;
      setCurrentResponse((prev) => (prev ? prev + chunkValue : chunkValue));
    }
  };

  useEffect(() => {
    const chatArea = document.getElementById("chat-area");
    if (!chatArea) return;

    const handleResize = () => {
      chatArea.scrollTop = chatArea.scrollHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chatArea);

    return () => {
      resizeObserver.unobserve(chatArea);
    };
  }, [blocks, isResponding, currentResponse]);

  return (
    <div className=" flex flex-col justify-between border p-2 rounded-md bg-slate-50">
      <div className=" flex flex-col">
        <p className="animate-pulse">
          <Sparkles size={16} />{" "}
        </p>
        <div className="h-[550px] overflow-y-scroll " id="chat-area">
          <div className="grid items-end space-y-4">
            {blocks.map((block, index) => (
              <div key={index}>
                <div className="flex justify-end pl-6">
                  <p className="bg-blue-100 rounded p-2 ">{block.query}</p>
                </div>
                <div className="flex justify-start pr-6">
                  <p className="bg-gray-100 rounded p-2 ">{block.response}</p>
                </div>
              </div>
            ))}
            {isResponding && (
              <div>
                <div className="flex justify-end pl-6">
                  <p className="bg-blue-100 rounded p-2 ">{currentMessage}</p>
                </div>
                <div className="flex justify-start pr-6">
                  <p className="bg-gray-100 rounded p-2 ">{currentResponse}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery();
          }}
          className="border rounded-md p-2  flex bg-white"
        >
          <input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="w-full outline-none border-none resize-none  "
            placeholder="What is size of your camera?"
          />
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isResponding}
              className="bg-black text-white p-2 rounded-md"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
