import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const id = req.nextUrl.pathname.split('/').pop();
  try {
    if (!id) {
      return new NextResponse('user not found is is required', { status: 400 });
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log(`==>error loading user api ${error?.message}`);
      return new NextResponse(`==>error loading user api ${error?.message}`, {
        status: 500,
      });
    }
    console.log(`==>loaded user ${data}`);
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`'internal error loading user'${error}`, {
      status: 500,
    });
  }
}
