import React, { useState } from 'react'
import api from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const SignUp = () => {
  const [form, setForm] = useState({ 
    firstname: '', 
    lastname: '', 
    email: '', 
    password: '',
    confirmPassword: '' 
  })
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  const navigate = useNavigate()

   // Real-time validation logic engine
  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'firstname' && value.trim().length < 2) {
      errorMsg = 'First name must be at least 2 characters long.';
    }

    if (name === 'lastname' && value.trim().length < 2) {
      errorMsg = 'Last name must be at least 2 characters long.';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'password') {
      if (value.length < 6) {
        errorMsg = 'Password must be at least 6 characters.';
      }
    }

    // Checking mismatch instantly when typing in either field
    if (name === 'confirmPassword') {
      if (value !== form.password) {
        errorMsg = 'Passwords do not match.';
      }
    } else if (name === 'password') {
      if (form.confirmPassword && value !== form.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      } else if (form.confirmPassword && value === form.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Update the form values instantly
    setForm(prev => ({ ...prev, [name]: value }));
    
    // 2. Validate the field instantly in real-time
    validateField(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) 
    // Prevent submission if any real-time errors still exist in state
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setMessage("Please fix the validation errors before submitting.");
      return;
    }

      try {
      const res = await api.post('/signup', form)
      if (res.data.success) {
        navigate(res.data.redirectTo)
      }
      setMessage(res.data.message || 'Signup successful')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false) 
    }
  } 

  return (
    <div className='bg-white text-center px-8 my-6 py-6 max-w-md mx-auto rounded-xl shadow-2xl'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      <p className='mb-4'>Create your account.</p>
      
 <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        
        {/* First Name */}
        <div className="w-3/4 mb-2">
       
          <input type='text' name='firstname' value={form.firstname} onChange={handleChange} placeholder='First Name' className={`border p-2 w-full rounded-lg focus:outline-none hover:border-green-500  ${errors.firstname ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`} required />
          {errors.firstname && <p className="text-left text-xs text-red-500 mt-1">{errors.firstname}</p>}
        </div>

        {/* Last Name */}
        <div className="w-3/4 mb-2">
          <input type='text' name='lastname' value={form.lastname} onChange={handleChange} placeholder='Last Name' className={`border p-2 w-full rounded-lg focus:outline-none hover:border-green-500 ${errors.lastname ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`} required />
          {errors.lastname && <p className="text-left text-xs text-red-500 mt-1">{errors.lastname}</p>}
        </div>

        {/* Email */}
        <div className="w-3/4 mb-2">
          <input type='email' name='email' value={form.email} onChange={handleChange} placeholder='Email' className={`border p-2 w-full rounded-lg focus:outline-none hover:border-green-500 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`} required />
          {errors.email && <p className="text-left text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="w-3/4 mb-2">
          <div className='relative w-full'>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name='password' 
              value={form.password} 
              onChange={handleChange} 
              placeholder='Password' 
              className={`border p-2 w-full pr-10 rounded-lg focus:outline-none hover:border-green-500 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`} 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-left text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="w-3/4 mb-2">
          <div className='relative w-full'>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name='confirmPassword' 
              value={form.confirmPassword} 
              onChange={handleChange} 
              placeholder='Confirm Password' 
              className={`border p-2 w-full pr-10 rounded-lg focus:outline-none hover:border-green-500 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`} 
              required 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-left text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

           {message && (
        <p className={`mt-2 text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
        
      <button
      type='submit'
          disabled={loading}
          className="bg-blue-500 text-white p-2 my-4 w-3/4 rounded-lg flex items-center justify-center "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className='mt-4'>
        <p className='text-sm'>Already have an account? <a href='/signin' className='text-blue-500 hover:underline'>Log In</a></p>
      </div>
    </div>
  )
}

export default SignUp
