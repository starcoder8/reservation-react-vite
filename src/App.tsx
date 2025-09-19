import React, { useState } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import ReservationForm from './components/ReservationForm';
import ConfirmationPage from './components/ConfirmationPage';
import MyReservations from './components/MyReservations';
import { mockProperties, mockReservations } from './data/mockData';
import { Property, Reservation, SearchFilters } from './types';

type AppPage = 'browse' | 'detail' | 'reserve' | 'confirmation' | 'reservations';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('browse');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    location: '',
    minSize: 0,
    maxSize: 0,
    startDate: '',
    endDate: ''
  });

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
    if (page !== 'detail' && page !== 'reserve' && page !== 'confirmation') {
      setSelectedProperty(null);
      setCurrentReservation(null);
    }
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('detail');
  };

  const handleReserve = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('reserve');
  };

  const handleReservationSubmit = (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: `RES${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReservations(prev => [...prev, newReservation]);
    setCurrentReservation(newReservation);
    setCurrentPage('confirmation');
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations(prev => prev.map(res => 
      res.id === reservationId ? { ...res, status: 'cancelled' as const } : res
    ));
  };

  const filteredProperties = mockProperties.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Check date availability if dates are selected
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (property.bookedDates.includes(dateStr)) {
          return false;
        }
      }
    }
    
    return true;
  });

  const renderContent = () => {
    switch (currentPage) {
      case 'browse':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Space</h1>
              <p className="text-gray-600">Discover parking spaces, apartments, and storage units available for rent</p>
            </div>

            <FilterPanel filters={filters} onFiltersChange={setFilters} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={handlePropertySelect}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No properties match your current filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        );

      case 'detail':
        return selectedProperty ? (
          <PropertyDetail
            property={selectedProperty}
            onBack={() => setCurrentPage('browse')}
            onReserve={handleReserve}
          />
        ) : null;

      case 'reserve':
        return selectedProperty ? (
          <ReservationForm
            property={selectedProperty}
            onBack={() => setCurrentPage('detail')}
            onSubmit={handleReservationSubmit}
          />
        ) : null;

      case 'confirmation':
        return currentReservation ? (
          <ConfirmationPage
            reservation={currentReservation}
            onContinue={() => setCurrentPage('reservations')}
          />
        ) : null;

      case 'reservations':
        return (
          <MyReservations
            reservations={reservations}
            onCancelReservation={handleCancelReservation}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderContent()}
    </div>
  );
}

export default App;