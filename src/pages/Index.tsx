
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Menu, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import PropertyMap from "../components/PropertyMap";
import FilterSidebar from "../components/FilterSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const baseMockProperties = [
  {
    id: 1,
    title: "Luxury Villa in Bandra West",
    price: 55000000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    address: "Linking Road, Bandra West, Mumbai",
    lat: 19.0596,
    lng: 72.8295,
    type: "villa",
    agentName: "Loading..."
  },
  {
    id: 2,
    title: "Modern Apartment in Koramangala",
    price: 18500000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    address: "80 Feet Road, Koramangala, Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 3,
    title: "Heritage Haveli in Jaipur",
    price: 32000000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    address: "Pink City, Civil Lines, Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    type: "house",
    agentName: "Loading..."
  },
  {
    id: 4,
    title: "Penthouse in Cyber City",
    price: 42000000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    address: "DLF Phase 2, Cyber City, Gurgaon",
    lat: 28.4595,
    lng: 77.0266,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 5,
    title: "Riverside Villa in Kochi",
    price: 28000000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3000,
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
    address: "Marine Drive, Ernakulam, Kochi",
    lat: 9.9312,
    lng: 76.2673,
    type: "villa",
    agentName: "Loading..."
  },
  {
    id: 6,
    title: "Studio Apartment in Connaught Place",
    price: 15000000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    address: "Connaught Place, New Delhi",
    lat: 28.6315,
    lng: 77.2167,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 7,
    title: "Sea View Apartment in Juhu",
    price: 75000000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    address: "Juhu Beach Road, Mumbai",
    lat: 19.1075,
    lng: 72.8263,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 8,
    title: "Traditional House in Old Hyderabad",
    price: 22000000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    address: "Charminar Area, Old City, Hyderabad",
    lat: 17.3616,
    lng: 78.4747,
    type: "house",
    agentName: "Loading..."
  },
  {
    id: 9,
    title: "Luxury Flat in Salt Lake",
    price: 35000000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    address: "Salt Lake City, Sector V, Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 10,
    title: "Garden Villa in Whitefield",
    price: 25000000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    address: "ITPL Road, Whitefield, Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    type: "villa",
    agentName: "Loading..."
  },
  {
    id: 11,
    title: "Beachfront Villa in Goa",
    price: 48000000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3800,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    address: "Candolim Beach Road, North Goa",
    lat: 15.5057,
    lng: 73.7619,
    type: "villa",
    agentName: "Loading..."
  },
  {
    id: 12,
    title: "High-Rise Apartment in Pune",
    price: 16500000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    address: "Baner Road, Pune",
    lat: 18.5204,
    lng: 73.8567,
    type: "apartment",
    agentName: "Loading..."
  }
];

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mockProperties, setMockProperties] = useState(baseMockProperties);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
  });

  // Fetch Indian names from API
  useEffect(() => {
    const fetchIndianNames = async () => {
      try {
        const response = await fetch('https://api.namefake.com/indian-names/random/12');
        const names = await response.json();
        
        const updatedProperties = baseMockProperties.map((property, index) => ({
          ...property,
          agentName: names[index] || `Agent ${index + 1}`
        }));
        
        setMockProperties(updatedProperties);
      } catch (error) {
        console.log('Failed to fetch Indian names, using fallback names');
        // Fallback Indian names if API fails
        const fallbackNames = [
          "Rajesh Kumar Sharma",
          "Priya Patel",
          "Amit Singh",
          "Sunita Gupta",
          "Vikram Choudhury",
          "Kavita Joshi",
          "Arjun Reddy",
          "Meera Nair",
          "Rohit Agarwal",
          "Anjali Bhatt",
          "Kiran Kumar",
          "Pooja Desai"
        ];
        
        const updatedProperties = baseMockProperties.map((property, index) => ({
          ...property,
          agentName: fallbackNames[index] || `Agent ${index + 1}`
        }));
        
        setMockProperties(updatedProperties);
      }
    };

    fetchIndianNames();
  }, []);

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
                        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice));
    
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);
    const matchesBathrooms = !filters.bathrooms || property.bathrooms >= parseInt(filters.bathrooms);
    const matchesType = !filters.propertyType || property.type === filters.propertyType;

    return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                भारतProperty
              </h1>
              <span className="text-sm text-orange-600 font-medium">Find Your Dream Home</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8 animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                <Input
                  placeholder="Search by location, property, or agent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-400 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 animate-slide-in-right">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="hidden sm:flex hover:scale-105 transition-all duration-200 bg-orange-600 hover:bg-orange-700"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className="hidden sm:flex hover:scale-105 transition-all duration-200 bg-orange-600 hover:bg-orange-700"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden hover:scale-105 transition-all duration-200 border-orange-200 hover:border-orange-400"
              >
                {isFilterOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white/90 backdrop-blur-sm border-b border-orange-200 p-4 animate-slide-down">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
          <Input
            placeholder="Search properties or agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-400"
          />
        </div>
        <div className="flex space-x-2 mt-3">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            size="sm"
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className={`${isFilterOpen ? 'block animate-slide-in-left' : 'hidden'} md:block md:animate-fade-in w-full md:w-80 flex-shrink-0`}>
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1 animate-fade-in">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6 animate-slide-down">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-orange-600 mt-1 font-medium">
                  Discover your perfect home across Beautiful India 🇮🇳
                </p>
              </div>
            </div>

            {/* Content */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-in hover-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden shadow-lg animate-scale-in">
                <PropertyMap properties={filteredProperties} />
              </div>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-orange-300 mb-4">
                  <Search className="h-12 w-12 mx-auto animate-pulse" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
