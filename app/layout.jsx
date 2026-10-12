import "./globals.css";

export const metadata = {
  title: "Itz Fizz — Designed to Move",
  description: "A scroll-driven automotive hero experience."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
