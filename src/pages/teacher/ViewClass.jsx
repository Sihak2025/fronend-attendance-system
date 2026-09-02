/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  RefreshCw,
  Users,
  ClipboardCheck,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import TeacherSidebar from '../../components/TeacherSideBar';
import { getMyClasses } from '../../service/teacherClassService';

const formatTimeTo12Hour = (timeString) => {
  if (!timeString) return 'Not specified';
  const [hourStr, minuteStr] = timeString.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour}:${minute} ${ampm}`;
};

const MyClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyClasses();
      setClasses(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your classes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className='min-h-screen bg-slate-950 flex text-slate-100 font-sans selection:bg-blue-500 selection:text-white'>
      <TeacherSidebar />
      <main className='flex-1 ml-64 p-8 lg:p-12 max-w-7xl mx-auto'>
        <div className='mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center border-b border-slate-800/80 pb-8'>
          <div className='flex items-center gap-4'>
            <div className='relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/10 border border-blue-500/20 shadow-inner shadow-blue-500/10'>
              <GraduationCap className='h-8 w-8 text-blue-400' />
              <div className='absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center'>
                <span className='animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75'></span>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-extrabold tracking-tight text-white'>
                  My Classes
                </h1>
                <span className='inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20'>
                  <Sparkles className='h-3 w-3' /> Active Term
                </span>
              </div>
              <p className='mt-1 text-sm text-slate-400 font-normal'>
                View and manage your assigned teaching schedules and student
                allocations.
              </p>
            </div>
          </div>

          <button
            onClick={fetchClasses}
            disabled={loading}
            className='group inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:shadow-blue-500/5 active:scale-95 disabled:opacity-50'>
            <RefreshCw
              className={`h-4 w-4 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`}
            />
            <span>Refresh Data</span>
          </button>
        </div>
        {error && (
          <div className='mb-8 flex items-center gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-400 backdrop-blur-md shadow-xl shadow-red-500/5'>
            <div className='p-2 rounded-xl bg-red-500/20'>
              <AlertCircle className='h-6 w-6' />
            </div>
            <div>
              <p className='font-bold text-red-300'>Something went wrong</p>
              <p className='text-sm text-red-400/90 mt-0.5'>{error}</p>
            </div>
          </div>
        )}
        {loading && (
          <div className='flex min-h-[400px] flex-col items-center justify-center'>
            <div className='relative flex items-center justify-center'>
              <div className='absolute h-20 w-20 rounded-full bg-blue-500/10 animate-ping'></div>
              <Loader2 className='h-12 w-12 animate-spin text-blue-500 relative z-10' />
            </div>
            <p className='mt-6 text-sm font-medium text-slate-400 tracking-wide'>
              Loading your classes...
            </p>
          </div>
        )}
        {!loading && classes.length === 0 && !error && (
          <div className='rounded-3xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-xl py-24 text-center border-dashed'>
            <div className='mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 shadow-inner'>
              <GraduationCap className='h-12 w-12 text-slate-600' />
            </div>
            <h2 className='text-xl font-bold text-slate-200'>
              No Classes Assigned
            </h2>
            <p className='mx-auto mt-2 max-w-sm text-sm text-slate-400'>
              You don't have any classes assigned yet. Please contact the
              administrator for assistance.
            </p>
          </div>
        )}
        {!loading && classes.length > 0 && (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {classes.map((teacherClass) => (
              <div
                key={teacherClass.id}
                className='group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10'>
                <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity' />

                <div>
                  <div className='border-b border-slate-800/80 p-6 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent'>
                    <div className='flex items-start justify-between'>
                      <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform'>
                        <Layers className='h-7 w-7' />
                      </div>
                      <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 shadow-sm'>
                        <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse'></span>
                        Active
                      </span>
                    </div>

                    <div className='mt-6'>
                      <div className='flex items-center gap-2'>
                        <span className='text-[11px] uppercase tracking-widest text-blue-400 font-bold'>
                          Class #{teacherClass.id}
                        </span>
                      </div>
                      <h3 className='mt-1 text-2xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors'>
                        {teacherClass.room?.room_name ||
                          teacherClass.room?.name ||
                          'No Room Assigned'}
                      </h3>
                    </div>
                  </div>
                  <div className='p-6 space-y-5'>
                    <div>
                      <span className='text-[11px] uppercase tracking-widest text-slate-500 font-bold'>
                        Subject
                      </span>
                      <div className='mt-1 flex items-center gap-2 text-slate-200'>
                        <BookOpen className='h-4 w-4 text-indigo-400 shrink-0' />
                        <p className='text-base font-semibold truncate'>
                          {teacherClass.subject?.name ||
                            teacherClass.subject?.subject_name ||
                            'No Subject Specified'}
                        </p>
                      </div>
                    </div>
                    <div className='space-y-3 pt-2 border-t border-slate-800/60 text-sm'>
                      <div className='flex items-center justify-between text-slate-300'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50 text-blue-400'>
                            <Users className='h-4 w-4' />
                          </div>
                          <span className='text-slate-400 text-xs'>
                            Capacity
                          </span>
                        </div>
                        <span className='font-medium text-slate-200'>
                          <strong className='text-white font-semibold'>
                            {teacherClass.students_count || 0}
                          </strong>{' '}
                          / {teacherClass.total_student || 0}
                        </span>
                      </div>

                      <div className='flex items-center justify-between text-slate-300'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50 text-purple-400'>
                            <Calendar className='h-4 w-4' />
                          </div>
                          <span className='text-slate-400 text-xs'>
                            Schedule
                          </span>
                        </div>
                        <span className='font-medium text-slate-200 text-right'>
                          {teacherClass.schedule ? (
                            <>
                              <strong className='text-white font-semibold'>
                                W{teacherClass.schedule.week}:
                              </strong>{' '}
                              {teacherClass.schedule.day_of_week_start}
                              {teacherClass.schedule.day_of_week_end &&
                              teacherClass.schedule.day_of_week_end !==
                                teacherClass.schedule.day_of_week_start
                                ? ` - ${teacherClass.schedule.day_of_week_end}`
                                : ''}
                            </>
                          ) : (
                            <span className='text-slate-500'>Not set</span>
                          )}
                        </span>
                      </div>

                      <div className='flex items-center justify-between text-slate-300'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50 text-amber-400'>
                            <Clock className='h-4 w-4' />
                          </div>
                          <span className='text-slate-400 text-xs'>Time</span>
                        </div>
                        <span className='font-medium text-slate-200'>
                          {teacherClass.schedule?.start_time
                            ? `${formatTimeTo12Hour(teacherClass.schedule.start_time)} - ${formatTimeTo12Hour(teacherClass.schedule.end_time)}`
                            : 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-6 pt-0'>
                  <Link
                    to={`/takeattendance/${teacherClass.id}`}
                    className='group/btn flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98]'>
                    <ClipboardCheck className='h-4 w-4 transition-transform group-hover/btn:scale-110' />
                    <span>Take Attendance</span>
                    <ArrowRight className='h-4 w-4 opacity-0 -ml-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:ml-0' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyClassList;
