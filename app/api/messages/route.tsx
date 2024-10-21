import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { message, email, request } = await req.json();
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({ message, email, request });
    if (error) {
      console.log('failed to post mesage', error.message);
      return NextResponse.json(`failed to insert message,${error.message}`, {
        status: 400,
      });
    }
    return NextResponse.json('success', { status: 200 });
  } catch (error) {
    console.log('failed', error);
    return NextResponse.json(`failed to insert message,${error}`, {
      status: 500,
    });
  }
}
