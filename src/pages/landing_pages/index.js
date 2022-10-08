import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import IsekaiBg from '../../../public/isekai_bg.jpg'
import LoginRegister from './login_register'
import Slide2 from './slide2'
import Slide3 from './slide3'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper'
import { useEffect } from 'react'

//import material
import megumin from '../../../public/megumin.gif'
import isekaimaou from '../../../public/isekaimaou.gif'

export default function LandingPages(props) {
    const [isShown, setIsShown] = useState(false)
    const [notShown, setNotShown] = useState(true)
    const [imgMegumin, setImgMegumin] = useState(false)

    //Check Image Resource(Currently only megumin gif) then pass value to parent component
    useEffect(() => {
        if (imgMegumin) {
            props.onLoadIMG(false)
            console.log("imagePropsUpdate") //debug
        }
    }, [imgMegumin])

    const handleClick = event => {
        setIsShown(current => !current)
        setNotShown(current => !current)
    }
    return (
        <>
            <Head>
                <title>Isekai Store</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div class="h-screen overflow-hidden">
                <Swiper
                    className="h-screen"
                    tag="div"
                    speed={400}
                    direction={'vertical'}
                    pagination={{ clickable: true }}
                    modules={[
                        Navigation,
                        Pagination,
                        Scrollbar,
                        A11y,
                        Mousewheel,
                    ]}
                    mousewheel={{}}>
                    <SwiperSlide>
                        <div className="w-screen h-screen flex relative font-pixel">
                            <Image
                                src={IsekaiBg}
                                alt="Isekai Store"
                                className="object-cover"
                            />
                            <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-30 p-5">
                                <LoginRegister />
                                <div className="bg-black/90 p-5 rounded-2xl outline-4 outline-white outline">
                                    <h1 className="text-5xl md:text-7xl text-white font-bold text-center">
                                        CONFIRM
                                    </h1>
                                    <p className="text-white text-2xl md:text-3xl text-center py-5">
                                        Are you sure you want to enter the
                                        Isekai Store?
                                    </p>
                                    {notShown && (
                                        <div className="grid grid-cols-2 justify-center items-center space-x-5 p-5">
                                            <button
                                                onClick={handleClick}
                                                className="btn bg-blue-600 text-white text-2xl">
                                                YES
                                            </button>
                                            <button className="btn bg-blue-600 text-white text-2xl">
                                                <a href="https://google.com">
                                                    NO
                                                </a>
                                            </button>
                                        </div>
                                    )}

                                    {isShown && (
                                        <div className="text-white text-2xl md:text-3xl text-center">
                                            - YES - <br />
                                            <p className="py-5">
                                                Great! Now please scroll down to
                                                go inside the store.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="absolute bottom-0 z-10 flex h-1/6 md:h-1/4 w-full space-x-10 md:space-x-28 justify-center">
                                <div className='w-40 h-full flex'>
                                    <Image className='object-contain' src={megumin}
                                        alt="megumin" 
                                        //set Image megumin to true after fully load
                                        onLoadingComplete={() => setImgMegumin(true)}/></div>
                                <div className='w-80 h-full flex'>
                                    <Image className='object-contain' src={isekaimaou} alt="isekai maou" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {isShown && (
                        <SwiperSlide>
                            <Slide2 />
                        </SwiperSlide>
                    )}
                    {isShown && (
                        <SwiperSlide>
                            <Slide3 />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    )
}
