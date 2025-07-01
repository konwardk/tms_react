import React from 'react';

export default function Pagination({ currentPage, lastPage, onPageChange }) {
  return (
    <div className="mt-4 flex justify-center gap-2 items-center text-sm">
      <button
        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="px-2 text-gray-700">
        Page {currentPage} of {lastPage}
      </span>

      <button
        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </button>
    </div>
  );
}
