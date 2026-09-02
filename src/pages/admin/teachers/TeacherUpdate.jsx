/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Save, User, Users } from 'lucide-react';
import { getTeacherById, updateTeacher } from '../../../service/teacherService';
import AdminSidebar from '../../../components/AdminSidebar';

const TeacherUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const data = await getTeacherById(id);
        const teacher = data?.teacher || {};

        setFormData({
          name: teacher.name || '',
          gender: teacher.gender || '',
          phone: teacher.phone || '',
          address: teacher.address || '',
        });
      } catch (error) {
        console.error('Update teacher fail..!', error);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const updateTeachers = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTeacher(id, formData);
      navigate('/teacherlist');
    } catch (error) {
      console.error('Update Teacher error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-4xl mx-auto'>
        <div className='flex items-center gap-3 mb-6 sm:mb-8'>
          <Link to='/teacherlist'>
            <button className='p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition shadow-sm'>
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Update Teacher
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Modify the information for this teacher.
            </p>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <form
            onSubmit={updateTeachers}
            className='p-5 sm:p-8 space-y-6'>
            <div className='space-y-6'>
              <div>
                <label className='block text-xs sm:text-sm font-semibold text-slate-700 mb-2'>
                  Full Name <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <User size={18} />
                  </span>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='e.g. Sok Dara'
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-slate-700 mb-2'>
                  Gender <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Users size={18} />
                  </span>
                  <select
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-slate-700 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Phone size={18} />
                  </span>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+855 12 345 678'
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-slate-700 mb-2'>
                  Address
                </label>
                <div className='relative'>
                  <span className='absolute top-3 left-4 text-slate-400'>
                    <MapPin size={18} />
                  </span>
                  <textarea
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    rows='3'
                    placeholder='Enter current address...'
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'></textarea>
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-6 border-t border-slate-100'>
              <Link
                to='/teacherlist'
                className='w-full sm:w-auto'>
                <button
                  type='button'
                  className='w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 text-center'>
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                <Save size={18} />
                <span>{isSubmitting ? 'Updating...' : 'Update Teacher'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeacherUpdate;
