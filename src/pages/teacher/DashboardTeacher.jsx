/** @format */

import React, { useState, useEffect } from 'react';
import TeacherSidebar from '../../components/TeacherSidebar';
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
  const [teacherName, setTeacherName] = useState('Teacher');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.name) {
          setTeacherName(parsedUser.name);
        }
      } catch (err) {
        console.error('Failed to parse user', err);
      }
    }

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
      value: stats?.my_classes || 0,
      icon: BookOpen,
    },
    {
      title: 'Total Students',
      value: stats?.total_students || 0,
      icon: Users,
    },
    {
      title: "Today's Attendance",
      value: stats?.todays_attendance || '0%',
      icon: ClipboardCheck,
    },
    {
      title: "Today's Classes",
      value: stats?.todays_classes_count || 0,
      icon: CalendarDays,
    },
  ];

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <TeacherSidebar />
      <main className='ml-0 lg:ml-64 min-h-screen flex-1 flex flex-col'>
        <header className='flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-8 shadow-xs'>
          <div>
            <h1 className='text-xl sm:text-2xl font-bold text-slate-800'>
              Teacher Dashboard
            </h1>
            <p className='text-xs sm:text-sm text-slate-500'>
              Welcome back, {teacherName}
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='text-right hidden sm:block'>
              <p className='text-sm font-semibold text-slate-700'>
                {teacherName}
              </p>
              <p className='text-xs text-slate-400'>Teacher Account</p>
            </div>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-xs'>
              {teacherName.charAt(0)}
            </div>
          </div>
        </header>

        <section className='p-4 sm:p-8 flex-1'>
          <div className='mb-8 rounded-2xl bg-blue-600 p-6 sm:p-8 text-white shadow-sm'>
            <h2 className='text-xl sm:text-2xl font-bold'>
              Good Morning, {teacherName} 👋
            </h2>
            <p className='mt-2 text-xs sm:text-sm text-blue-100'>
              Here's your teaching overview for today.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            {statItems.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className='rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
                        {stat.title}
                      </p>
                      <h3 className='mt-2 text-2xl sm:text-3xl font-bold text-slate-800'>
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
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 xl:col-span-2'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-bold text-slate-800'>
                    Today's Classes
                  </h2>
                  <p className='text-xs sm:text-sm text-slate-500'>
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
                  <p className='text-sm text-slate-400 text-center py-6 font-medium'>
                    Loading classes...
                  </p>
                ) : todays_classes && todays_classes.length > 0 ? (
                  todays_classes.map((cls) => (
                    <div
                      key={cls.id}
                      className='flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 p-4 gap-3 hover:border-slate-300 transition'>
                      <div className='flex items-center gap-4'>
                        <div className='flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-lg bg-blue-50 text-blue-600'>
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
                      <span className='self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
                        Active
                      </span>
                    </div>
                  ))
                ) : (
                  <p className='text-sm text-slate-400 text-center py-6'>
                    No classes scheduled for today.
                  </p>
                )}
              </div>
            </div>

            <div className='rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80'>
              <h2 className='text-lg font-bold text-slate-800'>
                Attendance Today
              </h2>
              <p className='mt-1 text-xs sm:text-sm text-slate-500'>
                Your students' attendance
              </p>

              <div className='mt-6 text-center'>
                <div className='mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-blue-600 shadow-xs'>
                  <div>
                    <p className='text-2xl font-bold text-slate-800'>
                      {loading ? '...' : stats.todays_attendance}
                    </p>
                    <p className='text-xs text-slate-400 font-medium'>
                      Attendance
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-6 space-y-3'>
                <div className='flex items-center justify-between rounded-xl bg-emerald-50/70 p-3 border border-emerald-100'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle
                      size={18}
                      className='text-emerald-600'
                    />
                    <span className='text-sm text-slate-600 font-medium'>
                      Present
                    </span>
                  </div>
                  <span className='font-bold text-emerald-600'>
                    {loading ? '...' : attendance_breakdown.present}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-xl bg-rose-50/70 p-3 border border-rose-100'>
                  <div className='flex items-center gap-2'>
                    <XCircle
                      size={18}
                      className='text-rose-600'
                    />
                    <span className='text-sm text-slate-600 font-medium'>
                      Absent
                    </span>
                  </div>
                  <span className='font-bold text-rose-600'>
                    {loading ? '...' : attendance_breakdown.absent}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-xl bg-amber-50/70 p-3 border border-amber-100'>
                  <div className='flex items-center gap-2'>
                    <Clock
                      size={18}
                      className='text-amber-600'
                    />
                    <span className='text-sm text-slate-600 font-medium'>
                      Late
                    </span>
                  </div>
                  <span className='font-bold text-amber-600'>
                    {loading ? '...' : attendance_breakdown.late}
                  </span>
                </div>

                <div className='flex items-center justify-between rounded-xl bg-sky-50/70 p-3 border border-sky-100'>
                  <div className='flex items-center gap-2'>
                    <FileText
                      size={18}
                      className='text-sky-600'
                    />
                    <span className='text-sm text-slate-600 font-medium'>
                      Permission
                    </span>
                  </div>
                  <span className='font-bold text-sky-600'>
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
