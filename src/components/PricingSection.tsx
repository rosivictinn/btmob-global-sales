import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LangContext";
import { Check, Crown, Star, Gem } from "lucide-react";

const PricingSection = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  const plans = [
    {
      name: t.pricing.weekly,
      price: "$400",
      planKey: "weekly",
      desc: t.pricing.weeklyDesc,
      icon: Star,
      features: ["7 days access", "All features", "Telegram support"],
      badge: null,
      highlight: false,
    },
    {
      name: t.pricing.monthly,
      price: "$650",
      desc: t.pricing.monthlyDesc,
      icon: Crown,
      features: ["30 days access", "All features", "Priority support", "Free updates"],
      badge: t.pricing.popular,
      highlight: true,
    },
    {
      name: t.pricing.lifetime,
      price: "$1,100",
      desc: t.pricing.lifetimeDesc,
      icon: Gem,
      features: ["Lifetime access", "All features", "VIP support", "All future updates"],
      badge: t.pricing.best,
      highlight: false,
    },
    {
      name: t.pricing.lifetimeAdmin,
      price: "$1,600",
      desc: t.pricing.lifetimeAdminDesc,
      icon: Crown,
      features: ["Lifetime access", "Your own admin panel", "Full autonomy", "VIP priority support", "All future updates"],
      badge: "👑 PREMIUM",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold neon-text mb-4">{t.pricing.title}</h2>
          <p className="text-muted-foreground text-lg">{t.pricing.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-xl p-6 flex flex-col ${
                plan.highlight
                  ? "glass-strong neon-border-strong scale-[1.03]"
                  : "glass hover:neon-border"
              } transition-all duration-300`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full neon-bg text-xs font-display font-bold text-primary-foreground whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-6 mt-2">
                <plan.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-xs mt-1">{plan.desc}</p>
              </div>

              <div className="text-center mb-6">
                <span className="font-display text-4xl font-black neon-text">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-display font-bold text-sm py-3 rounded-lg transition-all duration-300 ${
                  plan.highlight
                    ? "neon-bg text-primary-foreground hover:scale-105"
                    : "border border-primary/50 text-primary hover:neon-bg hover:text-primary-foreground"
                }`}
              >
                {t.pricing.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
