import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if (user?.role !== ROLE.Admin) {
            navigate('/')
        }
    },[user,navigate])

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-sky-100 min-h-full w-full max-w-60 cshadow'>
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className='text-4xl font-semibold text-blue-600 cursor-pointer hover:scale-105 relative flex justify-center'>
                        {
                            user?.profilePicture ? (
                                <img src={user?.profilePicture} className='w-15 h-15 rounded-full' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className="capitalize text-lg font-bold">{user?.name}</p>
                    <p className="text-xs">{user?.role}</p>
                </div>

                {/* Navigation */}
                <div>
                    <nav className="grid p-4">
                        <Link to={"all-users"} className=" py-0.5 hover:bg-slate-300 text-left">All Users</Link>
                        <Link to={"products"} className=" py-0.5 hover:bg-slate-300 text-left">All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className="w-full h-full p-4">
                <Outlet/>
            </main>

        </div>
    )
}

export default AdminPanel
