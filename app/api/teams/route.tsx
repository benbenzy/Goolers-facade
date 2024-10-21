import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('teams').select('*');
    if (error) {
      console.log('error fetching teams', error.message);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json('failed', { status: 500 });
  }
}
