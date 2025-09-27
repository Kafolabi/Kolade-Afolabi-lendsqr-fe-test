import "../../styles/components/_pagination.scss";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getPageNumbers } from "../../utils/helpers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (num: number) => void;
  totalItems: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
}: PaginationProps) {
  //   const startItem = (currentPage - 1) * rowsPerPage + 1;
  //   const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="pagination">
      {/* Info */}
    <div className="pagination__info">
      Showing{" "}
      {totalItems > 10 ? (
        <select
        className="pagination__select"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        </select>
      ) : (
        totalItems
      )}{" "}
      out of {totalItems}
    </div>

      {/* Controls */}
      <div className="pagination__controls">
        <button
          className="pagination__arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>

        {getPageNumbers(currentPage, totalPages).map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              className={`pagination__page ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="pagination__dots">
              {page}
            </span>
          )
        )}

        <button
          className="pagination__arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

// function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   rowsPerPage,
//   onRowsPerPageChange,
//   totalItems,
// }: PaginationProps) {
//   const showPageControls = totalItems > rowsPerPage; // only show page buttons if more than rowsPerPage

//   return (
//     <div className="pagination">
//       {/* Info */}
//       <div className="pagination__info">
//         Showing{" "}
//         <select
//           className="pagination__select"
//           value={rowsPerPage}
//           onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
//         >
//           <option value={10}>10</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>{" "}
//         out of {totalItems}
//       </div>

//       {/* Controls */}
//       {showPageControls && (
//         <div className="pagination__controls">
//           <button
//             className="pagination__arrow"
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <FiChevronLeft />
//           </button>

//           {getPageNumbers(currentPage, totalPages).map((page, idx) =>
//             typeof page === "number" ? (
//               <button
//                 key={idx}
//                 className={`pagination__page ${
//                   currentPage === page ? "active" : ""
//                 }`}
//                 onClick={() => onPageChange(page)}
//               >
//                 {page}
//               </button>
//             ) : (
//               <span key={idx} className="pagination__dots">
//                 {page}
//               </span>
//             )
//           )}

//           <button
//             className="pagination__arrow"
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
