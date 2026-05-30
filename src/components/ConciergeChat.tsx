
import React, { useState } from "react";

const ConciergeChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Ivory & Co. How can we assist you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Please book a consultation for personalized assistance.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Please use the booking form below.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-[#C8986A] text-2xl text-white shadow-2xl transition hover:scale-105"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[70] w-[350px] rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl max-sm:w-[calc(100%-2rem)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-white">
              AI Concierge
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 h-[220px] overflow-y-auto rounded-xl bg-white/5 p-3 text-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "mb-3 rounded-xl bg-[#C8986A] p-3 text-sm text-white"
                    : "mb-3 rounded-xl bg-[#222] p-3 text-sm text-gray-200"
                }
              >
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div className="rounded-xl bg-[#222] p-3 text-sm text-gray-200">
                Thinking...
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Ask anything..."
              className="flex-1 rounded-xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none"
            />

            <button
              onClick={sendMessage}
              className="rounded-xl bg-[#C8986A] px-4 py-2 text-sm font-medium text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConciergeChat;

