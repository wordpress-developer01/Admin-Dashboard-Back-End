import User from "../models/User.js";
import Sale from "../models/Sale.js";

export const getDashboard = async (req, res) => {
  try {

    const metric = req.query.metric || "revenue";
    const interval = req.query.interval || "day";

    const allowedMetrics = new Set(["revenue", "sales"]);
    const allowedIntervals = new Set(["day", "week", "month"]);

    if(!allowedMetrics.has(metric) || !allowedIntervals.has(interval)) {
       return res.status(400).json({
        error: { code: "BAD_REQUEST", message: "Invalid metric or interval" },
       });
    }

    
    const totalCustomers = await User.countDocuments();

    
    const revenueAgg = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    const now = new Date();

let daysBack;
if (interval === "day") daysBack = 30;
else if (interval === "week") daysBack = 90;   
else daysBack = 365;                           

const startDate = new Date(now);
startDate.setDate(startDate.getDate() - daysBack);

    let groupId;

if (interval === "week") {
  groupId = {
    $dateTrunc: {
      date: "$createdAt",
      unit: "week"
    }
  };
} else {
 const format =
    interval === "day" ? "%Y-%m-%d" : "%Y-%m";
    
    groupId = {
    $dateToString: {
      format,
      date: "$createdAt"
    }
};
}

const groupValue =
  metric === "revenue"
    ? { $sum: "$amount" }
    : { $sum: 1 };

const aggregation = await Sale.aggregate([
   {
    $match: {
      createdAt: { $gte: startDate, $lte: now }
    }
  },
  
  {
    $group: {
      _id: groupId, 
      value: groupValue
    }
   
  },
  {
    $sort: {
      _id: 1
    }
  },
  {
    $project: {
      _id: 0,
      date: interval === "week" ? { $dateToString: {format: "%Y-%m-%d", date: "$_id"}} : "$_id",
      value: 1
    }
  }
]);

const points = aggregation.map(item => ({
  date: item.date,
  value: item.value
}));

    return res.json({
      cards: [
        {
          id: "totalCustomers",
          title: "Total Customers",
          value: totalCustomers,
          diffPct: null,
          currency: null
        },
        {
          id: "totalRevenue",
          title: "Total Revenue",
          value: totalRevenue,
          diffPct: null,
          currency: "USD"
        }
      ],
      timeSeries: {
        metric,
        interval,
        points
      }
    });

  } catch (error) {

    console.error("getDashboard error:", error);

    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to load dashboard"
      }
    });

  }
};

export const getSummary = async (req, res) => {



  try {
      const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);


    const totalUsers = await User.countDocuments();
    const totalSales = await Sale.countDocuments();

const revenueAgg = await Sale.aggregate([
  { $match: { createdAt: { $gte: start, $lte: end } } },
  { $group: { _id: null, total: { $sum: "$amount" } } },
]);
const todayRevenue = revenueAgg[0]?.total ?? 0;

   return res.json({
    totalUsers,
    totalSales,
    todayRevenue,
  });

} catch (error) {
  console.error("getSummary error:", error);

   return res.status(500).json({
   error: {
        code: "INTERNAL_ERROR",
        message: "Failed to load summary"
      }
  });
  
}
};