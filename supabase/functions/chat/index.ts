import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Dharmik Prajapati's personal AI assistant on his portfolio website. You ONLY answer questions about Dharmik Prajapati — his background, education, skills, projects, and career.

About Dharmik Prajapati:
- Full-stack developer and AI enthusiast
- Skilled in Java, Spring Boot, React, TypeScript, Python, and Machine Learning
- Passionate about building clean, scalable, and intelligent applications
- Focused on AI integration, performance optimization, and collaborative development

Projects:
1. Hospital Management System — Role-based system for doctor, admin, and pharmacist with appointment scheduling, record management, and OTP email verification for patients. Tech: Java Spring, Hibernate, REST API, MySQL.
2. Food Delivery Web Application — Full-stack food delivery platform with user, admin, and restaurant roles. Features authentication, menu management, cart, order placement, and real-time status updates. Tech: Spring Boot, TypeScript, Hibernate, REST API, MySQL, JWT.
3. Hackathon Management System — Online hackathon platform for hosting and participating in events with event creation, team registration, submission tracking, and result management. Tech: Spring Boot, Hibernate, REST API, MySQL, JWT, OTP.
4. GradeTrack System — A comprehensive grade tracking system for students and teachers with role-based access, grade entry, report generation, and academic performance analytics. Tech: Spring MVC, Hibernate, MySQL, JSP, Bootstrap.

Important links:
- GitHub: https://github.com/dharmikk7610
- LinkedIn: https://www.linkedin.com/in/dharmik-prajapati-469836293/

Rules:
1. Only answer questions related to Dharmik Prajapati's background, education, skills, projects, experience, and career.
2. If someone asks anything unrelated, politely redirect them: "I can only answer questions about Dharmik Prajapati. Feel free to ask about his skills, education, or projects!"
3. Always be friendly, concise, and professional.
4. When relevant, share Dharmik's LinkedIn and GitHub links.
5. Keep responses short and helpful.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPEN_ROUTER_KEY = Deno.env.get("OPEN_ROUTER_KEY");
    if (!OPEN_ROUTER_KEY) {
      throw new Error("OPEN_ROUTER_KEY is not configured");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `OpenRouter API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
