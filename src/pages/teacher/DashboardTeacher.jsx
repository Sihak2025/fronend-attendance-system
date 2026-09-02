/** @format */

import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../components/TeacherSideBar';
import { getDashboardData } from '../../service/dasboardTeacherService';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from 'lucide-react';

const DashboardTeacher = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      my_classes: 0,
      total_students: 0,
      todays_attendance: '0%',
      todays_classes_count: 0,
    },
    attendance_breakdown: {
      present: 0,
      absent: 0,
      late: 0,
      permission: 0,
    },
    todays_classes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        if (data) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const { stats, attendance_breakdown, todays_classes } = dashboardData;

  const statItems = [
    {
      title: 'My Classes',
      value: stats.my_classes,
      icon: BookOpen,
    },
    {
      title: 'Total Students',
      value: stats.total_students,
      icon: Users,
    },
    {
      title: "Today's Attendance",
      value: stats.todays_attendance,
      icon: ClipboardCheck,
    },
    {
      title: "Today's Classes",
      value: stats.todays_classes_count,
      icon: CalendarDays,
    },
  ];

  return (
    <div className='min-h-screen bg-slate-100'>
      <TeacherSidebar />
      <main className='ml-64 min-h-screen'>
        <header className='flex h-20 items-center justify-between border-b bg-white px-8'>
          <div>
            <h1 className='text-2xl font-bold text-slate-800'>
              Teacher Dashboard
            </h1>
            <p className='text-sm text-slate-500'>Welcome back, Teacher</p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='text-right'>
              <p className='text-sm font-semibold text-slate-700'>Teacher</p>
              <p className='text-xs text-slate-400'>Teacher Account</p>
            </div>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white'>
              T
            </div>
          </div>
        </header>

        <section className='p-8'>
          <div className='mb-8 rounded-2xl bg-blue-600 p-6 text-white'>
            <h2 className='text-2xl font-bold'>Good Morning, Teacher 👋</h2>
            <p className='mt-2 text-sm text-blue-100'>
              Here's your teaching overview for today.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {statItems.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className='rounded-2xl bg-white p-5 shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-slate-500'>{stat.title}</p>
                      <h3 className='mt-2 text-3xl font-bold text-slate-800'>
                        {loading ? '...' : stat.value}
                      </h3>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3'>
            <div className='rounded-2xl bg-white p-6 shadow-sm xl:col-span-2'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-bold text-slate-800'>
                    Today's Classes
                  </h2>
                  <p className='text-sm text-slate-500'>
                    Your teaching schedule for today
                  </p>
                </div>
                <CalendarDays
                  size={22}
                  className='text-blue-600'
                />
              </div>

              <div className='mt-5 space-y-3'>
                {loading ? (
                  <p className='text-sm text-slate-400 text-center py-4'>
                    Loading classes...
                  </p>
                ) : todays_classes.length > 0 ? (
                  todays_classes.map((cls) => (
                    <div
                      key={cls.id}
                      className='flex items-center justify-between rounded-xl border border-slate-200 p-4'>
                      <div className='flex items-center gap-4'>
                        <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600'>
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h3 className='font-semibold text-slate-700'>
                            {cls.subject_name || 'No Subject'}
                          </h3>
                          <p className='text-xs text-slate-500 mt-0.5'>
                            Room:{' '}
                            <span className='font-medium text-slate-600'>
                              {cls.room_name || 'N/A'}
                            </span>
                          </p>
                          <p className='text-xs text-slate-400 mt-0.5'>
                            Time:{' '}
                            {cls.start_time
                              ? `${cls.start_time.slice(0, 5)} - ${cls.end_time?.slice(0, 5)}`
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
                        Active
                      </span>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-slate-400 text-center py-4'>
                    No classes scheduled for today.
                  </p>
                )}
              </div>
            </div>

            <div className='rounded-2xl bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-bold text-slate-800'>
                Attendance Today
              </h2>
              <p className='mt-1 text-sm text-slate-500'>
                Your students' attendance
              </p>

              <div className='mt-6 text-center'>
                <div className='mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[12px] border-blue-600'>
                  <div>
                    <p className='text-2xl font-bold text-slate-800'>
                      {loading ? '...' : stats.todays_attendance}
                    </p>
                    <p className='text-xs text-slate-400'>Attendance</p>
                  </div>
                </div>
              </div>

              <div className='mt-6 space-y-3'>
                <div className='flex items-center justify-between rounded-lg bg-green-50 p-3'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle
                      size={18}
                      className='text-green-600'
                    />
                    <span className='text-sm text-slate-600'>Present</span>
                  </div>
                  <span className='font-semibold text-green-600'>
                    {loading ? '...' : attendance_breakdown.present}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-lg bg-red-50 p-3'>
                  <div className='flex items-center gap-2'>
                    <XCircle
                      size={18}
                      className='text-red-600'
                    />
                    <span className='text-sm text-slate-600'>Absent</span>
                  </div>
                  <span className='font-semibold text-red-600'>
                    {loading ? '...' : attendance_breakdown.absent}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-lg bg-yellow-50 p-3'>
                  <div className='flex items-center gap-2'>
                    <Clock
                      size={18}
                      className='text-yellow-600'
                    />
                    <span className='text-sm text-slate-600'>Late</span>
                  </div>
                  <span className='font-semibold text-yellow-600'>
                    {loading ? '...' : attendance_breakdown.late}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-lg bg-blue-50 p-3'>
                  <div className='flex items-center gap-2'>
                    <FileText
                      size={18}
                      className='text-blue-600'
                    />
                    <span className='text-sm text-slate-600'>Permission</span>
                  </div>
                  <span className='font-semibold text-blue-600'>
                    {loading ? '...' : attendance_breakdown.permission}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardTeacher;