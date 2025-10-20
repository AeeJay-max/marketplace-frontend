import React, { useEffect, useState } from 'react'

import image2 from '../assest/banner/GAMING Headphones.jpg'
import image3 from '../assest/banner/Aee Jay.jpg'
import image4 from '../assest/banner/Only At Aee Jay Shop (1600 x 520 mm).jpg'
import image5 from '../assest/banner/tatendaajmakura@gmail.com.jpg'
import Picture1 from '../assest/Picture1.jpg'

import image2Mobile from '../assest/banner/GAMING Headphones (600 x 692 mm).jpg'
import image3Mobile from '../assest/banner/Sale.jpg'
import image4Mobile from '../assest/banner/Only At Aee Jay Shop (1600 x 520 mm) (1).jpg'
import image5Mobile from '../assest/banner/tatendaajmakura@gmail.com (600 x 692 mm).jpg'

import { FaAngleRight } from "react-icons/fa6"
import { FaAngleLeft } from "react-icons/fa6"


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopimgs = [
        Picture1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileimgs = [
        Picture1,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextBanner = () => {
        if (desktopimgs.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }

    }
    const previousBanner = () => {
        if (currentImage !== 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopimgs.length - 1 > currentImage) {
                nextBanner()
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className=' h-50 md:h-72 w-full bg-slate-300 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={previousBanner} className='bg-white rounded-full shadow-lg p-0.5'><FaAngleLeft /></button>
                        <button onClick={nextBanner} className='bg-white rounded-full shadow-lg p-0.5'><FaAngleRight /></button>
                    </div>
                </div>

                {/* Desktop and Tablet Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopimgs.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translatex(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/* Mobile Version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileimgs.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translatex(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
