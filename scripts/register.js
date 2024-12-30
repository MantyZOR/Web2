document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
});

function handleRegistration(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const passwordConfirmInput = document.getElementById('reg-password-confirm');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // Проверка заполнения полей
    if (!username || !password || !passwordConfirm) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    // Проверка совпадения паролей
    if (password !== passwordConfirm) {
        alert('Пароли не совпадают.');
        return;
    }

    // Простая проверка длины пароля (можно добавить более сложные проверки)
    if (password.length < 6) {
        alert('Пароль должен содержать не менее 6 символов.');
        return;
    }

    // Сохранение данных пользователя в localStorage
    const users = getUsers(); // Получаем массив пользователей из localStorage
    users.push({ username, password }); // Добавляем нового пользователя
    localStorage.setItem('users', JSON.stringify(users));

    // Очистка полей формы
    usernameInput.value = '';
    passwordInput.value = '';
    passwordConfirmInput.value = '';

    alert('Регистрация прошла успешно!');
}

// Вспомогательная функция для получения массива пользователей из localStorage
function getUsers() {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : []; // Если данных нет, возвращаем пустой массив
}