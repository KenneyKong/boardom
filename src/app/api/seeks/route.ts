import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { SeekFormData } from '@/types/seek';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("boardom");
    
    const seeks = await db
      .collection("seeks")
      .find({})
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
    return NextResponse.json({ error: 'Failed to fetch seeks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("boardom");
    const data = await request.json() as SeekFormData;

    if (!data.name || !data.email || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const seek = {
      name: data.name,
      email: data.email,
      content: data.content,
      tags: data.tags || [],
      createdAt: new Date()
    };

    const result = await db.collection("seeks").insertOne(seek);
    
    return NextResponse.json({ 
      ...seek,
      id: result.insertedId.toString(),
      _id: undefined
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create seek' }, { status: 500 });
  }
} 