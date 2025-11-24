import './globals.css';

// This root layout only imports global styles
// Each route group provides its own <html> and <body> tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
