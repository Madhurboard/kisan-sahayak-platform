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
    const { soilType, region, season } = await req.json();

    const prompt = `
You are an agriculture expert AI.

Your task is to recommend:
1. 3 suitable crops
2. Matching fertilizers
3. 3 irrigation tips

Input:
- Soil Type: ${soilType}
- Region: ${region}
- Season: ${season}

Respond ONLY in **valid JSON format** (no explanation, no markdown).

Each crop must include:
- cropName (string)
- imageUrl (string — must be a valid Unsplash image URL)
- suitability (\"high\" | \"medium\" | \"low\")
- growthDuration (e.g. \"100–120 days\")
- waterRequirements (\"high\" | \"medium\" | \"low\")
- temperature (string, e.g. \"20–30°C\")
- seasonality (array of strings, e.g. [\"Kharif\", \"Rabi\"])
- regions (array of strings, e.g. [\"Punjab\", \"Haryana\"])

Return format:

{
  "crops": [
    {
      "cropName": "Wheat",
      "imageUrl": "https://images.unsplash.com/...",
      "suitability": "high",
      "growthDuration": "100–120 days",
      "waterRequirements": "medium",
      "temperature": "15–25°C",
      "seasonality": ["Rabi"],
      "regions": ["Punjab", "Haryana"]
    }
  ],
  "fertilizers": [
    {
      "name": "Urea",
      "forCrops": ["Wheat"],
      "nutrients": "46% Nitrogen",
      "application": "Apply before sowing"
    }
  ],
  "irrigationTips": [
    "Irrigate during early morning or evening.",
    "Avoid waterlogging in loamy soils.",
    "Use drip irrigation where possible."
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
    console.log("Full Gemini Response:", JSON.stringify(geminiData, null, 2));

    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("Gemini Raw:", text);

    // Remove Markdown formatting (```json ... ```)
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      parsed = {
        crops: [],
        fertilizers: [],
        irrigationTips: ["Sorry, AI response could not be parsed."],
      };
    }

    return new Response(JSON.stringify(parsed), {
  status: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // or restrict to your domain
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

  } catch (err) {
    console.error("Gemini Function Error:", err);
    return new Response(JSON.stringify({ error: "AI recommendation failed" }), {
      status: 500,
    });
  }
});
