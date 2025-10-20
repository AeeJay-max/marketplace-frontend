import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiinput from '../common'
import { FaStar } from 'react-icons/fa'
import { FaStarHalfAlt } from 'react-icons/fa'
import displayCurrency from '../configer/currencyDisplay'
import CategoryWiseProduct from '../components/CategoryWiseProduct'
import addToCart from '../configer/addToCart'
import Context from '../context'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)
  const [actionImage, setActionImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()


  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(apiinput.productDetails.url, {
      method: apiinput.productDetails.method,
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify({
        productid: params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActionImage(dataResponse?.data?.productImage[0])

  }


  useEffect(() => {
    fetchProductDetails()
  }, [params.id])

  const handleMouseEnterProduct = (imageURL) => {
    setActionImage(imageURL)
  }

  const handleZoom = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    requestAnimationFrame(() => {
      setZoomImageCoordinate({
        x,
        y
      })
    })
  }, [])

  const handleZoomOutImage = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart-view")
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 relative p-2'>
            <img src={actionImage || undefined} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoom} onMouseLeave={handleZoomOutImage} />
            {/* Product Zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] overflow-hidden bg-slate-300 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] bg-slate-300 mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${actionImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                      backgroundSize: "200%"
                    }}
                  >
                  </div>
                </div>
              )
            }

          </div>
          <div className='h-full'>
            {loading ? (

              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                  productImageListLoading.map((el, index) => {
                    return (
                      <div className='h-20 w-20 bg-slate-300 rounded animate-pulse' key={"loadingImage" + index}>

                      </div>
                    )
                  })
                }
              </div>

            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                  data?.productImage?.map((imgURL, index) => {
                    return (
                      <div className='h-20 w-20 bg-slate-300 rounded p-1' key={imgURL}>
                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                      </div>
                    )
                  })
                }
              </div>
            )
            }
          </div>
        </div>

        {/* Product Details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-300 animate-pulse h-4 rounded-full inline-block w-full max-w-[100px]'></p>
              <h2 className=' font-medium bg-slate-300 animate-pulse h-4'></h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-yellow-500 flex items-center gap-0.5'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1'>
                <p className='text-blue-600'>{displayCurrency(data?.sellingPrice)}</p>
                <p className='line-through text-slate-500'>{displayCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3'>
                <button className='bg-cyan-500 border-2 px-3 py-1 min-w-[100px] rounded-md hover:bg-cyan-600 hover:scale-105 border-white text-white font-semibold'>Buy</button>
                <button className='border-2 px-3 py-1 min-w-[100px] rounded-md hover:scale-105 border-cyan-500 hover:border-cyan-600 text-black font-semibold'>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-700 font-medium my-1'>Description : </p>
                <p>{data?.description}</p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-blue-200 text-blue-600 px-7 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='text-yellow-500 flex items-center gap-0.5'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1'>
                <p className='text-blue-600'>{displayCurrency(data?.sellingPrice)}</p>
                <p className='line-through text-slate-500'>{displayCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3'>
                <button className='bg-cyan-500 border-2 px-3 py-1 min-w-[100px] rounded-md hover:bg-cyan-600 hover:scale-105 border-white text-white font-semibold' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                <button className='border-2 px-3 py-1 min-w-[100px] rounded-md hover:scale-105 border-cyan-500 hover:border-cyan-600 text-black font-semibold' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-700 font-medium my-1'>Description : </p>
                <p>{data?.description}</p>
              </div>
            </div>
          )
        }

      </div>

      {
        data?.category && (
          <CategoryWiseProduct category={data?.category} heading={`Similar Products`} />
        )
      }




    </div>
  )
}

export default ProductDetails
