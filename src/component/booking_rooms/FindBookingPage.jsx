import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please enter a booking confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            setLoading(true);
            // Call API to get booking details
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); // Clear error if successful
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Find Your Booking</h2>
                </div>
                
                <div className="p-6">
                    <div className="mb-8">
                        <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Booking Confirmation Code
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                id="confirmationCode"
                                required
                                placeholder="Enter your booking confirmation code"
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                className="focus:ring-teal-500 focus:border-teal-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                {loading ? 'Searching...' : 'Find'}
                            </button>
                        </div>
                        
                        {error && (
                            <div className="mt-2 text-sm text-red-600">{error}</div>
                        )}
                    </div>
                    
                    {loading && !bookingDetails && (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    )}
                    
                    {bookingDetails && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
                                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Confirmation Code</p>
                                            <p className="font-medium">{bookingDetails.bookingConfirmationCode}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Check-in Date</p>
                                            <p className="font-medium">{bookingDetails.checkInDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Check-out Date</p>
                                            <p className="font-medium">{bookingDetails.checkOutDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Number of Adults</p>
                                            <p className="font-medium">{bookingDetails.numOfAdults}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Number of Children</p>
                                            <p className="font-medium">{bookingDetails.numOfChildren}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Booker Details</h3>
                                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{bookingDetails.user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{bookingDetails.user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone Number</p>
                                            <p className="font-medium">{bookingDetails.user.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Room Details</h3>
                                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                                    <div className="md:flex">
                                        <div className="md:flex-shrink-0">
                                            <img 
                                                src={bookingDetails.room.roomPhotoUrl} 
                                                alt={bookingDetails.room.roomType}
                                                className="h-48 w-full object-cover md:h-full md:w-48" 
                                            />
                                        </div>
                                        <div className="p-4 md:p-6">
                                            <p className="text-sm text-gray-500">Room Type</p>
                                            <p className="text-lg font-medium text-teal-600 mb-2">{bookingDetails.room.roomType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindBookingPage;