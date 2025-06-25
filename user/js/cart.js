// 1. Lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  
  // 2. Lưu giỏ hàng vào localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // 3. Xóa một sản phẩm khỏi giỏ hàng theo id
  function removeItem(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    renderCart(); // Gọi lại để hiển thị giỏ hàng mới
  }
  
  // 4. Hiển thị giỏ hàng ra HTML
  function renderCart() {
    const cartListEl = document.getElementById("cart-list");
    const totalPriceEl = document.getElementById("total-price");
    const cartCountEl = document.getElementById("cart-count"); // phần hiển thị số lượng ở icon
  
    const cart = getCart();
  
    // Trường hợp giỏ hàng trống
    if (cart.length === 0) {
      cartListEl.innerHTML = `<div class="alert alert-warning">Giỏ hàng trống.</div>`;
      totalPriceEl.textContent = '';
      if (cartCountEl) cartCountEl.textContent = 0;
      return;
    }
  
    // Nếu có sản phẩm
    let total = 0;
    const html = cart.map(item => {
      total += item.price;
      return `
        <div class="card mb-3">
          <div class="row g-0 align-items-center">
            <div class="col-md-2">
              <img src="${item.img}" class="img-fluid rounded-start" alt="${item.name}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text text-danger">${item.price.toLocaleString()}đ</p>
              </div>
            </div>
            <div class="col-md-2 text-end pe-3">
              <button class="btn btn-sm btn-outline-danger" onclick="removeItem('${item.id}')">Xóa</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  
    cartListEl.innerHTML = html;
    totalPriceEl.textContent = `Tổng cộng: ${total.toLocaleString()}đ`;
    if (cartCountEl) cartCountEl.textContent = cart.length;
  }
  
  // 5. Gọi khi trang được load
  renderCart();
  