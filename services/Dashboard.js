import Orders from '@/models/Orders'
import Customers from '@/models/Customers'

const Dashboard = {
  async getWeeklyStats() {
    const response = await Orders.where('fulfilled', true)
      .where('paid', true)
      .whereIn('date_between', ['this week', 'today'])
      .get()
    return response
  },

  async getWeeklyCustomers() {
    const currentWeek = await Customers.whereIn('date_between', [
      'this week',
      'today',
    ])
      .orderBy('-created_at')
      .get()

    return currentWeek
  },

  /**
   * Response body:
   * Criteria:
   * - unfulfilled
   * - paid
   * - recent
   * Relationships:
   * - customer, products
   * Count:
   * - number of results returned
   *
   */
  async getRecentOrders() {
    const orders = await Orders.where('fulfilled', false)
      .where('paid', true)
      .orderBy('-created_at')
      .include('customer', 'products')
      .get()
    return orders
  },

  /**
   * Response body:
   *  Criteria:
   *      -most viewed in the past week
   *      -
   */
  async getMostViewedProducts() {
    // return axios.get('/store/outlets/dashboard/most-viewed');
  },
}

export default Dashboard
