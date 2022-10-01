import Image from 'next/image'
import Karyl404 from '../../public/karyl404.jpg'

const NotFoundPage = () => (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-900 text-center">
        <div className="text-center text-white font-bold py-5 text-xl md:text-2xl">
            ERROR 404 : PAGE NOT FOUND
        </div>
        <div className="w-1/2 md:w-1/6">
            <Image src={Karyl404} alt="404 Not Found" className="" />
        </div>
        <div className="text-center text-white py-5 text-base md:text-xl">
            Where are you going? There's nothing here!
        </div>
    </div>
)

export default NotFoundPage
