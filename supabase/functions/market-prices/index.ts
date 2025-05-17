// supabase/functions/market-prices/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { state, district } = await req.json();

    const prompt = `
You are an agricultural pricing assistant AI.

Please provide estimated average market prices (in INR per quintal) for common crops currently traded in ${district}, ${state} for the current month.

Output strictly in the following JSON format:

{
  "prices": [
    {
      "crop": "Wheat",
      "price": 2100,
      "trend": "up",
      "change": 100
    },
    {
      "crop": "Rice",
      "price": 2200,
      "trend": "down",
      "change": -50
    }
  ]
}
`;

    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const geminiData = await geminiRes.json();
    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      parsed = { prices: [] };
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Gemini Market Price Error:", err);
    return new Response(JSON.stringify({ error: "Market price fetch failed." }), {
      status: 500,
    });
  }
});
