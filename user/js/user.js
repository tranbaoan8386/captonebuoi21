const BASE_URL = 'https://685165ca8612b47a2c09e420.mockapi.io/products';
const productListEl = document.getElementById("product-list");
let currentPage = 1;
const limit = 8;


// 2. Hàm lấy danh sách sản phẩm phân trang
function fetchProducts() {
  axios({
    url: `${BASE_URL}?page=${currentPage}&limit=${limit}`,
    method: "GET"
  })
    .then((res) => {
      renderProducts(res.data);
      updateCartCount();
    })
    .catch((err) => {
      console.error("Lỗi khi lấy sản phẩm:", err);
    });
}

function renderProducts(products) {
    let contentHTML = "";
  
    // Lặp qua từng sản phẩm
    products.forEach((p) => {
      const productHTML = `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
          <div class="card h-100">
            <img src="${p.img}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text text-danger fw-bold">${Number(p.price).toLocaleString()}đ</p>
              <ul class="list-unstyled small mb-2">
                <li><strong>Màn hình:</strong> ${p.screen}</li>
                <li><strong>Camera sau:</strong> ${p.backCamera}</li>
                <li><strong>Camera trước:</strong> ${p.frontCamera}</li>
              </ul>
              <p class="small text-muted">${p.desc}</p>
              <a href="detail.html?id=${p.id}" class="btn btn-sm btn-primary w-100">Xem chi tiết</a>
            </div>
          </div>
        </div>
      `;
  
      contentHTML += productHTML; 
    });
  
    productListEl.innerHTML = contentHTML;
  }
  

// 4. Hàm xử lý khi nhấn "Trang trước"
function handlePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
}

// 5. Hàm xử lý khi nhấn "Trang sau"
function handleNextPage() {
  currentPage++;
  fetchProducts();
}

// 6. Gán sự kiện click cho nút phân trang
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (prevBtn) prevBtn.onclick = handlePrevPage;
if (nextBtn) nextBtn.onclick = handleNextPage;


fetchProducts();      // Lấy và hiển thị sản phẩm
updateCartCount();    // Cập nhật số lượng trong giỏ hàng
