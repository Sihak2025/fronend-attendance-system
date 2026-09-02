/** @format */

import { getBuildingById, updateBuildings } from "../../../service/buildingService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSideBar";
import { useEffect } from "react";


const BuildingUpdate = () => {

    const [formData, setFormData] = useState({
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchBuilding = async () => {
        try{
            const data = await getBuildingById(id)
            setFormData({ name: data.building.name || '' });
        }catch(error){
            console.error('Failed to fetch building data for update:', error);
        }
    }
    fetchBuilding();
  }, [id])

  const updatebuilding = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
        await updateBuildings(id, formData)
        navigate('/buildinglist')
    }catch(error){
        console.error('Update building fail..!', error)
    }finally{
        setIsSubmitting(false)
    }
  }
  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-110 p-10 max-w-4xl mx-auto relative z-10'>
        <div className='mb-8'>
          <button
            onClick={() => navigate('/buildinglist')}
            className='flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-4'>
            <svg
              className='w-4 h-4 mr-1.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to Buildings
          </button>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
            Update Building
          </h1>
          <p className='text-sm text-slate-500 mt-1'>
            Update a new building to the campus infrastructure.
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <form
            onSubmit={updatebuilding}
            className='p-8'>
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-semibold text-slate-700 mb-2'>
                  Building Name <span className='text-rose-500'>*</span>
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='e.g. Main Building'
                  required
                  className='w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 transition-all duration-200'
                />
              </div>
            </div>

            <div className='mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100'>
              <button
                type='button'
                onClick={() => navigate('/buildinglist')}
                className='px-5 py-2.5 rounded-xl font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-200'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`inline-flex items-center px-5 py-2.5 rounded-xl font-medium text-white shadow-sm transition-all duration-200 
                  ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isSubmitting ? 'Saving...' : 'Save Building'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BuildingUpdate;
