import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiinput from '../common'
import VerticalProductCard from '../components/VerticalProductCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("query", query.search)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(apiinput.searchitems.url + query.search)
      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [query.search])

  return (
    <div className='container mx-auto p-4'>
      {loading && (
        <p className='text-xl text-center animate-pulse'>Loading...</p>
      )}

      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {data.length === 0 && !loading && (
        <p className='bg-white text-xl text-center animate-pulse p-4'>
          No Data Found...
        </p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalProductCard loading={loading} data={data} />
      )}
    </div>
  )
}

export default SearchProduct
