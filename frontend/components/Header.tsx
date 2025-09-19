import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Role } from '../types';
import Button from './common/Button';

const CandyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.63.78 3.08 2 4l-3.39 3.39c-.59.59-.59 1.54 0 2.12l4.24 4.24c.59.59 1.54.59 2.12 0L15 17.37l3.39 3.39c.59.59 1.54.59 2.12 0l.71-.71c.59-.59.59-1.54 0-2.12L17.83 14H18c2.76 0 5-2.24 5-5s-2.24-5-5-5h-1c-1.38 0-2.63.56-3.54 1.46C13.56 2.56 12.38 2 11 2zm0 2c.76 0 1.45.34 1.91.87l-.92.92C12.55 5.34 12.05 5 11 5c-1.66 0-3 1.34-3 3s1.34 3 3 3c.47 0 .9-.11 1.29-.3l.71.71C12.53 11.89 12 12 11 12c-2.21 0-4-1.79-4-4s1.79-4 4-4zm6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
    </svg>
);


const ShoppingCartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const navLinkClasses = "text-neutral-700 hover:text-primary transition-colors duration-300 font-medium";
    const activeLinkClasses = "text-primary";

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 w-full">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <CandyIcon className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-neutral-900">The Sweet Spot</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                    {user?.role === Role.USER && (
                        <NavLink to="/orders" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>My Orders</NavLink>
                    )}
                    {user?.role === Role.ADMIN && (
                        <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Admin Dashboard</NavLink>
                    )}
                    <NavLink to="/cart" className={({ isActive }) => `${navLinkClasses} relative ${isActive ? activeLinkClasses : ''}`}>
                        <ShoppingCartIcon className="h-6 w-6"/>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.reduce((acc, item) => acc + item.purchaseQuantity, 0)}
                            </span>
                        )}
                    </NavLink>

                    {user ? (
                         <Button onClick={handleLogout} variant="primary" className="text-sm">Logout</Button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <Button variant="secondary" className="text-sm">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" className="text-sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;