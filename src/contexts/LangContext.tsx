import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "pt";

const translations = {
  en: {
    nav: { home: "Home", features: "Features", pricing: "Pricing", reviews: "Reviews", contact: "Contact" },
    hero: {
      badge: "🔥 MOST POWERFUL RAT ON THE MARKET",
      title: "BTMOB 4.2",
      subtitle: "Full Remote Access",
      desc: "The most advanced Android remote administration tool. Total control, real-time access, undetectable. Used by professionals worldwide.",
      cta: "GET ACCESS NOW",
      ctaSub: "Join our Telegram",
    },
    features: {
      title: "FEATURES",
      subtitle: "Everything you need for complete remote control",
      items: [
        { title: "Live Screen", desc: "Watch the target screen in real-time with low latency streaming." },
        { title: "Keylogger", desc: "Capture all keystrokes online and offline with smart categorization." },
        { title: "App Manager", desc: "Block apps, disable notifications, manage favorites remotely." },
        { title: "File Manager", desc: "Browse, download, and upload files silently in the background." },
        { title: "Camera & Mic", desc: "Access front/back camera and microphone recording on demand." },
        { title: "SMS & Calls", desc: "Read SMS, call logs, contacts, and intercept notifications." },
        { title: "Location GPS", desc: "Real-time GPS tracking with location history and geofencing." },
        { title: "Bypass Security", desc: "Advanced dropper bypasses Play Protect and security restrictions." },
      ],
    },
    pricing: {
      title: "PRICING",
      subtitle: "Choose the plan that fits your needs",
      weekly: "Weekly",
      monthly: "Monthly",
      lifetime: "Lifetime",
      lifetimeAdmin: "Lifetime + Admin Panel",
      weeklyDesc: "Perfect for testing",
      monthlyDesc: "Most popular choice",
      lifetimeDesc: "Best value forever",
      lifetimeAdminDesc: "Your own private panel",
      cta: "BUY NOW",
      popular: "MOST POPULAR",
      best: "BEST VALUE",
    },
    reviews: {
      title: "REVIEWS",
      subtitle: "What our clients say",
      items: [
        { name: "D4rkC0de", text: "Made 2k in days with this tool. Absolutely insane. 100% professional.", rating: 5, flag: "🇺🇸" },
        { name: "ShadowX", text: "Best RAT I've ever used. The live screen feature is buttery smooth.", rating: 5, flag: "🇬🇧" },
        { name: "CyberNinja_BR", text: "Já testei várias ferramentas, essa é disparada a melhor. Suporte top demais.", rating: 5, flag: "🇧🇷" },
        { name: "Ph4ntom", text: "Admin panel is worth every penny. Full control, clean interface.", rating: 5, flag: "🇩🇪" },
        { name: "ByteKing", text: "Undetectable, fast, reliable. Running it for 3 months straight, zero issues.", rating: 5, flag: "🇨🇦" },
        { name: "Tr0jan_MX", text: "The bypass capabilities are next level. Nothing else compares.", rating: 5, flag: "🇲🇽" },
      ],
    },
    updates: {
      title: "LATEST UPDATE",
      version: "Version 4.2 | March 2026",
      items: [
        "Block apps with custom messages",
        "Disable notifications remotely",
        "Separate Online/Offline keystrokes",
        "Alert when favorite app is opened",
        "Fixed dropper freeze on update",
        "Improved bypass restrictions",
        "Reduced APK size to 5MB",
        "General bug fixes & improvements",
      ],
    },
    footer: {
      rights: "All rights reserved.",
      disclaimer: "For educational and authorized testing purposes only.",
    },
    lang: "🇺🇸 EN",
  },
  pt: {
    nav: { home: "Início", features: "Recursos", pricing: "Preços", reviews: "Avaliações", contact: "Contato" },
    hero: {
      badge: "🔥 O RAT MAIS PODEROSO DO MERCADO",
      title: "BTMOB 4.2",
      subtitle: "Acesso Remoto Total",
      desc: "A ferramenta de administração remota Android mais avançada. Controle total, acesso em tempo real, indetectável. Usado por profissionais no mundo todo.",
      cta: "OBTER ACESSO AGORA",
      ctaSub: "Entre no nosso Telegram",
    },
    features: {
      title: "RECURSOS",
      subtitle: "Tudo que você precisa para controle remoto completo",
      items: [
        { title: "Tela ao Vivo", desc: "Assista a tela do alvo em tempo real com streaming de baixa latência." },
        { title: "Keylogger", desc: "Capture todas as teclas digitadas online e offline com categorização inteligente." },
        { title: "Gerenciador de Apps", desc: "Bloqueie apps, desative notificações, gerencie favoritos remotamente." },
        { title: "Gerenciador de Arquivos", desc: "Navegue, baixe e envie arquivos silenciosamente em segundo plano." },
        { title: "Câmera & Mic", desc: "Acesse câmera frontal/traseira e gravação de microfone sob demanda." },
        { title: "SMS & Chamadas", desc: "Leia SMS, registro de chamadas, contatos e intercepte notificações." },
        { title: "Localização GPS", desc: "Rastreamento GPS em tempo real com histórico de localização." },
        { title: "Bypass de Segurança", desc: "Dropper avançado bypassa Play Protect e restrições de segurança." },
      ],
    },
    pricing: {
      title: "PREÇOS",
      subtitle: "Escolha o plano ideal para você",
      weekly: "Semanal",
      monthly: "Mensal",
      lifetime: "Vitalício",
      lifetimeAdmin: "Vitalício + Painel Admin",
      weeklyDesc: "Perfeito para testar",
      monthlyDesc: "Escolha mais popular",
      lifetimeDesc: "Melhor custo-benefício",
      lifetimeAdminDesc: "Seu próprio painel privado",
      cta: "COMPRAR AGORA",
      popular: "MAIS POPULAR",
      best: "MELHOR VALOR",
    },
    reviews: {
      title: "AVALIAÇÕES",
      subtitle: "O que nossos clientes dizem",
      items: [
        { name: "D4rkC0de", text: "Fiz 2k em dias com essa ferramenta. Absolutamente insano. 100% profissional.", rating: 5, flag: "🇺🇸" },
        { name: "ShadowX", text: "Melhor RAT que já usei. A tela ao vivo é extremamente fluida.", rating: 5, flag: "🇬🇧" },
        { name: "CyberNinja_BR", text: "Já testei várias ferramentas, essa é disparada a melhor. Suporte top demais.", rating: 5, flag: "🇧🇷" },
        { name: "Ph4ntom", text: "Painel admin vale cada centavo. Controle total, interface limpa.", rating: 5, flag: "🇩🇪" },
        { name: "ByteKing", text: "Indetectável, rápido, confiável. Rodando há 3 meses sem problemas.", rating: 5, flag: "🇨🇦" },
        { name: "Tr0jan_MX", text: "As capacidades de bypass são de outro nível. Nada se compara.", rating: 5, flag: "🇲🇽" },
      ],
    },
    updates: {
      title: "ÚLTIMA ATUALIZAÇÃO",
      version: "Versão 4.2 | Março 2026",
      items: [
        "Bloquear apps com mensagens personalizadas",
        "Desativar notificações remotamente",
        "Keystrokes Online/Offline separados",
        "Alerta quando app favorito é aberto",
        "Corrigido travamento do dropper na atualização",
        "Melhorado bypass de restrições",
        "Tamanho do APK reduzido para 5MB",
        "Correções gerais de bugs e melhorias",
      ],
    },
    footer: {
      rights: "Todos os direitos reservados.",
      disclaimer: "Apenas para fins educacionais e testes autorizados.",
    },
    lang: "🇧🇷 PT",
  },
};

type Translations = typeof translations.en;

const LangContext = createContext<{ t: Translations; lang: Lang; toggle: () => void }>({
  t: translations.en,
  lang: "en",
  toggle: () => {},
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "pt" : "en"));
  return (
    <LangContext.Provider value={{ t: translations[lang], lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
};
