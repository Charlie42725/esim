import { MessageCircle } from "lucide-react";

const LINE_URL = "https://line.me/ti/p/@roavaesim";

export default function LineFloatingBtn() {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LINE 客服"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-line-green text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
