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
// 2;48
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
        allPosts:[],
        addSingle:[],
        postID: null,
        searchedUsers: []
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
            state.myInfo = action.payload?.me ?? null
        },
        addUser:(state, action)=>{
            state.user = action.payload
        },
        addToAllPost: (state, action) => {
            const newPosts =
                action.payload?.post ||
                action.payload?.data ||
                action.payload ||
                [];

            if (!Array.isArray(newPosts)) return;

            const map = new Map();
            state.allPosts.forEach((p) => map.set(p._id, p));
            newPosts.forEach((p) => map.set(p._id, p));

            state.allPosts = Array.from(map.values()).sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        },

        addSingle: (state, action) => {
  const newPost = action.payload?.newPost;
  if (!newPost) return;

  const updated = [newPost, ...state.allPosts];

  const seen = new Set();
  state.allPosts = updated.filter((p) => {
    if (seen.has(p._id)) return false;
    seen.add(p._id);
    return true;
  });
},

        deleteThePost: (state, action) => {
            const id = action.payload;
            state.allPosts = state.allPosts.filter((p) => p._id !== id);
},

        addPostID: (state,action)=>{
            state.postID = action.payload;
        },

        addTOSearchUsers: (state, action) =>{
            //2:31
            state.searchedUsers = action.payload 
        }
    } 
})

export const { addPostModel, EditProfileModel, toggleMainMenu, toggleMyMenu, toggleColorMode, addMyInfo, addUser, addToAllPost, addSingle, deleteThePost, addTOSearchUsers, addPostID } = serviceSlice.actions


// 2:19
export default serviceSlice.reducer

