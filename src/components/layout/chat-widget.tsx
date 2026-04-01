"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessagesSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { renderChatMarkdown } from "@/lib/chat-markdown";
import { cn } from "@/lib/utils";
import { useChatbot } from "@/hooks/useChatbot";

const SUGGESTIONS = [
    "What is Orkait building right now?",
    "Tell me about Rustbox",
    "What is graphstore?",
];

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        error,
        input,
        isLoading,
        messages,
        scrollRef,
        sendMessage,
        setInput,
    } = useChatbot();

    return (
        <div className="hidden tablet:flex fixed bottom-8 right-8 z-50 flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto shadow-2xl"
                    >
                        <Card className="w-[427px] h-[615px] min-h-0 overflow-hidden flex flex-col border-none rounded-lg bg-white">
                            {/* Header */}
                            <div className="bg-black p-6 flex items-center justify-between text-white rounded-t-lg">
                                <div className="flex flex-col">
                                    <span className="font-bold text-body-lg leading-tight tracking-wider">ORKAIT</span>
                                    <span className="text-[10px] opacity-80">AI Bot</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-transparent hover:bg-white/25 text-white border-none rounded-full h-9 w-9 transition-all duration-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="size-5" strokeWidth={2} />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="min-h-0 flex-1 p-6" ref={scrollRef}>
                                <div className="flex flex-col gap-4 pr-2">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10, y: 5 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            className={cn(
                                                "max-w-[80%] p-4 text-[13px] font-medium leading-[1.4]",
                                                msg.sender === "bot"
                                                    ? "bg-[#E5E7EB] text-[#444] self-start rounded-tl-lg rounded-tr-lg rounded-br-lg"
                                                    : "bg-black text-[#CCC] self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                                            )}
                                        >
                                            {msg.sender === "bot" ? (
                                                <div
                                                    className="chat-markdown flex flex-col gap-2 [&_p]:m-0 [&_strong]:font-semibold [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:m-0"
                                                    dangerouslySetInnerHTML={{ __html: renderChatMarkdown(msg.text) }}
                                                />
                                            ) : (
                                                msg.text
                                            )}
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <div className="bg-[#E5E7EB] text-[#444] self-start p-4 rounded-tl-lg rounded-tr-lg rounded-br-lg flex gap-1">
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" />
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-75" />
                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-150" />
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Suggestions & input */}
                            <div className="shrink-0 p-4 bg-white border-t border-black/10 flex flex-col gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                                    {SUGGESTIONS.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => sendMessage(tag)}
                                            className="whitespace-nowrap"
                                            disabled={isLoading}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-black hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-[#F3F5F6] text-[#8E8E93] border-none font-medium text-[8px]"
                                            >
                                                {tag}
                                            </Badge>
                                        </button>
                                    ))}
                                </div>
                                {error ? (
                                    <p className="text-[11px] leading-[16px] text-destructive">{error}</p>
                                ) : null}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 relative">
                                        <Input
                                            placeholder="Type your message here..."
                                            className="bg-[#F3F5F6] border-none rounded-md h-[40px] text-[14px] px-4 placeholder:text-[#AEAEB2]"
                                            value={input}
                                            onChange={(event) => setInput(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" && !event.shiftKey) {
                                                    event.preventDefault();
                                                    void sendMessage(input);
                                                }
                                            }}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => void sendMessage(input)}
                                        disabled={isLoading || !input.trim()}
                                        className="bg-black hover:bg-black/90 text-white rounded-md h-[40px] px-6 font-bold text-[10px] tracking-wider uppercase disabled:opacity-50"
                                    >
                                        SEND
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.div
                className="pointer-events-auto size-16 bg-black rounded-full flex items-center justify-center cursor-pointer shadow-xl text-white relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <X className="size-8" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <MessagesSquare className="size-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
