import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const getBooks = createAsyncThunk('book/getBooks', async () => {
    const url = 'http://localhost:3005/books'
    // https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books
    // 'https://wolnelektury.pl/api/books/?format=json'
    try {
        const rep = await fetch(url);
        const data = await rep.json();
        return data ;
    } catch (error) {
        return console.log('error',error)
    }
})

export const insertBook = createAsyncThunk('book/insertBook', async (newbook) => {
    const url = 'http://localhost:3005/books';
    try {
        const rep = await fetch(url , {
            method: 'POST',
            body: JSON.stringify(newbook),
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await rep.json();
        return data ;
    } catch (error) {
        return console.log('error',error.message)
    }
})

export const deleteBook = createAsyncThunk ('book/deleteBook' , async (id ) => {
    const url = `http://localhost:3005/books/${id}`;
        try {
            await fetch(url , {
                method: 'DELETE' ,
                headers: {
                    'Content-type' : 'application/json',
                },
            });
            return id ;
        } catch(error) {
            return console.log('error',error.message)
        }
    } 
) ;

export const upBook = createAsyncThunk('book/upBook', async (upbook) => {
    const url = `http://localhost:3005/books/${upbook.id}`;
    console.log('upbook thunk',upbook);
    try {
        const rep = await fetch(url , {
            method: 'PUT',
            body: JSON.stringify(upbook),
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await rep.json();
        console.log('data',data);
        return data ;
    } catch (error) {
        return console.log('error',error.message)
    }
})

const BookSlice = createSlice({
    name : 'book',
    initialState : {
        books : [] ,
        newbook : {},
        isloading : false,
    },
    reducers : {
        upBook : (state, action ) => {
            state.isloading = false;
            console.log('action.payload',action.payload);
            state.books = state.books.map(book => book.id === action.payload.id ? action.payload : book)
            console.log('state.books',state.books);
        }
    },
    extraReducers : (builder) => {
        builder
        // getBooks API
        .addCase(getBooks.pending, (state) => {
            state.isloading = true ; 
            
        })
        .addCase(getBooks.fulfilled, (state, action) => {
            state.isloading = false;
            state.books = action.payload ;
        })
        .addCase(getBooks.rejected, (state,action) => {
            state.isloading = false;
            state.error = action.payload;
        })
        // addBook in API
        .addCase(insertBook.pending, (state) => {
            state.isloading = true ; 
            state.error = null;
        })
        .addCase(insertBook.fulfilled, (state, action) => {
            state.isloading = false;
            state.books.push(action.payload) ;
        })
        .addCase(insertBook.rejected, (state) => {
            state.isloading = false;
            
        }) 
        // delete book
        .addCase(deleteBook.pending, (state) => {
            state.isloading = true ; 
            state.error = null;
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.isloading = false;
            console.log('action.payload',action.payload);
            state.books.filter(book => book.id !== action.payload)
        })
        .addCase(deleteBook.rejected, (state) => {
            state.isloading = false;
            
        }) 
        // update book
        .addCase(upBook.fulfilled, (state, action) => {
            state.isloading = false;
            console.log('action.payload upbook',action.payload);
            state.books = state.books.map(book => book.id === action.payload.id ? action.payload : book)
        })
    },
}) ;

export default BookSlice.reducer;