/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Save, ArrowLeft, Layers } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { createSchedule } from '../../../service/scheduleService';

const ScheduleCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    day_of_week_start: '',
    day_of_week_end: '',
    start_time: '',
    end_time: '',
    session: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSchedule(formData);
      navigate('/schedulelist');
    } catch (err) {
      console.error('Create schedule error', err);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-4xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Create Schedule
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Fill in the information below to create a new schedule.
            </p>
          </div>
          <Link
            to='/schedulelist'
            className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-5 sm:p-8'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Day of Week Start
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Calendar size={18} />
                  </span>
                  <select
                    name='day_of_week_start'
                    required
                    value={formData.day_of_week_start}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                    <option value=''>Select day</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Day of Week End
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Calendar size={18} />
                  </span>
                  <select
                    name='day_of_week_end'
                    required
                    value={formData.day_of_week_end}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                    <option value=''>Select day</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Start Time
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Clock size={18} />
                  </span>
                  <input
                    type='time'
                    name='start_time'
                    required
                    value={formData.start_time}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  End Time
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Clock size={18} />
                  </span>
                  <input
                    type='time'
                    name='end_time'
                    required
                    value={formData.end_time}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>

              <div className='md:col-span-2'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Session
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Layers size={18} />
                  </span>
                  <select
                    name='session'
                    required
                    value={formData.session}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
                    <option value=''>Select session</option>
                    <option value='Morning'>Morning</option>
                    <option value='Afternoon'>Afternoon</option>
                    <option value='Evening'>Evening</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/schedulelist'
                className='w-full sm:w-auto'>
                <button
                  type='button'
                  className='w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all duration-200 text-center'>
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50'>
                <Save size={18} />
                <span>{loading ? 'Saving...' : 'Save Schedule'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ScheduleCreate;
