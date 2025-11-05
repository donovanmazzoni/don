import React, { useEffect, useState } from 'react';
import { wooCommerceAPI } from '@/services/woocommerce';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  CreditCard,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Order } from '@/types/woocommerce';

interface KPICardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function KPICard({ title, value, description, icon, trend }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2 text-xs">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [orderStats, setOrderStats] = useState<any>(null);
  const [productStats, setProductStats] = useState<any>(null);
  const [customerStats, setCustomerStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topSellers, setTopSellers] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Calculate date ranges
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const after = firstDayOfMonth.toISOString();

      // Load all data in parallel
      const [orders, products, customers, sellers] = await Promise.all([
        wooCommerceAPI.getOrderStats({ after }),
        wooCommerceAPI.getProductStats(),
        wooCommerceAPI.getCustomerStats(),
        wooCommerceAPI.getTopSellers({ period: 'month' }),
      ]);

      setOrderStats(orders);
      setProductStats(products);
      setCustomerStats(customers);
      setTopSellers(sellers || []);

      // Get recent orders
      const recentOrdersList = await wooCommerceAPI.getOrders({ per_page: 5 });
      setRecentOrders(recentOrdersList);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const orderStatusData = orderStats?.statusCounts
    ? Object.entries(orderStats.statusCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
    : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  const stockStatusData = [
    { name: 'In Stock', value: productStats?.inStock || 0 },
    { name: 'Out of Stock', value: productStats?.outOfStock || 0 },
    { name: 'On Backorder', value: productStats?.onBackorder || 0 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your WooCommerce store performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(orderStats?.totalRevenue || 0)}
          description="Current month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Total Orders"
          value={orderStats?.totalOrders || 0}
          description="Current month"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <KPICard
          title="Products Sold"
          value={orderStats?.totalItems || 0}
          description="Total items in orders"
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Total Customers"
          value={customerStats?.totalCustomers || 0}
          description={`${customerStats?.payingCustomers || 0} paying customers`}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Average Order Value"
          value={formatCurrency(orderStats?.averageOrderValue || 0)}
          description="Per order"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <KPICard
          title="Total Products"
          value={productStats?.totalProducts || 0}
          description={`${productStats?.inStock || 0} in stock`}
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Virtual Products"
          value={productStats?.virtualProducts || 0}
          description="Digital products"
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Inventory Value"
          value={formatCurrency(productStats?.totalValue || 0)}
          description="Total stock value"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Breakdown of orders by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Stock Status</CardTitle>
            <CardDescription>Inventory availability overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Sellers */}
      {topSellers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellers.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">Order #{order.number}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.billing.first_name} {order.billing.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date_created).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(parseFloat(order.total))}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
