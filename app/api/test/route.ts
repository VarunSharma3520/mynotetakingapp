import { NextResponse } from 'next/server';
import { databases } from '@/services/appwrite';
import { ENVAR } from '@/constants';

export async function GET(request: Request) {
  try {
    const response = await databases.listDocuments(ENVAR.DATABASE_ID, ENVAR.NOTES_COLLECTION_ID);
    return NextResponse.json({ success: true, data: response.documents });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
