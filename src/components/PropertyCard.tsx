
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square } from "lucide-react";
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
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
              {property.type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-sm font-semibold">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1 text-gray-500" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-gray-500" />
                <span>{property.bathrooms} bath</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Square className="h-4 w-4 mr-1 text-gray-500" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
