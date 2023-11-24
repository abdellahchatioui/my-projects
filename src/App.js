import React, { Fragment } from 'react';
import {Routes , Route} from 'react-router-dom'

import Header from './components/Header';
import AddForm from './components/AddForm';
import BookInfo from './components/Book/BookInfo';
import BooksList from './components/Book/BooksList';
import Bookupdate from './components/Book/Bookupdate';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    
    <Fragment>
      <Header />
      <Routes>
        <Route path='' element={<LoginForm />}/>
        <Route path='book-list' element={<BooksList />}/>
        <Route path='add-form' element={<AddForm />}/>
        <Route path='book-info/:id' element={<BookInfo />}/>
        <Route path='book-Update' element={<Bookupdate />}/>
      </Routes>
     
    </Fragment>
  );
};

export default App;
