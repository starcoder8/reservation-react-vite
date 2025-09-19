import React from 'react';
import { MapPin, Ruler, Calendar, Star, Car, Home, Package } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'parking': return <Car className="h-5 w-5" />;
      case 'apartment': return <Home className="h-5 w-5" />;
      case 'storage': return <Package className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'parking': return 'bg-primary-100 text-primary-700';
      case 'apartment': return 'bg-secondary-100 text-secondary-700';
      case 'storage': return 'bg-accent-100 text-accent-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(property.type)}`}>
          {getTypeIcon(property.type)}
          <span className="capitalize">{property.type}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <Ruler className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.size}</span>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${property.price}
            <span className="text-sm font-normal text-gray-600">/day</span>
          </div>
          
          <button
            onClick={() => onSelect(property)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            View Details
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}