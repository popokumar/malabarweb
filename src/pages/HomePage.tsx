import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';

const HomePage = () => {
  console.log('🏠 HomePage rendering');

  const featuredProducts = [
    {
      id: '1',
      name: 'Michelin Energy XM2+',
      price: 8999,
      originalPrice: 10499,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&fm=jpg&q=80',
      rating: 4.8,
      reviews: 2453,
      size: '185/65 R15'
    },
    {
      id: '2',
      name: 'Bridgestone Turanza T001',
      price: 12999,
      originalPrice: 14999,
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop&fm=jpg&q=80',
      rating: 4.6,
      reviews: 1876,
      size: '205/55 R16'
    },
    {
      id: '3',
      name: 'Apollo Alnac 4G',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop&fm=jpg&q=80',
      rating: 4.9,
      reviews: 987,
      size: '175/65 R14'
    },
    {
      id: '4',
      name: 'Continental ContiPremiumContact 6',
      price: 15999,
      originalPrice: 17999,
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop&fm=jpg&q=80',
      rating: 4.7,
      reviews: 654,
      size: '225/50 R17'
    }
  ];

  const categories = [
    {
      name: 'Car Tires',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&fm=jpg&q=80',
      count: '2,341 items'
    },
    {
      name: 'Bike Tires',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&fm=jpg&q=80',
      count: '1,672 items'
    },
    {
      name: 'Truck Tires',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop&fm=jpg&q=80',
      count: '987 items'
    },
    {
      name: 'SUV Tires',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop&fm=jpg&q=80',
      count: '1,456 items'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Installation',
      description: 'Professional tire installation at your doorstep'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% authentic tires with manufacturer warranty'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert tire consultation and support'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section>
        <div className="container-fluid">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <div className="container-fluid">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Vehicle Type</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect tires for your vehicle with our comprehensive tire categories.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="group block"
              >
                <Card className="overflow-hidden product-card">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="container-fluid">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Tires</h2>
              <p className="text-muted-foreground mt-2">
                Handpicked premium tires for every need
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden product-card">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                        Sale
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.size}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-fluid py-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Need Help Choosing the Right Tire?
            </h2>
            <p className="text-lg opacity-90">
              Our tire experts are here to help you find the perfect match for your vehicle and driving needs.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Get Expert Advice
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;