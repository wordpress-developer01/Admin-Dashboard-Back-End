### Локальный запуск (backend)

1. Склонируй репозиторий и установи зависимости:
```bash
git clone <repo-url>
cd Admin-Dashboard-Back-End
npm install
```

2. Создай файл `.env` в корне (не коммитить!). Используй `.env.example` как шаблон:
```bash
cp .env.example .env
# затем отредактируй .env и подставь реальные значения
```

3. Заполни или запусти Mongo (локально или через docker):
- Локально: установи Mongo и запусти сервис
- Через docker:
```bash
docker run --name admin-mongo -p 27017:27017 -d mongo:6
```

4. Запусти сидер для создания тестовых данных:
```bash
npm run seed
```

5. Запусти сервер в режиме разработки:
```bash
npm run dev
# или для production:
npm start
```

6. Проверки:
```bash
curl http://localhost:9000/health
# ожидаемый ответ: {"ok":true}

curl http://localhost:9000/general/summary
# ожидаемый ответ: JSON с totalUsers, totalSales, todayRevenue
```