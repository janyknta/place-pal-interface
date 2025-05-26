
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Bed, Bath, Square, Car, Wifi, Dumbbell, Waves } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const baseMockProperty = {
  id: 1,
  title: "Modern Downtown Apartment",
  price: 750000,
  bedrooms: 2,
  bathrooms: 2,
  sqft: 1200,
  images: [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
  ],
  address: "123 Main St, Downtown",
  type: "apartment",
  yearBuilt: 2020,
  parkingSpaces: 1,
  description: "This stunning modern apartment features floor-to-ceiling windows, high-end finishes, and an open-concept design. Located in the heart of downtown, you'll be walking distance to restaurants, shopping, and entertainment. The building offers luxury amenities including a fitness center, rooftop deck, and concierge service.",
  amenities: [
    { icon: Wifi, label: "High-Speed Internet" },
    { icon: Dumbbell, label: "Fitness Center" },
    { icon: Waves, label: "Pool" },
    { icon: Car, label: "Parking Included" }
  ],
  agent: {
    name: "Loading...",
    phone: "(555) 123-4567",
    email: "agent@estateview.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
  }
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(baseMockProperty);

  // Fetch Indian agent name
  useEffect(() => {
    const fetchAgentName = async () => {
      try {
        const response = await fetch('https://api.namefake.com/indian-names/random/1');
        const names = await response.json();
        
        setProperty(prev => ({
          ...prev,
          agent: {
            ...prev.agent,
            name: names[0] || "Rajesh Kumar Sharma",
            email: `${names[0]?.toLowerCase().replace(/\s+/g, '.')}@estateview.com` || "agent@estateview.com"
          }
        }));
      } catch (error) {
        console.log('Failed to fetch Indian name, using fallback');
        // Fallback Indian name if API fails
        setProperty(prev => ({
          ...prev,
          agent: {
            ...prev.agent,
            name: "Rajesh Kumar Sharma",
            email: "rajesh.kumar.sharma@estateview.com"
          }
        }));
      }
    };

    fetchAgentName();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
                  {property.type}
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
                <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Car className="h-6 w-6 mx-auto text-gray-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{property.parkingSpaces}</div>
                <div className="text-sm text-gray-600">Parking</div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Built in {property.yearBuilt}
                </div>
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
