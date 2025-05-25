
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";

interface FilterSidebarProps {
  filters: {
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    propertyType: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      propertyType: "",
    });
  };

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-gray-500">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-gray-500">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="No limit"
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Property Type</Label>
          <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Minimum Bedrooms</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Minimum Bathrooms</Label>
          <Select value={filters.bathrooms} onValueChange={(value) => updateFilter("bathrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Quick Filters</Label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => onFiltersChange({ ...filters, maxPrice: "500000" })}
            >
              Under $500K
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => onFiltersChange({ ...filters, minPrice: "500000", maxPrice: "1000000" })}
            >
              $500K - $1M
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => onFiltersChange({ ...filters, minPrice: "1000000" })}
            >
              Over $1M
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
