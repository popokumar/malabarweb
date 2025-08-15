import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  console.log('👑 AdminDashboard rendering');

  // Mock analytics data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
      description: 'from last month'
    },
    {
      title: 'Orders',
      value: '2,350',
      change: '+180.1%',
      changeType: 'increase',
      icon: ShoppingCart,
      description: 'from last month'
    },
    {
      title: 'Products',
      value: '12,234',
      change: '+19%',
      changeType: 'increase',
      icon: Package,
      description: 'from last month'
    },
    {
      title: 'Active Users',
      value: '573',
      change: '+201',
      changeType: 'increase',
      icon: Users,
      description: 'from last hour'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '$299.99',
      status: 'completed',
      date: '2 hours ago'
    },
    {
      id: 'ORD-2024-002', 
      customer: 'Sarah Smith',
      email: 'sarah@example.com',
      amount: '$199.99',
      status: 'processing',
      date: '4 hours ago'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com', 
      amount: '$89.99',
      status: 'shipped',
      date: '6 hours ago'
    },
    {
      id: 'ORD-2024-004',
      customer: 'Emily Brown',
      email: 'emily@example.com',
      amount: '$459.99',
      status: 'pending',
      date: '8 hours ago'
    }
  ];

  const topProducts = [
    {
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      sales: 234,
      revenue: '$69,966.00',
      change: '+12%'
    },
    {
      name: 'Smart Fitness Watch',
      category: 'Electronics', 
      sales: 189,
      revenue: '$37,781.00',
      change: '+8%'
    },
    {
      name: 'Laptop Backpack Pro',
      category: 'Accessories',
      sales: 156,
      revenue: '$14,034.44',
      change: '+24%'
    },
    {
      name: 'Wireless Charging Stand',
      category: 'Electronics',
      sales: 98,
      revenue: '$4,899.02',
      change: '-3%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'shipped':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container-fluid py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2">
          <Eye className="h-4 w-4 mr-2" />
          Live Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                      <div className="text-xs text-muted-foreground">{order.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount}</div>
                    <Badge variant={getStatusColor(order.status)} className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium line-clamp-1">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.category}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.revenue}</div>
                    <div className={`text-xs ${
                      product.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {product.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart Placeholder */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Sales chart would appear here</p>
              <p className="text-sm text-muted-foreground">
                Integration with charting library needed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;