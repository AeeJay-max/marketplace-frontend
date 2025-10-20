import React, { useContext, useEffect, useState } from 'react'
import apiinput from '../common'
import Context from '../context'
import displayCurrency from '../configer/currencyDisplay'
import { MdDeleteSweep } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount || 3).fill(null)

  // Fetch cart data
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(apiinput.cartviewproducts.url, {
        method: apiinput.cartviewproducts.method,
        credentials: "include",
        headers: { "content-type": "application/json" }
      })

      const responseData = await response.json()

      if (responseData.success) setData(responseData.data)

    } catch (err) {
      console.error("Error fetching cart:", err)
    } finally {
      setLoading(false)
    }
  }
  

  useEffect(() => {
    fetchData()
  }, [])

  // Increase quantity
  const increaseQnty = async (id) => {
    setData(prev => prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
    try {
      const response = await fetch(apiinput.updateProductQuantity.url, {
        method: apiinput.updateProductQuantity.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: data.find(item => item._id === id)?.quantity + 1 })
      })

      const responseData = await response.json()

      if (!responseData.success) fetchData()

    } catch (err) {
      console.error("Error increasing quantity:", err)
      fetchData()
    }
  }

  // Decrease quantity
  const decreaseQnty = async (id) => {

    const item = data.find(i => i._id === id)

    if (item.quantity < 2)
      return setData(prev => prev.map(i => i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
    try {
      const response = await fetch(apiinput.updateProductQuantity.url, {
        method: apiinput.updateProductQuantity.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: item.quantity - 1 })
      })

      const responseData = await response.json()

      if (!responseData.success) fetchData()

    } catch (err) {
      console.error("Error decreasing quantity:", err)
      fetchData()
    }
  }

  // Delete product from cart
  const deleteCartProduct = async (id) => {
    setData(prev => prev.filter(item => item._id !== id))
    try {
      const response = await fetch(apiinput.deleteProductCart.url, {
        method: apiinput.deleteProductCart.method,
        credentials: 'include',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id })
      })

      const responseData = await response.json()

      if (!responseData.success) fetchData()

    } catch (err) {
      console.error("Error deleting product:", err)
      fetchData()
    }
  }

  // Calculate total
  const total = data.reduce((acc, item) => acc + (item.quantity * (item.productid?.sellingPrice || 0)), 0)

  return (
    <div className='container mx-auto px-5'>
      <div className='text-center text-xl my-3'>
        {data.length === 0 && !loading && <p className='bg-white py-5'>No Data</p>}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View Products */}
        <div className='w-full max-w-3xl mb-20'>
          {loading ? (
            loadingCart.map((_, index) => (
              <div key={index} className='w-full bg-slate-300 h-32 my-2 border border-slate-500 animate-pulse rounded'></div>
            ))
          ) : (
            data.map(product => (
              <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-500 rounded grid grid-cols-[128px,1fr]'>
                <div className='w-32 h-32 bg-slate-300'>
                  <img
                    src={product?.productid?.productImage[0]}
                    alt={product?.productid?.productName || "Product Image"}
                    className='w-full h-full object-scale-down mix-blend-multiply'
                  />
                </div>
                <div className='px-4 py-1 relative'>
                  {/* Delete Product */}
                  <div className='absolute right-0 text-red-600 hover:bg-red-600 hover:text-white rounded-full p-2 cursor-pointer' onClick={() => deleteCartProduct(product?._id)} >
                    <MdDeleteSweep />
                  </div>
                  <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productid?.productName}</h2>
                  <p className='capitalize text-slate-400'>{product?.productid?.category}</p>
                  <p className='text-blue-600 font-medium text-lg'>{displayCurrency(product?.productid?.sellingPrice)}</p>
                  <div className='flex items-center gap-3 mt-3'>
                    <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQnty(product?._id)} >-</button>
                    <span>{product?.quantity}</span>
                    <button className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQnty(product?._id)} >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {loading ? (
            <div className='h-36 bg-slate-300 border border-slate-400 animate-pulse'></div>
          ) : (
            <div className='h-36 bg-white border border-slate-400 rounded p-4 flex flex-col justify-center items-center'>
              <h2 className='text-lg font-medium mb-2 bg-blue-600 text-white'>Total</h2>
              <p className='text-blue-600 text-xl font-semibold'>{displayCurrency(total)}</p>
              <button className='bg-blue-600 text-white'>Purchase</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
