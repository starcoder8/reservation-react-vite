import React, { useState } from 'react';
import { ArrowLeft, MapPin, Ruler, Calendar, Check, X } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onReserve: (property: Property) => void;
}

export default function PropertyDetail({ property, onBack, onReserve }: PropertyDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const generateAvailabilityCalendar = () => {
    const calendar = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const isBooked = property.bookedDates.includes(dateStr);
      const isPast = d < today;
      
      calendar.push({
        date: new Date(d),
        dateStr,
        isBooked,
        isPast,
        isAvailable: !isBooked && !isPast
      });
    }
    
    return calendar;
  };

  const calendar = generateAvailabilityCalendar();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <img 
              src={property.images[selectedImage]}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-500' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`${property.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{property.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <Ruler className="h-5 w-5 mr-2" />
            <span>{property.size}</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${property.price}
            <span className="text-lg font-normal text-gray-600">/day</span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{property.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onReserve(property)}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
          >
            Reserve Now
          </button>
        </div>
      </div>

      {/* Availability Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <Calendar className="h-5 w-5 inline mr-2" />
          Availability Calendar - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendar.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-lg text-sm ${
                day.isPast
                  ? 'text-gray-400 bg-gray-100'
                  : day.isBooked
                  ? 'text-red-700 bg-red-100'
                  : 'text-green-700 bg-green-100 cursor-pointer hover:bg-green-200'
              }`}
            >
              <div className="flex items-center justify-center h-6">
                {day.date.getDate()}
                {day.isBooked && <X className="h-3 w-3 ml-1" />}
                {day.isAvailable && <Check className="h-3 w-3 ml-1" />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
            <span className="text-gray-600">Past</span>
          </div>
        </div>
      </div>
    </div>
  );
}