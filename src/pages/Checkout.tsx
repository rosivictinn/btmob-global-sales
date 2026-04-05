import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Loader2, QrCode } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LangProvider, useLang } from "@/contexts/LangContext";

const PLANS: Record<string, { en: string; pt: string; price: string; priceNum: number }> = {
  weekly:        { en: "Weekly Access",           pt: "Acesso Semanal",            price: "$400",   priceNum: 400 },
  monthly:       { en: "Monthly Access",          pt: "Acesso Mensal",             price: "$650",   priceNum: 650 },
  lifetime:      { en: "Lifetime Access",         pt: "Acesso Vitalício",          price: "$1,100", priceNum: 1100 },
  lifetime_admin:{ en: "Lifetime + Admin Panel",  pt: "Vitalício + Painel Admin",  price: "$1,600", priceNum: 1600 },
};

const CheckoutContent = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const planKey = params.get("plan") || "weekly";
  const plan = PLANS[planKey] || PLANS.weekly;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixData, setPixData] = useState<{
    qrCode: string;
    copyPaste: string;
    expiresAt: string;
    transactionId: string;
    invoiceUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-pix-payment", {
        body: { name, email, cpf: cpf.replace(/\D/g, ""), phone: phone.replace(/\D/g, ""), plan: planKey },
      });

      if (fnError) {
        setError(lang === "pt" ? "Erro ao gerar PIX. Tente novamente." : "Error generating PIX. Try again.");
        console.error("Function error:", fnError);
        return;
      }

      if (!data?.success) {
        setError(data?.error || (lang === "pt" ? "Erro ao processar pagamento." : "Error processing payment."));
        return;
      }

      setPixData({
        qrCode: data.qrCode,
        copyPaste: data.copyPaste,
        expiresAt: data.expiresAt,
        transactionId: data.transactionId,
        invoiceUrl: data.invoiceUrl,
      });
    } catch (err) {
      console.error("Checkout error:", err);
      setError(lang === "pt" ? "Erro inesperado. Tente novamente." : "Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (pixData?.copyPaste) {
      navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "pt" ? "Voltar" : "Back"}
        </button>

        <div className="glass rounded-2xl p-8 neon-border">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold neon-text">BTMOB 4.2</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {lang === "pt" ? plan.pt : plan.en}
            </p>
            <div className="font-display text-4xl font-black neon-text mt-4">{plan.price}</div>
          </div>

          {!pixData ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  {lang === "pt" ? "Nome" : "Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "pt" ? "Seu nome completo" : "Your full name"}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  CPF
                </label>
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  {lang === "pt" ? "Telefone" : "Phone"}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full neon-bg text-primary-foreground font-display font-bold py-3 rounded-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {lang === "pt" ? "Gerando PIX..." : "Generating PIX..."}
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    {lang === "pt" ? "GERAR PIX" : "GENERATE PIX"}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {lang === "pt"
                    ? "Escaneie o QR Code ou copie o código PIX abaixo:"
                    : "Scan the QR Code or copy the PIX code below:"}
                </p>

                {pixData.qrCode && (
                  <div className="bg-white rounded-xl p-4 inline-block mb-4">
                    <img
                      src={pixData.qrCode}
                      alt="PIX QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                )}
              </div>

              {pixData.copyPaste && (
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">
                    {lang === "pt" ? "Código PIX (Copia e Cola)" : "PIX Code (Copy & Paste)"}
                  </label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={pixData.copyPaste}
                      className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground truncate"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-3 py-2 rounded-lg border border-primary/50 text-primary hover:neon-bg hover:text-primary-foreground transition-all flex items-center gap-1 text-xs"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? "OK" : lang === "pt" ? "Copiar" : "Copy"}
                    </button>
                  </div>
                </div>
              )}

              {pixData.expiresAt && (
                <p className="text-xs text-muted-foreground text-center">
                  {lang === "pt" ? "Expira em: " : "Expires at: "}
                  {new Date(pixData.expiresAt).toLocaleString()}
                </p>
              )}

              <p className="text-xs text-center text-muted-foreground">
                ID: {pixData.transactionId}
              </p>

              <button
                onClick={() => { setPixData(null); setName(""); setEmail(""); setCpf(""); setPhone(""); }}
                className="w-full border border-primary/30 text-primary font-display font-bold py-2.5 rounded-lg hover:neon-bg hover:text-primary-foreground transition-all text-sm"
              >
                {lang === "pt" ? "NOVA COMPRA" : "NEW PURCHASE"}
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {lang === "pt"
            ? "Após o pagamento, entre em contato no Telegram para ativação."
            : "After payment, contact us on Telegram for activation."}
        </p>
      </motion.div>
    </div>
  );
};

const Checkout = () => (
  <LangProvider>
    <CheckoutContent />
  </LangProvider>
);

export default Checkout;
