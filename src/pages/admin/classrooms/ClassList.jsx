/** @format */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Building, DoorOpen } from 'lucide-react';
import AdminSidebar from '../../../components/AdminSidebar';
import { getRooms } from '../../../service/classService';
import { deleteRoom } from '../../../service/classService';

const ClassList = () => {
  const [rooms, setRoom] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const data = await getRooms();
      setRoom(data);
    } catch (error) {
      console.error('Get all room error', error);
    }
  };

  const deleteRooms = async (id) => {
    if (!confirm('Do you want to delete this Room?')) {
      return;
    }
    try {
      await deleteRoom(id);
      fetchRoom();
    } catch (error) {
      console.error('Error delete this Room', error);
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.room_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      <AdminSidebar />
      <main className='flex-1 ml-64 p-10 max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
              Room Management
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              Manage rooms, status, and associated buildings.
            </p>
          </div>
          <Link
            to='/room/roomcreate'
            className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200'>
            <Plus size={18} />
            <span>Add New Room</span>
          </Link>
        </div>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          <div className='p-6 border-b border-slate-100 flex items-center justify-between gap-4'>
            <div className='relative w-full max-w-md'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400'>
                <Search size={18} />
              </span>
              <input
                type='text'
                placeholder='Search by room name or building...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50/75 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  <th className='py-4 px-6'>Id</th>
                  <th className='py-4 px-6'>Room Name</th>
                  <th className='py-4 px-6'>Building</th>
                  <th className='py-4 px-6'>Type</th>
                  <th className='py-4 px-6 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 text-sm text-slate-600'>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <tr
                      key={room.id}
                      className='hover:bg-slate-50/50 transition-colors'>
                      <td className='py-4 px-6 font-medium text-slate-400'>{room.id}</td>
                      <td className='py-4 px-6 font-semibold text-slate-800 flex items-center gap-2.5'>
                        <span className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                          <DoorOpen size={16} />
                        </span>
                        {room.room_name}
                      </td>
                      <td className='py-4 px-6'>
                        <span className='inline-flex items-center gap-1.5 text-slate-600'>
                          <Building
                            size={15}
                            className='text-slate-400'
                          />
                          {room.building?.name}
                        </span>
                      </td>
                      <td className='py-4 px-6'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            room.status === 'Available'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : room.status === 'Occupied'
                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className='py-4 px-6 text-right space-x-2'>
                        <Link
                          to={`/room/roomupdate/${room.id}`}
                          className='inline-flex p-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200 transition-all'>
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteRooms(room.id)}
                          className='inline-flex p-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg border border-slate-200 transition-all'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='5'
                      className='text-center py-8 text-slate-400'>
                      No rooms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassList;
