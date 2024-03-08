alert("Welcome to KurtIc E-Commerce Website!");

let cartItems = [];

var count = 0;

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    GGRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) GGAddClass(x[i], "show");
  }
}

function GGAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
  }
}

function GGRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function toggleCart() {
  const cart = document.getElementById('cartItems');
  const toggleButton = document.getElementById('toggleCartButton');
  const proceedToCheckoutButton = document.getElementById('proceedToCheckoutButton');
  const cancelCheckoutButton = document.getElementById('cancelCheckoutButton');
  
  if (cart.classList.contains('minimized')) {
    // Show cart
    cart.classList.remove('minimized');
    toggleButton.innerText = 'Minimize Cart';
    proceedToCheckoutButton.style.display = 'block'; // Show Proceed to Checkout button
    cancelCheckoutButton.style.display = 'inline-block'; // Show Cancel button
  } else {
    // Minimize cart
    cart.classList.add('minimized');
    toggleButton.innerText = 'Show Cart';
    proceedToCheckoutButton.style.display = 'none'; // Hide Proceed to Checkout button
    cancelCheckoutButton.style.display = 'none'; // Hide the Cancel Button
  }
}


/*
function toggleCart() {
  const cart = document.getElementById('cartItems');
  const toggleButton = document.getElementById('toggleCartButton');
  
  if (cart.classList.contains('minimized')) {
    // Show cart
    cart.classList.remove('minimized');
    toggleButton.innerText = 'Minimize Cart';
  } else {
    // Minimize cart
    cart.classList.add('minimized');
    toggleButton.innerText = 'Show Cart';
  }
}*/

function addToCart(productName, price) {
  const existingItemIndex = cartItems.findIndex(item => item.productName === productName);
  if (existingItemIndex !== -1) {
    // If item already exists in cart, increment quantity
    cartItems[existingItemIndex].quantity++;
  } else {
    // If item doesn't exist in cart, add it
    cartItems.push({ productName: productName, price: price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartElement = document.getElementById('cartItems');
  cartElement.innerHTML = ''; // Clear existing content

  let total = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cartItem');
    itemElement.innerHTML = `
      <span>${item.productName}</span>
      <button onclick="decrementQuantity('${item.productName}')">-</button>
      <span>${item.quantity}</span>
      <button onclick="incrementQuantity('${item.productName}')">+</button>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.productName}')">Remove</button>
    `;
    cartElement.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  // Display total
  const totalElement = document.createElement('div');
  totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  cartElement.appendChild(totalElement);
}

function decrementQuantity(productName) {
  const itemIndex = cartItems.findIndex(item => item.productName === productName);
  if (itemIndex !== -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity--;
      updateCart();
    }
  }
}

function incrementQuantity(productName) {
  const itemIndex = cartItems.findIndex(item => item.productName === productName);
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity++;
    updateCart();
  }
}

function removeFromCart(productName) {
  cartItems = cartItems.filter(item => item.productName !== productName);
  updateCart();
}


function proceedToCheckout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Please add items before proceeding to checkout.');
    return;
  }
  const checkoutContent = generateCheckoutContent();
  
  // Prompt the user with a confirmation dialog
  if (window.confirm('Do you want to download the receipt?')) {
    downloadReceipt(checkoutContent, 'receipt.txt');
  }
}

function cancelCheckout() {
  // Clear cart items array
  cartItems = [];
  // Update the cart display
  updateCart();
}

function downloadReceipt(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function generateCheckoutContent() {
  let checkoutContent = `===================================================
                     KurtIc E-Commerce Store Receipt
===================================================

Date/Time: ${getFormattedDateTime()}

Checkout Details:
-----------------------------------------------\n`;

  cartItems.forEach(item => {
    checkoutContent += `${item.productName} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  checkoutContent += '-----------------------------------------------\n';
  checkoutContent += `Total: $${calculateTotal().toFixed(2)}\n`;

  return checkoutContent;
}

function calculateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

function getFormattedDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  return now.toLocaleDateString('en-US', options);
}
/*function proceedToCheckout() {
  const checkoutContent = generateCheckoutContent();
  if (window.confirm('Do you want to download the receipt?')) {
    downloadReceipt(checkoutContent, 'receipt.txt');
  }
}

function downloadReceipt(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function generateCheckoutContent() {
  let checkoutContent = 'Checkout Details:\n';
  checkoutContent += '-------------------------\n';

  cartItems.forEach(item => {
    checkoutContent += `${item.productName} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  checkoutContent += '-------------------------\n';
  checkoutContent += `Total: $${calculateTotal().toFixed(2)}\n`;

  return checkoutContent;
}

function calculateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}
/*function proceedToCheckout() {
  const checkoutContent = generateCheckoutContent();
  alert(checkoutContent);
}

function generateCheckoutContent() {
  let checkoutContent = 'Checkout Details:\n';
  checkoutContent += '-------------------------\n';

  cartItems.forEach(item => {
    checkoutContent += `${item.productName} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  checkoutContent += '-------------------------\n';
  checkoutContent += `Total: $${calculateTotal().toFixed(2)}\n`;

  return checkoutContent;
}

function calculateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}




/*alert("Welcome to KurtIc E-Commerce Website!");

var count = 0;

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    GGRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) GGAddClass(x[i], "show");
  }
}

function GGAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
  }
}

function GGRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function incrementQuantity() {
  var quantityInput = document.getElementById('quantity');
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity() {
  var quantityInput = document.getElementById('quantity');
  var newValue = parseInt(quantityInput.value) - 1;
  if (newValue >= 1) {
    quantityInput.value = newValue;
  }
}

/*
function addToCart(name) {
  var prodCounter = document.getElementById('prodNum');
  var prodName = document.getElementById('prodName')
  count += 1;

  prodCounter.innerHTML = '\$ ' + count.toString() + '.00'
  prodName.innerHTML += name + ', '
}*/