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