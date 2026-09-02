/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getSchedules, deleteSchedule } from '../../../service/scheduleService';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(Array.isArray(data) ? data : data.schedules || []);
    } catch (error) {
      console.error('Get all schedule error', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedules = async (id) => {
    if (!window.confirm('Do you want to delete this schedule?')) {
      return;
    }
    try {
      await deleteSchedule(id);
      fetchSchedule();
    } catch (error) {
      console.error('Delete schedule error', error);
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const startDay = schedule.day_of_week_start || '';
    const endDay = schedule.day_of_week_end || '';
    const query = searchTerm.toLowerCase();
    return (
      startDay.toLowerCase().includes(query) ||
      endDay.toLowerCase().includes(query)
    );
  });

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Schedule Management
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Manage schedules, status, and associated rooms.
            </p>
          </div>
          <Link
            to='/schedule/schedulecreate'
            className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <Plus size={18} />
            <span>Add New Schedule</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6'>
          <div className='p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4'>
            <div className='relative w-full max-w-md'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                <Search size={18} />
              </span>
              <input
                type='text'
                placeholder='Search by day...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
              />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-slate-100 text-left border-collapse'>
              <thead className='bg-slate-50/75'>
                <tr className='border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  <th className='py-4 px-6'>Id</th>
                  <th className='py-4 px-6'>Day_of_Week_start</th>
                  <th className='py-4 px-6'>Day_of_Week_end</th>
                  <th className='py-4 px-6'>Start Time</th>
                  <th className='py-4 px-6'>End Time</th>
                  <th className='py-4 px-6'>Session</th>
                  <th className='py-4 px-6 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 bg-white text-sm text-slate-600'>
                {loading ? (
                  <tr>
                    <td
                      colSpan='7'
                      className='px-6 py-8 text-center text-sm text-slate-400'>
                      Loading...
                    </td>
                  </tr>
                ) : filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='py-4 px-6 font-medium text-slate-400 whitespace-nowrap'>
                        #{schedule.id}
                      </td>
                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span className='inline-flex items-center gap-1.5 text-slate-700 font-medium'>
                          <Calendar
                            size={14}
                            className='text-blue-500'
                          />
                          {schedule.day_of_week_start || 'N/A'}
                        </span>
                      </td>
                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span className='inline-flex items-center gap-1.5 text-slate-700 font-medium'>
                          <Calendar
                            size={14}
                            className='text-blue-500'
                          />
                          {schedule.day_of_week_end || 'N/A'}
                        </span>
                      </td>
                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Clock
                            size={14}
                            className='text-slate-400'
                          />
                          {schedule.start_time || 'N/A'}
                        </span>
                      </td>
                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Clock
                            size={14}
                            className='text-slate-400'
                          />
                          {schedule.end_time || 'N/A'}
                        </span>
                      </td>
                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Clock
                            size={14}
                            className='text-slate-400'
                          />
                          {schedule.session || 'N/A'}
                        </span>
                      </td>
                      <td className='py-4 px-6 text-right space-x-2 whitespace-nowrap'>
                        <Link
                          to={`/schedule/scheduleupdate/${schedule.id}`}
                          className='inline-flex p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200 transition-all'>
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteSchedules(schedule.id)}
                          className='inline-flex p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg border border-slate-200 transition-all'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='7'
                      className='px-6 py-8 text-center text-sm text-slate-400'>
                      No schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduleList;
