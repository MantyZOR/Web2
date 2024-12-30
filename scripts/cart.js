document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');
    // Проверяем, есть ли cartItemsList на странице
    if (cartItemsList) {
        displayCartItems();
    }
    // Проверяем, есть ли clearCartButton на странице
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
});



// Очистка списка покупок
function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems(); // Обновляем отображение списка после очистки
}

// Отображение списка покупок на странице cart.html
function displayCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    if (!cartItemsList) return;

    const cart = getCart();
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        const emptyCartMessage = document.createElement("li");
        emptyCartMessage.textContent = "Список покупок пуст.";
        cartItemsList.appendChild(emptyCartMessage);
    } else {
        cart.forEach((book) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
      <div class="book-info">
        <img src="${book.image}" alt="${book.title}">
        <div>
          <h4>${book.title}</h4>
          <p>Цена: ${book.price} руб.</p>
        </div>
      </div>
      <button class="remove-from-cart" data-book-id="${book.id}">Удалить</button>
      `;

            cartItemsList.appendChild(listItem);

            const removeButton = listItem.querySelector(".remove-from-cart");
            removeButton.addEventListener("click", () => {
                removeFromCart(book.id);
                displayCartItems();
            });
        });
    }
}