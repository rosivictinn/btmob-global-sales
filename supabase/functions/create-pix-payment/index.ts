import { corsHeaders } from '@supabase/supabase-js/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("BLACKCAT_API_KEY")
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { name, email, plan } = await req.json()

    if (!name || !email || !plan) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, plan" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prices: Record<string, { amount: number; title: string }> = {
      weekly:        { amount: 40000, title: "BTMOB 4.2 - Weekly Access" },
      monthly:       { amount: 65000, title: "BTMOB 4.2 - Monthly Access" },
      lifetime:      { amount: 110000, title: "BTMOB 4.2 - Lifetime Access" },
      lifetime_admin: { amount: 160000, title: "BTMOB 4.2 - Lifetime + Admin Panel" },
    }

    const selected = prices[plan]
    if (!selected) {
      return new Response(
        JSON.stringify({ error: "Invalid plan" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const payload = {
      amount: selected.amount,
      currency: "BRL",
      paymentMethod: "pix",
      items: [
        {
          title: selected.title,
          unitPrice: selected.amount,
          quantity: 1,
          tangible: false,
        },
      ],
      customer: {
        name,
        email,
        phone: "00000000000",
        document: {
          number: "00000000000",
          type: "cpf",
        },
      },
      pix: {
        expiresInDays: 1,
      },
      metadata: `Plan: ${plan}`,
    }

    console.log("Calling Blackcat Pay API with payload:", JSON.stringify(payload))

    const response = await fetch("https://api.blackcatpay.com.br/api/sales/create-sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    console.log("Blackcat Pay response status:", response.status, "data:", JSON.stringify(data))

    if (!response.ok || !data.success) {
      return new Response(
        JSON.stringify({ error: data.message || "Payment creation failed", details: data }),
        { status: response.status || 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: data.data.transactionId,
        qrCode: data.data.paymentData?.qrCodeBase64,
        copyPaste: data.data.paymentData?.copyPaste,
        expiresAt: data.data.paymentData?.expiresAt,
        amount: data.data.amount,
        invoiceUrl: data.data.invoiceUrl,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Edge function error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
