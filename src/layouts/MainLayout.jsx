import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './mainLayout.scss';

const MainLayout = () => {
    return (
        <div className="layout">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
