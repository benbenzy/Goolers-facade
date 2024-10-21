import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { supabase } from '.';

const today = new Date();
const lastWeekStart = new Date(today);
lastWeekStart.setDate(today.getDate() - 14);
const lastWeekEnd = new Date(today);
lastWeekEnd.setDate(today.getDate() - 7);
const currentWeekStart = new Date(today);
currentWeekStart.setDate(today.getDate() - 7);

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from('leagues')
    .select('*')
    .eq('started', true);

  return products;
});
export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getAllUsersCount = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' });
  return count;
});

export const getTotalRevenue = cache(async (supabase: SupabaseClient) => {
  const { data } = await supabase
    .from('transactions')
    .select('*')
    .eq('status', 'success');

  let totalAmount = 0;
  if (data) {
    for (let i = 0; i < data?.length; i++) {
      totalAmount += Number(data[i]?.amount);
    }
  }
  return totalAmount;
});
export const getAllPostsCount = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('courses')
    .select('*', { count: 'exact' });
  return count;
});
export const getAllStudentsCount = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('students')
    .select('*', { count: 'exact' });
  return count;
});
export const getThisWeekPosts = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .gte('created_at', currentWeekStart.toISOString())
    .lt('created_at', today.toISOString());
  return count;
});
export const getLastWeekPosts = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', lastWeekEnd.toISOString());
  return count;
});
export const getThisWeekUsers = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .gte('created_at', currentWeekStart.toISOString())
    .lt('created_at', today.toISOString());
  return count;
});
export const getLastWeekUsers = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', lastWeekEnd.toISOString());
  return count;
});
export const getThisWeekEnrollment = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('students')
    .select('*', { count: 'exact' })
    .gte('created_at', currentWeekStart.toISOString())
    .lt('created_at', today.toISOString());

  return count;
});
export const getLastWeekEnrollment = cache(async (supabase: SupabaseClient) => {
  const { count } = await supabase
    .from('students')
    .select('*', { count: 'exact' })
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', lastWeekEnd.toISOString());
  return count;
});
export const getThisWeekRevenue = cache(async (supabase: SupabaseClient) => {
  const { data } = await supabase
    .from('transactons')
    .select('*')
    .eq('status', 'success')
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', lastWeekEnd.toISOString());
  return data;
});
export const getLastWeekRevenue = cache(async (supabase: SupabaseClient) => {
  const { data } = await supabase
    .from('transactons')
    .select('*')
    .eq('status', 'success')
    .gte('created_at', lastWeekStart.toISOString())
    .lt('created_at', lastWeekEnd.toISOString());
  return data;
});
export const getAllTransactions = cache(async (supabase: SupabaseClient) => {
  const { data } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  return data;
});
