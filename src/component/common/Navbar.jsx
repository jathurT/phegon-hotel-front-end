import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/home" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-teal-600">Velvet Horizon Hotel</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <NavLink 
                            to="/home" 
                            className={({ isActive }) => 
                                isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500 transition-colors"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/rooms" 
                            className={({ isActive }) => 
                                isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500 transition-colors"
                            }
                        >
                            Rooms
                        </NavLink>
                        <NavLink 
                            to="/find-booking" 
                            className={({ isActive }) => 
                                isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500 transition-colors"
                            }
                        >
                            Find my Booking
                        </NavLink>
                        
                        {isUser && (
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => 
                                    isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500 transition-colors"
                                }
                            >
                                Profile
                            </NavLink>
                        )}
                        
                        {isAdmin && (
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500 transition-colors"
                                }
                            >
                                Admin
                            </NavLink>
                        )}
                        
                        {!isAuthenticated && (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/register" 
                                    className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                        
                        {isAuthenticated && (
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        {/* Implement mobile dropdown menu here */}
                        <button className="text-gray-500 hover:text-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu - can be expanded with useState toggle */}
            <div className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {/* Mobile menu items would go here */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;