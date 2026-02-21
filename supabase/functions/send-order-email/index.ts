import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.1.2";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");

    const { items, address, totalPrice } = await req.json();

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const itemsHtml = items
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product_name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${(item.product_price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>`
      )
      .join("");

    const emailResponse = await resend.emails.send({
      from: "MobileHub <onboarding@resend.dev>",
      to: [user.email],
      subject: `Order Confirmed! ${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .order-id { background: #f0fdf4; border: 1px solid #86efac; padding: 12px; border-radius: 8px; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #f9fafb; padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; }
            .total { font-size: 20px; font-weight: bold; color: #6366f1; }
            .address-box { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 Order Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for shopping with MobileHub</p>
            </div>
            <div class="content">
              <div class="order-id">
                <p style="margin: 0; color: #16a34a; font-weight: bold;">Order ID: ${orderId}</p>
              </div>
              
              <p>Hi ${address.name},</p>
              <p>Your order has been placed successfully! <span class="badge">💵 Cash on Delivery</span></p>

              <h3>📦 Order Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div style="text-align: right; margin-top: 15px;">
                <p>Shipping: <strong style="color: #16a34a;">Free</strong></p>
                <p class="total">Total: ₹${totalPrice.toLocaleString("en-IN")}</p>
              </div>

              <div class="address-box">
                <h3 style="margin-top: 0;">📍 Delivery Address</h3>
                <p style="margin: 0;">
                  ${address.name}<br>
                  ${address.street}<br>
                  ${address.city}, ${address.state} - ${address.pincode}<br>
                  📞 ${address.phone}
                </p>
              </div>

              <p>🚚 <strong>Estimated Delivery:</strong> 3-5 business days</p>
              <p>💵 <strong>Payment:</strong> Cash on Delivery – ₹${totalPrice.toLocaleString("en-IN")}</p>
            </div>
            <div class="footer">
              <p>Need help? Contact us at support@mobilehub.com</p>
              <p>© MobileHub - Your Smart Phone Store</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Order email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, orderId }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
