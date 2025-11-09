// import Link from "next/link";

// export default function Pagination({ currentPage, totalPages, basePath }) {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <nav aria-label="Pagination" className="flex justify-center mt-6">
//       <ul className="flex space-x-2">
//         {/* Previous Button */}
//         {currentPage > 1 && (
//           <li>
//             <Link
//               href={`${basePath}?page=${currentPage - 1}`}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//             >
//               صفحه قبل
//             </Link>
//           </li>
//         )}

//         {/* Page Numbers */}
//         {pages.map((page) => (
//           <li key={page}>
//             <Link
//               href={`${basePath}?page=${page}`}
//               className={`px-4 py-2 rounded ${
//                 page === currentPage
//                   ? "bg-[#773D2D] text-white"
//                   : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               {page}
//             </Link>
//           </li>
//         ))}

//         {/* Next Button */}
//         {currentPage < totalPages && (
//           <li>
//             <Link
//               href={`${basePath}?page=${currentPage + 1}`}
//               className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
//             >
//               صفحه بعد
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

import Link from "next/link";

// Helper to add `?page=` or `&page=` properly
function getPageLink(basePath, page) {
  return basePath.includes("?")
    ? `${basePath}&page=${page}`
    : `${basePath}?page=${page}`;
}

export default function Pagination({ currentPage, totalPages, basePath }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center mt-6 font-montserrat text-sm"
    >
      <ul className="flex space-x-2">
        {/* Previous Button */}
        {currentPage > 1 && (
          <li className="ml-2">
            <Link
              href={getPageLink(basePath, currentPage - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Previous
            </Link>
          </li>
        )}

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page} className="ml-2">
            <Link
              href={getPageLink(basePath, page)}
              className={`px-4 py-2 rounded ${
                page === currentPage
                  ? "bg-[#773D2D] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={getPageLink(basePath, currentPage + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
