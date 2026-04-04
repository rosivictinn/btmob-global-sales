import { useLang } from "@/contexts/LangContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#features", label: t.nav.features },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#reviews", label: t.nav.reviews },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="font-display text-xl font-black neon-text tracking-wider">
          BTMOB<span className="text-foreground/50"> SELLS</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="px-3 py-1.5 rounded-md border border-primary/30 text-xs font-display text-primary hover:neon-border transition-all"
          >
            {t.lang}
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-strong border-t border-border px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-primary">
              {l.label}
            </a>
          ))}
          <button onClick={toggle} className="text-xs font-display text-primary">{t.lang}</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
