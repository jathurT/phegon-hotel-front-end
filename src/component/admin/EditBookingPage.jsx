import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Archive this booking?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The booking was successfully archived");
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !bookingDetails) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Booking Detail</h2>
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
                
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{success}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {bookingDetails && (
                    <div className="p-6">
                        <div className="mb-8">
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
                                    <div>
                                        <p className="text-sm text-gray-500">Guest Email</p>
                                        <p className="font-medium">{bookingDetails.guestEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-8">
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
                        
                        <div className="mb-8">
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
                                        
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-medium mb-2">${bookingDetails.room.roomPrice} / night</p>
                                        
                                        <p className="text-sm text-gray-500">Description</p>
                                        <p className="text-gray-700">{bookingDetails.room.roomDescription}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-6">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => acheiveBooking(bookingDetails.id)}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Archive Booking'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditBookingPage;