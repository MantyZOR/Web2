// Вспомогательная функция для получения массива пользователей из localStorage
function getUsers() {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : []; // Если данных нет, возвращаем пустой массив
}

// Добавление книги в список покупок
function addToCart(book) {
    let cart = getCart();
    if (!cart.some(cartItem => cartItem.id === book.id)) {
        cart.push(book);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Удаление книги из списка покупок
function removeFromCart(bookId) {
    let cart = getCart();
    const index = cart.findIndex(book => book.id === bookId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Получение списка покупок из localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}