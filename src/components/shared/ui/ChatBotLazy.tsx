'use client';

import dynamic from 'next/dynamic';

const ChatBot = dynamic(
  () => import('./ChatBot').then((m) => ({ default: m.ChatBot })),
  { ssr: false },
);

export function ChatBotLazy() {
  return <ChatBot />;
}
