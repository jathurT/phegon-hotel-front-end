import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
                </div>
                
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div className="flex-1 min-w-0">
                            <div className="max-w-xl w-full">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Filter by Booking Number:
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        id="search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Enter booking number"
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full py-2 px-3 border border-gray-300 rounded-md sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-md">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {currentBookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No bookings found matching your criteria.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {currentBookings.map((booking) => (
                                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                            <div className="p-5">
                                                <div className="flex justify-between items-start">
                                                    <div className="mb-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500">
                                                        {booking.totalNumOfGuest} {booking.totalNumOfGuest === 1 ? 'Guest' : 'Guests'}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-500">Booking Code</p>
                                                <p className="font-medium text-gray-900 mb-2">{booking.bookingConfirmationCode}</p>
                                                <div className="grid grid-cols-2 gap-4 my-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Check-in</p>
                                                        <p className="text-sm font-medium">{booking.checkInDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Check-out</p>
                                                        <p className="text-sm font-medium">{booking.checkOutDate}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <button
                                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                        onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                                    >
                                                        Manage Booking
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <Pagination
                                roomsPerPage={bookingsPerPage}
                                totalRooms={filteredBookings.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBookingsPage;
