
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PropertyFilters {
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  city?: string;
}

interface Property {
  id: string;
  property_id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  address: string;
  type: string;
  agentName: string;
  lat?: number;
  lng?: number;
  images?: string[];
  description?: string;
  amenities?: any[];
  agent_phone?: string;
  agent_email?: string;
}

export const useProperties = (filters: PropertyFilters) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: properties = [], isLoading, error, refetch } = useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      console.log('Fetching properties with filters:', filters);
      
      try {
        // First, try to fetch fresh data from the API
        const apiUrl = new URL('/functions/v1/fetch-properties', 'https://uqotmhjzlmtbfrbjvhbz.supabase.co');
        
        if (filters.minPrice) apiUrl.searchParams.set('minPrice', filters.minPrice);
        if (filters.maxPrice) apiUrl.searchParams.set('maxPrice', filters.maxPrice);
        if (filters.bedrooms) apiUrl.searchParams.set('bedrooms', filters.bedrooms);
        if (filters.propertyType) apiUrl.searchParams.set('propertyType', filters.propertyType);
        if (filters.city) apiUrl.searchParams.set('city', filters.city);

        const { data: { session } } = await supabase.auth.getSession();
        
        const response = await fetch(apiUrl.toString(), {
          headers: {
            'Authorization': `Bearer ${session?.access_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxb3RtaGp6bG10YmZyYmp2aGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDgxMzUsImV4cCI6MjA2MzgyNDEzNX0.Y-E9zXsGrzzZxBbDraeHK8FZZgXlhJtLUFh1egZ64Ds'}`,
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxb3RtaGp6bG10YmZyYmp2aGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDgxMzUsImV4cCI6MjA2MzgyNDEzNX0.Y-E9zXsGrzzZxBbDraeHK8FZZgXlhJtLUFh1egZ64Ds'
          }
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        await response.json(); // This updates the database
      } catch (apiError) {
        console.log('API fetch failed, using database data:', apiError);
      }

      // Now fetch from database with filters
      let query = supabase.from('properties').select('*');

      if (filters.minPrice) {
        query = query.gte('price', parseInt(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseInt(filters.maxPrice));
      }
      if (filters.bedrooms) {
        query = query.gte('bedrooms', parseInt(filters.bedrooms));
      }
      if (filters.bathrooms) {
        query = query.gte('bathrooms', parseInt(filters.bathrooms));
      }
      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Database query error:', error);
        throw error;
      }

      // Transform database data to match the expected format
      return (data || []).map((property: any) => {
        const images = typeof property.images === 'string' 
          ? JSON.parse(property.images || '[]') 
          : property.images || [];
        
        return {
          id: property.id,
          property_id: property.property_id,
          title: property.title,
          price: property.price || 0,
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          sqft: property.sqft || 0,
          image: images[0] || "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
          address: property.address || '',
          type: property.property_type || 'apartment',
          agentName: property.agent_name || 'Real Estate Agent',
          lat: property.latitude ? parseFloat(property.latitude.toString()) : undefined,
          lng: property.longitude ? parseFloat(property.longitude.toString()) : undefined,
          images: images,
          description: property.description,
          amenities: typeof property.amenities === 'string' 
            ? JSON.parse(property.amenities || '[]') 
            : property.amenities || [],
          agent_phone: property.agent_phone,
          agent_email: property.agent_email
        };
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const filteredProperties = properties.filter((property: Property) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(query) ||
      property.address.toLowerCase().includes(query) ||
      property.agentName.toLowerCase().includes(query)
    );
  });

  return {
    properties: filteredProperties,
    isLoading,
    error,
    refetch,
    searchQuery,
    setSearchQuery
  };
};
