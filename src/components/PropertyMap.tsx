
import { MapPin, IndianRupee } from "lucide-react";

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
  agentName?: string;
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg overflow-hidden animate-fade-in">
      {/* Map Placeholder with Property Markers */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50">
        {/* Simulated Map Background */}
        <div className="w-full h-full relative">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-orange-200 animate-pulse" style={{ animationDelay: `${i * 20}ms` }}></div>
              ))}
            </div>
          </div>
          
          {/* Indian Map Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '500ms' }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-yellow-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1000ms' }}></div>
          </div>
          
          {/* Property Markers */}
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer animate-fade-in hover-scale"
              style={{
                left: `${15 + (index % 5) * 18}%`,
                top: `${20 + Math.floor(index / 5) * 20}%`,
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Price Marker */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full shadow-xl group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300 text-sm font-bold border-2 border-white flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {formatPrice(property.price)}
              </div>
              
              {/* Property Preview Card */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 w-72 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-orange-200 animate-scale-in">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-36 object-cover rounded-lg mb-3 shadow-md"
                />
                <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">{property.title}</h4>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1 text-orange-500" />
                  <span className="text-xs truncate">{property.address}</span>
                </div>
                {property.agentName && (
                  <div className="text-xs text-orange-600 font-medium mb-3 bg-orange-50 px-2 py-1 rounded-full inline-block">
                    Agent: {property.agentName}
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-700 font-medium">
                  <span className="bg-gray-100 px-2 py-1 rounded">{property.bedrooms} bed, {property.bathrooms} bath</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 animate-slide-in-right">
        <button className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-3 hover:bg-orange-50 transition-all duration-300 border border-orange-200 hover:scale-110">
          <span className="text-lg font-bold text-orange-600">+</span>
        </button>
        <button className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-3 hover:bg-orange-50 transition-all duration-300 border border-orange-200 hover:scale-110">
          <span className="text-lg font-bold text-orange-600">−</span>
        </button>
      </div>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-orange-200 animate-slide-in-left">
        <div className="text-xs text-orange-600 mb-3 font-bold flex items-center">
          <IndianRupee className="h-3 w-3 mr-1" />
          भारत Property Map
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm animate-pulse"></div>
          <span className="text-xs text-gray-700 font-medium">{properties.length} Indian Properties</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
