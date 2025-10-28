# Express RESTful API з Middleware та Шаблонізаторами

RESTful API сервер з використанням Express.js, який включає систему middleware для логування, аутентифікації, валідації даних та управління правами доступу. Проект підтримує два шаблонізатори: **PUG** для користувачів та **EJS** для статей.

## 📋 Зміст

- [Технології](#технології)
- [Встановлення](#встановлення)
- [Запуск](#запуск)
- [Архітектура](#архітектура)
- [Шаблонізатори](#шаблонізатори)
- [Middleware](#middleware)
- [Маршрути](#маршрути)
- [Тестування](#тестування)
- [Приклади використання](#приклади-використання)

## 🛠 Технології

- **Node.js** - серверне середовище виконання
- **Express.js** - веб-фреймворк для Node.js
- **PUG** - шаблонізатор для сторінок користувачів
- **EJS** - шаблонізатор для сторінок статей
- **ES Modules** - сучасний синтаксис модулів JavaScript
- **CSS3** - сучасні стилі з responsive дизайном
- **Vitest** - фреймворк для тестування
- **Supertest** - бібліотека для тестування HTTP

## 📦 Встановлення

1. Клонуйте репозиторій:
```bash
git clone <your-repository-url>
cd fullstack_hw61
```

2. Встановіть залежності:
```bash
npm install
# або
yarn install
```

Встановляться наступні залежності:
- `express` - веб-фреймворк
- `pug` - шаблонізатор PUG
- `ejs` - шаблонізатор EJS

## 🚀 Запуск

### Режим розробки (з автоперезавантаженням):
```bash
npm run dev
```

### Режим продакшн:
```bash
npm start
```

Сервер буде доступний за адресою: `http://localhost:3000`

## 📁 Архітектура

Проект побудований за паттерном MVC з модульною структурою:

```
src/
├── controllers/
│   ├── usersController.js    # Логіка користувачів
│   └── articlesController.js # Логіка статей
├── middlewares/
│   └── index.js               # Всі middleware функції
├── routes/
│   ├── users.js               # Маршрути для користувачів
│   └── articles.js            # Маршрути для статей
├── views/
│   ├── users/
│   │   ├── index.pug          # Список користувачів (PUG)
│   │   └── detail.pug         # Деталі користувача (PUG)
│   ├── articles/
│   │   ├── index.ejs          # Список статей (EJS)
│   │   └── detail.ejs         # Деталі статті (EJS)
│   ├── partials/
│   │   ├── header.ejs         # Header для EJS
│   │   └── footer.ejs         # Footer для EJS
│   ├── layout.pug             # Layout для PUG
│   ├── index.pug              # Головна сторінка (PUG)
│   └── error.pug              # Сторінка помилки (PUG)
├── public/
│   └── css/
│       └── style.css          # Стилі
├── __test__/
│   └── task1.test.js          # Тести
└── server.mjs                 # Головний файл сервера
```

## 🎨 Шаблонізатори

### PUG для користувачів

Маршрути `/users/page` використовують шаблонізатор **PUG** для відображення сторінок користувачів.

**Переваги PUG:**
- Чистий та лаконічний синтаксис
- Використання відступів замість закриваючих тегів
- Підтримка міксінів та інклюдів
- Вбудована підтримка JavaScript виразів

**Приклад шаблону PUG:**
```pug
extends layout

block content
  .users-grid
    each user in users
      .user-card
        h3= user.name
        p= user.email
```

### EJS для статей

Маршрути `/articles/page` використовують шаблонізатор **EJS** для відображення сторінок статей.

**Переваги EJS:**
- Синтаксис схожий на HTML
- Простий для новачків
- Можливість вставки JavaScript коду
- Підтримка часткових шаблонів (partials)

**Приклад шаблону EJS:**
```html
<%- include('partials/header') %>
<% articles.forEach(function(article) { %>
  <h2><%= article.title %></h2>
<% }); %>
<%- include('partials/footer') %>
```

## 🔧 Middleware

### 1. **Логування запитів** (`logRequests`)
- **Призначення**: Записує інформацію про кожен запит до сервера
- **Використання**: Глобально для всіх маршрутів
- **Формат логу**: `2025-01-15T10:30:45.123Z - GET request to /users`

### 2. **Базова автентифікація** (`basicAuth`)
- **Призначення**: Перевіряє наявність та формат Authorization заголовка
- **Використання**: На маршрутах `/users` та `/articles`
- **Формат**: `Authorization: Bearer <token>`
- **Статус при помилці**: `401 Unauthorized`

### 3. **Валідація даних користувача** (`validateUserInput`)
- **Призначення**: Перевіряє наявність обов'язкового поля `name`
- **Використання**: На POST та PUT запитах до `/users`
- **Статус при помилці**: `400 Bad Request`

### 4. **Валідація даних статті** (`validateArticleInput`)
- **Призначення**: Перевіряє наявність обов'язкового поля `title`
- **Використання**: На POST та PUT запитах до `/articles`
- **Статус при помилці**: `400 Bad Request`

### 5. **Перевірка прав доступу** (`checkArticleAccess`)
- **Призначення**: Перевіряє права користувача для роботи зі статтями
- **Використання**: На всіх маршрутах `/articles`
- **Дозволені ролі**: `admin`, `author`
- **Статус при помилці**: `403 Forbidden`

### 6. **Перевірка існування ресурсу** (`checkResourceExists`)
- **Призначення**: Перевіряє чи існує ресурс з вказаним ID
- **Використання**: На маршрутах з параметром `:userId` або `:articleId`
- **Статус при помилці**: `404 Not Found`

## 🛣 Маршрути

### Веб-сторінки (HTML)

#### Головна сторінка
- **URL**: `GET /`
- **Шаблонізатор**: PUG
- **Опис**: Головна сторінка з переходами до користувачів та статей
- **Приклад**: Відкрийте `http://localhost:3000/` в браузері

#### Користувачі (PUG)

**Список користувачів**
- **URL**: `GET /users/page`
- **Шаблонізатор**: PUG
- **Опис**: Відображає список всіх користувачів у вигляді карток
- **Дані**: ID, ім'я, email, роль
- **Приклад**: `http://localhost:3000/users/page`

**Деталі користувача**
- **URL**: `GET /users/page/:userId`
- **Шаблонізатор**: PUG
- **Параметри**: `userId` (123, 456, 789)
- **Опис**: Детальна інформація про конкретного користувача
- **Приклад**: `http://localhost:3000/users/page/123`

#### Статті (EJS)

**Список статей**
- **URL**: `GET /articles/page`
- **Шаблонізатор**: EJS
- **Опис**: Відображає список всіх статей з коротким описом
- **Дані**: ID, заголовок, автор, дата, перегляди, контент
- **Приклад**: `http://localhost:3000/articles/page`

**Деталі статті**
- **URL**: `GET /articles/page/:articleId`
- **Шаблонізатор**: EJS
- **Параметри**: `articleId` (456, 789, 101)
- **Опис**: Повний текст статті з метаданими
- **Приклад**: `http://localhost:3000/articles/page/456`

---

### API Endpoints (JSON/Text)

Всі API endpoints вимагають автентифікації через заголовок `Authorization: Bearer <token>`

#### `GET /users`
- **Опис**: Отримати список всіх користувачів
- **Middleware**: `logRequests`, `basicAuth`
- **Заголовки**: `Authorization: Bearer <token>`
- **Відповідь**: `200 OK` - "Get users route"

#### `POST /users`
- **Опис**: Створити нового користувача
- **Middleware**: `logRequests`, `basicAuth`, `validateUserInput`
- **Заголовки**: `Authorization: Bearer <token>`
- **Тіло запиту**:
```json
{
  "name": "Ім'я користувача"
}
```
- **Відповідь**: `201 Created` - "Post users route"
- **Помилки**: 
  - `400 Bad Request` - некоректні дані
  - `401 Unauthorized` - відсутня автентифікація

#### `GET /users/:userId`
- **Опис**: Отримати користувача за ID
- **Middleware**: `logRequests`, `basicAuth`, `checkResourceExists`
- **Параметри**: `userId` - ID користувача (123, 456, 789)
- **Відповідь**: `200 OK` - "Get user by Id route: {userId}"
- **Помилки**: `404 Not Found` - користувач не знайдений

#### `PUT /users/:userId`
- **Опис**: Оновити користувача за ID
- **Middleware**: `logRequests`, `basicAuth`, `checkResourceExists`, `validateUserInput`
- **Параметри**: `userId` - ID користувача
- **Тіло запиту**:
```json
{
  "name": "Оновлене ім'я"
}
```
- **Відповідь**: `200 OK` - "Put user by Id route: {userId}"
- **Помилки**: 
  - `400 Bad Request` - некоректні дані
  - `404 Not Found` - користувач не знайдений

#### `DELETE /users/:userId`
- **Опис**: Видалити користувача за ID
- **Middleware**: `logRequests`, `basicAuth`, `checkResourceExists`
- **Параметри**: `userId` - ID користувача
- **Відповідь**: `204 No Content`
- **Помилки**: `404 Not Found` - користувач не знайдений

---

### Маршрути статей

#### `GET /articles`
- **Опис**: Отримати список всіх статей
- **Middleware**: `logRequests`, `basicAuth`, `checkArticleAccess`
- **Заголовки**: `Authorization: Bearer <token>`
- **Відповідь**: `200 OK` - "Get articles route"
- **Помилки**: `403 Forbidden` - недостатньо прав

#### `POST /articles`
- **Опис**: Створити нову статтю
- **Middleware**: `logRequests`, `basicAuth`, `checkArticleAccess`, `validateArticleInput`
- **Заголовки**: `Authorization: Bearer <token>`
- **Тіло запиту**:
```json
{
  "title": "Назва статті"
}
```
- **Відповідь**: `201 Created` - "Post articles route"
- **Помилки**: 
  - `400 Bad Request` - некоректні дані
  - `403 Forbidden` - недостатньо прав

#### `GET /articles/:articleId`
- **Опис**: Отримати статтю за ID
- **Middleware**: `logRequests`, `basicAuth`, `checkArticleAccess`, `checkResourceExists`
- **Параметри**: `articleId` - ID статті (456, 789, 101)
- **Відповідь**: `200 OK` - "Get article by Id route: {articleId}"
- **Помилки**: 
  - `403 Forbidden` - недостатньо прав
  - `404 Not Found` - стаття не знайдена

#### `PUT /articles/:articleId`
- **Опис**: Оновити статтю за ID
- **Middleware**: `logRequests`, `basicAuth`, `checkArticleAccess`, `checkResourceExists`, `validateArticleInput`
- **Параметри**: `articleId` - ID статті
- **Тіло запиту**:
```json
{
  "title": "Оновлена назва статті"
}
```
- **Відповідь**: `200 OK` - "Put article by Id route: {articleId}"
- **Помилки**: 
  - `400 Bad Request` - некоректні дані
  - `403 Forbidden` - недостатньо прав
  - `404 Not Found` - стаття не знайдена

#### `DELETE /articles/:articleId`
- **Опис**: Видалити статтю за ID
- **Middleware**: `logRequets`, `basicAuth`, `checkArticleAccess`, `checkResourceExists`
- **Параметри**: `articleId` - ID статті
- **Відповідь**: `204 No Content`
- **Помилки**: 
  - `403 Forbidden` - недостатньо прав
  - `404 Not Found` - стаття не знайдена

---

### Обробка помилок

#### Неіснуючий маршрут
- **Відповідь**: `404 Not Found` - "Not Found"

#### Внутрішня помилка сервера
- **Відповідь**: `500 Internal Server Error` - "Internal Server Error"

## 🧪 Тестування

Запуск тестів:
```bash
npm test
```

Тести покривають:
- ✅ Всі маршрути API
- ✅ Валідацію даних
- ✅ Обробку помилок
- ✅ Статус-коди відповідей

## 📝 Приклади використання

### Перегляд веб-сторінок

#### 1. Відкрийте головну сторінку в браузері:
```
http://localhost:3000/
```

#### 2. Перегляд списку користувачів (PUG):
```
http://localhost:3000/users/page
```

#### 3. Перегляд конкретного користувача:
```
http://localhost:3000/users/page/123
```

#### 4. Перегляд списку статей (EJS):
```
http://localhost:3000/articles/page
```

#### 5. Перегляд конкретної статті:
```
http://localhost:3000/articles/page/456
```

---

### Використання API з curl

#### Отримати список користувачів (API):
```bash
curl -H "Authorization: Bearer your-token" http://localhost:3000/users
```

#### Створити нового користувача:
```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Іван Петренко"}'
```

#### Отримати список статей (API):
```bash
curl -H "Authorization: Bearer your-token" http://localhost:3000/articles
```

#### Створити нову статтю:
```bash
curl -X POST http://localhost:3000/articles \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"title":"Моя стаття"}'
```

---

### Скриншоти та очікуваний результат

#### Головна сторінка
- Красивий hero-блок з градієнтом
- Три картки з переходами до розділів
- Адаптивний дизайн

#### Сторінка користувачів (PUG)
- Сітка карток користувачів
- Аватари з ініціалами
- Бейджі з ролями (admin/user)
- Кнопки для деталей

#### Деталі користувача (PUG)
- Великий аватар з ініціалом
- Детальна інформація
- Breadcrumb навігація
- Кнопки дій (редагувати, видалити)

#### Сторінка статей (EJS)
- Список статей у вигляді карток
- Метадані (автор, дата, перегляди)
- Короткий опис
- Кнопка "Читати далі"

#### Деталі статті (EJS)
- Повний текст статті
- Метадані в хедері
- Структурований контент
- Breadcrumb та кнопки дій `http://localhost:3000/articles`
4. У вкладці **Headers** додайте:
   - Key: `Authorization`
   - Value: `Bearer your-token`
5. Для POST/PUT запитів у вкладці **Body** виберіть **raw** та **JSON**, додайте дані:
```json
{
  "name": "Тестовий користувач"
}
```

## 🔒 Безпека

Проект включає базові механізми безпеки:

- **Автентифікація**: Перевірка Authorization заголовка
- **Авторизація**: Контроль прав доступу до ресурсів
- **Валідація**: Перевірка вхідних даних
- **Обробка помилок**: Централізована обробка помилок

> ⚠️ **Важливо**: Це навчальний проект. Для продакшн використання необхідно додати:
> - Реальну систему автентифікації (JWT, OAuth)
> - Шифрування паролів
> - HTTPS
> - Rate limiting
> - CORS політику
> - Базу даних

## 📄 Ліцензія

ISC

## 👨‍💻 Автор

Ваше ім'я

---

**Примітка**: Всі відповіді сервера є текстовими відповідно до вимог завдання.