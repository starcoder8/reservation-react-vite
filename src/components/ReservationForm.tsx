import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Property, Reservation } from '../types';

interface ReservationFormProps {
  property: Property;
  onBack: () => void;
  onSubmit: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
}

export default function ReservationForm({ property, onBack, onSubmit }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }

      // Check for conflicts with existing bookings
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (property.bookedDates.includes(dateStr)) {
          newErrors.startDate = 'Selected dates conflict with existing reservations';
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days * property.price;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const reservation: Omit<Reservation, 'id' | 'createdAt'> = {
      propertyId: property.id,
      property: property,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes,
      status: 'confirmed',
      totalAmount: calculateTotal()
    };

    onSubmit(reservation);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to property details
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <img 
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h2>
          <p className="text-gray-600 mb-4">{property.location} • {property.size}</p>
          <div className="text-2xl font-bold text-gray-900">
            ${property.price}
            <span className="text-sm font-normal text-gray-600">/day</span>
          </div>
          
          {calculateTotal() > 0 && (
            <div className="mt-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                <span>Duration</span>
                <span>
                  {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="flex justify-between items-center font-semibold text-gray-900">
                <span>Total Amount</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Reservation Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Your Reservation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.customerName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (206) 555-0123"
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any special requests or notes..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
            >
              Complete Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}