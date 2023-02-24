import React from 'react';
import { PaginationOptionsResponse } from '../../@types';
import styles from './pagination.module.scss';
import { usePagination } from './usePagination';

interface PaginationProps extends PaginationOptionsResponse {
    maxPagesToShow?: number; // maximum number of pages to show before inserting ellipsis
    ellipsisSymbol?: string; // symbol to use for the ellipsis
    recordsPerPage?: number;
    limitSelection?: boolean;
    handlePageChange?: (newPage: number) => any;
    handleLimitChange?: (newLimit: number) => any;
    onUpdate?: (newPage: number, newLimit: number) => any
}

export const Pagination = ({
    currentPage,
    hasNext,
    payloadSize,
    skippedRecords,
    totalPages,
    totalRecords,
    handlePageChange,
    handleLimitChange,
    recordsPerPage = 10,
    limitSelection = true,
    onUpdate,
}: PaginationProps): JSX.Element => {

    const pageButtons = usePagination({ currentPage, totalPages, onPageButtonClick: (page) => onChange({ page }) });


    const onChange = ({ page = currentPage, limit = recordsPerPage }: { page?: number, limit?: number }) => {

        if (page !== currentPage || limit !== recordsPerPage) {

            if (page > 1 && limit * (page - 1) > totalRecords) {
                page = 1;
            }
            if (typeof handlePageChange === 'function') {
                handlePageChange(page);
            }
            if (typeof handleLimitChange === 'function') {
                handleLimitChange(limit);
            }
            if (typeof onUpdate === 'function') {
                onUpdate(page, limit);
            }
        }
    }



    return (
        <>
            <p>
                {payloadSize === 0 ? `Showing 0 of ${totalRecords} entries` :
                    `Showing ${currentPage > 1 ? skippedRecords : 1} to ${hasNext ? currentPage * payloadSize : totalRecords} of ${totalRecords} entries`
                }
            </p>
            {limitSelection && (
                <p>
                    <label htmlFor='recordsPerPage'>Records Per Page:&nbsp;</label>
                    <select
                        name='recordsPerPage'
                        onChange={(e) => onChange({ limit: Number(e.target.value) })}
                        value={recordsPerPage}
                    >
                        <option value={5}>&nbsp;&nbsp;5</option>
                        <option value={10}>&nbsp;&nbsp;10</option>
                        <option value={25}>&nbsp;&nbsp;25</option>
                        <option value={50}>&nbsp;&nbsp;50</option>
                        <option value={100}>&nbsp;&nbsp;100</option>
                    </select>
                </p>
            )}

            {totalRecords > recordsPerPage &&
                <ul className={styles.pagination}>
                    {currentPage > 1 && <li
                        onClick={() => onChange({ page: currentPage - 1 })}
                        className={`${styles['pagination-btn']} ${styles['pagination-prev']}`}
                    >
                        Previous
                    </li>}

                    {[...pageButtons]}

                    {hasNext && <li
                        onClick={() => onChange({ page: currentPage + 1 })}
                        className={`${styles['pagination-btn']} ${styles['pagination-next']}`}
                    >
                        Next
                    </li>}
                </ul>
            }
        </>
    );
};


