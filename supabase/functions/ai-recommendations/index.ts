import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { browsedProducts, userBudget } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get trending products (most viewed in last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data: viewsData } = await supabase
      .from("product_views")
      .select("product_id")
      .gte("created_at", sevenDaysAgo);

    const viewCounts: Record<string, number> = {};
    (viewsData || []).forEach((v: any) => {
      viewCounts[v.product_id] = (viewCounts[v.product_id] || 0) + 1;
    });

    const trendingIds = Object.entries(viewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id, count]) => ({ id, views: count }));

    // AI recommendations based on browsed products
    let aiRecommendations: string[] = [];
    if (browsedProducts && browsedProducts.length > 0) {
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
              content: `You are a smartphone recommendation engine. Given a list of phones a user has browsed, suggest which other phones from a catalog they might like. Return ONLY a JSON array of product IDs. No explanation.`
            },
            {
              role: "user",
              content: `User browsed these phones: ${JSON.stringify(browsedProducts)}. ${userBudget ? `Their budget is around ₹${userBudget}.` : ''} 
              
Available product catalog IDs: phone_001 to phone_023. Suggest 4-6 products they haven't browsed yet that match their preferences (similar specs, brand preferences, price range). Return only a JSON array of product IDs like ["phone_005","phone_008"].`
            }
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "recommend_products",
                description: "Return recommended product IDs",
                parameters: {
                  type: "object",
                  properties: {
                    product_ids: {
                      type: "array",
                      items: { type: "string" },
                      description: "Array of recommended product IDs"
                    },
                    reasoning: {
                      type: "string",
                      description: "Brief explanation of why these were recommended"
                    }
                  },
                  required: ["product_ids", "reasoning"],
                  additionalProperties: false
                }
              }
            }
          ],
          tool_choice: { type: "function", function: { name: "recommend_products" } }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
        if (toolCall) {
          const args = JSON.parse(toolCall.function.arguments);
          aiRecommendations = args.product_ids || [];
        }
      }
    }

    return new Response(JSON.stringify({ trending: trendingIds, aiRecommendations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recommendation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
