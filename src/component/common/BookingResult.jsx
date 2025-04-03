import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  if (!bookingSearchResults || bookingSearchResults.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookingSearchResults.map((booking) => (
        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Room ID</p>
                <p className="font-medium">{booking.roomId}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                booking.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-sm font-medium">{booking.userId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="text-sm font-medium">{booking.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">End Date</p>
                <p className="text-sm font-medium">{booking.endDate}</p>
              </div>
            </div>
            
            <Link 
              to={`/admin/edit-booking/${booking.id}`} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingResult;