/** @format */

import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { ArrowLeft, Calendar, Clock, Save, Layers } from 'lucide-react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  updateSchedule,
  getScheduleById,
} from '../../../service/scheduleService';

const ScheduleUpdate = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchScheduleDetails();
  }, [id]);

  const fetchScheduleDetails = async () => {
    try {
      const data = await getScheduleById(id);
      const schedule = data.schedule || data;
      setFormData({
        day_of_week_start: schedule.day_of_week_start || '',
        day_of_week_end: schedule.day_of_week_end || '',
        start_time: schedule.start_time || '',
        end_time: schedule.end_time || '',
        session: schedule.session || '',  
      });
    } catch (err) {
      console.error('Get schedule details error', err);
    }
  };

  const updateSchedules = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSchedule(id, formData);
      navigate('/schedulelist');
    } catch (error) {
      console.error('update schedule fail..!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-110 mb-2 p-10 max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Update Schedule
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Modify the information below to update the schedule.
            </p>
          </div>
          <Link
            to='/schedulelist'
            className='inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200'>
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </Link>
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8'>
          <form
            onSubmit={updateSchedules}
            className='space-y-6'>
            <div>
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
            </div>

            <div className='flex items-center justify-end gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/schedulelist'
                className='px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all duration-200'>
                Cancel
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50'>
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

export default ScheduleUpdate;