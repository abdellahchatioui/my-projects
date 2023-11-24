import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { upBook } from '../../toolkit/slices/BookSlice';

export default function Bookupdate() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const updateBook = useSelector(book => book.book.books.find(state => state.id === location.state))

  const [title,settitle] = useState(updateBook.title)
  const [genre,setgenre] = useState(updateBook.genre)
  const [prix,setprix] = useState(updateBook.prix)
  const [releaseDate,setreleaseDate] = useState(updateBook.releaseDate)
  const [cover_image,setcover_image] = useState(updateBook.cover_image)
   
  // singleBook.id
  
  const hundleImpImg = (e) => {
    setcover_image(e.target.files[0])
    
  }

  const hundelsubmit = (e) => {
    e.preventDefault()
    const id = location.state;
    const upbook = {id,title,genre,cover_image : URL.createObjectURL(cover_image),prix,releaseDate}
    dispatch(upBook(upbook));
    navigate('/book-list')
  }

  
  return (
    <div>
      <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Update Book</h2>
        <form onSubmit={hundelsubmit}>
          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{genre}</button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Fantasy')}}>Fantasy</a></li>
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Horror')}}>Horror</a></li>
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Historical')}}>Historical</a></li>
            </ul>
            <input type="text"  onChange={(e)=>settitle(e.target.value) } value={title} className="form-control" aria-label="Text input with dropdown button" placeholder='Title of the book'  id='Title'/>
            </div>
          <div className='form-group'>
            <label htmlFor='price'>Prix</label>
            <input type='number' className='form-control' id='price' onChange={(e)=>setprix(e.target.value) } value={prix}  required />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Release Date</label>
            <input type='number' className='form-control' id='price' onChange={(e)=>setreleaseDate(e.target.value) } value={releaseDate} required />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Cover image:</label>
            <input type='file' className='form-control' id='price' onChange={hundleImpImg}  />
          </div><br/>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
