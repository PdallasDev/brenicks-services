import type { Metadata, Viewport } from "next";
import "@fontsource-variable/urbanist";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Services — The Brenicks Group",
  description: "AI Implementation, Salesforce and Web Design from The Brenicks Group.",
};

export const viewport: Viewport = {
  themeColor: "#0C1117",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
