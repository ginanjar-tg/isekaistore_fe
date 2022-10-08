import React from 'react'
import Image from 'next/image'
import ShopBg from '../../../public/shop.png'
import ShopKeeper from '../../../public/shopkeeper.png'
import Head from 'next/head'

const Page2 = () => {
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

            <div className="overflow-hidden w-screen h-screen flex relative font-pixel">
                <Image
                    src={ShopBg}
                    alt="Isekai Store"
                    className="object-cover"
                />
                <div className="absolute flex flex-col p-10 md:p-32 mt-32 md:mt-0">
                    <div className="w-full md:w-1/3">
                        <Image
                            src={ShopKeeper}
                            alt="Isekai Store"
                            className="object-contain"
                        />
                    </div>
                    <div className=" w-full bg-black/90 p-5 rounded-2xl outline-4 outline-white outline">
                        <div className="text-3xl md:text-5xl text-white font-bold text-center">
                            WELCOME ADVENTURER!
                        </div>
                        <p className="text-white text-2xl md:text-3xl text-center py-5">
                            May I help you?
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page2
