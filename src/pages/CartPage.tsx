import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, X, ShoppingBag, Truck, Shield } from 'lucide-react';

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  console.log('🛒 CartPage rendering - Items:', items.length, 'Total:', total);

  const subtotal = total;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-fluid py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          {item.color && (
                            <span>Color: {item.color}</span>
                          )}
                          {item.size && (
                            <span>Size: {item.size}</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-lg font-bold">${item.product.price}</span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center text-sm"
                          min="0"
                          max={item.product.stock}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-muted-foreground">
                            ${item.product.price} each
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stock Warning */}
                    {item.product.stock <= 10 && (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Only {item.product.stock} left in stock
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                items.forEach(item => removeFromCart(item.id));
              }}
              className="text-destructive hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              {subtotal < 50 && (
                <div className="text-sm text-muted-foreground text-center p-3 bg-muted rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full" 
                asChild={!!user}
                disabled={!user}
              >
                {user ? (
                  <Link to="/checkout">Proceed to Checkout</Link>
                ) : (
                  <span>Login to Checkout</span>
                )}
              </Button>

              {!user && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Have an account?
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure checkout with SSL encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free shipping on orders over $50</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">We Accept</h4>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">
                  VISA
                </div>
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">
                  MC
                </div>
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">
                  AMEX
                </div>
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">
                  PP
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;