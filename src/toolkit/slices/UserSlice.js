import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const getUser = createAsyncThunk('user/getUser', async () => {
    const url = 'http://localhost:3005/users'

    try {
        const rep = await fetch(url);
        const data = await rep.json();
        return data ;
    } catch (error) {
        return console.log('error',error)
    }
})


export const insertUser = createAsyncThunk('user/insertUser', async (newuser) => {
    const url = 'http://localhost:3005/users';
    try {
        const rep = await fetch(url , {
            method: 'POST',
            body: JSON.stringify(newuser),
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


const UserSlice = createSlice({
    name : 'user',
    initialState : {
        users : [] ,
        newuser : {},
        currentuser : {},
        islogin : false,
        isloading : false,
    },
    reducers : {
        checkUser : (state,action) => {
            const finduser = state.users.find(user => user.email === action.payload.email && user.password === action.payload.password);
            if (finduser) {
                state.islogin = true;
                state.currentuser = action.payload;
            }else {
                state.islogin = false;
            }
        },
        logoutUser : (state) => {
            state.islogin = false
        }
    },
    extraReducers : (builder) => {
        builder
        // getUser API
        .addCase(getUser.pending, (state) => {
            state.isloading = true ; 
            
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.isloading = false;
            state.users = action.payload ;
        })
        .addCase(getUser.rejected, (state,action) => {
            state.isloading = false;
            state.error = action.payload;
        })
        // addUser in API
        .addCase(insertUser.pending, (state) => {
            state.isloading = true ; 
            state.error = null;
        })
        .addCase(insertUser.fulfilled, (state, action) => {
            state.isloading = false;
            state.users.push(action.payload) ;
        })
        .addCase(insertUser.rejected, (state) => {
            state.isloading = false;
            
        })
    }
})


export const {checkUser,logoutUser} = UserSlice.actions;

export default UserSlice.reducer;