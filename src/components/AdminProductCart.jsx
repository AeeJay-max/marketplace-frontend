import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayCurrency from '../configer/currencyDisplay'

const AdminProductCart = ({
    data,
    fetchdata
}) => {
    const [editproduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-48'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full' />
                </div>

                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                            displayCurrency(data.sellingPrice)
                        }
                    </p>
                    <div className='w-fit ml-auto p-2 bg-green-100 rounded-full hover:bg-green-200 cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>


            </div>


            {
                editproduct && (
                    <AdminEditProduct data1={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }


        </div>
    )
}

export default AdminProductCart
