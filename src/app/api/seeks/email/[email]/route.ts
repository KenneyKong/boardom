import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = decodeURIComponent(params.email);
    const client = await clientPromise;
    const db = client.db("boardom");
    
    const seeks = await db
      .collection("seeks")
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    const transformedSeeks = seeks.map(seek => ({
      ...seek,
      id: seek._id.toString(),
      _id: undefined
    }));

    return NextResponse.json(transformedSeeks);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch seeks for this email' },
      { status: 500 }
    );
  }
} 