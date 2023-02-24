import styles from './pagination.module.scss';

type PaginationOptions = {
	currentPage: number;
	totalPages: number;
	maxPagesToShow?: number;
	ellipsisSymbol?: string;
	onPageButtonClick: (newPage: number) => any;
};

/**
 * Custom hook that generates a pagination UI based on the given options.
 * @param options Object containing options for the pagination UI.
 * @returns An array of pagination button elements.
 */
export function usePagination({ currentPage = 1, totalPages = 1, maxPagesToShow = 5, ellipsisSymbol = '...', onPageButtonClick }: PaginationOptions): JSX.Element[] {

	const pageButtons: JSX.Element[] = [];

	// show all buttons when total number of pages is less than or equal to `maxPagesToShow`
	if (totalPages <= maxPagesToShow) {
		for (let index = 1; index <= totalPages; index++) {
			if (index === currentPage) {
				pageButtons.push(
					<li
						key={index}
						className={`${styles['pagination-btn']} ${styles['pagination-active']}`}
						onClick={() => onPageButtonClick(index)}
					>
						{index}
					</li>
				);
			} else {
				pageButtons.push(
					<li
						key={index}
						className={`${styles['pagination-btn']}`}
						onClick={() => onPageButtonClick(index)}
					>
						{index}
					</li>
				);
			}
		}
	} else {
		// show ellipsis if current page is more than half of `maxPagesToShow`
		if (currentPage > maxPagesToShow / 2) {
			pageButtons.push(
				<li key="left-ellipsis" className={`${styles['pagination-btn']}`}>
					{ellipsisSymbol}
				</li>
			);
		}

		// show the `maxPagesToShow` number of pages
		const leftBound = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
		const rightBound = Math.min(totalPages, leftBound + maxPagesToShow - 1);

		for (let index = leftBound; index <= rightBound; index++) {
			if (index === currentPage) {
				pageButtons.push(
					<li
						key={index}
						className={`${styles['pagination-btn']} ${styles['pagination-active']}`}
						onClick={() => onPageButtonClick(index)}
					>
						{index}
					</li>
				);
			} else {
				pageButtons.push(
					<li
						key={index}
						className={`${styles['pagination-btn']}`}
						onClick={() => onPageButtonClick(index)}
					>
						{index}
					</li>
				);
			}
		}

		// show ellipsis if remaining pages are more than `maxPagesToShow` away
		if (totalPages - currentPage > maxPagesToShow / 2) {
			pageButtons.push(
				<li key="right-ellipsis" className={`${styles['pagination-btn']}`}>
					{ellipsisSymbol}
				</li>
			);
		}
	}

	return pageButtons;
}
