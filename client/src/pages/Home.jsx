import React, { use, useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SideMenu';
const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

const handleLogout = async () => {
    try {

        const res = await api.post("/logout");

        if(res.data.success){

            navigate("/signin");

        }

    } catch(err){
        console.log(err);

    }
};
  return (
<div className="grid grid-cols-5 h-screen">

    
      <SideMenu className="col-span-1 bg-slate-900 text-white p-6"/>
      <div className='col-span-4 bg-zinc-200'>
      <NavBar className=" shadow-sm shadow-zinc-500"/>
      <div className='container p-6'>
        <Outlet />
      </div>
      </div>


</div>
  )
}

export default Home
