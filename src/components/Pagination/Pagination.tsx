import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
import { currentPageSelector, setCurrentPage } from '../../redux/filterSlice/filterSlice';

type HandlePageClickType = {
    selected: number,
}

export const Pagination: React.FC = () => {

    const dispatch = useDispatch();
    const currentPage: number = useSelector(currentPageSelector);

    const handlePageClick = (event: HandlePageClickType) => {
        dispatch(setCurrentPage(event.selected + 1));
    }

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="<"
            forcePage={currentPage - 1}
        />
    );
};