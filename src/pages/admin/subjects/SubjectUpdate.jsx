/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, FileText, Save } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getSubjectbyId, updateSubject } from '../../../service/subjectService';

const SubjectUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    credit: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubjectbyId(id);
        const subject = data?.subject || data || {};
        setFormData({
          name: subject.name || '',
          credit: subject.credit || '',
          description: subject.description || '',
        });
      } catch (error) {
        console.error('Get subject by Id error', error);
      }
    };
    if (id) {
      fetchSubject();
    }
  }, [id]);

  const updateSubjects = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSubject(id, formData);
      navigate('/subjectlist');
    } catch (error) {
      console.error('Update subject error', error);
      setLoading(false); // Clear loading on error so the user can retry
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-4xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Update Subject
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Modify the subject information below.
            </p>
          </div>
          <Link
            to='/subjectlist'
            className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-5 sm:p-8'>
          <form
            onSubmit={updateSubjects}
            className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Subject Name <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <BookOpen size={18} />
                  </span>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Enter subject name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Credit <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Layers size={18} />
                  </span>
                  <input
                    type='number'
                    name='credit'
                    required
                    placeholder='Enter credit hours'
                    value={formData.credit}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                Description
              </label>
              <div className='relative'>
                <span className='absolute top-3 left-4 text-slate-400'>
                  <FileText size={18} />
                </span>
                <textarea
                  name='description'
                  rows='4'
                  placeholder='Enter subject description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'></textarea>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/subjectlist'
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
                <span>{loading ? 'Saving...' : 'Update Subject'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubjectUpdate;
