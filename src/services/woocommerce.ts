import axios, { AxiosInstance } from 'axios';
import type {
  Order,
  Product,
  Customer,
  SalesReport,
  TopSellersReport,
  WooCommerceConfig,
} from '../types/woocommerce';

class WooCommerceAPI {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(config: WooCommerceConfig) {
    this.baseURL = `${config.url}/wp-json/wc/v3`;

    this.client = axios.create({
      baseURL: this.baseURL,
      auth: {
        username: config.consumerKey,
        password: config.consumerSecret,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Orders
  async getOrders(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    after?: string;
    before?: string;
  }): Promise<Order[]> {
    const response = await this.client.get<Order[]>('/orders', { params });
    return response.data;
  }

  async getOrder(id: number): Promise<Order> {
    const response = await this.client.get<Order>(`/orders/${id}`);
    return response.data;
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    const response = await this.client.put<Order>(`/orders/${id}`, data);
    return response.data;
  }

  // Products
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    stock_status?: string;
  }): Promise<Product[]> {
    const response = await this.client.get<Product[]>('/products', { params });
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.client.get<Product>(`/products/${id}`);
    return response.data;
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const response = await this.client.put<Product>(`/products/${id}`, data);
    return response.data;
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await this.client.post<Product>('/products', data);
    return response.data;
  }

  async deleteProduct(id: number, force: boolean = false): Promise<Product> {
    const response = await this.client.delete<Product>(`/products/${id}`, {
      params: { force },
    });
    return response.data;
  }

  // Customers/Users
  async getCustomers(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    role?: string;
  }): Promise<Customer[]> {
    const response = await this.client.get<Customer[]>('/customers', { params });
    return response.data;
  }

  async getCustomer(id: number): Promise<Customer> {
    const response = await this.client.get<Customer>(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const response = await this.client.post<Customer>('/customers', data);
    return response.data;
  }

  async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
    const response = await this.client.put<Customer>(`/customers/${id}`, data);
    return response.data;
  }

  async deleteCustomer(id: number, force: boolean = true, reassign?: number): Promise<Customer> {
    const response = await this.client.delete<Customer>(`/customers/${id}`, {
      params: { force, reassign },
    });
    return response.data;
  }

  // Reports & Analytics
  async getSalesReport(params?: {
    period?: 'week' | 'month' | 'year';
    date_min?: string;
    date_max?: string;
  }): Promise<SalesReport[]> {
    const response = await this.client.get<SalesReport[]>('/reports/sales', { params });
    return response.data;
  }

  async getTopSellers(params?: {
    period?: 'week' | 'month' | 'year';
    date_min?: string;
    date_max?: string;
  }): Promise<TopSellersReport[]> {
    const response = await this.client.get<TopSellersReport[]>('/reports/top_sellers', { params });
    return response.data;
  }

  // Custom analytics methods
  async getOrderStats(params?: { after?: string; before?: string }) {
    const orders = await this.getOrders({ ...params, per_page: 100 });

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalItems = orders.reduce((sum, order) => {
      return sum + order.line_items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      statusCounts,
      totalItems,
    };
  }

  async getProductStats() {
    const products = await this.getProducts({ per_page: 100 });

    const totalProducts = products.length;
    const inStock = products.filter(p => p.stock_status === 'instock').length;
    const outOfStock = products.filter(p => p.stock_status === 'outofstock').length;
    const onBackorder = products.filter(p => p.stock_status === 'onbackorder').length;
    const virtualProducts = products.filter(p => p.virtual).length;
    const downloadableProducts = products.filter(p => p.downloadable).length;

    const totalValue = products.reduce((sum, product) => {
      const stockQty = product.stock_quantity || 0;
      const price = parseFloat(product.price) || 0;
      return sum + (stockQty * price);
    }, 0);

    return {
      totalProducts,
      inStock,
      outOfStock,
      onBackorder,
      virtualProducts,
      downloadableProducts,
      totalValue,
    };
  }

  async getCustomerStats() {
    const customers = await this.getCustomers({ per_page: 100 });

    const totalCustomers = customers.length;
    const payingCustomers = customers.filter(c => c.is_paying_customer).length;
    const totalSpent = customers.reduce((sum, customer) => sum + parseFloat(customer.total_spent), 0);
    const averageSpent = totalCustomers > 0 ? totalSpent / totalCustomers : 0;
    const totalOrders = customers.reduce((sum, customer) => sum + customer.orders_count, 0);

    return {
      totalCustomers,
      payingCustomers,
      totalSpent,
      averageSpent,
      totalOrders,
    };
  }
}

// Create singleton instance
const config: WooCommerceConfig = {
  url: import.meta.env.VITE_WOOCOMMERCE_URL || '',
  consumerKey: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET || '',
};

export const wooCommerceAPI = new WooCommerceAPI(config);
export default WooCommerceAPI;
