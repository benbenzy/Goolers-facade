import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const id = req.nextUrl.pathname.split('/').pop();
  const { error } = await supabase.from('terms').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    return NextResponse.json(`"failed to delete terms"${error.message}`, {
      status: 500,
    });
  }
  return NextResponse.json('succes', { status: 200 });
}
export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const data = await req.json();
  const id = req.nextUrl.pathname.split('/').pop();
  const { error } = await supabase
    .from('terms')
    .update({ ...data })
    .eq('id', id);
  if (error) {
    console.log(error.message);
    return NextResponse.json(`"failed to delete terms"${error.message}`, {
      status: 500,
    });
  }
  return NextResponse.json('success', { status: 200 });
}
