import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginicons from '../assest/ProfileIcon.gif'
import { FaEye } from 'react-icons/fa6'
import { FaEyeSlash } from 'react-icons/fa6'
import picto64 from '../configer/imageconvetor'
import apiinput from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    profilePicture: ""
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handlePicture = async (e) => {
    const file = e.target.files[0]

    const Pic = await picto64(file)
    setData((preve) => {
      return {
        ...preve,
        profilePicture : Pic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmpassword) {
      const info = await fetch(apiinput.signup.url,{
        method : apiinput.signup.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const data1 = await info.json()
      if (data1.success) {
        toast.success(data1.message)
        navigate("/login")
      }
      if (data1.error) {
        toast.error(data1.message)
      }
      
    } else {
      toast.error("Please check password and Confirm password")
    }

    
  }

  return (
    <section id='signup'>
      <div className='mx-auto container p-6 '>

        <div className='bg-sky-100 p-4 w-full max-w-xs mx-auto shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] rounded-lg shadow-gray-300'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full transition-all duration-500 hover:scale-105 '>
            <div>
              <img src={data.profilePicture || loginicons} alt='login icons' />
            </div>

            <form>
              <label>
                <div className='text-[11px] bg-slate-100 bg-opacity-95 py-3 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Image
                </div>
                <input type='file' className='hidden' onChange={handlePicture} />
              </label>
            </form>
          </div>

          <form className='pt-10 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-50 p-1 mt-1 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] focus-within:shadow-gray-300 focus-within:scale-105 border border-sky-500'>
                <input type='text' name={'name'} value={data.name} onChange={handleOnChange} placeholder='Enter Full Name' className='w-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-50 p-1 mt-1 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] focus-within:shadow-gray-300 focus-within:scale-105 border border-sky-500'>
                <input type='email' name={'email'} value={data.email} onChange={handleOnChange} placeholder='you@gmail.com' className='w-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Password : </label>
              <div className='bg-slate-50 p-1 flex items-center mt-1 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] focus-within:shadow-gray-300 focus-within:scale-105 border border-sky-500'>
                <input type={showPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnChange} placeholder='password' className='w-full outline-none bg-transparent' required/>
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash className='hover:scale-110' />
                      )
                        : (
                          <FaEye className='hover:scale-110' />
                        )
                    }


                  </span>
                </div>

              </div>
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-50 p-1 flex items-center mt-1 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] focus-within:shadow-gray-300 focus-within:scale-105 border border-sky-500'>
                <input type={showConfirmPassword ? "text" : "password"} name='confirmpassword' value={data.confirmpassword} onChange={handleOnChange} placeholder='confirm password' className='w-full outline-none bg-transparent' required />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash className='hover:scale-110' />
                      )
                        : (
                          <FaEye className='hover:scale-110' />
                        )
                    }


                  </span>
                </div>

              </div>
            </div>

            <button className='bg-blue-600 px-6 py-2 w-full max-w-[150px] rounded-full text-white hover:bg-blue-700 hover:scale-110 hover:shadow-md transition-all mx-auto block mt-6'>Sign Up</button>

          </form>

          <p className='my-5 mx-auto'>Already have an account? <Link to={"/login"} className='text-blue-600 hover:text-blue-700 hover:underline'>Sign In</Link></p>

        </div>

      </div>
    </section>
  )
}

export default SignUp
