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

            <div class="snap-y snap-mandatory h-screen overflow-scroll overflow-x-hidden">
                <div className="snap-start w-screen h-screen flex relative font-pixel">
                    <Image
                        src={IsekaiBg}
                        alt="Isekai Store"
                        className="object-cover"
                    />
                    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-30">
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
                        <h1 className="text-5xl md:text-7xl text-white font-bold mb-20 text-center">
                            CONFIRM
                        </h1>
                        <p className="text-white text-2xl md:text-3xl text-center mb-10">
                            Are you sure you want to enter the Isekai Store?
                        </p>
                        <div className="flex space-x-2">
                            <div className="btn px-10 border border-white text-2xl text-white">
                                <a href="#products">YES</a>
                            </div>
                            <div className="btn px-10 border border-white text-2xl text-white">
                                <a href="https://google.com">NO</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 z-10 flex h-1/6 md:h-1/4 w-full space-x-10 md:space-x-28 justify-center">
                        <img
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c1151233-3650-45b0-aca8-bbbd0a59253e/da3t1zv-afad1d43-8972-4b43-b260-5eb4668a2740.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxMTUxMjMzLTM2NTAtNDViMC1hY2E4LWJiYmQwYTU5MjUzZVwvZGEzdDF6di1hZmFkMWQ0My04OTcyLTRiNDMtYjI2MC01ZWI0NjY4YTI3NDAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nJjF_Rq8GBLXVaGcec2kk9_P9U_nZ8ofsRzjGpLJyx0"
                            alt="megumin"
                        />
                        <img
                            src="https://c.tenor.com/9ct7xsTxUGAAAAAi/isekai-maou-to-shoukan-sheera.gif"
                            alt="isekai maou"
                        />
                    </div>
                </div>

                <section id="products">
                    <div class="snap-start bg-teal-200 w-screen  h-screen flex items-center justify-center text-8xl">
                        Coming Soon....
                    </div>
                </section>
                <div class="snap-start bg-cyan-200 w-screen h-screen flex items-center justify-center text-8xl">
                    Coming Soon....
                </div>
                <div class="snap-start bg-fuchsia-200 w-screen h-screen flex items-center justify-center text-8xl">
                    Coming Soon....
                </div>
            </div>
        </>
    )
}
