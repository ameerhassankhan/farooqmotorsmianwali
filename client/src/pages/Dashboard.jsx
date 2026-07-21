import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import api from '../../config/axios';

const Dashboard = () => {

  return (
    <div className='text-center'>
        <h1 className='text-3xl font-bold tet-red-700'>Farooq Motors Mianwali</h1>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>Welcome to the dashboard page!</p>

        <Link to="/signup" className='bg-blue-500 text-white p-2 m-2 rounded cursor-pointer hover:bg-blue-600'>Sign Up</Link>
        <Link to="/signin" className='bg-blue-500 text-white p-2 m-2 rounded cursor-pointer hover:bg-blue-600'>Sign In</Link>
      
        
    </div>
  )
}

export default Dashboard;
