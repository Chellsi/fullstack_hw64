# 🧪 Гід по тестуванню проекту

## Швидкий старт

### 1. Запустіть сервер
```bash
npm run dev
```

### 2. Відкрийте тестову сторінку
```
http://localhost:3000/test
```

Ця інтерактивна сторінка дозволяє протестувати всі функції прямо в браузері! 🎉

## 🛠 Автоматичні тести

### Повний тест всіх функцій
```bash
chmod +x test-complete.sh
./test-complete.sh
```

**Що тестується:**
- ✅ Доступність сервера
- ✅ Favicon
- ✅ Статичні файли (CSS)
- ✅ HTML сторінки
- ✅ JWT авторизація (вхід/вихід)
- ✅ Cookies (theme, token)
- ✅ API endpoints

### Тест Favicon
```bash
chmod +x test-favicon.sh
./test-favicon.sh
```

**Що тестується:**
- ✅ Доступність favicon.ico
- ✅ Наявність тега в HTML
- ✅ Content-Type
- ✅ Заголовки кешування
- ✅ Інструкції для візуальної перевірки

## 🖼️ Перевірка Favicon

### Метод 1: Візуально
1. Відкрийте http://localhost:3000/
2. Подивіться на вкладку браузера
3. Іконка має бути видна зліва від назви

### Метод 2: Прямий доступ
```
http://localhost:3000/favicon.ico
```
Має показати іконку або завантажити файл

### Метод 3: DevTools
1. Відкрийте DevTools (F12)
2. Network → фільтр "favicon"
3. Перезавантажте сторінку (Ctrl+R)
4. Має з'явитись запит з статусом 200

### Метод 4: curl
```bash
curl -I http://localhost:3000/favicon.ico
```
Очікуваний результат:
```
HTTP/1.1 200 OK
Content-Type: image/x-icon
```

## 🔐 Тестування JWT

### 1. Реєстрація
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}' \
  -c cookies.txt
```

### 2. Вхід
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

### 3. Перевірка токена
```bash
curl http://localhost:3000/auth/me \
  -b cookies.txt
```

### 4. Вихід
```bash
curl -X POST http://localhost:3000/auth/logout \
  -b cookies.txt
```

## 🍪 Тестування Cookies

### Встановити тему
```bash
curl -X POST http://localhost:3000/api/theme/set \
  -H "Content-Type: application/json" \
  -d '{"theme":"dark"}' \
  -c cookies.txt
```

### Отримати тему
```bash
curl http://localhost:3000/api/theme/current \
  -b cookies.txt
```

### Перевірити cookies в браузері
1. Відкрийте DevTools (F12)
2. Application → Cookies → http://localhost:3000
3. Маєте побачити:
   - `token` (httpOnly: true)
   - `theme` (httpOnly: false)

## 📊 Ручне тестування

### Сценарій 1: Новий користувач
1. [ ] Відкрити /auth/register
2. [ ] Заповнити форму
3. [ ] Натиснути "Зареєструватися"
4. [ ] Перевірити перенаправлення на /auth/profile
5. [ ] Перевірити що дані відображаються
6. [ ] Перевірити cookie 'token' в DevTools

### Сценарій 2: Існуючий користувач
1. [ ] Відкрити /auth/login
2. [ ] Ввести admin / admin123
3. [ ] Натиснути "Увійти"
4. [ ] Перевірити перенаправлення
5. [ ] Перевірити дані в профілі

### Сценарій 3: Зміна теми
1. [ ] Увійти в систему
2. [ ] Перейти на /auth/profile
3. [ ] Клацнути "🌙 Темна"
4. [ ] Перевірити зміну кольорів
5. [ ] Оновити сторінку (F5)
6. [ ] Перевірити що тема збережена
7. [ ] Клацнути "☀️ Світла"
8. [ ] Перевірити зміну назад

### Сценарій 4: Favicon
1. [ ] Відкрити головну сторінку
2. [ ] Перевірити іконку у вкладці
3. [ ] Додати сторінку в закладки (Ctrl+D)
4. [ ] Перевірити іконку в закладках
5. [ ] Відкрити історію (Ctrl+H)
6. [ ] Перевірити іконку в історії

### Сценарій 5: Захист маршрутів
1. [ ] Вийти з системи
2. [ ] Спробувати відкрити /auth/profile
3. [ ] Має показати 401 або перенаправити
4. [ ] Увійти знову
5. [ ] Профіль має бути доступний

## 🎨 Тестування тем

### Перевірити світлу тему
1. Фон: білий
2. Текст: темний
3. Картки: білі з тінню
4. Кнопки: сині/зелені

### Перевірити темну тему
1. Фон: темний (#1a1a1a)
2. Текст: світлий (#e0e0e0)
3. Картки: темні (#2d2d2d)
4. Кнопки: контрастні

### Перевірити на різних сторінках
- [ ] Головна (/)
- [ ] Користувачі (/users/page)
- [ ] Статті (/articles/page)
- [ ] Вхід (/auth/login)
- [ ] Профіль (/auth/profile)

## 🌐 Тестування в різних браузерах

### Chrome/Chromium
```bash
google-chrome http://localhost:3000/test
```

### Firefox
```bash
firefox http://localhost:3000/test
```

### Safari (Mac)
```bash
open -a Safari http://localhost:3000/test
```

## 📱 Мобільне тестування

### Через Chrome DevTools
1. Відкрийте http://localhost:3000/
2. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
3. Виберіть пристрій (iPhone, iPad, Android)
4. Перевірте:
   - Навігація працює
   - Кнопки кліка́бельні
   - Текст читабельний
   - Форми зручні для вводу

### Через реальний пристрій
1. Дізнайтеся IP вашого комп'ютера:
   ```bash
   ifconfig | grep inet  # Mac/Linux
   ipconfig              # Windows
   ```
2. На телефоні відкрийте:
   ```
   http://[YOUR_IP]:3000/
   ```

## 🔍 Debugging

### Перевірка логів
```bash
# Логи сервера в консолі
# Шукайте рядки типу:
# 2025-10-31T10:30:45.123Z - GET request to /
```

### Перевірка cookies
```javascript
// В консолі браузера (F12 → Console)
document.cookie
```

### Перевірка JWT токена
```javascript
// Декодувати JWT (без верифікації)
const token = 'eyJhbGciOiJIUzI1NiIs...';
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

## ✅ Чеклист перед здачею

### Функціональність
- [ ] Favicon відображається
- [ ] JWT авторизація працює
- [ ] Cookies зберігаються
- [ ] Теми перемикаються
- [ ] API endpoints працюють
- [ ] PUG шаблони рендеряться
- [ ] EJS шаблони рендеряться

### Безпека
- [ ] Паролі хешуються
- [ ] Token в httpOnly cookie
- [ ] Захищені маршрути недоступні без токена
- [ ] Валідація даних працює

### UI/UX
- [ ] Дизайн responsive
- [ ] Обидві теми виглядають добре
- [ ] Немає помилок в консолі
- [ ] Всі посилання працюють
- [ ] Форми зручні

### Документація
- [ ] README оновлений
- [ ] Є інструкції з запуску
- [ ] Описані тестові акаунти
- [ ] Є приклади використання

## 🚀 Корисні команди

```bash
# Запуск сервера
npm run dev

# Повний тест
./test-complete.sh

# Тест favicon
./test-favicon.sh

# Перевірка структури
tree src/

# Перевірка портів
lsof -i :3000

# Очистка cookies (для тестування)
rm /tmp/test_cookies.txt
```

## 📚 Додаткові ресурси

- **JWT Debugger**: https://jwt.io/
- **Cookie Inspector**: DevTools → Application → Cookies
- **Network Monitor**: DevTools → Network
- **Favicon Generator**: https://favicon.io/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

## 🎉 Готово!

Якщо всі тести пройшли успішно - проект готовий до здачі! 

Не забудьте створити скріншоти:
1. Головна сторінка з favicon
2. Сторінка входу
3. Профіль користувача
4. Світла тема
5. Темна тема
6. DevTools з cookies