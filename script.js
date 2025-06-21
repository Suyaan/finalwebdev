  // remains the home section the main section so it would display a different color each reloads
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.addEventListener('click', function() {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  // handles the quantity of the pizza
   document.querySelectorAll('.menu-item').forEach(item => {
    const minusBtn = item.querySelector('.minus');
    const plusBtn = item.querySelector('.plus');
    const quantityEl = item.querySelector('.quantity');
    let quantity = 0;

    plusBtn.addEventListener('click', () => {
      quantity++;
      quantityEl.textContent = quantity;
    });

    minusBtn.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });
  });
  // handles the animation in some of the elements 
   document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach(el => {
      setTimeout(() => {
        el.classList.add("show");
      }, 100);
    });
  }); 

const menuItems = document.querySelectorAll('.menu-item');
// handles the animation when the user gets to the menu section
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    observer.observe(el);
  });
  menuItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.2}s`; 
  observer.observe(item);
});
});
// handles the form (how it would display)
const buyButtons = document.querySelectorAll('.buy');
const orderForm = document.getElementById('orderForm');
const closeForm = document.getElementById('closeForm');
const submitOrder = document.getElementById('submitOrder');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const menuItem = button.closest('.menu-item');
    const quantityEl = menuItem.querySelector('.quantity');
    const quantity = parseInt(quantityEl.textContent);  

    if (quantity > 0) {
      orderForm.style.display = 'flex';
    } else {
      orderForm.style.display = 'none';
      alert("Please increase the quantity first."); // alert if quantity is 0
    }
  });
});

closeForm.addEventListener('click', () => {
  orderForm.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === orderForm) {
    orderForm.style.display = 'none';
  }
});

submitOrder.addEventListener('click', () => {
  orderForm.style.display = 'none';
  alert("Purchased Done. Please Wait For Your Order.") // another popup when user purchase is done
});

// handles the functionality for adding items to the cart directly from the menu.
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    const plusBtn = item.querySelector('.plus');
    const minusBtn = item.querySelector('.minus');
    const quantityDisplay = item.querySelector('.quantity');
    const cartBtn = item.querySelector('.to-cart');
    
    let quantity = 0;

    plusBtn.addEventListener('click', () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });

    minusBtn.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });

    cartBtn.addEventListener('click', () => {
      if (quantity === 0) return;

      // Gathers product details from the HTML element
      const productName = item.querySelector('h3').textContent;
      const price = item.querySelectorAll('p')[1].textContent.replace('Price: ', '');
      const imageSrc = item.querySelector('img').getAttribute('src');
      
      // Creates an object for the new cart item
      const newItem = {
        product: productName,
        quantity: quantity,
        price: price,
        image: imageSrc
      };
      // stores the purchase in the localstorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${productName} added to cart!`); //another alert
      quantity = 0;
      quantityDisplay.textContent = quantity;
    });
  });
});


