import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();
    
    if (!roomSearchResults || roomSearchResults.length === 0) {
        return null;
    }
    
    return (
        <div className="grid grid-cols-1 gap-6 mt-4">
            {roomSearchResults.map(room => (
                <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img 
                                className="h-48 w-full object-cover md:h-full md:w-48" 
                                src={room.roomPhotoUrl} 
                                alt={room.roomType} 
                            />
                        </div>
                        <div className="p-6 md:flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-teal-600">{room.roomType}</h3>
                                <p className="text-lg font-bold text-gray-800">${room.roomPrice} <span className="text-sm text-gray-600">/ night</span></p>
                            </div>
                            <p className="mt-3 text-gray-600">{room.roomDescription}</p>
                            <div className="mt-6">
                                {isAdmin ? (
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)}
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomResult;