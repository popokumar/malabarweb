import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  RotateCcw
} from 'lucide-react';
import { Order } from '@/types';

const OrdersPage = () => {
  const { user } = useAuth();
  console.log('📦 OrdersPage rendering for user:', user?.email);

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      userId: user?.id || '',
      items: [
        {
          id: '1',
          productId: '1',
          product: {
            id: '1',
            name: 'Premium Wireless Headphones',
            description: 'High-quality wireless headphones',
            price: 299.99,
            category: 'electronics',
            brand: 'AudioTech',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&fm=jpg&q=80'],
            stock: 45,
            rating: 4.8,
            reviewCount: 2453,
            features: ['Noise Cancellation'],
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20'
          },
          quantity: 1,
          price: 299.99
        }
      ],
      totalAmount: 324.98,
      status: 'delivered',
      shippingAddress: {
        id: '1',
        userId: user?.id || '',
        title: 'Home',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true
      },
      paymentMethod: 'stripe',
      paymentStatus: 'paid',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      userId: user?.id || '',
      items: [
        {
          id: '2',
          productId: '2',
          product: {
            id: '2',
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracking',
            price: 199.99,
            category: 'electronics',
            brand: 'FitTech',
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&fm=jpg&q=80'],
            stock: 32,
            rating: 4.6,
            reviewCount: 1876,
            features: ['Heart Rate Monitor'],
            createdAt: '2024-01-10',
            updatedAt: '2024-01-18'
          },
          quantity: 1,
          price: 199.99
        }
      ],
      totalAmount: 215.99,
      status: 'shipped',
      shippingAddress: {
        id: '1',
        userId: user?.id || '',
        title: 'Home',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true
      },
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      createdAt: '2024-01-22T15:20:00Z',
      updatedAt: '2024-01-24T09:15:00Z',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      userId: user?.id || '',
      items: [
        {
          id: '3',
          productId: '3',
          product: {
            id: '3',
            name: 'Laptop Backpack Pro',
            description: 'Professional laptop backpack',
            price: 89.99,
            category: 'accessories',
            brand: 'TravelGear',
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&fm=jpg&q=80'],
            stock: 78,
            rating: 4.9,
            reviewCount: 987,
            features: ['15" Laptop Compatible'],
            createdAt: '2024-01-05',
            updatedAt: '2024-01-15'
          },
          quantity: 1,
          price: 89.99
        }
      ],
      totalAmount: 97.19,
      status: 'processing',
      shippingAddress: {
        id: '2',
        userId: user?.id || '',
        title: 'Office',
        street: '456 Business Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'United States',
        isDefault: false
      },
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      createdAt: '2024-01-25T12:00:00Z',
      updatedAt: '2024-01-25T12:00:00Z'
    }
  ]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'default';
      case 'shipped':
        return 'default';
      case 'delivered':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const filterOrdersByStatus = (status?: Order['status']) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card key={order.id}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order {order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge 
            variant={getStatusColor(order.status)}
            className="flex items-center space-x-1"
          >
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <Link
                  to={`/product/${item.product.id}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  Quantity: {item.quantity} × ${item.price}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-medium text-foreground">${order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Payment: <span className="capitalize">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="text-sm text-muted-foreground">
            Tracking: <span className="font-medium">{order.trackingNumber}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {order.status === 'delivered' && (
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Return Item
            </Button>
          )}
          {order.trackingNumber && (
            <Button variant="outline" size="sm">
              <Truck className="h-4 w-4 mr-2" />
              Track Package
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!user) {
    return (
      <div className="container-fluid py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterOrdersByStatus('pending').length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({filterOrdersByStatus('processing').length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({filterOrdersByStatus('shipped').length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({filterOrdersByStatus('delivered').length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({filterOrdersByStatus('cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map(order => <OrderCard key={order.id} order={order} />)
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't placed any orders yet.
                </p>
                <Button asChild>
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-6">
            {filterOrdersByStatus('pending').map(order => 
              <OrderCard key={order.id} order={order} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <div className="space-y-6">
            {filterOrdersByStatus('processing').map(order => 
              <OrderCard key={order.id} order={order} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipped" className="mt-6">
          <div className="space-y-6">
            {filterOrdersByStatus('shipped').map(order => 
              <OrderCard key={order.id} order={order} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          <div className="space-y-6">
            {filterOrdersByStatus('delivered').map(order => 
              <OrderCard key={order.id} order={order} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="space-y-6">
            {filterOrdersByStatus('cancelled').map(order => 
              <OrderCard key={order.id} order={order} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;