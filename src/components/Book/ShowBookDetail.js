import React from 'react';

import './bookdetail.css'

const ShowBookDetail = ({ bookDetail }) => {
    return (
        <div className='container'>
            <div className='book-detail-block'>
                <h1>Book Details</h1>
                <p>Book Name: {bookDetail.bookDto.name}</p>
                <p>Import Price: {bookDetail.bookDto.importPrice}</p>
                <p>Export Price: {bookDetail.bookDto.exportPrice}</p>
                <p>Quantity: {bookDetail.quantity}</p>
                <p>Category Name: {bookDetail.bookDto.categoryDto.name}</p>
                <p>Branch Name: {bookDetail.branch.name}</p>
                <p>Branch Address: {bookDetail.branch.address}</p>
            </div>
        </div>
    );
}

export default ShowBookDetail;
