let currentPage = 1;
const limit = 4;

function renderProducts(page) {
    getProductsPaginated(page, limit).then(products => {
        const list = document.getElementById("body-table");
        list.innerHTML = products.map(p => `
            <div class="row bg-white mb-2 border border-white d-flex align-items-center justify-content-center shadow-custom">
                            <div class="col-6 col-md-9">
                                <div class="row d-flex align-items-center justify-content-center">
                                    <div class="col-4 col-md-3">
                                        <img class="custom-img"
                                            src="${p.img}"
                                            alt="${p.name}">
                                    </div>
                                    <div class="col-8 col-md-9">
                                        <div class="row d-flex align-items-center justify-content-center">
                                            <div class="col-12 col-md-4">
                                                <div><strong>Tên:</strong>${p.name}</div>
                                                <div><strong>Loại:</strong>${p.type}</div>
                                            </div>
                                            <div class="col-12 d-none d-md-block col-md-4">
                                                <div><strong>Màn Hình:</strong>${p.screen}</div>
                                                <div><strong>frontCamera:</strong>${p.frontCamera}</div>
                                                <div><strong>backCamera:</strong>${p.backCamera}</div>
                                            </div>
                                            <div class="col-12 d-none d-md-block col-md-4">
                                                <div>${p.desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="row d-flex align-items-center justify-content-center">
                                    <div class="col-4 col-md-6 p-0">
                                        ${Number(p.price).toLocaleString('vi-VN')} đ
                                    </div>
                                    <div class="col-8 col-md-6">
                                        <div class="row d-flex align-items-center justify-content-center">
                                            <div class="col-6 p-md-1 col-md-6">
                                                <button class="btn btn-primary">sửa</button>
                                            </div>
                                            <div class="col-6 p-1 p-md-1 col-md-6">
                                                <button class="btn btn-danger">Xóa</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `).join('');

        renderPagination(page);
    });
}

function renderPagination(page) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `
    <li class="page-item ${page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changePage(${page - 1})">Trước</a>
    </li>
    <li class="page-item active"><span class="page-link">${page}</span></li>
    <li class="page-item">
      <a class="page-link" href="#" onclick="changePage(${page + 1})">Sau</a>
    </li>
  `;
}

function changePage(page) {
    if (page < 1) return;
    currentPage = page;
    renderProducts(currentPage);
}

document.addEventListener("DOMContentLoaded", function () {
    renderProducts(currentPage);
});
