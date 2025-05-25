
import { MapPin } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Placeholder with Property Markers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Simulated Map Background */}
        <div className="w-full h-full relative">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Property Markers */}
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${20 + (index % 4) * 20}%`,
                top: `${25 + Math.floor(index / 4) * 15}%`,
              }}
            >
              {/* Price Marker */}
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg group-hover:bg-blue-700 transition-colors text-sm font-medium">
                {formatPrice(property.price)}
              </div>
              
              {/* Property Preview Card */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-3 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{property.title}</h4>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="text-xs">{property.address}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-700">
                  <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white shadow-lg rounded p-2 hover:bg-gray-50">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="bg-white shadow-lg rounded p-2 hover:bg-gray-50">
          <span className="text-lg font-bold">−</span>
        </button>
      </div>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-xs text-gray-600 mb-2">Map View</div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-xs text-gray-700">{properties.length} Properties</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
