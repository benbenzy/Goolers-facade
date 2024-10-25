import { NextResponse } from 'next/server';
import { supabase_admin } from '@/utils/supabase/admin';

export async function GET() {
  try {
    const { data, error } = await supabase_admin.listUsers();
    if (error) {
      console.log(`failed to load users ${error}`);
      return NextResponse.json(`failed to load users ${error}`, {
        status: 500,
      });
    }
    return NextResponse.json(data.users, { status: 200 });
  } catch (error) {
    console.log('failed to get users', error);
    return NextResponse.json('failed to load users', { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { email, phone, firstName, lastName, role } = await req.json();
    const password = `goolers_facade${role}`;

    const {
      data: { user },
      error,
    } = await supabase_admin.createUser({
      email,
      password,
      phone,
      email_confirm: true,
      phone_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        role,
        full_name: firstName + ' ' + lastName,
      },
    });
    if (error) {
      console.log(`error creating user${error}`);
      return NextResponse.json(`error creating user${error}`, { status: 500 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log('error creating user', error);
    return NextResponse.json(error, { status: 500 });
  }
}
