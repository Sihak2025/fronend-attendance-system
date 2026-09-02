/** @format */

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import {
  getBuildings,
  deleteBuildings as apiDeleteBuilding,
} from '../../../service/buildingService';
import { Link } from 'react-router-dom';

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
      setBuildings(data);
    } catch (error) {
      console.error('Error fetching buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuildings = async (id) => {
    if (!confirm('Do you want to delete this building?')) {
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
    building.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-64 p-10 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Buildings
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Manage campus buildings and locations.
            </p>
          </div>
          <Link to='/building/buildingcreate'>
            <button className='inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-all duration-200'>
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Add Building
            </button>
          </Link>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center justify-between'>
          <div className='relative w-full max-w-md'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </span>
            <input
              type='text'
              placeholder='Search by building name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50'
            />
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-slate-100'>
              <thead className='bg-slate-50/75'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                    Building Name
                  </th>
                  <th className='px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 bg-white'>
                {loading ? (
                  <tr>
                    <td
                      colSpan='3'
                      className='px-6 py-8 text-center text-sm text-slate-500'>
                      Loading...
                    </td>
                  </tr>
                ) : filteredBuildings.length === 0 ? (
                  <tr>
                    <td
                      colSpan='3'
                      className='px-6 py-8 text-center text-sm text-slate-500'>
                      No buildings found.
                    </td>
                  </tr>
                ) : (
                  filteredBuildings.map((building) => (
                    <tr
                      key={building.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400'>
                        #{building.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900'>
                        {building.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3'>
                        <Link to={`/building/buildingupdate/${building.id}`}>
                          <button className='text-blue-600 hover:text-blue-900 font-medium transition-colors'>
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteBuildings(building.id)}
                          className='text-rose-600 hover:text-rose-900 font-medium transition-colors'>
                          Delete
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