const BASE_URL = 'https://685165ca8612b47a2c09e420.mockapi.io/products';
const productDetailEl = document.getElementById("product-detail");

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");


// 2. Lấy chi tiết sản phẩm từ API
function fetchProductDetail(id) {
  axios.get(`${BASE_URL}/${id}`)
    .then((res) => {
      renderProductDetail(res.data);
      updateCartCount();
    })
    .catch((err) => {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      productDetailEl.innerHTML = `<div class="alert alert-danger">Không tìm thấy sản phẩm.</div>`;
    });
}

// 3. Hiển thị thông tin chi tiết sản phẩm ra HTML
function renderProductDetail(product) {
  productDetailEl.innerHTML = `
    <div class="col-md-5">
      <img src="${product.img}" class="img-fluid rounded" alt="${product.name}">
    </div>
    <div class="col-md-7">
      <h2>${product.name}</h2>
      <p class="text-danger fs-4 fw-bold">${Number(product.price).toLocaleString()}đ</p>
      <ul class="list-unstyled">
        <li><strong>Màn hình:</strong> ${product.screen}</li>
        <li><strong>Camera trước:</strong> ${product.frontCamera}</li>
        <li><strong>Camera sau:</strong> ${product.backCamera}</li>
        <li><strong>Loại:</strong> ${product.type}</li>
      </ul>
      <p class="mt-3">${product.desc}</p>
      <button id="add-to-cart-btn" class="btn btn-success">Thêm vào giỏ hàng</button>
    </div>
  `;

  // Gán sự kiện cho nút thêm vào giỏ hàng
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.onclick = () => addToCart(product);
  }
}

// 4. Thêm sản phẩm vào localStorage
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
  updateCartCount();
}

// 5. Khởi chạy khi load trang
fetchProductDetail(productId);
