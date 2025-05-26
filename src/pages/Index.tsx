
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Menu, X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import PropertyMap from "../components/PropertyMap";
import FilterSidebar from "../components/FilterSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useProperties } from "../hooks/useProperties";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
  });

  const { properties, isLoading, error, searchQuery, setSearchQuery } = useProperties(filters);

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
                  {isLoading ? 'Loading...' : `${properties.length} Properties Found`}
                </h2>
                <p className="text-orange-600 mt-1 font-medium">
                  Discover your perfect home across Beautiful India 🇮🇳
                </p>
                {error && (
                  <p className="text-red-600 mt-1 text-sm">
                    Using cached data. Live data may be temporarily unavailable.
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
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
                <PropertyMap properties={properties} />
              </div>
            )}

            {!isLoading && properties.length === 0 && (
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
