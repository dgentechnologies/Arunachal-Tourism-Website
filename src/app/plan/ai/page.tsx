"use client";

export const maxDuration = 60;

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Sparkles, Send, Loader2, User, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { chatWithJourneyAI } from "@/ai/flows/journey-ai-flow";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Strip markdown for plain-text chat display */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "");
}

export default function JourneyAIPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.journeyAiWelcomeMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestedQuestions = [
    t.journeyAiSuggestedQ1,
    t.journeyAiSuggestedQ2,
    t.journeyAiSuggestedQ3,
    t.journeyAiSuggestedQ4,
  ];

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await chatWithJourneyAI({
        userMessage: trimmed,
        chatHistory: messages.slice(-10),
      });
      setMessages([...updated, { role: "assistant", content: res.reply }]);
    } catch (error: unknown) {
      const isQuota =
        (error as { status?: number })?.status === 429 ||
        ((error as { message?: string })?.message ?? "").includes("quota");
      toast({
        variant: "destructive",
        title: isQuota ? "API Quota Exceeded" : "Chat Error",
        description: isQuota
          ? "You've reached the API quota limit. Please wait a moment and try again."
          : t.journeyAiErrorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-violet-500/30 shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-headline leading-tight">
              {t.journeyAiPageTitle}
            </h1>
            <p className="text-xs text-muted-foreground leading-tight">
              {t.journeyAiPageSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 pt-6 pb-4 flex flex-col gap-4">
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 pb-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3 items-start",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5",
                    msg.role === "assistant"
                      ? "bg-gradient-to-br from-violet-600 to-indigo-500 shadow shadow-violet-500/30"
                      : "bg-primary/10 border border-border"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === "assistant"
                      ? "bg-surface-lowest border border-border/50 shadow-ambient text-foreground rounded-tl-sm"
                      : "bg-primary text-white rounded-tr-sm shadow-soft"
                  )}
                >
                  {msg.role === "assistant" ? stripMarkdown(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3 items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 shadow shadow-violet-500/30 shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="bg-surface-lowest border border-border/50 shadow-ambient rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {t.journeyAiThinkingLabel}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Suggested questions — shown only when just the welcome message exists */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 items-end organic-card ghost-border bg-background p-2 shadow-soft">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.journeyAiInputPlaceholder}
            rows={1}
            disabled={loading}
            className="flex-1 resize-none border-none shadow-none focus-visible:ring-0 bg-transparent text-sm min-h-[2.5rem] max-h-36 py-2 px-2"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            size="icon"
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 shadow-lg shadow-violet-500/30 shrink-0 disabled:opacity-40"
            aria-label={t.journeyAiSendLabel}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          <CornerDownLeft className="h-3 w-3" />
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
