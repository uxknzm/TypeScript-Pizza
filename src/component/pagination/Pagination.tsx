import React from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'

type PaginationProps = {
    count: number[]
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({count, onPageChange}) => {
    let pagesCount = Math.ceil(Number(count) / 5)
    return (
        <div className={s.wrapper_pagination}>
            <ReactPaginate
                className={s.pagination}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={event => onPageChange(event.selected + 1)}
                pageCount={pagesCount}
            />
        </div>
    );
};

export default Pagination;