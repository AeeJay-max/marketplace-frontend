import React, { useContext } from 'react'
import displayCurrency from '../configer/currencyDisplay'
import Context from '../context'
import addToCart from '../configer/addToCart'
import scrollTop from '../configer/smoothmovementtop'
import { Link } from 'react-router-dom'

const VerticalProductCard = ({loading, data = []}) => {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center items-center md:gap-6 overflow-x-scroll scrollbar-none'>
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-sky-100 rounded-sm shadow'>
                                <div className='bg-slate-300 h-48 p-4 min-w-[200px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                                <div className='p-2 grid w-full gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-300 p-1 py-3 animate-pulse rounded-full w-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 py-2 bg-slate-300 animate-pulse rounded-full'></p>
                                    <div className='flex gap-4'>
                                        <p className='text-blue-600 font-medium p-1 py-1 bg-slate-300 animate-pulse rounded-full w-full'></p>
                                        <p className='text-slate-500 font-medium p-1 py-1 bg-slate-300 animate-pulse rounded-full w-full'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-2 rounded-full animate-pulse bg-slate-300 w-full'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link
                                to={`/product/${product?._id}`}
                                key={product?._id || index}
                                className='w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] bg-sky-100 rounded-sm shadow mb-10 '
                                onClick={scrollTop}
                            >
                                <div className='bg-slate-300 h-48 p-4 min-w-[200px] md:min-w-[145px] flex justify-center items-center'>
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.productName}
                                        className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                                    />
                                </div>
                                <div className='p-2 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-4'>
                                        <p className='text-blue-600 font-medium'>{displayCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                                    </div>
                                    <button
                                        className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
  )
}

export default VerticalProductCard
