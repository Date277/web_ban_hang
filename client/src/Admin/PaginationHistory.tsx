interface IPaginationProps {
  total: number;
  pageNumber: number;
  fetchOrder: (pageIndex: number, pageNumber: number) => void;
}

function PaginationHistory({
  total,
  pageNumber,
  fetchOrder,
}: IPaginationProps) {
  // Tính toán số trang dựa trên tổng số người dùng và số người dùng trên mỗi trang
  const totalPages = Math.ceil(total / pageNumber);

  // Hàm để chuyển đến trang mới
  const goToPage = (page: number) => {
    // Gọi hàm fetchUser với số trang cụ thể
    fetchOrder(page, pageNumber);
  };

  // Tạo mảng các số trang
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pageNumbers.map((page) => (
            <li key={page} className="page-item">
              <button className="page-link" onClick={() => goToPage(page)}>
                {page}
              </button>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PaginationHistory;
