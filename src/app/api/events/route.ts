import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get('upcoming');
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = {};

    // Filter by upcoming events if specified
    if (upcoming === 'true' || upcoming === null) {
      where.date = { gte: new Date() };
    }

    // Filter by event type if specified
    if (type) {
      where.type = type;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      take: limit ? parseInt(limit) : undefined,
    });
    return NextResponse.json(events);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({ data });
    return NextResponse.json(event);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
