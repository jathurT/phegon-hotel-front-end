import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome, {adminName}
                    </h1>
                    <p className="mt-2 text-teal-100">
                        Manage your hotel properties and bookings from this dashboard.
                    </p>
                </div>
                
                <div className="px-6 py-8 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center">
                                <div className="rounded-full bg-teal-500 p-3">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h2 className="ml-4 text-xl font-semibold text-gray-800">
                                    Manage Rooms
                                </h2>
                            </div>
                            <p className="mt-4 text-gray-600">
                                Add, edit, or remove rooms from your hotel inventory. Update prices, descriptions, and availability.
                            </p>
                            <button 
                                onClick={() => navigate('/admin/manage-rooms')}
                                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Manage Rooms
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="flex items-center">
                                <div className="rounded-full bg-teal-500 p-3">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="ml-4 text-xl font-semibold text-gray-800">
                                    Manage Bookings
                                </h2>
                            </div>
                            <p className="mt-4 text-gray-600">
                                View and manage all current bookings. Check guest details, modify bookings, or archive past reservations.
                            </p>
                            <button 
                                onClick={() => navigate('/admin/manage-bookings')}
                                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Manage Bookings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;