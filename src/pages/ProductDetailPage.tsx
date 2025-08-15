
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product, Review } from '@/types';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  console.log('📱 ProductDetailPage rendering for product:', id);

  // Mock product data - replace with API call
  const [product] = useState<Product>({
    id: id || '1',
    name: 'Premium Wireless Headphones Pro Max',
    description: 'Experience exceptional sound quality with our flagship wireless headphones featuring advanced noise cancellation, premium materials, and all-day battery life.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'electronics',
    brand: 'AudioTech',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&fm=jpg&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&fm=jpg&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&fm=jpg&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop&fm=jpg&q=80'
    ],
    stock: 45,
    rating: 4.8,
    reviewCount: 2453,
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.3 Connection', 
      '30-Hour Battery Life',
      'Fast Charging (15min = 3hrs)',
      'Premium Materials',
      'Spatial Audio Support'
    ],
    specifications: {
      'Driver Size': '40mm Dynamic',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Weight': '290g',
      'Connectivity': 'Bluetooth 5.3, 3.5mm',
      'Battery Life': '30 hours (ANC off), 20 hours (ANC on)',
      'Charging': 'USB-C Fast Charging',
      'Materials': 'Aluminum, Premium Leather'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  });

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      productId: id || '1',
      userId: '1',
      user: { id: '1', email: 'john@example.com', name: 'John Smith', role: 'user', createdAt: '2024-01-01' },
      rating: 5,
      comment: 'Absolutely amazing headphones! The sound quality is incredible and the noise cancellation works perfectly. Worth every penny.',
      createdAt: '2024-01-20'
    },
    {
      id: '2', 
      productId: id || '1',
      userId: '2',
      user: { id: '2', email: 'sarah@example.com', name: 'Sarah Johnson', role: 'user', createdAt: '2024-01-01' },
      rating: 4,
      comment: 'Great headphones with excellent build quality. The battery life is as advertised. Only minor complaint is they can get a bit warm during long sessions.',
      createdAt: '2024-01-18'
    },
    {
      id: '3',
      productId: id || '1', 
      userId: '3',
      user: { id: '3', email: 'mike@example.com', name: 'Mike Chen', role: 'user', createdAt: '2024-01-01' },
      rating: 5,
      comment: 'Best headphones I\'ve ever owned. The spatial audio feature is mind-blowing for movies and music. Highly recommend!',
      createdAt: '2024-01-15'
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const colors = ['Black', 'Silver', 'Rose Gold'];
  const sizes = ['One Size'];

  useEffect(() => {
    if (colors.length > 0) setSelectedColor(colors[0]);
    if (sizes.length > 0) setSelectedSize(sizes[0]);
  }, []);

  const handleAddToCart = () => {
    console.log('🛒 Adding to cart:', { product: product.name, quantity, color: selectedColor, size: selectedSize });
    addToCart(product, quantity, { color: selectedColor, size: selectedSize });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + change));
    setQuantity(newQuantity);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="container-fluid py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Sale Badge */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.brand}
              </Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleWishlist}
                  className={isWishlisted ? 'text-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium ml-2">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Options */}
          <div className="space-y-4">
            {colors.length > 0 && ( // Changed from > 1 to > 0 to allow selection if only one color exists
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {sizes.length > 0 && ( // Changed from > 1 to > 0 to allow selection if only one size exists
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                  max={product.stock}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {product.stock} available
                </span>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-muted-foreground">Orders over $50</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">2 Year Warranty</div>
                <div className="text-muted-foreground">Full coverage</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">30-Day Returns</div>
                <div className="text-muted-foreground">Easy returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid gap-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value as string}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {reviews.length} reviews
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {review.user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.user.name}</span>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Standard Shipping</h4>
                    <p className="text-muted-foreground">Free on orders over $50. Usually arrives in 3-5 business days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Express Shipping</h4>
                    <p className="text-muted-foreground">$9.99 flat rate. Usually arrives in 1-2 business days.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">International Shipping</h4>
                    <p className="text-muted-foreground">Available to select countries. Rates calculated at checkout.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You might also like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock related products */}
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} to={`/product/${i + 10}`} className="group">
              <Card className="overflow-hidden product-card">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1523275335684 + i}?w=400&h=400&fit=crop&fm=jpg&q=80`}
                    alt="Related product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    Related Product {i}
                  </h3>
                  <div className="flex items-center space-x-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.5 (234)</span>
                  </div>
                  <div className="text-lg font-bold mt-2">${(99 + i * 50).toFixed(2)}</div> {/* Fix: Use toFixed(2) on the price calculation */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
