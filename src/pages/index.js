import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Head from 'next/head.js'
import Loading from '../../public/frog.gif'
import Image from 'next/image'
import LandingPages from './landing_pages'

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
        }, 5000)
    })
}

// fungsi utama
export default function Home() {
    const el = useRef()

    const [data, setData] = useState([])
    const [loadingState, setLoadingState] = useState()

    useEffect(() => {
        if (loadingState !== 'start') return

        const loadData = async () => {
            const data = await fetchData()
            setData(data)
            setLoadingState('complete')
        }
        loadData()
    }, [loadingState])

    useLayoutEffect(() => {
        if (loadingState !== 'complete') return
    }, [loadingState])

    return (
        <div ref={el}>
            {!loadingState ? setLoadingState('start') : null}
            {loadingState === 'start' ? (
                <div className="flex h-screen w-screen bg-gray-900">
                    <div className="m-auto">
                        <Image src={Loading} alt="loading..." />
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
                    <LandingPages />
                </>
            ))}
        </div>
    )
}
