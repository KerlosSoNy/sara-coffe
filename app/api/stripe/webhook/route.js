import Stripe from "stripe";
import { NextResponse } from "next/server";
import woocommerce from "@/lib/woocommerce";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const url = new URL(session.success_url);
    const orderId = url.searchParams.get("orderId");

    if (orderId) {
      try {
        await woocommerce.put(`/orders/${orderId}`, {
          set_paid: true,
        });
        console.log(`✅ Order ${orderId} marked as paid`);
      } catch (err) {
        console.error("❌ WooCommerce update failed:", err.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
