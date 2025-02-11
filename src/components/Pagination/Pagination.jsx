import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
    padding: '0 16px',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  pageButton: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'all 0.2s',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  activePageButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
  },
  navButton: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    width: '40px',
    height: '40px',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  dots: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontSize: '14px',
  }
};

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      paginate(page);
    }
  };

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...styles.navButton,
          ...(currentPage === 1 ? styles.disabledButton : {})
        }}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((number, index) => (
        number === '...' ? (
          <span key={`dots-${index}`} style={styles.dots} aria-hidden="true">
            •••
          </span>
        ) : (
          <button
            key={`page-${number}`}
            onClick={() => handlePageChange(number)}
            style={{
              ...styles.pageButton,
              ...(currentPage === number ? styles.activePageButton : {})
            }}
            aria-label={`Page ${number}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        )
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.navButton,
          ...(currentPage === totalPages ? styles.disabledButton : {})
        }}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;