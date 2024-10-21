import { supabase } from '@/utils/supabase';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('terms')
      .select('*')
      .eq('category', 'terms');
    if (error) {
      return NextResponse.json(`"failed to load terms"${error.message}`, {
        status: 500,
      });
    }
    console.log('this are terms', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(`"failed to load terms"${error}`, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    //console.log('posting', data);
    const { data: success, error } = await supabase.from('terms').insert({
      title: data.title,
      category: data.category,
      message: data.message,
    });
    if (error) {
      console.log('failed to insert', error.message);
      return NextResponse.json(`failed to insert${error.message}`, {
        status: 500,
      });
    }
    return NextResponse.json(success, { status: 200 });
  } catch (error) {
    return NextResponse.json(`server error ${error}`, {
      status: 500,
    });
  }
}
