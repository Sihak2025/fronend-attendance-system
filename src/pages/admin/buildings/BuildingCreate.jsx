/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building, Save } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { createBuildings } from '../../../service/buildingService';

const BuildingCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      await createBuildings({ name });
      navigate('/buildinglist');
    } catch (error) {
      console.error('Error creating building:', error);
      setIsSubmitting(false); // Only clear loading on error so user can retry
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-4xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Create New Building
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Add a new building to the campus infrastructure.
            </p>
          </div>
          <Link
            to='/buildinglist'
            className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <ArrowLeft size={18} />
            <span>Back to Buildings</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-5 sm:p-8'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                Building Name <span className='text-rose-500'>*</span>
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                  <Building size={18} />
                </span>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='e.g. Main Building'
                  required
                  className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                />
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/buildinglist'
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
                <span>{isSubmitting ? 'Saving...' : 'Save Building'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BuildingCreate;
