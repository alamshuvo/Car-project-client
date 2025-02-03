import NavBar from '@/components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='flex justify-center'>
            <div className='w-10/12 max-w-screen-2xl'>
                <NavBar />
                <div className='flex justify-center min-h-screen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;