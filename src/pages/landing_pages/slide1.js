import Image from 'next/image'
import IsekaiBg from '../../../public/isekai_bg.jpg'
import LoginRegister from './login_register'

const Slide1 = () => {
    return (
        <div className="snap-start w-screen h-screen flex relative font-pixel">
            <Image src={IsekaiBg} alt="Isekai Store" className="object-cover" />
            <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-30">
                <LoginRegister />
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
                <img src="/megumin.gif" alt="megumin" />
                <img src="/isekaimaou.gif" alt="isekai maou" />
            </div>
        </div>
    )
}

export default Slide1
