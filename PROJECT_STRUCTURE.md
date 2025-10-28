# 📁 Структура проекту

```
fullstack_hw61/
│
├── src/
│   ├── controllers/                    # Контролери (MVC)
│   │   ├── usersController.js         # Логіка користувачів
│   │   └── articlesController.js      # Логіка статей
│   │
│   ├── middlewares/                    # Middleware функції
│   │   └── index.js                   # Всі middleware
│   │       ├── logRequests()          # Логування запитів
│   │       ├── basicAuth()            # Автентифікація
│   │       ├── validateUserInput()    # Валідація користувачів
│   │       ├── validateArticleInput() # Валідація статей
│   │       ├── checkArticleAccess()   # Перевірка прав доступу
│   │       └── checkResourceExists()  # Перевірка існування
│   │
│   ├── routes/                         # Маршрути
│   │   ├── users.js                   # Маршрути користувачів
│   │   └── articles.js                # Маршрути статей
│   │
│   ├── views/                          # Шаблони
│   │   ├── users/                     # Шаблони користувачів (PUG)
│   │   │   ├── index.pug             # Список користувачів
│   │   │   └── detail.pug            # Деталі користувача
│   │   │
│   │   ├── articles/                  # Шаблони статей (EJS)
│   │   │   ├── index.ejs             # Список статей
│   │   │   └── detail.ejs            # Деталі статті
│   │   │
│   │   ├── partials/                  # Часткові шаблони (EJS)
│   │   │   ├── header.ejs            # Header
│   │   │   └── footer.ejs            # Footer
│   │   │
│   │   ├── layout.pug                 # Головний layout (PUG)
│   │   ├── index.pug                  # Головна сторінка (PUG)
│   │   └── error.pug                  # Сторінка помилки (PUG)
│   │
│   ├── public/                         # Статичні файли
│   │   └── css/
│   │       └── style.css              # Основні стилі
│   │
│   ├── __test__/                       # Тести
│   │   └── task1.test.js              # Unit тести
│   │
│   └── server.mjs                      # Головний файл сервера
│
├── test-api.sh                         # Скрипт тестування API
├── test-web-pages.sh                   # Скрипт тестування веб-сторінок
├── package.json                        # Залежності проекту
├── package-lock.json                   # Заблоковані версії
├── README.md                           # Головна документація
├── QUICKSTART.md                       # Швидкий старт
└── PROJECT_STRUCTURE.md                # Цей файл
```

## 📊 Детальний опис модулів

### 🎛 Controllers (Контролери)

**usersController.js**
- Обробляє логіку для користувачів
- Містить функції для HTML сторінок та API
- Використовує mock дані

**articlesController.js**
- Обробляє логіку для статей
- Містить функції для HTML сторінок та API
- Використовує mock дані

### 🔧 Middlewares

**index.js** - містить всі middleware:
1. `logRequests` - логування кожного запиту
2. `basicAuth` - перевірка Authorization заголовка
3. `validateUserInput` - валідація поля name
4. `validateArticleInput` - валідація поля title
5. `checkArticleAccess` - перевірка прав доступу (admin/author)
6. `checkResourceExists` - перевірка існування ресурсу за ID

### 🛣 Routes (Маршрути)

**users.js**
```
GET    /users/page           → getUsersPage (PUG)
GET    /users/page/:userId   → getUserByIdPage (PUG)
GET    /users                → getUsersApi (text)
POST   /users                → createUser (text)
GET    /users/:userId        → getUserByIdApi (text)
PUT    /users/:userId        → updateUser (text)
DELETE /users/:userId        → deleteUser (text)
```

**articles.js**
```
GET    /articles/page             → getArticlesPage (EJS)
GET    /articles/page/:articleId  → getArticleByIdPage (EJS)
GET    /articles                  → getArticlesApi (text)
POST   /articles                  → createArticle (text)
GET    /articles/:articleId       → getArticleByIdApi (text)
PUT    /articles/:articleId       → updateArticle (text)
DELETE /articles/:articleId       → deleteArticle (text)
```

### 🎨 Views (Шаблони)

#### PUG Templates (для користувачів)
- `layout.pug` - базовий layout з header/footer
- `index.pug` - головна сторінка
- `users/index.pug` - список користувачів
- `users/detail.pug` - деталі користувача
- `error.pug` - сторінка помилки

#### EJS Templates (для статей)
- `partials/header.ejs` - header (HTML head + nav)
- `partials/footer.ejs` - footer
- `articles/index.ejs` - список статей
- `articles/detail.ejs` - деталі статті

### 🎨 Public (Статичні файли)

**css/style.css** - містить стилі для:
- Reset та базові стилі
- Header та навігація
- Hero секція
- Картки (users, articles)
- Кнопки та форми
- Responsive дизайн
- Анімації та transitions

### 🧪 Tests

**task1.test.js**
- Тести для всіх API endpoints
- Перевірка статус-кодів
- Валідація відповідей
- Тестування middleware

## 🔄 Потік даних

### HTML Запит (браузер)
```
Browser → Express → Route → Controller → View (PUG/EJS) → HTML
```

### API Запит (curl/Postman)
```
Client → Express → Middleware → Route → Controller → Text/JSON
```

## 📦 Залежності

### Production
- `express@^4.18.2` - веб-фреймворк
- `pug@^3.0.2` - шаблонізатор
- `ejs@^3.1.9` - шаблонізатор

### Development
- `nodemon@^3.0.1` - автоперезавантаження
- `vitest@^3.1.1` - тестування
- `supertest@^6.3.3` - HTTP тестування

## 🎯 Ключові особливості

✅ **MVC Архітектура** - розділення логіки, маршрутів та представлення
✅ **Два шаблонізатори** - PUG для users, EJS для articles
✅ **Middleware система** - логування, автентифікація, валідація
✅ **Responsive дизайн** - адаптація під всі пристрої
✅ **Gradient UI** - сучасний дизайн з градієнтами
✅ **Mock дані** - готові дані для демонстрації
✅ **Error handling** - обробка 404 та 500 помилок
✅ **Static files** - підтримка CSS та інших статичних файлів

## 📈 Масштабованість

Проект легко масштабується:

1. **Додати новий ресурс**:
   - Створити controller
   - Створити route
   - Створити views
   - Додати стилі

2. **Додати базу даних**:
   - Створити models папку
   - Замінити mock дані на запити до БД

3. **Додати аутентифікацію**:
   - Інтегрувати JWT або Passport.js
   - Оновити middleware

4. **Додати API документацію**:
   - Інтегрувати Swagger/OpenAPI