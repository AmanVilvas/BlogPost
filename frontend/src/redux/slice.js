import { createSlice, configureStore } from '@reduxjs/toolkit'
import EditProfile from '../components/modals/EditProfile';

export const serviceSlice = createSlice({
    name: 'service',
    initialState: { 
        //state of the service or slice 
        openAddPostModel: false, openEditProfileModel: false   },
    reducers: {
        //to chnage the value inside a state 
        addPostModel: (state, action) =>{
            //actions-- passing args that we are giving to the state from global
        state.openAddPostModel = action.payload;
        
        },
        EditProfileModel: (state, action) =>{
            //actions-- passing args that we are giving to the state from global
        state.openEditProfileModel = action.payload;
        
        }
    
    } //15.0
})

export const { addPostModel, EditProfileModel } = serviceSlice.actions

export default serviceSlice.reducer

