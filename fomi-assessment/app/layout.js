import "./globals.css";

export const metadata = {
  title: "Fomi — AI Image & Video Generation",
  description: "Turn imagination into professional-quality images and videos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
