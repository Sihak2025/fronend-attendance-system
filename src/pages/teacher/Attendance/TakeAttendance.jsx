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
} from 'lucide-react';
import TeacherSidebar from '../../../components/TeacherSidebar';
import { getMyClasses } from '../../../service/teacherClassService';
import { createAttendance } from '../../../service/attendanceService';
import api from '../../../service/api';

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
        const currentClass = classes.find(
          (c) => c.id.toString() === teacherClassId.toString(),
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
        const roomStudents = response.data.students || response.data || [];
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

  return (
    <div className='min-h-screen bg-slate-950 flex text-white'>
      <TeacherSidebar />
      <main className='flex-1 ml-64 p-8 max-w-7xl mx-auto'>
        <div className='mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <div className='rounded-xl bg-blue-500/10 p-3'>
              <ClipboardCheck className='h-8 w-8 text-blue-400' />
            </div>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                Take Attendance
              </h1>
              <p className='mt-1 text-sm text-slate-400'>
                {classInfo
                  ? `${classInfo.subject?.name || 'Subject'} - Room: ${classInfo.room?.room_name || classInfo.room?.name || 'N/A'}`
                  : 'Record student presence'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium transition hover:border-slate-500 hover:bg-slate-800'>
            <ArrowLeft className='h-4 w-4' />
            Back
          </button>
        </div>

        {error && (
          <div className='mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400'>
            <AlertCircle className='h-5 w-5 shrink-0' />
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className='mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400'>
            <CheckCircle2 className='h-5 w-5 shrink-0' />
            <p className='text-sm'>{successMessage}</p>
          </div>
        )}

        {loading ? (
          <div className='flex min-h-[300px] flex-col items-center justify-center'>
            <Loader2 className='mb-4 h-10 w-10 animate-spin text-blue-500' />
            <p className='text-slate-400'>Loading students list...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <div className='rounded-xl bg-purple-500/10 p-3 text-purple-400'>
                  <Calendar className='h-5 w-5' />
                </div>
                <div>
                  <label className='block text-xs uppercase tracking-wider text-slate-400 font-semibold'>
                    Attendance Date
                  </label>
                  <p className='text-sm text-slate-200'>
                    Select the date for this attendance session
                  </p>
                </div>
              </div>
              <input
                type='date'
                value={atdDate}
                onChange={(e) => setAtdDate(e.target.value)}
                required
                className='rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none'
              />
            </div>

            <div className='rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl'>
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='border-b border-slate-800 bg-slate-950/50 text-xs uppercase tracking-wider text-slate-400'>
                      <th className='py-4 px-6 font-semibold'>#</th>
                      <th className='py-4 px-6 font-semibold'>Student Name</th>
                      <th className='py-4 px-6 font-semibold text-center'>
                        Status
                      </th>
                      <th className='py-4 px-6 font-semibold'>
                        Reason (If Permission)
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-800 text-sm'>
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan='4'
                          className='py-12 text-center text-slate-400'>
                          No students found in this room.
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => {
                        const currentStatus =
                          attendanceData[student.id]?.status || 'Present';
                        return (
                          <tr
                            key={student.id}
                            className='hover:bg-slate-800/50 transition'>
                            <td className='py-4 px-6 text-slate-400 font-medium'>
                              {index + 1}
                            </td>
                            <td className='py-4 px-6 font-medium text-white'>
                              {student.name ||
                                `${student.first_name || ''} ${student.last_name || ''}`}
                            </td>
                            <td className='py-4 px-6'>
                              <div className='flex items-center justify-center gap-2'>
                                {[
                                  'Present',
                                  'Absent',
                                  'Late',
                                  'Permission',
                                ].map((statusOption) => {
                                  const isActive =
                                    currentStatus === statusOption;
                                  let activeColor = '';
                                  if (statusOption === 'Present')
                                    activeColor =
                                      'bg-green-600 text-white border-green-500';
                                  if (statusOption === 'Absent')
                                    activeColor =
                                      'bg-red-600 text-white border-red-500';
                                  if (statusOption === 'Late')
                                    activeColor =
                                      'bg-amber-600 text-white border-amber-500';
                                  if (statusOption === 'Permission')
                                    activeColor =
                                      'bg-blue-600 text-white border-blue-500';

                                  return (
                                    <button
                                      type='button'
                                      key={statusOption}
                                      onClick={() =>
                                        handleStatusChange(
                                          student.id,
                                          statusOption,
                                        )
                                      }
                                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                        isActive
                                          ? activeColor
                                          : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                      }`}>
                                      {statusOption}
                                    </button>
                                  );
                                })}
                              </div>
                            </td>
                            <td className='py-4 px-6'>
                              {currentStatus === 'Permission' ? (
                                <input
                                  type='text'
                                  placeholder='Enter reason...'
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
                                  className='w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none'
                                />
                              ) : (
                                <span className='text-xs text-slate-500 italic'>
                                  Not required
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
                <div className='p-6 border-t border-slate-800 bg-slate-950/30 flex justify-end'>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:opacity-50'>
                    {submitting ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Save className='h-4 w-4' />
                    )}
                    <span>
                      {submitting ? 'Saving Attendance...' : 'Save Attendance'}
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
