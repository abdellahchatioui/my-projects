import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks} from '../../toolkit/slices/BookSlice';
import Book from './Book';

const BooksList = () => {
  const {islogin} = useSelector(state => state.user)
  const {books , isloading} = useSelector(state => state.book)
  const [categories, setCategoryList] = useState([])
  const [searchInput, setSearchInput] = useState()
  const [currentCategory, setCurrentCategory] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
    fetch('http://localhost:3005/categories')
        .then(response => response.json())
        .then(response => setCategoryList(response))
  },[dispatch])

  const displayCategories = () => {
    return categories.map((category, key) =>
        <button key={key}
                className={'btn ' + (currentCategory === category ? 'btn-dark' : 'btn-secondary')}
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentCategory(category)
                }}>
            {category}
        </button>
    )
}
  const DisplayList=()=>{

        let bookTemp = books
        if (searchInput !== undefined) {
            bookTemp = books.filter(book =>
                book.title.includes(searchInput) || book.id.toString().includes(searchInput.toString())
            )
        }
        if (currentCategory !== undefined) {
            bookTemp = bookTemp.filter(book => {
                return book.genre === currentCategory
            })
        }
        if (bookTemp.length > 0){
          return bookTemp.map((book , key) =>  {
            return <Book book={book} key={key}/>
      });
    }
      return <tr>
      <td colSpan={7}> No Items</td>
      </tr>
    }
      
    const handleSearch = (e) => {
        e.preventDefault()
        const searchValue = document.querySelector('#search').value
        setSearchInput(searchValue)
    };

  if(!islogin){
    return (
      <div className='container p-5'>
        <h1 >You must be login first !!!</h1>
        <Link to={'/'} className='btn btn-danger'>LOGIN</Link>
      </div>
    )
  }
  return (
    
    <div className='container p-4'>
      <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label className="col-form-label">Search</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="search" className="form-control"/>
                    </div>
                    <div className="col-auto">
                        <input className='btn btn-dark mx-2' type="submit" value='Search' onClick={handleSearch}/>
                        <input className='btn btn-secondary' type="reset" value='Reset' onClick={() => {
                            setSearchInput(undefined);
                            setCurrentCategory(undefined);
                            document.querySelector('#search').value = ''
                        }}/>
      </div>
      <h5>Categories: </h5>
          <div className="row g-3 align-items-center">
              <div className="btn-group">
                  {displayCategories()}
          </div>
      </div>
       
      <h2>Books List</h2>
      
        {isloading  ? 
         (
          'Loading...'
        ) :
        (books &&   
            DisplayList() 
        )
      
      }
      </div>

    </div>
  )
};

export default BooksList;
