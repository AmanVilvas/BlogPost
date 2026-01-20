import { createSlice } from '@reduxjs/toolkit'

const THEME_STORAGE_KEY = 'threads.theme'

function getInitialDarkMode() {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY)
        if (saved === 'dark') return true
        if (saved === 'light') return false
    } catch (e) {
        // ignore (e.g. privacy mode / blocked storage)
    }
    return false
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState: { 
        //state of the service or slice 
        openAddPostModel: false, 
        openEditProfileModel: false, 
        openmenu: null, 
        anchorE1: null,
         anchorE2: null, 
        darkMode: getInitialDarkMode(),
        myInfo: null ,
        user:{},
        allPosts:[]           
    },
    reducers: {
        //to chnage the value inside a state 
        addPostModel: (state, action) =>{
            //actions-- passing args that we are giving to the state from global
        state.openAddPostModel = action.payload;
        
        },
        EditProfileModel: (state, action) =>{
            //actions-- passing args that we are giving to the state from global
        state.openEditProfileModel = action.payload;        
        },
        toggleMainMenu: (state,action) =>{
            state.openmenu = action.payload
        },   
        toggleMyMenu: (state, action) =>{
            state.anchorE2 = action.payload
        },
        toggleColorMode: (state) => {
            // console.log('toggleColorMode reducer called, current state:', state.darkMode)
            state.darkMode = !state.darkMode
            try {
                localStorage.setItem(THEME_STORAGE_KEY, state.darkMode ? 'dark' : 'light')
            } catch (e) {
                // ignore storage write errors
            }
        },
        addMyInfo: (state, action)=>{
            state.myInfo = action.payload.me
        },
        addUser:(state, action)=>{
            state.user = action.payload
        },
        addToAllPost: (state, action) =>{
            const newPostArr = [...action.payload.posts]
            if(state.allPosts.length === 0){
                state.allPosts = newPostArr
                return
            }else{
                const existingPosts = [...state.allPosts]
                newPostArr.forEach((e)=>{
                    const existingIndex = existingPosts.findIndex((i)=>{
                        return i._id === e._id
                    })
                    if(existingIndex !== -1){
                        existingPosts[existingIndex] = e;
                    }else{
                        existingPosts.push(e)
                    }
                });
                state.allPosts = existingPosts;
            }
        }
    
    } 
})

export const { addPostModel, EditProfileModel, toggleMainMenu, toggleMyMenu, toggleColorMode, addMyInfo, addUser, addToAllPost } = serviceSlice.actions

export default serviceSlice.reducer

