import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">
                            {user ? `Welcome, ${user.name}` : 'Your Profile'}
                        </h1>
                        <div className="flex space-x-4">
                            <button 
                                onClick={handleEditProfile}
                                className="px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-50"
                            >
                                Edit Profile
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {user && (
                    <div className="p-6">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile Details</h2>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="text-lg text-gray-900">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="text-lg text-gray-900">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-lg text-gray-900">{user.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Booking History</h2>
                            
                            {user.bookings && user.bookings.length > 0 ? (
                                <div className="space-y-6">
                                    {user.bookings.map((booking) => (
                                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                            <div className="sm:flex">
                                                <div className="sm:flex-shrink-0">
                                                    <img className="h-48 w-full object-cover sm:h-full sm:w-48" src={booking.room.roomPhotoUrl} alt={booking.room.roomType} />
                                                </div>
                                                <div className="p-4 sm:p-6 sm:flex-1">
                                                    <div className="flex flex-col h-full">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <h3 className="text-lg font-semibold text-teal-600">{booking.room.roomType}</h3>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Confirmed
                                                                </span>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">Booking Code: <span className="font-medium text-gray-900">{booking.bookingConfirmationCode}</span></p>
                                                        </div>
                                                        
                                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-xs text-gray-500">Check-in Date</p>
                                                                <p className="text-sm font-medium text-gray-900">{booking.checkInDate}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500">Check-out Date</p>
                                                                <p className="text-sm font-medium text-gray-900">{booking.checkOutDate}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500">Total Guests</p>
                                                                <p className="text-sm font-medium text-gray-900">{booking.totalNumOfGuest}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 text-center rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">You don't have any bookings yet.</p>
                                    <button 
                                        onClick={() => navigate('/rooms')}
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        Browse Rooms
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;