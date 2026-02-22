export const getTransactions = (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const total = 431;
    const totalPages = Math.ceil(total / pageSize);

    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const transactions = [
      {
        _id: "1",
        transactionId: "TXN-2025-000123",
        userId: "u1",
        userName: "Ali Yilmaz",
        amount: 149.99,
        currency: "USD",
        status: "completed",
        paymentMethod: "card",
        createdAt: "2025-01-12T15:40:10.000Z"
      },
      {
        _id: "2",
        transactionId: "TXN-2025-000124",
        userId: "u2",
        userName: "Mehmet Kaya",
        amount: 89.50,
        currency: "USD",
        status: "pending",
        paymentMethod: "card",
        createdAt: "2025-01-13T10:15:00.000Z"
      },
      {
        _id: "3",
        transactionId: "TXN-2025-000125",
        userId: "u3",
        userName: "Ayse Demir",
        amount: 210.00,
        currency: "USD",
        status: "failed",
        paymentMethod: "card",
        createdAt: "2025-01-14T09:20:00.000Z"
      }
    ];

    res.status(200).json({
      data: transactions,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    });

  } catch (error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Server error"
      }
    });
  }
};