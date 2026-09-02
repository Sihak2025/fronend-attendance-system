/** @format */

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import {
  Users,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Clock,
  ShieldAlert,
  GraduationCap,
} from 'lucide-react';
import { getdashboardAdmin } from '../../service/dashboardAdminService';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const [statsData, setStatsData] = useState({
    total_students: 0,
    student_description: '0% from last month',
    total_teachers: 0,
    teacher_description: '0% from last month',
    total_subjects: 0,
    total_users: 0,
    admin_count: 0,
    teacher_user_count: 0,
    attendance_percentage: '0%',
    attendance_description: '0% from yesterday',
    present_count: 0,
    late_count: 0,
    absent_count: 0,
    permission_count: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getdashboardAdmin();
      setStatsData(data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  const stats = [
    {
      title: 'Total Students',
      value: statsData.total_students,
      icon: Users,
      description: statsData.student_description,
    },
    {
      title: 'Total Teachers',
      value: statsData.total_teachers,
      icon: UserCheck,
      description: statsData.teacher_description,
    },
    {
      title: 'Total Subjects',
      value: statsData.total_subjects,
      icon: BookOpen,
      description: 'Active subjects',
    },
    {
      title: 'Total Users',
      value: statsData.total_users,
      icon: Users,
      description: 'All system accounts',
    },
    {
      title: 'Admin Users',
      value: statsData.admin_count,
      icon: ShieldAlert,
      description: 'System administrators',
    },
    {
      title: 'Teacher Users',
      value: statsData.teacher_user_count,
      icon: GraduationCap,
      description: 'Teacher accounts',
    },
    {
      title: 'Attendance Today',
      value: statsData.attendance_percentage,
      icon: ClipboardCheck,
      description: statsData.attendance_description,
    },
  ];

  return (
    <div className='min-h-screen bg-slate-100 flex'>
      <AdminSidebar />
      <main className='flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0'>
        <header className='hidden lg:flex h-20 items-center justify-between border-b bg-white px-8'>
          <div>
            <h1 className='text-2xl font-bold text-slate-800'>Dashboard</h1>
            <p className='text-sm text-slate-500'>Welcome back, Admin</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='text-right'>
              <p className='text-sm font-semibold text-slate-700'>Admin</p>
              <p className='text-xs text-slate-400'>Administrator</p>
            </div>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-sm'>
              A
            </div>
          </div>
        </header>

        <section className='p-4 sm:p-6 lg:p-8'>
          <div className='mb-6 sm:mb-8 rounded-2xl bg-blue-600 p-5 sm:p-6 text-white shadow-sm'>
            <h2 className='text-xl sm:text-2xl font-bold'>
              Good Morning, Admin 👋
            </h2>
            <p className='mt-2 text-xs sm:text-sm text-blue-100'>
              Here's what's happening in your school today.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className='rounded-2xl bg-white p-5 shadow-sm border border-slate-100'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-slate-500'>{stat.title}</p>
                      <h3 className='mt-2 text-2xl sm:text-3xl font-bold text-slate-800'>
                        {stat.value}
                      </h3>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className='mt-4 flex items-center gap-1 text-xs text-green-600 font-medium'>
                    <TrendingUp size={14} />
                    <span>{stat.description}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-6 sm:mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3'>
            <div className='rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100 xl:col-span-2'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-bold text-slate-800'>
                    Attendance Overview
                  </h2>
                  <p className='text-xs sm:text-sm text-slate-500'>
                    Today's attendance statistics
                  </p>
                </div>
                <div className='flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg'>
                  <Clock size={16} />
                  <span>Today</span>
                </div>
              </div>
              <div className='mt-8'>
                <div className='mb-2 flex justify-between text-sm'>
                  <span className='font-medium text-slate-600'>Present</span>
                  <span className='font-bold text-slate-800'>
                    {statsData.attendance_percentage}
                  </span>
                </div>
                <div className='h-3 overflow-hidden rounded-full bg-slate-100'>
                  <div
                    className='h-full rounded-full bg-blue-600 transition-all duration-500'
                    style={{ width: statsData.attendance_percentage }}
                  />
                </div>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4'>
                <div className='rounded-xl bg-green-50 p-4 border border-green-100/50'>
                  <p className='text-xs sm:text-sm text-slate-500'>Present</p>
                  <p className='mt-1 text-lg sm:text-xl font-bold text-green-600'>
                    {statsData.present_count}
                  </p>
                </div>
                <div className='rounded-xl bg-yellow-50 p-4 border border-yellow-100/50'>
                  <p className='text-xs sm:text-sm text-slate-500'>Late</p>
                  <p className='mt-1 text-lg sm:text-xl font-bold text-yellow-600'>
                    {statsData.late_count}
                  </p>
                </div>
                <div className='rounded-xl bg-red-50 p-4 border border-red-100/50'>
                  <p className='text-xs sm:text-sm text-slate-500'>Absent</p>
                  <p className='mt-1 text-lg sm:text-xl font-bold text-red-600'>
                    {statsData.absent_count}
                  </p>
                </div>
                <div className='rounded-xl bg-blue-50 p-4 border border-blue-100/50'>
                  <p className='text-xs sm:text-sm text-slate-500'>
                    Permission
                  </p>
                  <p className='mt-1 text-lg sm:text-xl font-bold text-blue-600'>
                    {statsData.permission_count}
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100'>
              <h2 className='text-lg font-bold text-slate-800'>
                Quick Actions
              </h2>
              <p className='mt-1 text-xs sm:text-sm text-slate-500'>
                Frequently used actions
              </p>
              <div className='mt-5 space-y-3'>
                <Link
                  to='/studentlist'
                  className='block'>
                  <button className='flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3.5 sm:p-4 text-left transition hover:bg-slate-50'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600'>
                      <Users size={20} />
                    </div>
                    <div>
                      <p className='font-semibold text-sm sm:text-base text-slate-700'>
                        Add Student
                      </p>
                      <p className='text-xs text-slate-400'>
                        Register new student
                      </p>
                    </div>
                  </button>
                </Link>
                <Link
                  to='/teacherlist'
                  className='block'>
                  <button className='flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3.5 sm:p-4 text-left transition hover:bg-slate-50'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600'>
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <p className='font-semibold text-sm sm:text-base text-slate-700'>
                        Add Teacher
                      </p>
                      <p className='text-xs text-slate-400'>
                        Register new teacher
                      </p>
                    </div>
                  </button>
                </Link>
                <Link
                  to='/subjectlist'
                  className='block'>
                  <button className='flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3.5 sm:p-4 text-left transition hover:bg-slate-50'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600'>
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className='font-semibold text-sm sm:text-base text-slate-700'>
                        Add Subject
                      </p>
                      <p className='text-xs text-slate-400'>
                        Create new subject
                      </p>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdmin;
