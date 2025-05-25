
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
    title: "Modern Downtown Apartment",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    address: "123 Main St, Downtown",
    lat: 40.7589,
    lng: -73.9851,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 2,
    title: "Luxury Family Home",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    address: "456 Oak Avenue, Suburbs",
    lat: 40.7505,
    lng: -73.9934,
    type: "house",
    agentName: "Loading..."
  },
  {
    id: 3,
    title: "Cozy Studio Loft",
    price: 450000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    address: "789 Creative District",
    lat: 40.7614,
    lng: -73.9776,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 4,
    title: "Penthouse Suite",
    price: 2100000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    address: "101 Skyline Tower",
    lat: 40.7549,
    lng: -73.9840,
    type: "apartment",
    agentName: "Loading..."
  },
  {
    id: 5,
    title: "Charming Townhouse",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
    address: "234 Historic Lane",
    lat: 40.7505,
    lng: -73.9888,
    type: "townhouse",
    agentName: "Loading..."
  },
  {
    id: 6,
    title: "Waterfront Condo",
    price: 1800000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    address: "567 Harbor View",
    lat: 40.7632,
    lng: -73.9712,
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
        const response = await fetch('https://api.namefake.com/indian-names/random/6');
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
          "Kavita Joshi"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">EstateView</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by location, property, or agent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="hidden sm:flex"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className="hidden sm:flex"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden"
              >
                {isFilterOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties or agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2 mt-3">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
            className="flex-1"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            size="sm"
            className="flex-1"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-80 flex-shrink-0`}>
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Discover your perfect home with our expert agents
                </p>
              </div>
            </div>

            {/* Content */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
                <PropertyMap properties={filteredProperties} />
              </div>
            )}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
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
