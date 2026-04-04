import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { CheckCircle } from "lucide-react";

const UpdatesSection = () => {
  const { t } = useLang();

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 neon-border"
        >
          <h2 className="font-display text-3xl font-bold neon-text mb-2">{t.updates.title}</h2>
          <p className="text-primary/70 font-display text-sm mb-8">{t.updates.version}</p>

          <ul className="space-y-4">
            {t.updates.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 text-foreground/80"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default UpdatesSection;
