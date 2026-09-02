/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Save,
  Upload,
  DoorOpen,
} from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { createStudent } from '../../../service/studentService';
import { getRooms } from '../../../service/classService';

const StudentCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    room_id: '',
    gender: 'Male',
    dob: '',
    phone: '',
    address: '',
    image: null,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Get rooms error', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudent(formData);
      navigate('/studentlist');
    } catch (error) {
      console.error('Create student error', error);
    } finally {
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
              Add New Student
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Fill in the information below to create a new student profile.
            </p>
          </div>
          <Link
            to='/studentlist'
            className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </Link>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-5 sm:p-8'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='flex flex-col items-center sm:items-start gap-4 pb-6 border-b border-slate-100'>
              <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600'>
                Student Profile Picture
              </label>
              <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
                <div className='w-24 h-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0'>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <User
                      size={36}
                      className='text-slate-400'
                    />
                  )}
                </div>
                <label className='cursor-pointer inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200 text-sm w-full sm:w-auto'>
                  <Upload size={16} />
                  <span>Choose File</span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Full Name <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <User size={18} />
                  </span>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Enter student full name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Room <span className='text-rose-500'>*</span>
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <DoorOpen size={18} />
                  </span>
                  <select
                    name='room_id'
                    required
                    value={formData.room_id}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value=''>Select a room</option>
                    {rooms.map((room) => (
                      <option
                        key={room.id}
                        value={room.id}>
                        {room.name || room.room_name || `Room ${room.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Gender <span className='text-rose-500'>*</span>
                </label>
                <select
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Date of Birth
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Calendar size={18} />
                  </span>
                  <input
                    type='date'
                    name='dob'
                    value={formData.dob}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                    <Phone size={18} />
                  </span>
                  <input
                    type='text'
                    name='phone'
                    placeholder='Enter phone number'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                  />
                </div>
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2'>
                Address
              </label>
              <div className='relative'>
                <span className='absolute top-3 left-4 text-slate-400'>
                  <MapPin size={18} />
                </span>
                <textarea
                  name='address'
                  rows='3'
                  placeholder='Enter full address'
                  value={formData.address}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'></textarea>
              </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100'>
              <Link
                to='/studentlist'
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
                <span>{loading ? 'Saving...' : 'Save Student'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StudentCreate;
