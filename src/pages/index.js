import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import IsekaiBg from '../../public/isekai_bg.jpg'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Isekai Store</title>
            </Head>

            <div className="w-screen h-screen flex">
                <Image
                    src={IsekaiBg}
                    alt="Isekai Store"
                    className="object-cover relative"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
                    <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                        {user ? (
                            <Link href="/dashboard">
                                <a className="ml-4 text-sm text-white underline">
                                    Dashboard
                                </a>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <a className="text-sm text-white underline">
                                        Login
                                    </a>
                                </Link>

                                <Link href="/register">
                                    <a className="ml-4 text-sm text-white underline">
                                        Register
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                    <h1 className="text-5xl text-white font-bold mb-4">
                        Isekai Store
                    </h1>
                    <p className="text-white text-2xl mb-4">
                        Welcome to the Isekai Store!
                    </p>
                </div>
            </div>
        </>
    )
}
