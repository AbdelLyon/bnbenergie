'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sun } from 'lucide-react';
import { getInputClasses } from '@/utils/classenames';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

const SUGGESTED_QUESTIONS = [
  "Quel est le prix d'une installation 6 kWc ?",
  'Quelles aides puis-je obtenir en 2026 ?',
  'En combien de temps est-ce rentable ?',
  'Comment obtenir un devis gratuit ?',
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last?.role === 'assistant') setHasUnread(true);
    }
  }, [messages, isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
      };
      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: 'assistant', content: '' },
      ]);
      setIsLoading(true);

      abortRef.current = new AbortController();

      try {
        const history = [...messages, userMsg].map(({ role, content }) => ({
          role,
          content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) {
          throw Object.assign(new Error('Réponse invalide'), {
            status: res.status,
          });
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={
          isOpen ? 'Fermer le chat' : "Ouvrir l'assistant BNB ÉNERGIE"
        }
        className="fixed bottom-6 cursor-pointer right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-orange-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* 💬 CHAT */}
      <div
        className={`fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50 flex w-full md:w-95 h-dvh md:h-130 flex-col overflow-hidden rounded-none md:rounded-lg border-0 md:border border-neutral-200 bg-white shadow-2xl shadow-black/20 transition-all duration-300 dark:border-white/10 dark:bg-neutral-900 ${
          isOpen
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-4'
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-white/10 px-4 py-3 ">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200/30 dark:bg-amber-500/10 border border-neutral-200 dark:border-white/5">
            <Sun className="h-5 w-5 text-amber-400" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">Assistant BNB ÉNERGIE</p>
            <p className="text-xs opacity-60">
              Panneaux solaires · Aides {currentYear}
            </p>
          </div>

          <span className="flex items-center gap-1 text-xs opacity-60">
            <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
            En ligne
          </span>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="space-y-3">
              <div className="rounded-lg bg-neutral-100 flex items-center border border-neutral-200 dark:border-white/10 gap-2 px-3 py-2 text-sm dark:bg-white/10">
                <div className="h-7 w-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-amber-600" />
                </div>

                <span>
                  Bonjour 👋 Je suis votre assistant virtuel{' '}
                  <span className="whitespace-nowrap font-semibold">
                    BNB ÉNERGIE
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-amber-200/30  hover:bg-amber-200/60 dark:bg-amber-500/10 border border-neutral-200 dark:border-amber-200/10 transition-colors duration-200 dark:text-amber-300 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700">
                {m.role === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 dark:bg-white/10'
                }`}
              >
                {m.content || <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-neutral-200 p-3 dark:border-white/10"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question…"
            className={getInputClasses()}
          />

          <button
            disabled={!input.trim() || isLoading}
            className="h-10 w-12 rounded-lg cursor-pointer flex justify-center items-center bg-linear-to-br from-amber-400 to-orange-500 text-white"
          >
            <Send className="w-5 mr-0.5" />
          </button>
        </form>
      </div>
    </>
  );
}
