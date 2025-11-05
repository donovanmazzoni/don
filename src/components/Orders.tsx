import React, { useEffect, useState } from 'react';
import { wooCommerceAPI } from '@/services/woocommerce';
import { Order } from '@/types/woocommerce';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { Search, Eye, RefreshCw, Package, MapPin, CreditCard, User } from 'lucide-react';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params: any = { per_page: 100 };
      if (statusFilter) params.status = statusFilter;

      const data = await wooCommerceAPI.getOrders(params);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId: number) => {
    try {
      const order = await wooCommerceAPI.getOrder(orderId);
      setSelectedOrder(order);
      setShowDetails(true);
    } catch (error) {
      console.error('Error loading order details:', error);
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      await wooCommerceAPI.updateOrder(orderId, { status: newStatus });
      loadOrders();
      if (selectedOrder?.id === orderId) {
        const updatedOrder = await wooCommerceAPI.getOrder(orderId);
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.billing.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.billing.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.billing.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all your store orders</p>
        </div>
        <Button onClick={loadOrders} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order number, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>A list of all orders in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.number}</TableCell>
                  <TableCell>{formatDate(order.date_created)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {order.billing.first_name} {order.billing.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.billing.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(parseFloat(order.total), order.currency)}</TableCell>
                  <TableCell>{order.line_items.length} item(s)</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl" onClose={() => setShowDetails(false)}>
          {selectedOrder && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>Order #{selectedOrder.number}</DialogTitle>
                <DialogDescription>
                  Placed on {formatDate(selectedOrder.date_created)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                {/* Order Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Order Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </Select>
                  </CardContent>
                </Card>

                {/* Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedOrder.payment_method_title}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.date_paid ? `Paid on ${formatDate(selectedOrder.date_paid)}` : 'Not paid'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Billing Address</h4>
                      <p className="text-sm">
                        {selectedOrder.billing.first_name} {selectedOrder.billing.last_name}
                      </p>
                      {selectedOrder.billing.company && (
                        <p className="text-sm">{selectedOrder.billing.company}</p>
                      )}
                      <p className="text-sm">{selectedOrder.billing.address_1}</p>
                      {selectedOrder.billing.address_2 && (
                        <p className="text-sm">{selectedOrder.billing.address_2}</p>
                      )}
                      <p className="text-sm">
                        {selectedOrder.billing.city}, {selectedOrder.billing.state} {selectedOrder.billing.postcode}
                      </p>
                      <p className="text-sm">{selectedOrder.billing.country}</p>
                      <p className="text-sm mt-2">
                        <strong>Email:</strong> {selectedOrder.billing.email}
                      </p>
                      <p className="text-sm">
                        <strong>Phone:</strong> {selectedOrder.billing.phone}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Shipping Address
                      </h4>
                      <p className="text-sm">
                        {selectedOrder.shipping.first_name} {selectedOrder.shipping.last_name}
                      </p>
                      {selectedOrder.shipping.company && (
                        <p className="text-sm">{selectedOrder.shipping.company}</p>
                      )}
                      <p className="text-sm">{selectedOrder.shipping.address_1}</p>
                      {selectedOrder.shipping.address_2 && (
                        <p className="text-sm">{selectedOrder.shipping.address_2}</p>
                      )}
                      <p className="text-sm">
                        {selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.postcode}
                      </p>
                      <p className="text-sm">{selectedOrder.shipping.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.line_items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-muted-foreground">{item.sku || '-'}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.price, selectedOrder.currency)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(parseFloat(item.total), selectedOrder.currency)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Order Totals */}
                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>
                        {formatCurrency(
                          selectedOrder.line_items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0),
                          selectedOrder.currency
                        )}
                      </span>
                    </div>
                    {parseFloat(selectedOrder.discount_total) > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount:</span>
                        <span>-{formatCurrency(parseFloat(selectedOrder.discount_total), selectedOrder.currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{formatCurrency(parseFloat(selectedOrder.shipping_total), selectedOrder.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>{formatCurrency(parseFloat(selectedOrder.total_tax), selectedOrder.currency)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>{formatCurrency(parseFloat(selectedOrder.total), selectedOrder.currency)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedOrder.customer_note && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer Note</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedOrder.customer_note}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
