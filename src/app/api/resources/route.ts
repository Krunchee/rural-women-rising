import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const resources = await prisma.resource.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });
    return NextResponse.json(resources);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const resource = await prisma.resource.create({ data });
    return NextResponse.json(resource);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
