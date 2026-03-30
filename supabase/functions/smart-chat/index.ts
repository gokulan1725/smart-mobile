import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_CATALOG = `
SMART MOBILE STORE - COMPLETE PRODUCT CATALOG
Currency: Indian Rupees (₹)

FLAGSHIP PHONES:
1. OnePlus 12 (phone_001) - ₹45,999 (MRP ₹52,999) | Snapdragon 8 Gen 3, 12GB RAM, 256GB, 5400mAh, 50MP Triple, 6.82" AMOLED 120Hz | Colors: Flowy Emerald, Silky Black | Rating: 4.7 (2341 reviews) | In Stock (15 units)
2. iPhone 15 Pro Max (phone_002) - ₹1,59,900 | A17 Pro, 8GB RAM, 256GB, 4422mAh, 48MP Triple, 6.7" Super Retina XDR | Colors: Natural/Blue/White/Black Titanium | Rating: 4.9 (5672 reviews) | In Stock (8 units)
3. Samsung Galaxy S24 Ultra (phone_003) - ₹1,34,999 (MRP ₹1,44,999) | Snapdragon 8 Gen 3, 12GB RAM, 512GB, 5000mAh, 200MP Quad, 6.8" Dynamic AMOLED 2X | S Pen, Galaxy AI | Rating: 4.8 (3891 reviews) | In Stock (12 units)
4. Google Pixel 8 Pro (phone_004) - ₹1,06,999 | Tensor G3, 12GB RAM, 256GB, 5050mAh, 50MP Triple, 6.7" LTPO OLED 120Hz | 7 years updates | Rating: 4.6 (1823 reviews) | In Stock
5. Xiaomi 14 Ultra (phone_005) - ₹99,999 | Snapdragon 8 Gen 3, 16GB RAM, 512GB, 5300mAh, 50MP Leica Quad, 6.73" AMOLED 120Hz | Rating: 4.5 (892 reviews) | Out of Stock
6. Nothing Phone (2) (phone_006) - ₹44,999 (MRP ₹49,999) | Snapdragon 8+ Gen 1, 12GB RAM, 256GB, 4700mAh, 50MP Dual, 6.7" OLED 120Hz | Glyph Interface | Rating: 4.4 (1456 reviews) | In Stock
7. Realme GT 5 Pro (phone_007) - ₹35,999 | Snapdragon 8 Gen 3, 12GB RAM, 256GB, 5400mAh, 50MP Triple, 6.78" AMOLED 144Hz | Rating: 4.3 (678 reviews) | In Stock
8. Vivo X100 Pro (phone_008) - ₹89,999 | Dimensity 9300, 16GB RAM, 512GB, 5400mAh, 50MP Zeiss Triple, 6.78" AMOLED 120Hz | Rating: 4.6 (1234 reviews) | In Stock

NEW 2024/2025 FLAGSHIPS:
9. iPhone 16 Pro Max (phone_009) - ₹1,79,900 | A18 Pro, 8GB RAM, 256GB, 4685mAh, 48MP Quad, 6.9" Super Retina XDR | Apple Intelligence | Rating: 4.9 (234 reviews) | In Stock (5 units)
10. Samsung Galaxy S25 Ultra (phone_010) - ₹1,49,999 | Snapdragon 8 Elite, 16GB RAM, 512GB, 5000mAh, 200MP Quad, 6.9" Dynamic AMOLED 2X | Rating: 4.8 (156 reviews) | In Stock
11. Google Pixel 9 Pro XL (phone_011) - ₹1,24,999 | Tensor G4, 16GB RAM, 256GB, 5060mAh, 50MP Triple, 6.8" LTPO OLED 120Hz | Gemini AI | Rating: 4.7 (445 reviews) | In Stock
12. OnePlus 13 (phone_012) - ₹59,999 | Snapdragon 8 Elite, 16GB RAM, 256GB, 6000mAh, 50MP Hasselblad Triple, 6.82" AMOLED 120Hz | 100W SUPERVOOC | Rating: 4.8 (189 reviews) | In Stock

GAMING PHONES:
13. ASUS ROG Phone 8 Pro (phone_013) - ₹89,999 | Snapdragon 8 Gen 3, 24GB RAM, 1TB, 5500mAh, 50MP Triple, 6.78" AMOLED 165Hz | AirTriggers, Vapor Cooling | Rating: 4.7 (567 reviews) | In Stock
14. RedMagic 9 Pro (phone_014) - ₹64,999 | Snapdragon 8 Gen 3, 16GB RAM, 512GB, 6500mAh, 50MP Triple, 6.8" AMOLED 120Hz | ICE 13.5 Cooling | Rating: 4.5 (342 reviews) | In Stock
15. Lenovo Legion Phone 3 Pro (phone_015) - ₹74,999 | Snapdragon 8 Gen 3, 18GB RAM, 512GB, 6000mAh, 50MP Dual, 6.78" AMOLED 165Hz | Dual Fans | Rating: 4.4 (234 reviews) | In Stock

MID-RANGE:
16. Samsung Galaxy A55 (phone_016) - ₹39,999 (MRP ₹44,999) | Exynos 1480, 8GB RAM, 256GB, 5000mAh, 50MP Triple, 6.6" Super AMOLED 120Hz | IP67 | Rating: 4.4 (1234 reviews) | In Stock
17. Xiaomi Redmi Note 13 Pro+ (phone_017) - ₹29,999 (MRP ₹34,999) | Dimensity 7200, 12GB RAM, 256GB, 5000mAh, 200MP Triple, 6.67" AMOLED 120Hz | 120W HyperCharge | Rating: 4.5 (2156 reviews) | In Stock
18. Motorola Edge 50 Pro (phone_018) - ₹34,999 | Snapdragon 7 Gen 3, 12GB RAM, 256GB, 4500mAh, 50MP Triple, 6.7" pOLED 144Hz | 125W TurboPower | Rating: 4.3 (567 reviews) | In Stock
19. iQOO 12 (phone_019) - ₹52,999 (MRP ₹59,999) | Snapdragon 8 Gen 3, 12GB RAM, 256GB, 5000mAh, 50MP Triple, 6.78" AMOLED 144Hz | 120W FlashCharge | Rating: 4.6 (892 reviews) | In Stock
20. Poco F6 Pro (phone_020) - ₹29,999 | Snapdragon 8 Gen 2, 12GB RAM, 256GB, 5000mAh, 50MP Triple, 6.67" AMOLED 120Hz | Rating: 4.5 (1567 reviews) | In Stock

BUDGET:
21. Redmi 13C (phone_021) - ₹9,999 | Helio G85, 6GB RAM, 128GB, 5000mAh, 50MP Dual, 6.74" IPS LCD 90Hz | Rating: 4.1 (3456 reviews) | In Stock (100 units)
22. Realme Narzo 70x (phone_022) - ₹12,999 | Dimensity 6100+, 6GB RAM, 128GB, 5000mAh, 50MP Dual, 6.72" IPS LCD 120Hz | 5G | Rating: 4.2 (1234 reviews) | In Stock
23. Samsung Galaxy M35 (phone_023) - ₹17,999 | Exynos 1380, 6GB RAM, 128GB, 6000mAh, 50MP Triple, 6.6" Super AMOLED 120Hz | Rating: 4.3 (987 reviews) | In Stock

STORE POLICIES:
- Free delivery on all orders
- Payment: Online (Stripe) or Cash on Delivery (COD)
- Both online and offline payment accepted
- Store URL: smart-mobile.lovable.app
- Contact available through website contact form
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are SmartBot, a friendly and knowledgeable AI assistant for Smart Mobile Store — an online smartphone store in India.

Your responsibilities:
- Help customers find the right phone based on their needs, budget, and preferences
- Compare phones when asked
- Provide detailed specs, pricing, availability, and deals
- Answer questions about store policies (delivery, payment, returns)
- Give honest recommendations — mention pros and cons
- If a phone is out of stock, suggest similar alternatives
- Use ₹ for prices, format them nicely (e.g., ₹45,999)
- Be conversational, warm, and helpful. Use emojis sparingly.
- If asked about something not related to phones or the store, politely redirect.
- Keep responses concise but informative. Use bullet points for comparisons.

${PRODUCT_CATALOG}`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many requests right now. Please try again in a moment! 😊" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
