/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ClipboardCheck,
  ArrowLeft,
  Calendar,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Check,
  X,
  Clock,
  FileText,
  UserCheck,
} from 'lucide-react';
import TeacherSidebar from '../../../components/TeacherSidebar';
import { getMyClasses } from '../../../service/teacherClassService';
import { createAttendance } from '../../../service/attendanceService';
import api from '../../../service/api';

const STATUS_OPTIONS = [
  { label: 'Present', color: 'bg-emerald-600 border-emerald-500 text-white' },
  { label: 'Absent', color: 'bg-rose-600 border-rose-500 text-white' },
  { label: 'Late', color: 'bg-amber-600 border-amber-500 text-white' },
  { label: 'Permission', color: 'bg-blue-600 border-blue-500 text-white' },
];

const TakeAttendance = () => {
  const { id: teacherClassId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [atdDate, setAtdDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    const fetchClassAndStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const classes = await getMyClasses();
        const currentClass = classes?.find(
          (c) => c.id.toString() === teacherClassId?.toString(),
        );

        if (!currentClass) {
          throw new Error('Class not found or unauthorized.');
        }

        setClassInfo(currentClass);
        const response = await api
          .get(`/teacher/classes/${teacherClassId}/students`)
          .catch(() => {
            return api.get('/students', {
              params: { room_id: currentClass.room_id },
            });
          });

        const roomStudents = response.data?.students || response.data || [];
        setStudents(roomStudents);

        const initialAttendance = {};
        roomStudents.forEach((student) => {
          initialAttendance[student.id] = {
            status: 'Present',
            reason: '',
          };
        });
        setAttendanceData(initialAttendance);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to load attendance data.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClassAndStudents();
  }, [teacherClassId]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
        reason: status !== 'Permission' ? '' : prev[studentId]?.reason || '',
      },
    }));
  };

  const handleReasonChange = (studentId, reason) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        reason,
      },
    }));
  };

  const setAllStatus = (status) => {
    setAttendanceData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = {
          ...updated[id],
          status,
          reason: status !== 'Permission' ? '' : updated[id]?.reason || '',
        };
      });
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const promises = Object.keys(attendanceData).map((studentId) => {
        const payload = {
          teacher_class_id: Number(teacherClassId),
          student_id: Number(studentId),
          atd_date: atdDate,
          status: attendanceData[studentId].status,
          reason: attendanceData[studentId].reason || null,
        };
        return createAttendance(payload);
      });

      await Promise.all(promises);

      setSuccessMessage('Attendance recorded successfully!');
      setTimeout(() => {
        navigate('/viewclass');
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to save attendance. Please check inputs.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Helper summary calculations
  const getCounts = () => {
    const counts = { Present: 0, Absent: 0, Late: 0, Permission: 0 };
    Object.values(attendanceData).forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status]++;
      }
    });
    return counts;
  };

  const summaryCounts = getCounts();

  return (
    <div className='min-h-screen bg-slate-950 flex text-slate-100 font-sans selection:bg-blue-500 selection:text-white'>
      <TeacherSidebar />
      <main className='flex-1 ml-0 lg:ml-64 p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto overflow-y-auto pt-20 lg:pt-12'>
        {/* Top Header */}
        <div className='mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center border-b border-slate-800/80 pb-8'>
          <div className='flex items-center gap-4'>
            <div className='flex h-14 w-14 min-w-[3.5rem] items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400'>
              <ClipboardCheck className='h-7 w-7' />
            </div>
            <div>
              <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-white'>
                Take Attendance
              </h1>
              <p className='mt-1 text-xs sm:text-sm text-slate-400'>
                {classInfo
                  ? `${classInfo.subject?.name || classInfo.subject?.subject_name || 'Subject'} — Room: ${classInfo.room?.room_name || classInfo.room?.name || 'N/A'}`
                  : 'Record student presence'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white self-start sm:self-auto'>
            <ArrowLeft className='h-4 w-4' />
            <span>Back</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className='mb-6 flex items-center gap-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400 backdrop-blur-md'>
            <div className='p-2 rounded-xl bg-rose-500/20 shrink-0'>
              <AlertCircle className='h-5 w-5' />
            </div>
            <div>
              <p className='font-bold text-rose-300'>Error</p>
              <p className='text-xs sm:text-sm text-rose-400/90 mt-0.5'>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className='mb-6 flex items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 backdrop-blur-md'>
            <div className='p-2 rounded-xl bg-emerald-500/20 shrink-0'>
              <CheckCircle2 className='h-5 w-5' />
            </div>
            <div>
              <p className='font-bold text-emerald-300'>Success</p>
              <p className='text-xs sm:text-sm text-emerald-400/90 mt-0.5'>
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className='flex min-h-[350px] flex-col items-center justify-center'>
            <Loader2 className='mb-4 h-10 w-10 animate-spin text-blue-500' />
            <p className='text-sm text-slate-400'>Loading class roster...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            {/* Control Panel: Date selection & Quick actions */}
            <div className='rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0'>
                  <Calendar className='h-6 w-6' />
                </div>
                <div>
                  <label className='block text-xs font-bold uppercase tracking-wider text-slate-400'>
                    Attendance Date
                  </label>
                  <input
                    type='date'
                    value={atdDate}
                    onChange={(e) => setAtdDate(e.target.value)}
                    required
                    className='mt-1 rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition'
                  />
                </div>
              </div>

              {/* Batch Quick Actions & Live Summary */}
              {students.length > 0 && (
                <div className='flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/60 lg:pt-0 lg:border-t-0'>
                  <span className='text-xs text-slate-400 font-medium mr-1 hidden sm:inline'>
                    Quick Actions:
                  </span>
                  <button
                    type='button'
                    onClick={() => setAllStatus('Present')}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition'>
                    <Check className='h-3.5 w-3.5' /> All Present
                  </button>
                  <button
                    type='button'
                    onClick={() => setAllStatus('Absent')}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition'>
                    <X className='h-3.5 w-3.5' /> All Absent
                  </button>
                </div>
              )}
            </div>

            {/* Live Count Overview Chips */}
            {students.length > 0 && (
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                <div className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 flex items-center justify-between'>
                  <span className='text-xs text-emerald-400 font-medium flex items-center gap-1.5'>
                    <UserCheck className='h-4 w-4' /> Present
                  </span>
                  <span className='text-base font-bold text-emerald-400'>
                    {summaryCounts.Present}
                  </span>
                </div>
                <div className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 flex items-center justify-between'>
                  <span className='text-xs text-rose-400 font-medium flex items-center gap-1.5'>
                    <X className='h-4 w-4' /> Absent
                  </span>
                  <span className='text-base font-bold text-rose-400'>
                    {summaryCounts.Absent}
                  </span>
                </div>
                <div className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 flex items-center justify-between'>
                  <span className='text-xs text-amber-400 font-medium flex items-center gap-1.5'>
                    <Clock className='h-4 w-4' /> Late
                  </span>
                  <span className='text-base font-bold text-amber-400'>
                    {summaryCounts.Late}
                  </span>
                </div>
                <div className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-3.5 flex items-center justify-between'>
                  <span className='text-xs text-blue-400 font-medium flex items-center gap-1.5'>
                    <FileText className='h-4 w-4' /> Permission
                  </span>
                  <span className='text-base font-bold text-blue-400'>
                    {summaryCounts.Permission}
                  </span>
                </div>
              </div>
            )}

            {/* Students Table */}
            <div className='overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl'>
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='border-b border-slate-800/80 bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400'>
                      <th className='py-4 px-6 font-semibold w-12'>#</th>
                      <th className='py-4 px-6 font-semibold min-w-[180px]'>
                        Student Name
                      </th>
                      <th className='py-4 px-6 font-semibold text-center min-w-[320px]'>
                        Status Selection
                      </th>
                      <th className='py-4 px-6 font-semibold min-w-[220px]'>
                        Reason (Required for Permission)
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-800/60 text-sm'>
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan='4'
                          className='py-16 text-center text-slate-400'>
                          No students currently enrolled in this class/room.
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => {
                        const currentStatus =
                          attendanceData[student.id]?.status || 'Present';
                        return (
                          <tr
                            key={student.id}
                            className='hover:bg-slate-800/40 transition-colors'>
                            <td className='py-4 px-6 text-slate-500 font-semibold'>
                              {index + 1}
                            </td>
                            <td className='py-4 px-6 font-semibold text-slate-100'>
                              {student.name ||
                                `${student.first_name || ''} ${student.last_name || ''}`.trim() ||
                                `Student #${student.id}`}
                            </td>
                            <td className='py-4 px-6'>
                              <div className='flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap'>
                                {STATUS_OPTIONS.map((opt) => {
                                  const isActive = currentStatus === opt.label;
                                  return (
                                    <button
                                      type='button'
                                      key={opt.label}
                                      onClick={() =>
                                        handleStatusChange(
                                          student.id,
                                          opt.label,
                                        )
                                      }
                                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 active:scale-95 ${
                                        isActive
                                          ? opt.color + ' shadow-md'
                                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                      }`}>
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </td>
                            <td className='py-4 px-6'>
                              {currentStatus === 'Permission' ? (
                                <input
                                  type='text'
                                  placeholder='Specify reason...'
                                  value={
                                    attendanceData[student.id]?.reason || ''
                                  }
                                  onChange={(e) =>
                                    handleReasonChange(
                                      student.id,
                                      e.target.value,
                                    )
                                  }
                                  required={currentStatus === 'Permission'}
                                  className='w-full rounded-xl border border-blue-500/40 bg-slate-950 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition'
                                />
                              ) : (
                                <span className='text-xs text-slate-600 italic select-none'>
                                  N/A
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {students.length > 0 && (
                <div className='p-6 border-t border-slate-800/80 bg-slate-950/50 flex items-center justify-between flex-wrap gap-4'>
                  <p className='text-xs text-slate-400'>
                    Total roster count:{' '}
                    <strong className='text-slate-200 font-bold'>
                      {students.length}
                    </strong>
                  </p>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-500 active:scale-95 disabled:opacity-50 min-w-[160px]'>
                    {submitting ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Save className='h-4 w-4' />
                    )}
                    <span>
                      {submitting ? 'Submitting...' : 'Save Attendance'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default TakeAttendance;
