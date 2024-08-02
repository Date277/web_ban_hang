import React from "react";
interface PaginationProps {
  total: number;
  pageNumber: number;
  handleChangePage: (page: number) => void;
  currentPage: number;
}

function Pagination({
  total,
  pageNumber,
  handleChangePage,
  currentPage,
}: PaginationProps) {
  const toArray = (number: any) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.push("");
    }
    return arr;
  };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {toArray(Math.ceil(total / pageNumber)).map((e, i) => (
            <li className={`page-item${currentPage === i + 1 && "active"}`}>
              <button
                className="page-link"
                onClick={() => handleChangePage(i + 1)}
              >
                {i + 1}
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

export default Pagination;
