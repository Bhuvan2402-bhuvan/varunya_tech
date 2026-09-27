import { NextResponse } from 'next/server';
import { generateAIEstimate } from '@/lib/ai/estimator';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectType, industry, expectedUsers, features, description } = body;

    const estimate = generateAIEstimate({
      projectType: projectType || "Web Development",
      industry: industry || "Healthcare",
      expectedUsers: expectedUsers || "10k - 100k",
      features: features || [],
      description: description || "",
    });

    return NextResponse.json({
      success: true,
      data: estimate,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate AI estimate' },
      { status: 500 }
    );
  }
}
