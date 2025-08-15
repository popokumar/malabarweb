import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Eye,
  Edit,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp
} from 'lucide-react';
import { Order } from '@/types';
import { toast } from 'sonner';

const AdminOrders = () => {
  console.log('📋 AdminOrders rendering');

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      userId: '1',
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
        userId: '1',
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
      userId: '2',
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
          quantity: 2,
          price: 199.99
        }
      ],
      totalAmount: 431.98,
      status: 'shipped',
      shippingAddress: {
        id: '2',
        userId: '2',
        title: 'Office',
        street: '456 Business Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'United States',
        isDefault: false
      },
      paymentMethod: 'paypal',
      paymentStatus: 'paid',
      createdAt: '2024-01-22T15:20:00Z',
      updatedAt: '2024-01-24T09:15:00Z',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      userId: '3',
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
        id: '3',
        userId: '3',
        title: 'Home',
        street: '789 Residential Dr',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States',
        isDefault: true
      },
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      createdAt: '2024-01-25T12:00:00Z',
      updatedAt: '2024-01-25T12:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.shippingAddress.street.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPayment = !paymentFilter || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

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

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    console.log('📝 Updating order status:', orderId, 'to:', newStatus);
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
    
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    processingOrders: orders.filter(o => o.status === 'processing').length,
    shippedOrders: orders.filter(o => o.status === 'shipped').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length : 0
  };

  return (
    <div className="container-fluid py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${stats.avgOrderValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pendingOrders})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({stats.processingOrders})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({stats.shippedOrders})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({stats.deliveredOrders})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Payments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending Payment</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge variant={getStatusColor(order.status)} className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </Badge>
                        <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                          {order.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${order.totalAmount.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {order.paymentMethod}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ${item.price}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-muted p-3 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <div>{order.shippingAddress.street}</div>
                      <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                      <div>{order.shippingAddress.country}</div>
                    </div>
                  </div>

                  {/* Tracking Number */}
                  {order.trackingNumber && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="text-sm">
                        <span className="font-medium">Tracking Number: </span>
                        <span className="font-mono">{order.trackingNumber}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Order
                      </Button>
                    </div>

                    {/* Status Update */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Update Status:</span>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusUpdate(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter || paymentFilter 
                    ? 'Try adjusting your search or filters'
                    : 'No orders have been placed yet'
                  }
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Other tabs would filter by status */}
        <TabsContent value="pending" className="space-y-6">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
            <p className="text-muted-foreground">
              Orders waiting for processing would appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Processing Orders</h3>
            <p className="text-muted-foreground">
              Orders being prepared for shipment would appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shipped" className="space-y-6">
          <div className="text-center py-12">
            <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Shipped Orders</h3>
            <p className="text-muted-foreground">
              Orders in transit would appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delivered Orders</h3>
            <p className="text-muted-foreground">
              Successfully delivered orders would appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cancelled Orders</h3>
            <p className="text-muted-foreground">
              Cancelled orders would appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminOrders;