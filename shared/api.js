const BASE_URL = 'https://685165ca8612b47a2c09e420.mockapi.io/products';
function getProductsPaginated(page, limit) {
  return axios.get(`${BASE_URL}?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Lỗi khi lấy sản phẩm:", err);
      return [];
    });
}