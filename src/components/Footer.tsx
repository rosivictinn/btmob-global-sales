import { useLang } from "@/contexts/LangContext";
import { Send } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/bigpatronref";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold neon-text">BTMOB SELLS</p>
          <p className="text-xs text-muted-foreground mt-1">© 2026 BTMOB. {t.footer.rights}</p>
          <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
        </div>

        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg neon-bg font-display font-bold text-primary-foreground text-sm hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
          Telegram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
