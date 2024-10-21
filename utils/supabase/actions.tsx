'use server';
//import { createClient } from "@/utils/supabase/client";
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function supabaseLogin(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: user } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('error login', error.message);
    //redirect('/error');
  }
  revalidatePath('/', 'layout');
}

export async function supabaseSignup(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: user } = await supabase.auth.signUp(data);

  if (error) {
    console.log('error login', error);
    //redirect('/error');
  }
  console.log('logged in user', user?.user);

  //revalidatePath("/", "layout");
  //redirect('/dashboard');
}
export async function supabaseLogout() {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
    return redirect('/login');
  } catch (error) {
    console.log('error logging out', error);
  }
}
export async function fetchUser(userId: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId);
    if (error) {
      console.log('error loading user', error);
    }
    console.log('data in fetch user', data);
    return data;
  } catch (error) {
    console.log('error loading user', error);
  }
}
