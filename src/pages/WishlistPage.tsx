
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, X, Star } from 'lucide-react';
import { WishlistItem } from '@/types';
import { toast } from 'sonner';

const WishlistPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  console.log('💝 WishlistPage rendering for user:', user?.email);

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      productId: '1',
      userId: user?.id || '',
      product: {
        id: '1',
        name: 'Premium Wireless Headphones Pro Max',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299.99,
        originalPrice: 399.99,
        category: 'electronics',
        brand: 'AudioTech',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&fm=jpg&q=80'],
        stock: 45,
        rating: 4.8,
        reviewCount: 2453,
        features: ['Noise Cancellation', 'Bluetooth 5.0', '30h Battery'],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      productId: '2',
      userId: user?.id || '',
      product: {
        id: '2',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor',
        price: 199.99,
        originalPrice: 249.99,
        category: 'electronics',
        brand: 'FitTech',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&fm=jpg&q=80'],
        stock: 32,
        rating: 4.6,
        reviewCount: 1876,
        features: ['Heart Rate Monitor', 'GPS', 'Waterproof'],
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
      },
      createdAt: '2024-01-18'
    },
    {
      id: '3',
      productId: '5',
      userId: user?.id || '',
      product: {
        id: '5',
        name: 'Gaming Mouse RGB',
        description: 'Professional gaming mouse with RGB lighting',
        price: 79.99,
        category: 'electronics',
        brand: 'GameTech',
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&fm=jpg&q=80'],
        stock: 23,
        rating: 4.5,
        reviewCount: 432,
        features: ['RGB Lighting', 'Programmable Buttons', 'High DPI'],
        createdAt: '2024-01-08',
        updatedAt: '2024-01-16'
      },
      createdAt: '2024-01-16'
    }
  ]);

  const removeFromWishlist = (itemId: string) => {
    const item = wishlistItems.find(item => item.id === itemId);
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    
    if (item) {
      toast.success(`${item.product.name} removed from wishlist`);
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item.product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared');
  };

  if (!user) {
    return (
      <div className="container-fluid py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your wishlist</h1>
        <Button asChild>
          <Link to="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container-fluid py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground">
              Save your favorite items to your wishlist so you can find them easily later.
            </p>
          </div>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={clearWishlist}
            disabled={wishlistItems.length === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={() => {
              wishlistItems.forEach(item => addToCart(item.product));
              toast.success('All items added to cart');
            }}
          >
            Add All to Cart
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group relative">
            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeFromWishlist(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Product Image */}
            <Link to={`/product/${item.product.id}`}>
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Sale Badge */}
                {item.product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                    Save ${(item.product.originalPrice - item.product.price).toFixed(2)}
                  </div>
                )}

                {/* Stock Badge */}
                {item.product.stock <= 10 && (
                  <div className="absolute top-2 left-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded mt-8">
                    Only {item.product.stock} left
                  </div>
                )}
              </div>
            </Link>

            <CardContent className="p-4 space-y-3">
              {/* Product Info */}
              <div>
                <Link
                  to={`/product/${item.product.id}`}
                  className="font-semibold line-clamp-2 hover:text-primary transition-colors"
                >
                  {item.product.name}
                </Link>
                
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-1">
                      {item.product.rating} ({item.product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">${item.product.price}</span>
                {item.product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.product.originalPrice}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                  disabled={item.product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  Added {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Viewed or Recommendations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock recommended products */}
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} to={`/product/${i + 20}`} className="group">
              <Card className="overflow-hidden product-card">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1527864550417?w=400&h=400&fit=crop&fm=jpg&q=80&${i}`}
                    alt="Recommended product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    Recommended Product {i}
                  </h3>
                  <div className="flex items-center space-x-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.5 (234)</span>
                  </div>
                  <div className="text-lg font-bold mt-2">${(79 + i * 30).toFixed(2)}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
