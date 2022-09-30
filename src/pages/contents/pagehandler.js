import Head from 'next/head'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'

export default function Pagehandler() {
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
                <Page1 />
                <Page2 />
                <Page3 />
            </div>
        </>
    )
}
