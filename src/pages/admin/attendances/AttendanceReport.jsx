/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../../components/AdminSidebar';

const AttendanceReport = () => {
  const [attendances, setAttendances] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://backend-attendance-1-rlfz.onrender.com/api';

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/teachers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data.teachers || res.data || []);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        let url = `${API_URL}/attendances`;

        if (selectedTeacher) {
          url += `?teacher_id=${selectedTeacher}`;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = res.data.attendances || res.data || [];
        if (startDate) {
          data = data.filter((item) => item.atd_date >= startDate);
        }
        if (endDate) {
          data = data.filter((item) => item.atd_date <= endDate);
        }

        setAttendances(data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedTeacher, startDate, endDate]);

  const handlePrint = () => {
    window.print();
  };

  const totalRecords = attendances.length;
  const presentCount = attendances.filter(
    (item) => item.status === 'Present',
  ).length;
  const absentCount = attendances.filter(
    (item) => item.status === 'Absent',
  ).length;
  const lateCount = attendances.filter((item) => item.status === 'Late').length;
  const permissionCount = attendances.filter(
    (item) => item.status === 'Permission',
  ).length;

  const attendanceRate =
    totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : 0;

  return (
    <div className='flex min-h-screen bg-slate-50'>
      <AdminSidebar />
      <div className='flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64 overflow-y-auto pt-16 lg:pt-8'>
        {/* Header */}
        <div className='mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Attendance Report
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Analyze student attendance trends, statistics, and records.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className='inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm print:hidden self-start sm:self-auto'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
              />
            </svg>
            Print Report
          </button>
        </div>

        {/* Filters */}
        <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden'>
          <div>
            <label className='block text-xs font-semibold text-slate-600 uppercase mb-1.5'>
              Filter by Teacher
            </label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className='w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
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

          <div>
            <label className='block text-xs font-semibold text-slate-600 uppercase mb-1.5'>
              Start Date
            </label>
            <input
              type='date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-600 uppercase mb-1.5'>
              End Date
            </label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>

        {/* Analytics Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8'>
          <div className='bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 col-span-2 sm:col-span-1'>
            <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>
              Overall Rate
            </p>
            <h3 className='text-xl sm:text-2xl font-bold text-slate-800 mt-1'>
              {attendanceRate}%
            </h3>
          </div>
          <div className='bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200'>
            <p className='text-xs font-semibold text-emerald-500 uppercase tracking-wider'>
              Present
            </p>
            <h3 className='text-xl sm:text-2xl font-bold text-emerald-600 mt-1'>
              {presentCount}
            </h3>
          </div>
          <div className='bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200'>
            <p className='text-xs font-semibold text-rose-500 uppercase tracking-wider'>
              Absent
            </p>
            <h3 className='text-xl sm:text-2xl font-bold text-rose-600 mt-1'>
              {absentCount}
            </h3>
          </div>
          <div className='bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200'>
            <p className='text-xs font-semibold text-amber-500 uppercase tracking-wider'>
              Late
            </p>
            <h3 className='text-xl sm:text-2xl font-bold text-amber-600 mt-1'>
              {lateCount}
            </h3>
          </div>
          <div className='bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 col-span-2 sm:col-span-1'>
            <p className='text-xs font-semibold text-sky-500 uppercase tracking-wider'>
              Permission
            </p>
            <h3 className='text-xl sm:text-2xl font-bold text-sky-600 mt-1'>
              {permissionCount}
            </h3>
          </div>
        </div>

        {/* Detailed Table */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='p-4 sm:p-6 border-b border-slate-200 flex justify-between items-center'>
            <div>
              <h2 className='font-bold text-slate-800 text-base sm:text-lg'>
                Detailed Report Records
              </h2>
              <span className='text-xs text-slate-500 mt-0.5 block'>
                Total: {totalRecords} records
              </span>
            </div>
          </div>

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
                      Generating report...
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
                      No records found for this filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          aside, 
          .print\\:hidden,
          button {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .flex-1 {
            margin-left: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AttendanceReport;
