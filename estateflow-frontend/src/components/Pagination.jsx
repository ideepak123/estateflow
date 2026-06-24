function Pagination({ pageData, onPageChange }) {
  if (!pageData) return null;

  const { number, totalPages, totalElements, first, last } = pageData;

  if (totalElements === 0) return null;

  return (
    <div className="flex items-center justify-between border-t border-line px-6 py-3">
      <p className="font-mono text-xs text-ink-soft">
        Page {number + 1} of {Math.max(totalPages, 1)} · {totalElements} total
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(number - 1)}
          disabled={first}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
        >
          ← Prev
        </button>
        <button
          onClick={() => onPageChange(number + 1)}
          disabled={last}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
