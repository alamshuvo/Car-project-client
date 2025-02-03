import { MapPin } from 'lucide-react';
import CarImage from '../../assets/images/car_cropped.png';
import AbstractSphere from '../../assets/images/abstract-3d-sphere.png';
import { Button } from '../ui/button';
const HeaderComponent = () => {
    return (
        <div className='relative flex items-center justify-between h-[400px]'>
            {/* Background Graphics */}
            <div
                className="absolute inset-0 bg-no-repeat bg-contain -z-10 opacity-40"
                style={{ backgroundImage: `url(${AbstractSphere})`, backgroundPosition: 'center' }}
            ></div>
            {/* Floating User Icons */}
            <div className="absolute w-10 h-10 bg-red-500 rounded-full shadow-lg top-10 left-1/4"></div>
            <div className="absolute w-10 h-10 bg-green-500 rounded-full shadow-lg top-24 left-1/3"></div>
            <div className="absolute w-10 h-10 bg-yellow-500 rounded-full shadow-lg top-16 right-1/4"></div>
            <div className="relative z-10">
                <h2 className='font-bold uppercase text-7xl text-blue-950'>
                    Unlock your <MapPin className='inline text-red-500' size={80} /> <br /> travel experience
                </h2>
                <p className="max-w-xl my-4 text-gray-600 md:my-8 ">
                    Lorem ipsum dolor sit amet consectetur. Sagittis augue odio enim lorem tellus.
                    Lorem ipsum dolor sit amet consectetur. Sagittis augue odio enim lorem tellus.

                </p>
                <Button className="p-6 mt-4 font-semibold text-white rounded-md">
                    Booking Now
                </Button>
            </div>
            <img className='absolute right-0 ' src={CarImage} alt="" />
        </div>
    );
};

export default HeaderComponent;