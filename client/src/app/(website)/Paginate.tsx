'use client';
import { iBlog } from '@/models';
import { getAllBlogs } from '@/services/blogApi';
import { iBlogResponse } from '@/types/iBlog';
import { FC, useState } from 'react'
import ReactPaginate from 'react-paginate';
const url = process.env.NEXT_PUBLIC_Server_APi

interface PaginateProps {

}

export default function Paginate() {
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const limit: number = 4; 

    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/api/blog?page=${currentPage}&limit=${limit}`);
            const data: iBlogResponse = await response.json();

            setPageCount(Math.ceil(data.totalCount / limit));
        } catch (error) {
            console.log(error);
        }
    }; 
    return <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selectedItem) => {
            setCurrentPage(selectedItem.selected);
            fetchData();
        }}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
    />
}