import Orders from '@/models/Orders'
import Customers from '@/models/Customers'

const Dashboard = {
  getWeeklyStats(data) {
    return [
      {
        title: "Sales",
        subtitle: "Sales this week",
        filter: "money",
        value: data.sales_sum,
        message: `${data.sales_count} new orders`,
        empty_message: "No new orders yet",
        link: data.sales_link,
        link_text: "This week's orders >"
      },
      {
        title: "Customers",
        subtitle: "30% increase this week",
        value: `+${data.customers_count}`,
        message: "See all customers",
        empty_message: "",
        link: data.customers_link,
        link_text: "View customers >"
      },
      {
        title: "Visits",
        subtitle: "Visits in the past week",
        value: `+${30070}`,
        message: "Store URL",
        empty_message: "",
        link: "https://michtolam.myduxstore.com",
        link_text: "michtolam.myduxstore.com",
        external_link: true
      },
      // Analytics card
    ]
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
