
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, User, IndianRupee } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface Property {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  address: string;
  type: string;
  agentName?: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    // Convert to lakhs and crores for Indian format
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="block">
      <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-orange-100 hover:border-orange-300 bg-white/80 backdrop-blur-sm animate-fade-in">
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium capitalize shadow-lg animate-pulse">
              {property.type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/95 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-orange-200 flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {formatPrice(property.price)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
            <span className="text-sm truncate">{property.address}</span>
          </div>

          {property.agentName && (
            <div className="flex items-center text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
              <User className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm font-medium truncate">{property.agentName}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-700 pt-2 border-t border-orange-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center group-hover:scale-105 transition-transform duration-200">
                <Bed className="h-4 w-4 mr-1 text-orange-500" />
                <span className="font-medium">{property.bedrooms}</span>
              </div>
              <div className="flex items-center group-hover:scale-105 transition-transform duration-200">
                <Bath className="h-4 w-4 mr-1 text-orange-500" />
                <span className="font-medium">{property.bathrooms}</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 group-hover:scale-105 transition-transform duration-200">
              <Square className="h-4 w-4 mr-1 text-orange-500" />
              <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
