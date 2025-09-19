import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, Eye, X, CheckCircle } from 'lucide-react';
import { Reservation } from '../types';

interface MyReservationsProps {
  reservations: Reservation[];
  onCancelReservation: (reservationId: string) => void;
}

export default function MyReservations({ reservations, onCancelReservation }: MyReservationsProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCancelReservation = (reservationId: string) => {
    setCancellingId(reservationId);
    setTimeout(() => {
      onCancelReservation(reservationId);
      setCancellingId(null);
      if (selectedReservation?.id === reservationId) {
        setSelectedReservation(null);
      }
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canCancel = (reservation: Reservation) => {
    const today = new Date();
    const startDate = new Date(reservation.startDate);
    return reservation.status === 'confirmed' && startDate > today;
  };

  if (reservations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Reservations Yet</h2>
          <p className="text-gray-600 mb-6">You haven't made any reservations yet. Start exploring available properties!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reservations</h1>
        <p className="text-gray-600">Manage your current and past reservations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reservations List */}
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{reservation.property.title}</h3>
                    <p className="text-sm text-gray-600">{reservation.property.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">${reservation.totalAmount}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedReservation(reservation)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </button>
                    {canCancel(reservation) && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        disabled={cancellingId === reservation.id}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center disabled:opacity-50"
                      >
                        {cancellingId === reservation.id ? (
                          <>
                            <div className="animate-spin h-3 w-3 mr-1 border border-red-600 border-t-transparent rounded-full"></div>
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            Cancel
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation Details */}
        <div className="lg:sticky lg:top-8">
          {selectedReservation ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary-900">Reservation Details</h3>
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <img 
                  src={selectedReservation.property.images[0]}
                  alt={selectedReservation.property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedReservation.property.title}</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{selectedReservation.property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(selectedReservation.startDate)} - {formatDate(selectedReservation.endDate)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Contact Information</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>{selectedReservation.customerName}</div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedReservation.customerEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedReservation.customerPhone}
                    </div>
                  </div>
                </div>

                {selectedReservation.notes && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Special Requests</h5>
                    <p className="text-sm text-gray-600">{selectedReservation.notes}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center font-semibold text-gray-900">
                    <span>Total Amount:</span>
                    <span>${selectedReservation.totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 p-3 bg-gray-50 rounded-lg">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center ${getStatusBadge(selectedReservation.status)}`}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {selectedReservation.status}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Reservation</h3>
              <p className="text-gray-600">Click on any reservation to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}