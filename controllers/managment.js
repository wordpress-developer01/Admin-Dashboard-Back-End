export const getUsers = (req, res) => {

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 20;

  // Проверка page
  if (page < 1) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request parameters",
        details: [
          { field: "page", issue: "must be >= 1" }
        ]
      }
    });
  }

  // Проверка pageSize
  if (pageSize < 1 || pageSize > 100) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request parameters",
        details: [
          { field: "pageSize", issue: "must be between 1 and 100" }
        ]
      }
    });
  }

  const total = 154;
  const totalPages = Math.ceil(total / pageSize);

  res.json({
    data: [
      {
        _id: "1",
        name: "Ali Yilmaz",
        email: "ali@example.com",
        role: "admin",
        status: "active",
        createdAt: "2025-01-10T12:20:30.000Z"
      },
      {
        _id: "2",
        name: "Ayse Demir",
        email: "ayse@example.com",
        role: "user",
        status: "active",
        createdAt: "2025-01-11T10:10:10.000Z"
      }
    ],
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });

};