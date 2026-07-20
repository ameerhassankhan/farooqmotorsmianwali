import React, { useState } from 'react'
import api from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/signin', form)
      if (res.data.success) {
        navigate(res.data.redirectTo);
      }
      setMessage(res.data.message || 'Signin successful')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Signin failed')
    }
  }

  return (
    <div className='text-center border px-12 mt-12 h-100'>
      <h1 className='text-2xl font-bold'>Sign In</h1>
      <p>Welcome to the sign in page!</p>
      <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email' className='border p-2 m-2' required />
        <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' className='border p-2 m-2' required />
        <button className='bg-blue-500 text-white p-2 m-2 rounded cursor-pointer hover:bg-blue-600'>Sign In</button>
      </form>
      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
      <a href='/signup' className='text-blue-500 hover:underline'>Don't have an account? Sign Up</a>
    </div>
  )
}

export default SignIn
