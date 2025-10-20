import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategory from '../configer/fetchCategoryProduct.js'
import displayCurrency from '../configer/currencyDisplay.js'
import { FaAngleRight } from "react-icons/fa6"
import { FaAngleLeft } from "react-icons/fa6"
import { Link } from 'react-router-dom'
import addToCart from '../configer/addToCart.js'
import Context from '../context/index.js'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrolElements = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) => {
       await addToCart(e, id)
       fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategory({ category })
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrolElements.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrolElements.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto p-4 my-2 relative'>

            <h2 className='text-xl font-bold py-2'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth px-4 -mx-4' ref={scrolElements}>

                <button className='bg-white rounded-full shadow-lg p-0.5 absolute left-0 text-lg hidden md:block transition-all' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white rounded-full shadow-lg p-0.5 absolute right-0 text-lg hidden md:block transition-all' onClick={scrollRight}><FaAngleRight /></button>

                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-sky-100 rounded-sm shadow flex border '>
                                    <div className='bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                                    <div className='p-2 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-300 animate-pulse rounded-full'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-300 animate-pulse rounded-full'></p>
                                        <div className='flex gap-4 w-full'>
                                            <p className='text-blue-600 font-medium p-1 bg-slate-300 w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-1 bg-slate-300 w-full animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='text-sm bg-slate-300 text-white px-3 py-0.5 rounded-full w-full animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link key={product?._id || index} to={"product/" + product?._id} className='min-w-[300px] sm:min-w-[220px] md:min-w-[280px] h-36 bg-sky-100 rounded-sm shadow flex border snap-start'>
                                    <div className='bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-125 transition-all' />
                                    </div>
                                    <div className='p-2 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                                        <p className='capitalize text-slate-500 '>{product?.category}</p>
                                        <div className='flex gap-4'>
                                            <p className='text-blue-600 font-medium'>{displayCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full w-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}

export default HorizontalCardProduct
