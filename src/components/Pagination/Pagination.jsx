import { useEffect, useState } from "react";
import css from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 768 ? 3 : 2);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (totalPages <= 1) return null;

  const getPagesToShow = () => {
    const pages = [];
    let startPage = currentPage;

    // Забезпечуємо, щоб не вийти за межі totalPages
    for (let i = 0; i < visibleCount && startPage + i <= totalPages; i++) {
      pages.push(startPage + i);
    }

    if (startPage + visibleCount <= totalPages) {
      pages.push("...");
    }

    return pages;
  };

  const handleClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className={css.pagination}>
      <li className={css.arrowBlock}>
        <button
          className={`${css.arrow} ${css.arrowLeft}`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <svg className={css.icon}>
            <use href="#icon-left-double" />
          </svg>
        </button>

        <button
          className={css.arrow}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg className={css.icon}>
            <use href="#icon-left" />
          </svg>
        </button>
      </li>

      <li className={css.numberBlock}>
        {getPagesToShow().map((page, index) => (
          <button
            key={index}
            className={`${css.page} ${page === currentPage ? css.active : ""}`}
            onClick={() => handleClick(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </li>

      <li className={css.arrowBlock}>
        <button
          className={css.arrow}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg className={css.icon}>
            <use href="#icon-right" />
          </svg>
        </button>

        <button
          className={css.arrow}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <svg className={css.icon}>
            <use href="#icon-right-double" />
          </svg>
        </button>
      </li>
    </ul>
  );
}
