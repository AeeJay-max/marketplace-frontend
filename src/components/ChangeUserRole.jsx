import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from  "react-icons/io"
import apiinput from '../common'
import { toast } from 'react-toastify'

const ChangeUserRole = ({
    name,
    email,
    role,
    userid,
    onClose,
    callFunc,
}) => {

    const [userRole,setUserRole] = useState(role)
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateRole = async() =>{
        const response = await fetch(apiinput.userUpdate.url,{
            method : apiinput.userUpdate.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userid : userid,
                role : userRole
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)

    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-30'>
            <div className='w-full mx-auto bg-blue-100 shadow-md p-4 max-w-sm'>

                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role :</p>
                    <select className='border px-4 py-1'value={userRole} onChange={handleOnChangeSelect}>

                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }

                    </select>
                </div>

                <button className='w-fit mx-auto block bg-blue-600 py-1 px-1 rounded-full hover:bg-blue-700' onClick={updateRole}>Change Role</button>

            </div>
        </div>
    )
}

export default ChangeUserRole
