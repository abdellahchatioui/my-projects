import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBook } from '../../toolkit/slices/BookSlice';
import { getBooks} from '../../toolkit/slices/BookSlice';

export default function Book({book,key}) {
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    return <div className="col-lg-4" key={key}>
    <div className="card">
      <div className="img-wrap text-center">
        <img src={book.cover_image} alt={book.title} style={{width:'250px'}}/> 
      </div>
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => {
              const shouldDelete = window.confirm("Are you sure you want to delete?");
              if (shouldDelete) {
                dispatch(deleteBook(book.id))
                dispatch(getBooks())
              }
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
          <button onClick={() => { navigate(`/book-info/${book.id}` )}} className="btn btn-primary btn-sm">
                    DETAILS &#8594;
          </button>
        </div>
      </div>
    </div>
  </div> 
}
