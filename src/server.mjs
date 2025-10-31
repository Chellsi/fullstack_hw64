import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import usersRouter from './routes/users.js';
import articlesRouter from './routes/articles.js';
import authRouter from './routes/auth.js';
import themeRouter from './routes/theme.js';
import { logRequests, optionalAuth, attachUserToLocals } from './middlewares/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Налаштування шаблонізаторів
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware для встановлення view engine залежно від маршруту
app.use('/articles/page*', (req, res, next) => {
  app.set('view engine', 'ejs');
  next();
});

app.use('/users/page*', (req, res, next) => {
  app.set('view engine', 'pug');
  next();
});

// Middleware для парсингу JSON та cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware для статичних файлів (CSS, favicon, тощо)
app.use(express.static(join(__dirname, 'public')));

// Глобальний middleware для логування всіх запитів
app.use(logRequests);

// Опціональна автентифікація для всіх маршрутів
app.use(optionalAuth);

// Передача даних користувача в шаблони
app.use(attachUserToLocals);

// Кореневий маршрут
app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('index', { 
    title: 'Головна сторінка',
    theme,
    user: req.user
  });
});

app.get('/test', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('test', { 
    title: 'Тестування',
    theme,
    user: req.user
  });
});

// Підключення роутерів
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/auth', authRouter);
app.use('/api/theme', themeRouter);

// Обробка неіснуючих маршрутів (404)
app.use((req, res) => {
  const theme = req.cookies.theme || 'light';
  res.status(404).render('error', {
    title: 'Помилка 404',
    message: 'Сторінку не знайдено',
    error: { status: 404 },
    theme
  });
});

// Глобальна обробка помилок (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Запуск сервера
const server = app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});

// Експорт для тестів
export { server, app };