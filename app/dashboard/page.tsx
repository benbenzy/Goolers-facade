import React from 'react';
import Card from '../ui/dashboard/card/card';
import Transaction from '../ui/dashboard/transaction/transaction';
import Chart from '../ui/dashboard/chart/chart';
import { MdAnalytics, MdSupervisedUserCircle } from 'react-icons/md';

import { createClient } from '@/utils/supabase/server';
import {
  getAllPostsCount,
  getAllStudentsCount,
  getAllUsersCount,
  getLastWeekEnrollment,
  getLastWeekPosts,
  getLastWeekRevenue,
  getLastWeekUsers,
  getThisWeekEnrollment,
  getThisWeekPosts,
  getThisWeekRevenue,
  getThisWeekUsers,
  getTotalRevenue,
} from '@/utils/supabase/queries';
export default async function DashBoardPage() {
  const supabase = createClient();

  const [
    allUsersCount,
    totalRevenue,
    totalPostsCount,
    totalEnrollment,
    postsThisWeek,
    postsLastWeek,
    usersThisWeek,
    usersLastWeek,
    thisWeekEnrollment,
    lastWeekEnrollment,
    thisWeekRevenue,
    lastWeekRevenue,
  ] = await Promise.all([
    getAllUsersCount(supabase),
    getTotalRevenue(supabase),
    getAllPostsCount(supabase),
    getAllStudentsCount(supabase),
    getThisWeekPosts(supabase),
    getLastWeekPosts(supabase),
    getThisWeekUsers(supabase),
    getLastWeekUsers(supabase),
    getThisWeekEnrollment(supabase),
    getLastWeekEnrollment(supabase),
    getThisWeekRevenue(supabase),
    getLastWeekRevenue(supabase),
  ]);

  function calculatePercentageChange(oldValue: any, newValue: any) {
    if (oldValue === 0) return 0;
    if (!oldValue || !newValue) return 0; // handle case where old value is 0
    return ((Number(newValue) - Number(oldValue)) / Number(oldValue)) * 100;
  }
  return (
    <div className=" flex flex-row gap-5 mt-5">
      <div className=" flex flex-1 flex-col gap-5 ">
        <div className="flex flex-row justify-between gap-5">
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="Users"
            range={`${calculatePercentageChange(
              usersLastWeek,
              usersThisWeek
            )}%`}
            comment="last 7 days"
            value={allUsersCount ?? 0}
          />
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="Enrollment"
            range={`${calculatePercentageChange(
              lastWeekEnrollment,
              thisWeekEnrollment
            )}%`}
            comment="last 30 days"
            value={totalEnrollment ?? 0}
          />
          <Card
            icon={<MdAnalytics size={24} />}
            title="revenue"
            range={`${calculatePercentageChange(
              lastWeekRevenue,
              thisWeekRevenue
            )}%`}
            comment="last 30 days"
            value={totalRevenue ?? 0}
          />
          <Card
            icon={<MdSupervisedUserCircle size={24} />}
            title="Courses"
            range={`${calculatePercentageChange(
              postsThisWeek,
              postsLastWeek
            )}%`}
            comment="last 7 days"
            value={totalPostsCount ?? 0}
          />
        </div>
        <Transaction />
        <Chart />
      </div>
    </div>
  );
}
