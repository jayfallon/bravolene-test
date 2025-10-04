import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

const SANDWICHES_KEY = 'sandwiches';

export async function GET() {
  try {
    const sandwiches = await redis.lrange(SANDWICHES_KEY, 0, -1);
    return NextResponse.json({ sandwiches });
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json({ error: 'Failed to fetch sandwiches' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await redis.lpush(SANDWICHES_KEY, name);
    return NextResponse.json({ success: true, name });
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json({ error: 'Failed to add sandwich' }, { status: 500 });
  }
}
