import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../configer/productCategory'
import apiinput from '../common'
import VerticalProductCard from '../components/VerticalProductCard'

const CategoryProduct = () => {

  const params = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)  
  const [selectedCategory, setSelectedCategory] = useState({})
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(apiinput.filteritems.url, {
        method: apiinput.filteritems.method || "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      })

      const responseData = await response.json()
      setData(Array.isArray(responseData?.data) ? responseData.data : [])
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target

    setSelectedCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectedCategory)
      .filter((key) => selectedCategory[key])

    setFilterCategoryList(arrayOfCategory)
  }, [selectedCategory])

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target

    setSortBy(value)

    if (value === "asc") {
      setData(preve => preve.sort((a,b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === "dsc") {
      setData(preve => preve.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>

      {/* Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>

        {/* Left side */}
        <div className='bg-white p-2 min-h-fit max-h-fit overflow-y-scroll'>
          {/* Sort By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b py-1 border-slate-600'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"asc"} checked={sortBy === "asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b py-1 border-slate-600'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              {Array.isArray(productCategory) && productCategory.map((categoryName, index) => (
                <div key={categoryName?.value || index} className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    name='category'
                    checked={selectedCategory[categoryName?.value] || false}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side (product) */}
        <div className='pb-10'>
          {
            loading ? (
              <p className="text-center">Loading...</p>
            ) : data.length !== 0 ? (
              <VerticalProductCard data={data} loading={loading} />
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
