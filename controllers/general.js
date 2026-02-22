export const getDashboard = (req, res) => {

  const metric = req.query.metric || "revenue";
  const interval = req.query.interval || "day";

  res.json({
    cards: [
      {
        id: "totalCustomers",
        title: "Total Customers",
        value: 10234,
        diffPct: 3.2,
        currency: null
      },
      {
        id: "totalRevenue",
        title: "Total Revenue",
        value: 48210,
        diffPct: 7.9,
        currency: "USD"
      }
    ],
    timeSeries: {
      metric,
      interval,
      points: [
        {
          date: "2025-01-01",
          value: 1200
        },
        {
          date: "2025-01-02",
          value: 980
        }
      ]
    }
  });

};

export const getSummary = (req, res) => {

  try {
  res.json({
    totalUsers: 1245,
    totalSales: 382,
    todayRevenue: 1290
  })

} catch {
  console.error("getSummary error:", error);

  res.status(500).json({
   error: {
        code: "INTERNAL_ERROR",
        message: "Failed to load summary"
      }
  });
  
}
};