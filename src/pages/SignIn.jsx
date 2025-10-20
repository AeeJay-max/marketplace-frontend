import React, { useContext, useState } from 'react'
import loginicons from '../assest/ProfileIcon.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import apiinput from '../common/index.js'
import { toast } from 'react-toastify'
import Context from '../context/index.js'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    
    const { fetchDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => ({
            ...preve,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(apiinput.signin.url, {
                method: apiinput.signin.method,
                credentials: 'include',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            })

            const data2 = await res.json()
            console.log("data2", data2)
            console.log("status", res.status)

            if (data2.success) {
                toast.success(data2.message)

                
                await fetchDetails()
                await fetchUserAddToCart()

                navigate('/')
            } else if (data2.error) {
                toast.error(data2.message)
            }
        } catch (err) {
            console.error("Login error:", err)
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <section id='login'>
            <div className='mx-auto container p-6'>
                <div className='bg-sky-100 p-4 w-full max-w-xs mx-auto shadow-[0_-4px_6px_-1px,0_-2px_4px_-2px,0_4px_6px_-1px,0_2px_4px_-2px] rounded-lg shadow-gray-300'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginicons} alt='login icons' className='rounded-full' />
                    </div>

                    <form className='pt-10' onSubmit={handleSubmit}>
                        <div className='grid mx-auto'>
                            <label>Email :</label>
                            <div className='bg-slate-50 p-1 mt-1 border border-sky-500 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-gray-300 focus-within:scale-105'>
                                <input
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    placeholder='you@gmail.com'
                                    className='w-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='grid mt-3'>
                            <label>Password :</label>
                            <div className='bg-slate-50 p-1 flex items-center mt-1 rounded-md transition-all duration-500 ease-in-out focus-within:shadow-gray-300 focus-within:scale-105 border border-sky-500'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    placeholder='password'
                                    className='w-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    {showPassword ? <FaEyeSlash className='hover:scale-110' /> : <FaEye className='hover:scale-110' />}
                                </div>
                            </div>
                            <Link to='/forgot-password' className='block ml-auto text-gray-700 hover:text-blue-600 hover:underline hover:scale-105'>
                                Forgot Password?
                            </Link>
                        </div>

                        <button className='bg-blue-600 px-6 py-2 w-full max-w-[150px] rounded-full text-white hover:bg-blue-700 hover:scale-110 hover:shadow-md transition-all mx-auto block mt-6'>
                            Login
                        </button>
                    </form>

                    <p className='my-5 text-center'>
                        Don't have an account?{' '}
                        <Link to={"/sign-up"} className='text-blue-600 hover:text-blue-700 hover:underline'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
