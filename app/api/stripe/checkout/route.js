import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});


export async function POST(req) {
  const { total, order_id } = await req.json();

  // Derive your origin from the request
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("host");
  const origin = `${proto}://${host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: "SARA Coffee Order (incl. 5% VAT)",
            },
            unit_amount: Math.round(Number(total) * 100), // convert AED to fils
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/order-success?orderId=${order_id}`,
      cancel_url: `${origin}/cart`,
    });

    // return the URL that Stripe generated
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe Error:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
