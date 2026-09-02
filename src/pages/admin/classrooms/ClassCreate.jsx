/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, DoorOpen, Building, CheckCircle2 } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSideBar';
import { getBuildings } from '../../../service/buildingService';
import { createRoom } from '../../../service/classService';


const ClassCreate = () => {
  const [formData, setFormData] = useState({
    room_name: '',
    status: 'classroom',
    building_id: '',
  });

  const [buildings, setBuilding] = useState([])
  useEffect(() => {
    fetchBuilding();
  }, []);

  const fetchBuilding = async () => {
    try{
        const data = await getBuildings();
        setBuilding(data.buildings || data);
    }catch(error){
        console.error('Get all Building Error', error)
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-110 p-10 max-w-4xl mx-auto'>
        <div className='flex items-center gap-3 mb-8'>
          <Link to='/roomlist'>
            <button className='p-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition shadow-sm'>
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Add New Room
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Fill in the information to register a new room.
            </p>
          </div>
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <form onSubmit={createRooms} className='p-8 space-y-6'>
            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
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
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
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
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
                    required>
                    <option value=''>Select Building</option>
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
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
                    className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'>
                    <option value='classroom'>Classroom</option>
                    <option value='bathroom'>Bathroom</option>
                    <option value='lab'>Lab</option>
                    <option value='hall'>Hall</option>
                    <option value='office'>Office</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-3 pt-6 border-t border-slate-100'>
              <Link to='/roomlist'>
                <button
                  type='button'
                  className='px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200'>
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-200 
                  ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
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