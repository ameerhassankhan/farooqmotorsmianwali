import React from 'react'
import { testConnection } from '../../services/authService';
import { Navigate } from 'react-router-dom';
import api from '../../config/axios';

const Dashboard = () => {

  return (
    <div className='text-center'>
        <h1 className='text-3xl font-bold tet-red-700'>Farooq Motors Mianwali</h1>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>Welcome to the dashboard page!</p>

      

        
    </div>
  )
}

export default Dashboard;
