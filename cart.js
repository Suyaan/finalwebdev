document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('foodCartContainer');
  const orderForm = document.getElementById('orderForm');
  const closeForm = document.getElementById('closeForm');
  const submitOrder = document.getElementById('submitOrder');
  const clearButton = document.getElementById('clearCartButton');
  let selectedItemIndex = null;

  cartContainer.innerHTML = '';
  // display when cart section is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    document.querySelector('.cart-cont').style.display = 'block';
    return;
  }

  document.querySelector('.cart-cont').style.display = 'block';

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    // displays the pizza bought from the menu
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.product}">
      <div class="cart-item-details">
        <h3>${item.product}</h3>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <button class="buy-in-cart buy">Buy</button>
      </div>
    `;
    // displays the form when btn is clicked
    const buyButton = cartItem.querySelector('.buy');
    buyButton.addEventListener('click', () => {
      selectedItemIndex = index; 
      orderForm.style.display = 'flex';
    });

    cartContainer.appendChild(cartItem);
  });

  // Clear cart button
  clearButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
  });

  // Close popup form
  closeForm.addEventListener('click', () => {
    orderForm.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === orderForm) {
      orderForm.style.display = 'none';
    }
  });

  // Handle form submit and remove bought item
  submitOrder.addEventListener('click', () => {
    if (selectedItemIndex !== null) {
      cart.splice(selectedItemIndex, 1); 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      selectedItemIndex = null;
      orderForm.style.display = 'none';
      alert("Purchased Done. Please Wait For Your Order.");
      location.reload(); 
    }
  });
});
