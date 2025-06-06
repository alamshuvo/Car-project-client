import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <div className='flex justify-center min-h-screen bg-gray-50'>
                <div className='w-11/12 md:w-10/12 max-w-screen-2xl'>
                   <NavBar />
                    <div className='flex justify-center'>
                        <Outlet />
                    </div>

                    <Footer />
                </div>
            </div>http://localhost:5173/src/assets/images/car_cropped.png
        </>

    );
};

export default MainLayout;