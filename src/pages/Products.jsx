import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import apiinput from '../common'
import AdminProductCart from '../components/AdminProductCart'

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllPoducts = async () => {
    const response = await fetch(apiinput.allProducts.url)
    const dataResponse = await response.json()

    console.log("product", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllPoducts()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:font-medium font-medium transition-all py-1 px-3 rounded-full' onClick={() => { setOpenUploadProduct(true) }}>Upload Product</button>
      </div>

      {/** All Products */}
      <div className='flex items-center flex-wrap mt-1 gap-3 h-[calc(100vh-190)] overflow-y-scroll '>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCart data={product} key={index + "allProduct"} fetchdata={fetchAllPoducts} />
            )
          })
        }
      </div>

      {/** Component to Upload Products */}
      {
        openUploadProduct && (
          <UploadProducts onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllPoducts} />
        )
      }

    </div>
  )
}

export default Products
