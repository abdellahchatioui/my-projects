import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const BookInfo = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const singleBook = useSelector(state => state.book.books.find(book => book.id === parseInt(id)))
  console.log('singleBook',singleBook);
  return (
    <div className='container'>
    <h2>Book Details </h2>
    
    {singleBook ? (<div className='text-center' key={singleBook.id} >
        <p className='fw-bold'>Title: {singleBook.title}</p>
        <p className='fw-light'>Release Date: {singleBook.releaseDate}</p>
        <p className='fst-italic'>Prix: <b>$ {singleBook.prix} </b> </p>
        <p className='fst-italic'>Genre: {singleBook.genre} </p>
        <p className='fst-italic'><br/> <img src={singleBook.cover_image} style={{width:'250px '}} alt='/'/> </p>
          <button className="btn btn-primary m-3" onClick={() => navigate(-1)}>Back</button>
          <button className='btn btn-success m-3' onClick={() => navigate('/book-Update' , {state:singleBook.id})} >Update</button>
      </div> ) : 
    (<div className='alert alert-secondary' role='alert'>
      There is no post selected yet. Please select!
    </div>)}
  </div>
  );
};

export default BookInfo;
