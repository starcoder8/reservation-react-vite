import React from 'react';
import { CheckCircle, Calendar, MapPin, Mail, Phone, Download } from 'lucide-react';
import { Reservation } from '../types';

interface ConfirmationPageProps {
  reservation: Reservation;
  onContinue: () => void;
}

export default function ConfirmationPage({ reservation, onContinue }: ConfirmationPageProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDuration = () => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h1>
        <p className="text-gray-600">Your reservation has been successfully created.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary-900">Reservation Details</h2>
            <span className="text-sm font-medium text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
              ID: {reservation.id}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img 
                src={reservation.property.images[0]}
                alt={reservation.property.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{reservation.property.title}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{reservation.property.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}</span>
                </div>
                <div className="text-sm">
                  Duration: {getDuration()} days
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-1 text-gray-600">
                <div>{reservation.customerName}</div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {reservation.customerEmail}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {reservation.customerPhone}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Summary</h4>
              <div className="space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>Rate per day:</span>
                  <span>${reservation.property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{getDuration()} days</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span>${reservation.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {reservation.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Special Requests</h4>
              <p className="text-gray-600">{reservation.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• A confirmation email has been sent to {reservation.customerEmail}</li>
          <li>• You can view and manage this reservation in "My Reservations"</li>
          <li>• Contact us if you need to make any changes</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onContinue}
          className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          View My Reservations
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center">
          <Download className="h-4 w-4 mr-2" />
          Download Confirmation
        </button>
      </div>
    </div>
  );
}