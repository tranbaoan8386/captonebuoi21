function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");
    if (countEl) {
      countEl.textContent = cart.length;
    }
  }
  