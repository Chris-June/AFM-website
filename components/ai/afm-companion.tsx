"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AFMCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-2xl z-50 p-0"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 w-80 md:w-96 h-[500px] glass rounded-[32px] shadow-2xl z-50 flex flex-col overflow-hidden border-primary/20"
          >
            <header className="p-6 flex items-center justify-between bg-primary/5 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AFM Companion</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Empathetic AI</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Hello, I&apos;m your AFM Companion. How can I support your creative journey today?</p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[80%] rounded-2xl p-3 text-sm",
                    m.role === "user" 
                      ? "ml-auto bg-primary text-primary-foreground" 
                      : "mr-auto bg-muted/50 border border-border/50"
                  )}
                >
                  {m.parts?.map((part, i) => (
                    <span key={i}>
                      {part.type === "text" ? part.text : ""}
                    </span>
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto bg-muted/50 border border-border/50 rounded-2xl p-3 text-xs animate-pulse">
                  Companion is typing...
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-background/50 backdrop-blur-md border-t border-primary/10 flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="rounded-full h-10 border-none bg-primary/5 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0 h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
