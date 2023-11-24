import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../toolkit/slices/UserSlice';

const Header = () => {
  const {islogin} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  if (!islogin) {
    return (
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container p-4 text-white'><h2>LogIn page </h2></div>
      </nav>
    )
  }
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <Link to={'/book-list'} className='navbar-brand mb-0 h1'>My Books</Link>
      <Link to={'/add-form'} className='navbar-brand mb-0 h1'>Add book</Link>
      <button onClick={()=>{dispatch(logoutUser()); navigate('/')}} className='btn text-white btn-outline-warning' type='submit'>
        Log out
      </button>
    </nav>
  );
};

export default Header;
