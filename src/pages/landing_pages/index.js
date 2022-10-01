import Head from 'next/head'
import Slide1 from './slide1'
import Slide2 from './slide2'
import Slide3 from './slide3'

export default function LandingPages() {
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

            <div class="h-screen overflow-x-hidden">
                <Slide1 />
                <Slide2 />
                <Slide3 />
            </div>
        </>
    )
}
