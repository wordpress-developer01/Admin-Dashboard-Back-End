# API Contract

Базовый URL (dev): http://localhost:<PORT>  
Формат данных: application/json

---

## Общие соглашения

### Пагинация (для списков)

- page — номер страницы (начиная с 1), по умолчанию 1  
- pageSize — размер страницы, по умолчанию 20

Ответ всегда содержит поля data и pagination.

Пример успешного ответа:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "totalPages": 0,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

## Errors

### Codes

NOT_FOUND  
VALIDATION_ERROR  
INTERNAL_ERROR

### Формат ошибки

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      { "field": "pageSize", "issue": "must be between 1 and 100" }
    ]
  }
}
```

---

## GET /general/dashboard

Query (необязательно):

- from — дата ISO  
- to — дата ISO  
- metric — revenue | orders | customers  
- interval — day | week | month

Response example:

```json
{
  "cards": [
    {
      "id": "totalCustomers",
      "title": "Total Customers",
      "value": 10234,
      "diffPct": 3.2,
      "currency": null
    }
  ],
  "timeSeries": {
    "metric": "revenue",
    "interval": "day",
    "points": [
      {
        "date": "2025-01-01",
        "value": 1200.0
      }
    ]
  }
}
```

Правила:

- value всегда number
- diffPct всегда number
- currency может быть null

---

## GET /management/users

Query:

- page
- pageSize
- search
- sort (формат field:asc|desc)

Search применяется по:

- name
- email

Response example:

```json
{
  "data": [
    {
      "_id": "string",
      "name": "Ali Yilmaz",
      "email": "ali@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-01-10T12:20:30.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 154,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## GET /sales/transactions

Query:

- page
- pageSize
- search
- sort
- status (pending | completed | failed)

Search применяется по:

- transactionId
- userName

Response example:

```json
{
  "data": [
    {
      "_id": "string",
      "transactionId": "TXN-2025-000123",
      "userId": "string",
      "userName": "Ali Yilmaz",
      "amount": 149.99,
      "currency": "USD",
      "status": "completed",
      "paymentMethod": "card",
      "createdAt": "2025-01-12T15:40:10.000Z"
    }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 10,
    "total": 431,
    "totalPages": 44,
    "hasNext": true,
    "hasPrev": true
  }
}
```