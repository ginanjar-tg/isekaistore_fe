import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Head from 'next/head.js'
import Loading from '../../public/frog.gif'
import Image from 'next/image'
import LandingPages from './landing_pages'
import React, {Component} from 'react'

// fungsi untuk fetch data
function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                <>
                    <Head />
                    <LandingPages />
                </>,
            ])
        }, 3000)
    }, )
}

// fungsi utama
export default function Home() {
    const el = useRef()

    const [data, setData] = useState([])
    const [loadingState, setLoadingState] = useState()

    //check child component image resource still load or no
    const [loadIMG , setLoadIMG] = useState(true)
    //change state when child passing variable to this component
    const handleLoad = (loadIMG) => {
        setLoadIMG(loadIMG)
    }

    useEffect(() => {
        if (loadingState !== 'start') return

        const loadData = async () => {
            const data = await fetchData()
            setData(data)
            //moving setLoadState('complete')
        }
        loadData()
    }, [loadingState])

    //Load complete depend on loadIMG state. if still load(true) keep PreLoad Screen
    useEffect(() => {
        if (!loadIMG) {
            setLoadingState('complete')
            console.log("loadIMG state update")
        }
    }, [loadIMG])

    useLayoutEffect(() => {
        if (loadingState !== 'complete') return
    }, [loadingState])

    return (
        <div ref={el} className=" overflow-hidden ">
            {!loadingState ? setLoadingState('start') : null}
            {loadingState === 'start' ? (
                <div className="flex h-screen w-screen bg-gray-900 fixed z-50">
                    <div className="m-auto">
                        <Image src={Loading} alt="loading..." priority={true}/>
                        <div className="text-center text-white font-semibold italic py-5 text-2xl">
                            Wait a moment . . .
                        </div>
                    </div>
                </div>
            ) : null}
            {data.map(() => (
                <>
                    <Head>
                        <title>Isekai Store</title>
                    </Head>
                    {/* passing function to child component */}
                    <LandingPages onLoadIMG={handleLoad} />
                </>
            ))}
        </div>
    )
}
