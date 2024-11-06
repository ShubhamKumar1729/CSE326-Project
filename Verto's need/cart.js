let cart = {};

function addToCart(product, price) {
    if (cart[product]) {
        cart[product].quantity += 1; // Increase quantity if product already in cart
    } else {
        cart[product] = { price: price, quantity: 1 }; // Add new product to cart
    }
    document.getElementById('cart-count').textContent = getTotalQuantity(); // Update cart count
}

function getTotalQuantity() {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}

function showCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    cartItemsDiv.innerHTML = ''; // Clear previous items
    let total = 0;

    if (getTotalQuantity() === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceDiv.innerHTML = '';
    } else {
        for (const [product, { price, quantity }] of Object.entries(cart)) {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `${product} - $${price} (x${quantity}) <button class="remove-button" onclick="removeFromCart('${product}')">Remove</button>`;
            cartItemsDiv.appendChild(div);
            total += price * quantity; // Calculate total price
        }
        totalPriceDiv.innerHTML = `Total Price: $${total}`;
    }

    document.getElementById('cart').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function removeFromCart(product) {
    delete cart[product]; // Remove item from cart
    document.getElementById('cart-count').textContent = getTotalQuantity(); // Update cart count
    showCart(); // Refresh cart display
}

function checkout() {
    closeCart();
}