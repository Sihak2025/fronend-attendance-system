/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  DoorOpen,
  Building,
  CheckCircle2,
} from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getBuildings } from '../../../service/buildingService';
import { createRoom } from '../../../service/classService';

const ClassCreate = () => {
  const [formData, setFormData] = useState({
    room_name: '',
    status: 'classroom',
    building_id: '',
  });

  const [buildings, setBuilding] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuilding();
  }, []);

  const fetchBuilding = async () => {
    try {
      const data = await getBuildings();
      setBuilding(Array.isArray(data) ? data : data.buildings || []);
    } catch (error) {
      console.error('Get all Building Error', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createRooms = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createRoom(formData);
      navigate('/roomlist');
    } catch (error) {
      console.error('Create room fail..!', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-4xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Add New Room
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Fill in the information to register a new room.
            </p>
          </div>
          <Link
            to='/roomlist'
            className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <ArrowLeft size={18} />
            <span>Back to Rooms</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-5 sm:p-8'>
          <form
            onSubmit={createRooms}
            className='space-y-6'>
            <div className='space-y-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Room Name <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <DoorOpen size={18} />
                  </span>
                  <input
                    type='text'
                    name='room_name'
                    value={formData.room_name}
                    onChange={handleChange}
                    placeholder='e.g. Room 101 or Lab A'
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Building <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Building size={18} />
                  </span>
                  <select
                    name='building_id'
                    value={formData.building_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    required>
                    <option value=''>Select Building</option>
                    {buildings.map((b) => (
                      <option
                        key={b.id}
                        value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Status <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <CheckCircle2 size={18} />
                  </span>
                  <select
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value='classroom'>Classroom</option>
                    <option value='bathroom'>Bathroom</option>
                    <option value='lab'>Lab</option>
                    <option value='hall'>Hall</option>
                    <option value='office'>Office</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/roomlist'
                className='w-full sm:w-auto'>
                <button
                  type='button'
                  className='w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all duration-200 text-center'>
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50'>
                <Save size={18} />
                <span>{isSubmitting ? 'Saving...' : 'Save Room'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ClassCreate;
