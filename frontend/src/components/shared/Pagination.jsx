// import React from 'react';

// export default function Pagination({ currentPage, totalBlogs, totalPages, onPageChange }) {
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             const queryParams = new URLSearchParams(window.location.search);
//             queryParams.set('page', page);
//             // queryParams.set('limit', 10); 
//             const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
//             window.history.pushState(null, null, newUrl);
//             onPageChange(page);
//         }
//     };

//     const renderPageNumbers = () => {
//         const pageNumbers = [];

//         // Determine the range of page numbers to display
//         let startPage = 1;
//         let endPage = Math.min(totalPages, 5);

//         // Adjust the startPage based on the current page
//         if (currentPage > 3) {
//             startPage = currentPage - 2;
//             endPage = Math.min(currentPage + 2, totalPages);
//         }

//         // Add ellipsis if there are more pages before the startPage
//         if (startPage > 1) {
//             pageNumbers.push(<li key="ellipsis-start">...</li>);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(
//                 <li
//                     key={i}
//                     className={`page-item ${currentPage === i ? 'active' : ''}`}
//                     onClick={() => handlePageChange(i)}
//                 >
//                     {i}
//                 </li>
//             );
//         }

//         // Add ellipsis if there are more pages after the endPage
//         if (endPage < totalPages) {
//             pageNumbers.push(<li key="ellipsis-end">...</li>);
//         }

//         return pageNumbers;
//     };


//     return (
//         <div className="pagination flex items-center justify-center">
//             <button
//                 className={`prev-button mr-2 px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 hover:bg-blue-400 text-white'} `}
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//             >
//                 Previous
//             </button>

//             <ul className="page-numbers flex gap-2">
//                 {renderPageNumbers()}
//             </ul>

//             <button
//                 className={`next-button ml-2 px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 hover:bg-blue-400 text-white'} `}
//                 disabled={currentPage === totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//             >
//                 Next
//             </button>
//         </div>
//     );
// }


import {
    RiArrowLeftLine as LeftArrowIcon,
    RiArrowRightLine as RightArrowIcon,
} from "react-icons/ri";

import { twMerge } from "tailwind-merge";

function Pagination({
    currentPage = 0,
    totalPages = 0,
    totalPagesToShow = 5,
    onPageChange,
}) {
    currentPage = parseInt(currentPage);
    totalPages = parseInt(totalPages);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageOffset = Math.floor(totalPagesToShow / 2);

        if (totalPages <= totalPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const isFirstPage = currentPage === 1;
            const isLastPage = currentPage === totalPages;
            const isNearFirstPage = currentPage <= pageOffset + 1;
            const isNearLastPage = currentPage >= totalPages - pageOffset;
            if (isFirstPage || isNearFirstPage) {
                for (let i = 1; i <= totalPagesToShow; i++) {
                    pageNumbers.push(i);
                }
                if (totalPages > totalPagesToShow + 1) {
                    pageNumbers.push("...");
                }
                if (totalPages > totalPagesToShow) {
                    pageNumbers.push(totalPages);
                }
            } else if (isLastPage || isNearLastPage) {
                pageNumbers.push(1);
                if (totalPages > totalPagesToShow + 1) {
                    pageNumbers.push("...");
                    for (
                        let i = totalPages - totalPagesToShow + 1;
                        i <= totalPages;
                        i++
                    ) {
                        pageNumbers.push(i);
                    }
                } else {
                    for (
                        let i = totalPages - totalPagesToShow + 1;
                        i <= totalPages;
                        i++
                    ) {
                        pageNumbers.push(i);
                    }
                }
            } else {
                pageNumbers.push(1);
                if (currentPage > pageOffset + 2) {
                    pageNumbers.push("...");
                }
                for (
                    let i = currentPage - pageOffset;
                    i <= currentPage + pageOffset;
                    i++
                ) {
                    pageNumbers.push(i);
                }
                if (currentPage + pageOffset + 1 < totalPages) {
                    pageNumbers.push("...");
                }
                if (currentPage + pageOffset + 1 <= totalPages) {
                    pageNumbers.push(totalPages);
                }
            }
        }

        return pageNumbers;
    };

    return (
        <nav className="flex justify-between border-t border-divider font-semibold">
            <div
                className={twMerge(
                    "flex py-3 items-center gap-3 cursor-pointer",
                    currentPage <= 1 && "pointer-events-none text-slate-300",
                    currentPage !== 1 && "hover:text-primary"
                )}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <LeftArrowIcon size={20} />
                Previous
            </div>
            <div className="py-3 md:hidden">
                Page {currentPage} of {totalPages}
            </div>
            <div className="hidden md:flex justify-center gap-3">
                {getPageNumbers().map((pageNumber, index) => (
                    <span
                        key={index}
                        className={twMerge(
                            "cursor-pointer p-3 border-t-4 border-transparent",
                            pageNumber === "..." && "pointer-events-none",
                            pageNumber === currentPage && "text-primary border-primary",
                            pageNumber !== "..." && "hover:text-primary"
                        )}
                        onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </span>
                ))}
            </div>
            <div
                className={twMerge(
                    "flex py-3 items-center gap-3 cursor-pointer",
                    currentPage >= totalPages && "pointer-events-none text-slate-300",
                    currentPage !== totalPages && "hover:text-primary"
                )}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <RightArrowIcon size={20} />
            </div>
        </nav>
    );
}

export default Pagination;