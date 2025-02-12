import './navbar.scss';
import { useState } from 'react';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const sliderStyle = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        fontSize: '22px',
        fontWeight: 'bold',
        gap: '40px',
        top: '64px',
        right: open ? '0' : '-1800px',
        transition: '0.3s ease-in-out',
        zIndex: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
    };

    return (
        <div className="navbar">
            {/* LOGO */}
            <Link to="/">
                <div className="contentNavbar">
                    <Image src="logo.png" alt="fanCode88" w={32} h={32} />
                    <span>FanCode88.</span>
                </div>
            </Link>
            {/* MENU MENIU */}
            <div className="mobileMenu">
                <button onClick={() => setOpen(!open)}>
                    {open ? 'X' : '≡'}
                </button>
            </div>
            {/* MENU */}
            <div style={sliderStyle} className="slider">
                <div className="links">
                    <Link to="/">Home2</Link>
                    <Link to="/">Trending</Link>
                    <Link to="/">Most Popular</Link>
                    <Link to="/">About</Link>

                    <Link to="/login">
                        <button className="loginBtn">Login 👋</button>
                    </Link>
                </div>
            </div>
            {/* DESKTOP MENIU */}
            <div className="deskMenu">
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>

                <SignedOut>
                    <Link to="/login">
                        <button className="loginBtn">Login 👋</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;
