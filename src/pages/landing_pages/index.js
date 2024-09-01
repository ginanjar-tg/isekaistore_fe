import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import IsekaiBg from '../../../public/isekai_bg.webp'
import LoginRegister from './login_register'
import ShopFlowManager from './shop_flow_manager'
import Page2 from './page2'
import Page3 from './page3'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper'
import { useEffect } from 'react'

//import material
import megumin from '../../../public/megumin.gif'
import isekaimaou from '../../../public/isekaimaou.gif'

export default function LandingPages(props) {
    const [isShown, setIsShown] = useState(false)
    const [messageShown, setMessageShown] = useState(false);
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

    const handleNoClick = () => {
        setMessageShown(true);
        setNotShown(false);
    }

    return (
        <>
            <Head>
                <title>Isekai Store</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="h-screen overflow-hidden">
                <Swiper
                    className="h-screen"
                    tag="div"
                    speed={400}
                    direction={'vertical'}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                    mousewheel={{}}
                >
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
                                        Are you sure you want to enter the Isekai Store?
                                    </p>
                                    {notShown && (
                                        <div className="grid grid-cols-2 justify-center items-center space-x-5 p-5">
                                            <button
                                                onClick={handleClick}
                                                className="btn bg-blue-600 text-white text-2xl">
                                                YES
                                            </button>
                                            <button
                                                onClick={handleNoClick}
                                                className="btn bg-blue-600 text-white text-2xl">
                                                NO
                                            </button>
                                        </div>
                                    )}

                                    {isShown && (
                                        <div className="text-white text-2xl md:text-3xl text-center">
                                            - YES - <br />
                                            <p className="py-5">
                                                Great! Now scroll down to go inside the store.
                                            </p>
                                        </div>
                                    )}

                                    {messageShown && (
                                        <div className="text-white text-2xl md:text-3xl text-center py-5">
                                            Alright then, have a nice day!
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="absolute bottom-0 z-10 flex h-1/6 md:h-1/4 w-full space-x-10 md:space-x-28 justify-center">
                                <div className='w-40 h-full flex'>
                                    <Image className='object-contain' src={megumin} alt="megumin" onLoadingComplete={() => setImgMegumin(true)} />
                                </div>
                                <div className='w-80 h-full flex'>
                                    <Image className='object-contain' src={isekaimaou} alt="isekai maou" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {isShown && (
                        <SwiperSlide>
                            <ShopFlowManager />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    );
}
