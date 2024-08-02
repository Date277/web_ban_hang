import React from "react";
interface IProps {
  total: number;
  pageNumber: number;
  fetchUser: any;
}

function PaginationUser({ total, pageNumber, fetchUser }: IProps) {
  // Tính toán số trang dựa trên tổng số người dùng và số người dùng trên mỗi trang
  const totalPages = Math.ceil(total / pageNumber);

  // Hàm để chuyển đến trang mới
  const goToPage = (page: any) => {
    // Gọi hàm fetchUser với số trang cụ thể
    fetchUser(page, pageNumber);
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

export default PaginationUser;
