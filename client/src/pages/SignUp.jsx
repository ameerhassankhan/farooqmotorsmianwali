import React, { useState } from 'react'
import api from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/signup', form)
      console.log("Signup response:", res.data);
      if (res.data.success) {
        navigate(res.data.redirectTo);
      }
      setMessage(res.data.message || 'Signup successful')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className='text-center border px-12 mt-12 h-100'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      <p>Welcome to the sign up page!</p>
      <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <input type='text' name='username' value={form.username} onChange={handleChange} placeholder='Username' className='border p-2 m-2' required />
        <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email' className='border p-2 m-2' required />
        <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' className='border p-2 m-2' required />
        <button className='bg-blue-500 text-white p-2 m-2 rounded cursor-pointer hover:bg-blue-600'>Sign Up</button>
      </form>
      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
      <a href='/signin' className='text-blue-500 hover:underline'>Already have an account? Sign In</a>
    </div>
  )
}

export default SignUp
