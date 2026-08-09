import { NextResponse } from "next/server";

// A realistic-shaped mock API: accepts a generation request, "processes" it
// with an artificial delay, and returns a set of result assets.
// In a real backend this would enqueue a job against an AI model provider.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { prompt = "", count = 4, mode = "image" } = body;

  if (!prompt || prompt.trim().length < 3) {
    return NextResponse.json(
      { error: "Prompt is too short. Describe what you want to create." },
      { status: 400 }
    );
  }

  // Simulate model inference latency.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const seedBase = Math.abs(hashCode(prompt));
  const results = Array.from({ length: count }, (_, i) => {
    const seed = `${seedBase}-${i}`;
    return {
      id: seed,
      type: mode,
      url:
        mode === "video"
          ? `https://picsum.photos/seed/${seed}/640/800`
          : `https://picsum.photos/seed/${seed}/640/800`,
      width: 640,
      height: 800,
    };
  });

  return NextResponse.json({
    id: `job_${Date.now()}`,
    prompt,
    mode,
    results,
    createdAt: new Date().toISOString(),
  });
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
