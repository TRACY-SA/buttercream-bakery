"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { answerQuestion, suggestedQuestions } from "@/lib/chatbot";

type Message = { id: string; from: "bot" | "guest"; text: string };

const welcome =
  "Hi there! Welcome to Buttercream Bakery. How can I help make your day a little sweeter?";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: "welcome", from: "bot", text: welcome }]);
  const [suggestions, setSuggestions] = useState<string[]>(suggestedQuestions);
  const inputId = useId();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const response = answerQuestion(trimmed);
    setMessages((current) => [
      ...current,
      { id: `g-${Date.now()}`, from: "guest", text: trimmed },
      { id: `b-${Date.now()}`, from: "bot", text: response.reply },
    ]);
    setSuggestions(response.suggestions);
    setDraft("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    send(draft);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open ? (
        <section
          className="mb-3 flex h-[min(32rem,calc(100vh-6.5rem))] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-2xl"
          role="dialog"
          aria-label="Bakery assistant"
        >
          <header className="flex items-center justify-between bg-rose-deep px-4 py-3 text-white">
            <div>
              <p className="font-serif text-lg leading-none">Bakery assistant</p>
            </div>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close chat</span>
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-auto bg-cream px-3 py-4">
            {messages.map((message) => (
              <p
                key={message.id}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                  message.from === "bot" ? "bg-white text-ink" : "ml-auto bg-blush text-ink"
                }`}
              >
                {message.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex gap-2 overflow-auto border-t border-line px-3 py-2">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                className="shrink-0 rounded-full bg-cream px-3 py-1.5 text-xs hover:bg-blush"
                onClick={() => send(question)}
              >
                {question}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
            <label className="sr-only" htmlFor={inputId}>
              Message the bakery assistant
            </label>
            <input
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="h-11 flex-1 rounded-full border border-line px-4 text-sm"
              placeholder="Ask about hours, cakes, or orders"
            />
            <button type="submit" className="grid h-11 w-11 place-items-center rounded-full bg-rose-deep text-white" aria-label="Send message">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="ml-auto grid h-14 w-14 place-items-center rounded-full bg-rose-deep text-white shadow-lg"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close bakery assistant" : "Open bakery assistant"}</span>
      </button>
    </div>
  );
}
