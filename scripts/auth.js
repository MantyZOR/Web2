// Проверка статуса авторизации
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    const authForm = document.getElementById('auth-form');
    const logoutButton = document.getElementById('logout-button');
    const cartLink = document.getElementById('cart-link');
    const feedbackLink = document.createElement('a');
    feedbackLink.href = 'feedback.html';
    feedbackLink.id = 'feedback-link'
    feedbackLink.textContent = 'Обратная связь';

    if (isLoggedIn === 'true') {
        // Если пользователь авторизован
        if (authForm) authForm.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (cartLink) cartLink.style.display = 'block';
        if (cartLink && cartLink.parentElement) cartLink.parentElement.insertBefore(feedbackLink, cartLink);
    } else {
        // Если пользователь не авторизован
        if (authForm) authForm.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (cartLink) cartLink.style.display = 'none';
        if (feedbackLink && feedbackLink.parentElement) feedbackLink.parentElement.removeChild(feedbackLink);
    }
}

// Обработчик формы авторизации
function handleAuth(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Проверяем, есть ли такой пользователь в localStorage
    const users = getUsers();
    const user = users.find(u => u.username === username);

    if (user && user.password === password) {
        // Сохраняем статус авторизации в localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Обновляем интерфейс
        checkAuthStatus();

        alert('Вы успешно авторизованы!');
    } else {
        alert('Неверное имя пользователя или пароль.');
    }
}

// Функция выхода из системы
function logout() {
    // Удаляем данные из localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Обновляем интерфейс
    checkAuthStatus();
    removeFeedbackButton();

    alert('Вы вышли из системы.');
}
// Проверка, авторизован ли пользователь
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}
