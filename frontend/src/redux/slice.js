import { createSlice, configureStore } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
    name: 'service',
    initialState: { 
        //state of the service or slice 
        openAddPostModel: false  },
    reducers: {
        //to chnage the value inside a state 
        addPostModel: (state, action) =>{
            //actions-- passing args that we are giving to the state from global
        state.openAddPostModel = action.payload;
        
        }
    
    } //15.0
})

export const { addPostModel } = serviceSlice.actions

export default serviceSlice.reducer

