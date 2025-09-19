import { Property, Reservation } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Downtown Premium Parking',
    type: 'parking',
    location: 'Downtown Seattle',
    size: 'Standard',
    price: 25,
    currency: 'USD',
    description: 'Secure covered parking space in the heart of downtown. Perfect for daily commuters with 24/7 access and security cameras.',
    amenities: ['24/7 Access', 'Security Cameras', 'Covered', 'EV Charging'],
    images: [
      'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-15', '2025-01-16', '2025-01-22', '2025-01-23']
  },
  {
    id: '2',
    title: 'Modern Studio Apartment',
    type: 'apartment',
    location: 'Capitol Hill, Seattle',
    size: '550 sq ft',
    price: 150,
    currency: 'USD',
    description: 'Beautiful modern studio with high ceilings, exposed brick, and all modern amenities. Perfect for short-term stays.',
    amenities: ['WiFi', 'Kitchen', 'Laundry', 'AC/Heating', 'Pet Friendly'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-10', '2025-01-11', '2025-01-12', '2025-01-25', '2025-01-26']
  },
  {
    id: '3',
    title: 'Climate-Controlled Storage Unit',
    type: 'storage',
    location: 'Ballard, Seattle',
    size: '10x10 ft',
    price: 80,
    currency: 'USD',
    description: 'Clean, secure storage unit with climate control. Ideal for furniture, documents, or seasonal items.',
    amenities: ['Climate Control', '24/7 Access', 'Security System', 'Ground Level'],
    images: [
      'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7195703/pexels-photo-7195703.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-08', '2025-01-09', '2025-01-20', '2025-01-21', '2025-01-22']
  },
  {
    id: '4',
    title: 'Waterfront Parking Spot',
    type: 'parking',
    location: 'Pike Place Market',
    size: 'Compact',
    price: 20,
    currency: 'USD',
    description: 'Convenient parking near Pike Place Market with beautiful waterfront views. Great for tourists and shoppers.',
    amenities: ['Close to Transit', 'Waterfront Views', 'Well Lit'],
    images: [
      'https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-14', '2025-01-15', '2025-01-28', '2025-01-29']
  },
  {
    id: '5',
    title: 'Luxury 2BR Apartment',
    type: 'apartment',
    location: 'Belltown, Seattle',
    size: '1200 sq ft',
    price: 250,
    currency: 'USD',
    description: 'Stunning luxury apartment with city views, modern furnishings, and premium amenities. Perfect for business travelers.',
    amenities: ['City Views', 'Gym Access', 'Concierge', 'Parking Included', 'WiFi'],
    images: [
      'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-05', '2025-01-06', '2025-01-07', '2025-01-18', '2025-01-19']
  },
  {
    id: '6',
    title: 'Large Storage Facility',
    type: 'storage',
    location: 'SODO, Seattle',
    size: '15x15 ft',
    price: 120,
    currency: 'USD',
    description: 'Spacious storage unit perfect for business inventory, large furniture, or moving storage needs.',
    amenities: ['Large Size', 'Loading Dock', 'Security Cameras', 'Easy Access'],
    images: [
      'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7195703/pexels-photo-7195703.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    bookedDates: ['2025-01-12', '2025-01-13', '2025-01-24', '2025-01-25', '2025-01-26']
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'RES001',
    propertyId: '1',
    property: mockProperties[0],
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    customerPhone: '+1 206-555-0123',
    startDate: '2025-01-15',
    endDate: '2025-01-16',
    notes: 'Need daily access for work commute',
    status: 'confirmed',
    totalAmount: 50,
    createdAt: '2025-01-10'
  },
  {
    id: 'RES002',
    propertyId: '2',
    property: mockProperties[1],
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    customerPhone: '+1 206-555-0456',
    startDate: '2025-01-25',
    endDate: '2025-01-26',
    notes: 'Business trip accommodation',
    status: 'confirmed',
    totalAmount: 300,
    createdAt: '2025-01-12'
  }
];