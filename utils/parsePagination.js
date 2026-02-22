export const parsePagination = (query) => {

  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 20;

  // Проверка page
  if (page < 1) {
    return {
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request parameters",
        details: [
          { field: "page", issue: "must be >= 1" }
        ]
      }
    };
  }

  // Проверка pageSize
  if (pageSize < 1 || pageSize > 100) {
    return {
      ok: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request parameters",
        details: [
          { field: "pageSize", issue: "must be between 1 and 100" }
        ]
      }
    };
  }

  // Если всё нормально
  return {
    ok: true,
    page,
    pageSize
  };

};