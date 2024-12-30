// Обработчик событий после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const featuredBooksGrid = document.getElementById('featured-books-grid');
    const booksTableBody = document.getElementById('books-table-body');
    const cheapFilter = document.querySelector('[data-filter="cheap"]');
    const expensiveFilter = document.querySelector('[data-filter="expensive"]');
    const allFilter = document.querySelector('[data-filter="all"]');
    const authForm = document.getElementById('auth-form');
    const logoutButton = document.getElementById('logout-button');
    const cartLink = document.getElementById('cart-link');
    const registerButton = document.getElementById('register-button');
    if(registerButton){
        registerButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
    // Отрисовка популярных книг на главной странице
    if (featuredBooksGrid) {
        renderFeaturedBooks(featuredBooksGrid);
    }

    // Отрисовка всех книг в магазине
    if (booksTableBody) {
        renderBooks(booksData, booksTableBody);
    }

    // Фильтрация книг в магазине
    if (cheapFilter) {
        cheapFilter.addEventListener('click', () => {
            const sortedBooks = [...booksData].sort((a, b) => a.price - b.price);
            renderBooks(sortedBooks, booksTableBody);
        });
    }

    if (expensiveFilter) {
        expensiveFilter.addEventListener('click', () => {
            const sortedBooks = [...booksData].sort((a, b) => b.price - a.price);
            renderBooks(sortedBooks, booksTableBody);
        });
    }

    if (allFilter) {
        allFilter.addEventListener('click', () => {
            renderBooks(booksData, booksTableBody);
        });
    }
    // Проверяем статус авторизации при загрузке страницы
    checkAuthStatus();

    // Обработчик формы авторизации
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }

    // Обработчик кнопки выхода
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

// Функции для отрисовки книг
function renderFeaturedBooks(container) {
    // Выбираем случайные 3 книги
    const featuredBooks = getRandomBooks(booksData, 3);
    featuredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        container.appendChild(bookElement);
    });
}

function renderBooks(books, container) {
    container.innerHTML = '';
    books.forEach(book => {
        const row = createBookRow(book);
        container.appendChild(row);
    });
}

function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-card');
    bookElement.innerHTML = `
    <img src="${book.image}" alt="${book.title}">
    <div class="book-details">
        <h3><a href="product.html?id=${book.id}">${book.title}</a></h3>
        <p>Автор: ${book.author}</p>
        <p>Цена: ${book.price} руб.</p>
        <p>${book.description}</p>
        <button class="add-to-cart-button" data-book-id="${book.id}">В список</button>
    </div>
`;
    // Добавляем обработчик для кнопки "В список"
    const addToCartButton = bookElement.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', () => {
        handleClick(book) // Здесь меняем на book
    });

    // Добавляем обработчик клика по названию книги
    const bookTitleLink = bookElement.querySelector('h3 a');
    bookTitleLink.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию
        const bookId = book.id;
        window.location.href = `product.html?id=${bookId}`; // Перенаправляем на страницу товара
    });

    return bookElement;
}

function createBookRow(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${book.image}" alt="${book.title}"></td>
    <td><a href="product.html?id=${book.id}">${book.title}</a></td>
    <td>${book.author}</td>
    <td>${book.price} руб.</td>
    <td>${book.description}</td>
    <td><button class="add-to-cart-button" data-book-id="${book.id}">В список</button></td>
`;
    // Добавляем обработчик для кнопки "В список"
    const addToCartButton = row.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', () => {
        handleClick(book) // Здесь меняем на book
    });

    // Добавляем обработчик клика по названию книги
    const bookTitleLink = row.querySelector('td a');
    bookTitleLink.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию
        const bookId = book.id;
        window.location.href = `product.html?id=${bookId}`; // Перенаправляем на страницу товара
    });

    return row;
}
// Функция которая проверяет авторизацию и добавляет книгу
function handleClick(book){
    if (isLoggedIn()) {
        addToCart(book); // Здесь меняем bookId.toString() на book
        alert('Книга добавлена в список покупок!');
    } else {
        alert('Пожалуйста, авторизуйтесь, чтобы добавить книгу в список покупок.');
    }
}

// Вспомогательная функция для выбора случайных книг
function getRandomBooks(books, count) {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

//слайдер
let slideIndex = 1;
showSlides(slideIndex);

// Вперед/назад
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Текущий слайд
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function removeFeedbackButton() {
    const feedbackLink = document.getElementById('feedback-link');
    if (feedbackLink && feedbackLink.parentElement) {
        feedbackLink.parentElement.removeChild(feedbackLink);
    }
}