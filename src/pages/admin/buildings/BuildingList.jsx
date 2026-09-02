/** @format */

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import {
  getBuildings,
  deleteBuildings as apiDeleteBuilding,
} from '../../../service/buildingService';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Building } from 'lucide-react';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const data = await getBuildings();
      // Handle both direct array and wrapped responses (e.g. data.buildings or data)
      setBuildings(Array.isArray(data) ? data : data.buildings || []);
    } catch (error) {
      console.error('Error fetching buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuildings = async (id) => {
    if (!window.confirm('Do you want to delete this building?')) {
      return;
    }
    try {
      await apiDeleteBuilding(id);
      fetchBuildings();
    } catch (error) {
      console.error('Error deleting building:', error);
    }
  };

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-20 lg:pt-8 lg:ml-64 max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
              Buildings
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              Manage campus buildings and locations.
            </p>
          </div>
          <Link
            to='/building/buildingcreate'
            className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 text-xs sm:text-sm'>
            <Plus size={18} />
            <span>Add Building</span>
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
                placeholder='Search by building name...'
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
                  <th className='py-4 px-6'>ID</th>
                  <th className='py-4 px-6'>Building Name</th>
                  <th className='py-4 px-6 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 bg-white text-sm text-slate-600'>
                {loading ? (
                  <tr>
                    <td
                      colSpan='3'
                      className='px-6 py-8 text-center text-sm text-slate-400'>
                      Loading...
                    </td>
                  </tr>
                ) : filteredBuildings.length === 0 ? (
                  <tr>
                    <td
                      colSpan='3'
                      className='px-6 py-8 text-center text-sm text-slate-400'>
                      No buildings found.
                    </td>
                  </tr>
                ) : (
                  filteredBuildings.map((building) => (
                    <tr
                      key={building.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='py-4 px-6 font-medium text-slate-400 whitespace-nowrap'>
                        #{building.id}
                      </td>
                      <td className='py-4 px-6 font-semibold text-slate-800 flex items-center gap-2.5 whitespace-nowrap'>
                        <span className='p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0'>
                          <Building size={16} />
                        </span>
                        <span>{building.name}</span>
                      </td>
                      <td className='py-4 px-6 text-right space-x-2 whitespace-nowrap'>
                        <Link
                          to={`/building/buildingupdate/${building.id}`}
                          className='inline-flex p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200 transition-all'>
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteBuildings(building.id)}
                          className='inline-flex p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg border border-slate-200 transition-all'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuildingList;
