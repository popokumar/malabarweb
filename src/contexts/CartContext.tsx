import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from '@/types';
import { toast } from 'sonner';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  console.log('🛒 CartProvider initialized');

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const cartData = JSON.parse(storedCart);
        console.log('🛒 Cart restored from localStorage:', cartData.length, 'items');
        setItems(cartData);
      } catch (error) {
        console.error('❌ Error parsing stored cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever items change
    localStorage.setItem('cart', JSON.stringify(items));
    console.log('💾 Cart saved to localStorage:', items.length, 'items');
  }, [items]);

  const addToCart = (product: Product, quantity = 1, options?: { size?: string; color?: string }) => {
    console.log('➕ Adding to cart:', product.name, 'qty:', quantity, 'options:', options);

    const existingItemIndex = items.findIndex(
      item => item.productId === product.id && 
               item.size === options?.size && 
               item.color === options?.color
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
      console.log('📈 Updated existing cart item quantity');
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        size: options?.size,
        color: options?.color
      };
      setItems(prev => [...prev, newItem]);
      console.log('🆕 Added new item to cart');
    }

    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (itemId: string) => {
    console.log('🗑️ Removing from cart:', itemId);
    const item = items.find(item => item.id === itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
    
    if (item) {
      toast.success(`${item.product.name} removed from cart`);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    console.log('📝 Updating quantity for item:', itemId, 'new qty:', quantity);
    
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('🧹 Clearing cart');
    setItems([]);
    toast.success('Cart cleared');
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  console.log('🛒 Cart state - Items:', items.length, 'Total:', total, 'Count:', itemCount);

  const value: CartContextType = {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};