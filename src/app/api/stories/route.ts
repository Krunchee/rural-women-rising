import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = {};
    if (featured !== null) {
      where.featured = featured === 'true';
    }

    const stories = await prisma.story.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : 10,
    });
    return NextResponse.json(stories);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const story = await prisma.story.create({ data });
    return NextResponse.json(story);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
  }
}
