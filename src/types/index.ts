export interface Property {
  id: string;
  title: string;
  type: 'parking' | 'apartment' | 'storage';
  location: string;
  size: string;
  price: number;
  currency: string;
  description: string;
  amenities: string[];
  images: string[];
  availableFrom: string;
  availableTo: string;
  bookedDates: string[];
}

export interface Reservation {
  id: string;
  propertyId: string;
  property: Property;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  notes?: string;
  status: 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

export interface SearchFilters {
  type: string;
  location: string;
  minSize: number;
  maxSize: number;
  startDate: string;
  endDate: string;
}