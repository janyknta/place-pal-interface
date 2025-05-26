
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Bed, Bath, Square, Car, Wifi, Dumbbell, Waves } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const PropertyDetail = () => {
  const { id } = useParams();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Transform database data to match expected format
      const images = typeof property.images === 'string' 
        ? JSON.parse(property.images || '[]') 
        : property.images || [];
      
      const amenities = typeof property.amenities === 'string' 
        ? JSON.parse(property.amenities || '[]') 
        : property.amenities || [];

      return {
        ...data,
        images: images.length > 0 ? images : [
          "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
        ],
        amenities: [
          { icon: Wifi, label: "High-Speed Internet" },
          { icon: Dumbbell, label: "Fitness Center" },
          { icon: Waves, label: "Pool" },
          { icon: Car, label: "Parking Included" }
        ],
        agent: {
          name: data.agent_name || "Real Estate Agent",
          phone: data.agent_phone || "(555) 123-4567",
          email: data.agent_email || "agent@estateview.com",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
        }
      };
    },
    enabled: !!id
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listings
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="lg:col-span-1">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-28 lg:h-44 object-cover rounded-lg shadow-lg"
              />
            ))}
            {property.images.length > 4 && (
              <div className="relative">
                <img
                  src={property.images[4] || property.images[1]}
                  alt="More photos"
                  className="w-full h-28 lg:h-44 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">+{property.images.length - 4} more</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="capitalize">
                  {property.property_type}
                </Badge>
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bed className="h-6 w-6 mx-auto text-gray-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bath className="h-6 w-6 mx-auto text-gray-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Square className="h-6 w-6 mx-auto text-gray-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{property.sqft?.toLocaleString() || 'N/A'}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Car className="h-6 w-6 mx-auto text-gray-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-600">Parking</div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || 'This beautiful property offers modern amenities and excellent location. Perfect for those seeking comfort and convenience in their new home.'}
                </p>
                {property.year_built && (
                  <div className="mt-4 text-sm text-gray-500">
                    Built in {property.year_built}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <amenity.icon className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">Licensed Real Estate Agent</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full">
                    Call {property.agent.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Email {property.agent.name.split(' ')[0]}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Tour
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortgage Calculator</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Home Price</span>
                    <span className="text-sm font-medium">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Down Payment (20%)</span>
                    <span className="text-sm font-medium">{formatPrice(property.price * 0.2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="text-sm font-medium">{formatPrice(property.price * 0.8)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="font-medium">Est. Monthly Payment</span>
                    <span className="font-bold text-blue-600">
                      {formatPrice((property.price * 0.8 * 0.045) / 12)}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Get Pre-Approved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
