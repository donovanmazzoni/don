import React, { useEffect, useState } from 'react';
import { wooCommerceAPI } from '@/services/woocommerce';
import { Product } from '@/types/woocommerce';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { formatCurrency, getStatusColor } from '@/lib/utils';
import { Search, RefreshCw, Package, Download, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  useEffect(() => {
    loadProducts();
  }, [statusFilter, stockFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params: any = { per_page: 100 };
      if (statusFilter) params.status = statusFilter;
      if (stockFilter) params.stock_status = stockFilter;

      const data = await wooCommerceAPI.getProducts(params);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const renderStockInfo = (product: Product) => {
    if (product.manage_stock && product.stock_quantity !== null) {
      return (
        <div>
          <p className="font-medium">{product.stock_quantity} units</p>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.stock_status)}`}>
            {product.stock_status}
          </span>
        </div>
      );
    }
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.stock_status)}`}>
        {product.stock_status}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your store's product catalog</p>
        </div>
        <Button onClick={loadProducts} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Product Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.stock_status === 'instock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock_status === 'outofstock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Virtual Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {products.filter(p => p.virtual).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="publish">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="private">Private</option>
            </Select>
            <Select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
              <option value="">All Stock Levels</option>
              <option value="instock">In Stock</option>
              <option value="outofstock">Out of Stock</option>
              <option value="onbackorder">On Backorder</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>A list of all products in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attributes</TableHead>
                <TableHead>Total Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex gap-1 mt-1">
                        {product.virtual && (
                          <Badge variant="secondary" className="text-xs">
                            Virtual
                          </Badge>
                        )}
                        {product.downloadable && (
                          <Badge variant="secondary" className="text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Downloadable
                          </Badge>
                        )}
                        {product.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatCurrency(parseFloat(product.price))}</p>
                      {product.on_sale && product.regular_price && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatCurrency(parseFloat(product.regular_price))}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{renderStockInfo(product)}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'publish'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {product.manage_stock && (
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                          Stock Managed
                        </div>
                      )}
                      {product.sold_individually && (
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-blue-600" />
                          Sold Individually
                        </div>
                      )}
                      {product.shipping_required ? (
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 mr-1 text-purple-600" />
                          Shipping Required
                        </div>
                      ) : (
                        <div className="flex items-center text-xs">
                          <XCircle className="h-3 w-3 mr-1 text-gray-400" />
                          No Shipping
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.total_sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
