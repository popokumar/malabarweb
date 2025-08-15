import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Star, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types';

const ShopPage = () => {
  console.log('🛍️ ShopPage rendering');

  const [searchParams] = useSearchParams();
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Michelin Energy XM2+',
      description: 'Advanced tire compound for superior fuel efficiency and extended tire life',
      price: 8999,
      originalPrice: 10499,
      category: 'car',
      brand: 'Michelin',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 45,
      rating: 4.8,
      reviewCount: 2453,
      features: ['185/65 R15', 'Fuel Efficient', 'Long Lasting', 'Wet Grip A'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Bridgestone Turanza T001',
      description: 'Premium touring tire with excellent comfort and handling',
      price: 12999,
      originalPrice: 14999,
      category: 'car',
      brand: 'Bridgestone',
      images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 32,
      rating: 4.6,
      reviewCount: 1876,
      features: ['205/55 R16', 'Comfort', 'Low Noise', 'All Season'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Apollo Alnac 4G',
      description: 'Reliable performance tire with excellent grip and durability',
      price: 6999,
      category: 'car',
      brand: 'Apollo',
      images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 78,
      rating: 4.9,
      reviewCount: 987,
      features: ['175/65 R14', 'Superior Grip', 'Durable', 'Value for Money'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'Continental ContiPremiumContact 6',
      description: 'High-performance tire with exceptional braking and handling',
      price: 15999,
      originalPrice: 17999,
      category: 'car',
      brand: 'Continental',
      images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 156,
      rating: 4.7,
      reviewCount: 654,
      features: ['225/50 R17', 'High Performance', 'Short Braking Distance', 'Premium Quality'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22'
    },
    {
      id: '5',
      name: 'JK Tyre Vectra',
      description: 'Balanced performance tire for Indian road conditions',
      price: 5999,
      category: 'car',
      brand: 'JK Tyre',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 89,
      rating: 4.3,
      reviewCount: 432,
      features: ['165/80 R14', 'Indian Roads', 'Affordable', 'Good Mileage'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    },
    {
      id: '6',
      name: 'Goodyear Assurance TripleMax 2',
      description: 'Advanced tire technology for maximum safety and performance',
      price: 11999,
      category: 'car',
      brand: 'Goodyear',
      images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 67,
      rating: 4.4,
      reviewCount: 789,
      features: ['195/60 R15', 'Triple Safety', 'Enhanced Grip', 'Longer Life'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-14'
    },
    {
      id: '7',
      name: 'Pirelli Cinturato P7',
      description: 'Eco-friendly high-performance tire for premium vehicles',
      price: 18999,
      originalPrice: 21999,
      category: 'car',
      brand: 'Pirelli',
      images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 34,
      rating: 4.8,
      reviewCount: 1234,
      features: ['215/55 R17', 'Eco-Friendly', 'Premium Performance', 'Low Rolling Resistance'],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25'
    },
    {
      id: '8',
      name: 'MRF ZLX',
      description: 'Trusted Indian brand tire with proven durability',
      price: 7499,
      category: 'car',
      brand: 'MRF',
      images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 123,
      rating: 4.5,
      reviewCount: 2156,
      features: ['185/70 R14', 'Made in India', 'Reliable', 'Good Value'],
      createdAt: '2024-01-07',
      updatedAt: '2024-01-19'
    },
    {
      id: '9',
      name: 'Yokohama Earth-1',
      description: 'Environment-friendly tire with excellent fuel economy',
      price: 9999,
      category: 'car',
      brand: 'Yokohama',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 45,
      rating: 4.6,
      reviewCount: 876,
      features: ['175/70 R13', 'Fuel Efficient', 'Eco-Friendly', 'Comfortable Ride'],
      createdAt: '2024-01-11',
      updatedAt: '2024-01-21'
    },
    {
      id: '10',
      name: 'CEAT SecuraDrive',
      description: 'Premium safety tire with advanced tread design',
      price: 8499,
      originalPrice: 9499,
      category: 'car',
      brand: 'CEAT',
      images: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 67,
      rating: 4.4,
      reviewCount: 654,
      features: ['195/65 R15', 'Enhanced Safety', 'Better Grip', 'Puncture Resistant'],
      createdAt: '2024-01-13',
      updatedAt: '2024-01-23'
    },
    {
      id: '11',
      name: 'Falken Ziex ZE914 Ecorun',
      description: 'High-performance eco tire with superior handling',
      price: 13499,
      category: 'car',
      brand: 'Falken',
      images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 28,
      rating: 4.7,
      reviewCount: 456,
      features: ['205/60 R16', 'High Performance', 'Eco Technology', 'Sport Handling'],
      createdAt: '2024-01-09',
      updatedAt: '2024-01-17'
    },
    {
      id: '12',
      name: 'Dunlop SP Sport FM800',
      description: 'Sport-oriented tire with excellent cornering stability',
      price: 10999,
      category: 'car',
      brand: 'Dunlop',
      images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop&fm=jpg&q=80'],
      stock: 56,
      rating: 4.5,
      reviewCount: 789,
      features: ['185/60 R15', 'Sport Performance', 'Excellent Cornering', 'Responsive Handling'],
      createdAt: '2024-01-06',
      updatedAt: '2024-01-18'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.brand)));

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    setSearchQuery(query);
    setSelectedCategory(category);
    console.log('🔍 Search params - Query:', query, 'Category:', category);
  }, [searchParams]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    console.log('📋 Filtered products:', filtered.length, 'items');
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 25000]);
    setSortBy('name');
    console.log('🧹 Filters cleared');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range (₹)</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={25000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Vehicle Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={!selectedCategory}
              onCheckedChange={() => setSelectedCategory('')}
            />
            <label htmlFor="all-categories" className="text-sm">All Types</label>
          </div>
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              />
              <label htmlFor={category} className="text-sm capitalize">
                {category === 'car' ? 'Car Tires' : category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-brands"
              checked={!selectedBrand}
              onCheckedChange={() => setSelectedBrand('')}
            />
            <label htmlFor="all-brands" className="text-sm">All Brands</label>
          </div>
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrand === brand}
                onCheckedChange={() => setSelectedBrand(brand)}
              />
              <label htmlFor={brand} className="text-sm">{brand}</label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container-fluid py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <Card className="p-6">
            <h2 className="font-bold text-xl mb-6">Filters</h2>
            <FilterSidebar />
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Tire Shop</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} tires found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <h2 className="font-bold text-xl mb-6">Filters</h2>
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedBrand || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="secondary">
                  Search: {searchQuery}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary">
                  Type: {selectedCategory === 'car' ? 'Car Tires' : selectedCategory}
                </Badge>
              )}
              {selectedBrand && (
                <Badge variant="secondary">
                  Brand: {selectedBrand}
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden product-card h-full">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        Sale
                      </div>
                    )}
                    {product.stock <= 10 && (
                      <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded">
                        Low Stock
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors flex-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{product.features[0]}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No tires found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;