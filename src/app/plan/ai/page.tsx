"use client";

export const maxDuration = 60;

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import {
  Sparkles, Send, Loader2, User, CornerDownLeft,
  Car, FileText, BedDouble, Mountain, Leaf, MapPin,
  Shield, Calendar, Landmark, Users, Compass,
  Navigation, Waves, Fish, Wind, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { chatWithJourneyAI, type AICard } from "@/ai/flows/journey-ai-flow";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  cards?: AICard[];
};

// ─── Card visual config ────────────────────────────────────────────────────
type CategoryStyle = {
  gradient: string;
  badgeCls: string;
  ctaCls: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  transport: {
    gradient: "from-sky-400 via-blue-500 to-blue-600",
    badgeCls: "bg-sky-50 text-sky-700 border-sky-200",
    ctaCls: "text-sky-600",
    Icon: Car,
    label: "Transport",
  },
  permit: {
    gradient: "from-amber-400 via-orange-400 to-orange-500",
    badgeCls: "bg-amber-50 text-amber-700 border-amber-200",
    ctaCls: "text-amber-600",
    Icon: FileText,
    label: "Permit",
  },
  accommodation: {
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    badgeCls: "bg-teal-50 text-teal-700 border-teal-200",
    ctaCls: "text-teal-600",
    Icon: BedDouble,
    label: "Stay",
  },
  culture: {
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    badgeCls: "bg-violet-50 text-violet-700 border-violet-200",
    ctaCls: "text-violet-600",
    Icon: Users,
    label: "Culture",
  },
  adventure: {
    gradient: "from-orange-400 via-red-400 to-rose-500",
    badgeCls: "bg-orange-50 text-orange-700 border-orange-200",
    ctaCls: "text-orange-600",
    Icon: Mountain,
    label: "Adventure",
  },
  nature: {
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    badgeCls: "bg-green-50 text-green-700 border-green-200",
    ctaCls: "text-green-600",
    Icon: Leaf,
    label: "Nature",
  },
  itinerary: {
    gradient: "from-indigo-400 via-violet-500 to-purple-600",
    badgeCls: "bg-indigo-50 text-indigo-700 border-indigo-200",
    ctaCls: "text-indigo-600",
    Icon: MapPin,
    label: "Plan",
  },
  safety: {
    gradient: "from-rose-400 via-red-500 to-red-600",
    badgeCls: "bg-rose-50 text-rose-700 border-rose-200",
    ctaCls: "text-rose-600",
    Icon: Shield,
    label: "Safety",
  },
  events: {
    gradient: "from-pink-400 via-fuchsia-500 to-purple-500",
    badgeCls: "bg-pink-50 text-pink-700 border-pink-200",
    ctaCls: "text-pink-600",
    Icon: Calendar,
    label: "Events",
  },
  heritage: {
    gradient: "from-yellow-500 via-amber-500 to-orange-600",
    badgeCls: "bg-yellow-50 text-yellow-700 border-yellow-200",
    ctaCls: "text-yellow-700",
    Icon: Landmark,
    label: "Heritage",
  },
};

function resolveIcon(
  href: string,
  fallback: React.ComponentType<{ className?: string }>
): React.ComponentType<{ className?: string }> {
  if (href.includes("angling")) return Fish;
  if (href.includes("rafting")) return Waves;
  if (href.includes("paragliding")) return Wind;
  if (href.includes("getting-here")) return Navigation;
  if (href.includes("guides")) return Compass;
  return fallback;
}

// ─── Single Action Card ────────────────────────────────────────────────────
function ActionCard({ card, wide }: { card: AICard; wide?: boolean }) {
  const style = CATEGORY_STYLES[card.category] ?? CATEGORY_STYLES.itinerary;
  const Icon = resolveIcon(card.href, style.Icon);

  return (
    <Link href={card.href} prefetch={false} className="block group focus:outline-none">
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden border border-white/30",
          "bg-white shadow-md transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10",
          "focus-within:ring-2 focus-within:ring-primary/40",
          wide ? "flex flex-row h-[84px]" : "flex flex-col"
        )}
      >
        {/* Gradient header / sidebar */}
        <div
          className={cn(
            "bg-gradient-to-br", style.gradient,
            "flex items-center justify-center relative overflow-hidden shrink-0",
            wide ? "w-[72px] h-full" : "h-[72px] w-full"
          )}
        >
          <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-white/10 pointer-events-none" />
          <Icon className="h-7 w-7 text-white relative z-10 drop-shadow-sm" />
        </div>

        {/* Body */}
        <div className={cn("px-3 py-2.5 flex flex-col justify-between flex-1 min-w-0", wide && "py-2")}>
          <div>
            <span
              className={cn(
                "inline-flex text-[9px] font-bold tracking-widest uppercase",
                "px-1.5 py-0.5 rounded-md border mb-1",
                style.badgeCls
              )}
            >
              {card.badge ?? style.label}
            </span>
            <h4 className="text-[13px] font-bold font-headline text-gray-900 leading-snug line-clamp-2">
              {card.title}
            </h4>
          </div>

          <div className="flex items-end justify-between gap-1 mt-1">
            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
              {card.description}
            </p>
            <span
              className={cn(
                "shrink-0 flex items-center gap-0.5 text-[11px] font-semibold",
                "transition-transform duration-200 group-hover:translate-x-0.5",
                style.ctaCls
              )}
            >
              Explore <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Card Grid ─────────────────────────────────────────────────────────────
function AICardGrid({ cards }: { cards: AICard[] }) {
  if (!cards.length) return null;

  if (cards.length === 1) {
    return (
      <div className="mt-3 w-full">
        <ActionCard card={cards[0]} wide />
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      {cards.map((card, idx) => (
        <ActionCard key={idx} card={card} />
      ))}
    </div>
  );
}

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
        chatHistory: messages
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages([
        ...updated,
        { role: "assistant", content: res.reply, cards: res.cards },
      ]);
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
          <div className="flex flex-col gap-5 pb-2">
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

                {/* Message bubble + cards */}
                <div
                  className={cn(
                    "flex flex-col min-w-0",
                    msg.role === "user" ? "items-end max-w-[82%]" : "flex-1"
                  )}
                >
                  {/* Text bubble */}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "assistant"
                        ? "bg-surface-lowest border border-border/50 shadow-ambient text-foreground rounded-tl-sm self-start max-w-full"
                        : "bg-primary text-white rounded-tr-sm shadow-soft"
                    )}
                  >
                    {msg.role === "assistant"
                      ? stripMarkdown(msg.content)
                      : msg.content}
                  </div>

                  {/* Action cards — assistant only */}
                  {msg.role === "assistant" &&
                    msg.cards &&
                    msg.cards.length > 0 && (
                      <div className="w-full">
                        <AICardGrid cards={msg.cards} />
                      </div>
                    )}
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
