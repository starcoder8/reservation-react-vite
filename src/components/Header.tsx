import React from 'react';
import { Building2, Calendar, List } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">ReserveSpace</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onNavigate('browse')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'browse' || currentPage === 'detail'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Browse</span>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('reservations')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'reservations'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <List className="h-4 w-4" />
                <span>My Reservations</span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}