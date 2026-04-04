import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import btmobApp from "@/assets/btmob-app.png";
import btmobUpdates from "@/assets/btmob-updates.png";
import { Send } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/bigpatronref";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-xs font-display font-semibold text-primary mb-6 animate-pulse-neon">
            {t.hero.badge}
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-black neon-text mb-2 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="font-display text-xl md:text-2xl text-foreground/70 mb-6">{t.hero.subtitle}</p>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">{t.hero.desc}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg neon-bg font-display font-bold text-primary-foreground text-sm hover:scale-105 transition-transform duration-300"
            >
              <Send className="w-4 h-4" />
              {t.hero.cta}
            </a>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary/30 font-display font-semibold text-primary text-sm hover:neon-border transition-all duration-300"
            >
              {t.hero.ctaSub}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-10">
            <div className="text-center">
              <p className="font-display text-2xl font-bold neon-text">500+</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-display text-2xl font-bold neon-text">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-display text-2xl font-bold neon-text">24/7</p>
              <p className="text-xs text-muted-foreground">Support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <img
              src={btmobApp}
              alt="BTMOB 4.2 App"
              className="w-72 rounded-2xl neon-border animate-float"
            />
            <img
              src={btmobUpdates}
              alt="BTMOB Updates"
              className="absolute -bottom-8 -right-12 w-56 rounded-xl neon-border shadow-2xl hidden md:block"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
