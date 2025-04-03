import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="relative h-96 md:h-[500px] mb-12">
                <div className="absolute inset-0 bg-black">
                    <img 
                        src="./assets/images/hotel.jpg" 
                        alt="Velvet Horizon Hotel" 
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Welcome to <span className="text-orange-400">Velvet Horizon Hotel</span>
                    </h1>
                    <h3 className="text-xl md:text-2xl text-white mt-2">
                        Step into a haven of comfort and care
                    </h3>
                </div>
            </section>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <RoomSearch handleSearchResult={handleSearchResult} />
                
                {roomSearchResults.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Rooms</h2>
                        <RoomResult roomSearchResults={roomSearchResults} />
                    </div>
                )}
                
                <div className="mt-6 text-center">
                    <a href="/rooms" className="text-lg font-medium text-orange-500 hover:text-orange-600 transition-colors">
                        View All Rooms
                    </a>
                </div>
            </div>

            {/* Services Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Services at <span className="text-orange-500">Velvet Horizon Hotel</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Service Card 1 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <img src="./assets/images/ac.png" alt="Air Conditioning" className="h-16 w-16" />
                                </div>
                                <h3 className="text-xl font-bold text-teal-600 mb-2 text-center">Air Conditioning</h3>
                                <p className="text-gray-600 text-center">
                                    Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.
                                </p>
                            </div>
                        </div>
                        
                        {/* Service Card 2 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <img src="./assets/images/mini-bar.png" alt="Mini Bar" className="h-16 w-16" />
                                </div>
                                <h3 className="text-xl font-bold text-teal-600 mb-2 text-center">Mini Bar</h3>
                                <p className="text-gray-600 text-center">
                                    Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.
                                </p>
                            </div>
                        </div>
                        
                        {/* Service Card 3 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <img src="./assets/images/parking.png" alt="Parking" className="h-16 w-16" />
                                </div>
                                <h3 className="text-xl font-bold text-teal-600 mb-2 text-center">Parking</h3>
                                <p className="text-gray-600 text-center">
                                    We offer on-site parking for your convenience. Please inquire about valet parking options if available.
                                </p>
                            </div>
                        </div>
                        
                        {/* Service Card 4 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <img src="./assets/images/wifi.png" alt="WiFi" className="h-16 w-16" />
                                </div>
                                <h3 className="text-xl font-bold text-teal-600 mb-2 text-center">WiFi</h3>
                                <p className="text-gray-600 text-center">
                                    Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;