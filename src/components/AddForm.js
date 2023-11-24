import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { insertBook } from '../toolkit/slices/BookSlice';
import { useNavigate } from 'react-router-dom';

const Addform = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [cover_image ,setimg] = useState()
  const [genre ,setgenre] = useState('Genre')
  const [formvalider,setValidation] = useState([])
  const validation = () =>{
    const title = document.getElementById("Title").value;
    const prix = document.getElementById("Prix").value;
    const releaseDate = document.getElementById("ReleaseDate").value;

    if(title.trim() === ''){
      setValidation( prevState => {
        return [...prevState,'Require a Title']
      })
    }

    if(releaseDate.trim() === ''){
      setValidation( prevState => {
        return [...prevState,'Require a Release Date']
      })
    }

    if(prix.trim() === ''){
      setValidation( prevState => {
        return [...prevState,'Require a Prix']
      })
    }

    if(genre === 'Genre'){
      setValidation( prevState => {
        return [...prevState,'Require a Genre']
      })
    }   
  }

  const hundleImpImg = (e) => {
    setimg(e.target.files[0])   
  }
  const hundelsubmit = (e) => {
      e.preventDefault();
      setValidation([])
      validation()
      const title = document.getElementById("Title").value;
      const prix = document.getElementById("Prix").value;
      const releaseDate = document.getElementById("ReleaseDate").value;

      if (formvalider.length === 0 && title && prix && releaseDate) {    
        const newbook = {genre,title,cover_image : URL.createObjectURL(cover_image),prix,releaseDate}
        dispatch(insertBook(newbook));
        navigate('/book-list')        
      }
  }

  return (
    <div className='row'>
      { formvalider.length === 0 ? '':
            (
              <div className='col-6 offset-3 mt-3'>   
                <ul className="container alert alert-danger p-4" role="alert">
                  {formvalider.map((value,key) => <li  key={key}>{value}</li>)}
                </ul>
              </div>
            )
          }
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>

          <div className="input-group mb-3">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{genre}</button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Fantasy')}}>Fantasy</a></li>
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Horror')}}>Horror</a></li>
              <li><a className="dropdown-item" href="/" onClick={(e)=> { e.preventDefault(); setgenre('Historical')}}>Historical</a></li>
            </ul>
            <input type="text" className="form-control" aria-label="Text input with dropdown button" placeholder='Title of the book'  id='Title'/>
            </div>

          <div className='form-group'>
            <label htmlFor='price'>Prix</label>
            <input type='number' className='form-control' id='Prix'  />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Release Date</label>
            <input type='number' className='form-control' id='ReleaseDate'  />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Cover image:</label>
            <input type='file' className='form-control' id='Cover_image' onChange={hundleImpImg}   />
          </div><br/>
          <button type='submit' className='btn btn-primary' onClick={hundelsubmit}>
            Submit
          </button>
        
      </div>
    </div>
  );
};

export default Addform;
