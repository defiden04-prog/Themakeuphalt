import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Since we need a robust global free API without API keys that can break, 
    // we use a deterministic data analysis for the 'scan' and Pollinations.ai for the Generative 'avatar'.
    
    // Create a deterministic hash from the uploaded image base64 data to assign traits
    const sampleStr = image.length > 100 ? image.substring(100, 200) : image;
    const stringSum = sampleStr.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    
    const makeupStyles = [
      "Dewy Bridal Glow",
      "Soft Glamour",
      "Matte Elegance",
      "Everyday Natural",
      "Editorial Bold"
    ];
    
    const makeupType = makeupStyles[stringSum % makeupStyles.length];
    
    // Calculate a dynamic score between ~85.0 and 99.9
    const beautyScore = 85 + (stringSum % 149) / 10;
    
    // Generate a beautiful, unique portrait using Pollinations.ai (Free, Keyless Global API)
    // We add a random seed so it generates a fresh image each time!
    const seed = Math.floor(Math.random() * 999999);
    const prompt = encodeURIComponent(`Beautiful highly detailed realistic photograph of woman wearing ${makeupType} makeup look, looking at camera, close up portrait, professional studio lighting, 8k resolution`);
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=500&height=600&nologo=true&seed=${seed}`;

    // Add a natural slight delay to simulate the "Scanning" feeling
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: {
        makeupType,
        imageUrl,
        beautyScore: Number(beautyScore.toFixed(1))
      }
    });

  } catch (error) {
    console.error("API Route Processing Error:", error);
    return NextResponse.json(
      { error: "Failed to process image" }, 
      { status: 500 }
    );
  }
}

