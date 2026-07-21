import React, { use, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {

    const fetchUser = async () => {

        try{

            const res = await api.get("/home");

            setUser(res.data.user);

        }

        catch(err){

            navigate("/login");

        }

    };

    fetchUser();

},[]);

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
    <div>
      <h1 className='text-center text-red-800 text-5xl'>Welcome Admin </h1>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
        </div>
      )}
      <button onClick={handleLogout} className='bg-blue-500 text-white p-2 m-2 rounded cursor-pointer hover:bg-blue-600'>Logout</button>
    </div>
  )
}

export default Home
