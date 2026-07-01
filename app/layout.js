import "./globals.css";

export const metadata = {
  title: "🍕 OrderBot — AI Restaurant Assistant",
  description: "A prompt-engineered conversational ordering assistant built with the OpenAI API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-crust text-char">{children}</body>
    </html>
  );
}
