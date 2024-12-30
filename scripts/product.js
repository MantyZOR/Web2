document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));

    const book = booksData.find(b => b.id === bookId);

    if (book) {
        displayBookDetails(book);
    } else {
        // Можно добавить сообщение об ошибке или перенаправить на страницу магазина
        console.error('Книга не найдена');
    }
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            if (isLoggedIn()) {
                addToCart(book);
                alert('Книга добавлена в список покупок!');
            } else {
                alert('Пожалуйста, авторизуйтесь, чтобы добавить книгу в список покупок.');
            }
        });
    }
});

function displayBookDetails(book) {
    document.getElementById('product-image').src = book.image;
    document.getElementById('product-image').alt = book.title;
    document.getElementById('product-title').textContent = book.title;
    document.getElementById('product-author').textContent = book.author;
    document.getElementById('product-genre').textContent = book.genre;
    document.getElementById('product-price').textContent = book.price;
    document.getElementById('product-stock').textContent = book.stock;
    document.getElementById('product-fullDescription').textContent = book.fullDescription;
}