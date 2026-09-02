/** @format */

import React, { useState, useEffect } from 'react';
import api from '../../../service/api';
import AdminSidebar from '../../../components/AdminSidebar';

const AttendanceList = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get('/teachers');
        setTeachers(res.data.teachers || res.data || []);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const endpoint = selectedTeacher
          ? `/attendances?teacher_id=${selectedTeacher}`
          : '/attendances';

        const res = await api.get(endpoint);
        setAttendances(res.data.attendances || res.data || []);
      } catch (error) {
        console.error('Error fetching attendances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [selectedTeacher]);

  return (
    <div className='flex min-h-screen bg-slate-50'>
      <AdminSidebar />
      <div className='flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64 overflow-y-auto pt-16 lg:pt-8'>
        {/* Header & Filter Section */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4'>
          <div>
            <h1 className='text-xl sm:text-2xl font-bold text-slate-800'>
              Teacher Attendance Management
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Monitor and filter student attendances recorded by teachers.
            </p>
          </div>
          <div className='flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto w-full sm:w-auto'>
            <span className='text-sm font-medium text-slate-600'>Filter:</span>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className='bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer w-full sm:w-auto'>
              <option value=''>All Teachers</option>
              {teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[640px]'>
              <thead>
                <tr className='bg-slate-50/70 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider'>
                  <th className='p-4'>Date</th>
                  <th className='p-4'>Teacher</th>
                  <th className='p-4'>Subject & Room</th>
                  <th className='p-4'>Student Name</th>
                  <th className='p-4'>Status</th>
                  <th className='p-4'>Reason</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>
                {loading ? (
                  <tr>
                    <td
                      colSpan='6'
                      className='text-center py-10 text-slate-400 font-medium'>
                      Loading attendances...
                    </td>
                  </tr>
                ) : attendances.length > 0 ? (
                  attendances.map((item) => (
                    <tr
                      key={item.id}
                      className='hover:bg-slate-50/60 transition-colors'>
                      <td className='p-4 font-medium text-slate-600 whitespace-nowrap'>
                        {item.atd_date}
                      </td>
                      <td className='p-4 font-semibold text-slate-800'>
                        {item.teacher_class?.teacher?.name || 'N/A'}
                      </td>
                      <td className='p-4'>
                        <span className='font-medium text-slate-800 block'>
                          {item.teacher_class?.subject?.name || 'N/A'}
                        </span>
                        <span className='text-xs text-slate-400'>
                          Room: {item.teacher_class?.room?.room_name || 'N/A'}
                        </span>
                      </td>
                      <td className='p-4 text-slate-800 font-medium'>
                        {item.student?.name || 'N/A'}
                      </td>
                      <td className='p-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'Present'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : item.status === 'Absent'
                                ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                : item.status === 'Late'
                                  ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                  : 'bg-sky-50 text-sky-600 border border-sky-100'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className='p-4 text-slate-500 italic'>
                        {item.reason || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='6'
                      className='text-center py-10 text-slate-400'>
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
