import React, { useEffect, useState } from 'react'
import apiinput from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import {MdModeEdit} from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {

  const [alluser, setAllUsers] = useState([])
  const [openupdateUser, setOpenUpadateUser] = useState(false)
  const [updateUserData, setUpadateUserData] = useState({
    email : "",
    name : "",
    role : "",
    _id : ""
  })

  const findAllUsers = async () => {
    const fetchUsers = await fetch(apiinput.alluser.url, {
      method : apiinput.alluser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchUsers.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
    //console.log(dataResponse)
  }

  useEffect(() => {
    findAllUsers()
  }, [])

  return (
    <div className='bg-white pb-2'>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            alluser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('llll')}</td>
                  <td>
                    <button className='bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-200 hover:shadow-sm hover:scale-105' 
                    onClick={()=>{
                      setUpadateUserData(el)
                      setOpenUpadateUser(true)
                    }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openupdateUser && (
          <ChangeUserRole
            onClose={()=>setOpenUpadateUser(false)}
            name={updateUserData.name}
            email={updateUserData.email}
            role={updateUserData.role}
            userid={updateUserData._id}
            callFunc={findAllUsers}
          />
        )
      }

      
    </div>
  )
}

export default AllUsers
