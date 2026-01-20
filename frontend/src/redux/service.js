import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addMyInfo, addToAllPost } from './slice'


export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include', // This enables sending cookies with requests
        prepareHeaders: (headers) => {
            // Add any custom headers if needed
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        //for cookies storage
    }),
    keepUnusedDataFor: 60*60*24*7,
    tagTypes: ['Post', 'User', 'Me'],
    endpoints:(builder)=>({
        signin: builder.mutation({
            //mutation -- for post or put or delete req
            //query -- get 
            query: (data) => (
                {
                    url:'signin',
                    method: "POST",
                    body: data,
                }
            ),
            invalidateTags: ['Me'],
            
        }),
        login: builder.mutation({
            query: (data)=>({
                url: 'login',
                method: 'POST',
                body: data,
            }),
            invalidateTags: ['Me'],
            //whenevr something changes in tags it will refetch it and update it
        }),
        myInfo: builder.query({
            query: ()=>({
                url: 'me',
                method:'GET'
            }),
            providesTags: ['Me'],

            async onQueryStarted(params, { dispatch, queryFulfilled})
            {
                try{
                    const { data } = await queryFulfilled;
                    dispatch(addMyInfo(data))
                } catch(err){
                    console.error("MyInfo query error:", err);
                    // Don't fail silently - log detailed error
                    if (err.error) {
                        console.error("Error details:", err.error);
                    }
                }
            },
            // Add this to keep trying if there's an error
            keepUnusedDataFor: 0 // Don't cache errors
        }),
        // 1:36
        logoutMe:builder.mutation({
            query:()=>({
                url:'logout',
                method:'POST'
            }),
            invalidatesTags: ['Me']
        }),
        userDetails: builder.query({
            query: (id) => ({
                url: `url/${id}`,
                method:'GET'
            }),
            providedTags: (result, error, { id }) => [{
                type: "User", id
            }],
            async onQueryStarted(params, { dispatch, queryFulfilled }){
                try{
                    const { data } = await queryFulfilled
                    dispatch(addUser(data));
                    // 1:44:25
                }catch(err){
                    console.log(err);
                }
            }
        }),
        searchUsers: builder.query({
            query: (query)=>{
                url: `users/search/${query}`
                method: "GET"
            }
        }),
        allPosts: builder.query({
            query: (page)=>({
             url: `posts?page=${page}`,
                method:'GET'
            }),
            providedTags: (result, error, args)=>{
                return result ? [ ...result.posts.map(({_id}) =>({
                    type:'Post', id:_id
                })),
            {type: 'Post', id:'LIST'}  ] : [{type: 'Post', id:'LIST'}];
            },
            async onQueryStarted(params, {dispatch, queryFulfilled}){
                try{
                    //we could have done = const result = result.data but did data only by destructringg {}
                    const {data} = await queryFulfilled
                    dispatch(addToAllPost(data))
                }catch(err){
                    console.log(err);
                    
                }
            }
        }),  
        followUser: builder.mutation({
            query: (id)=>({
                url: `user/folow/$id`,
                method:"PUT",
            }),
            invalidatesTags:(result, err, {id})=>[{
                type:"User", id
            }],
        }) 
        2:10

    })
});

export const { useSigninMutation, useLoginMutation, useMyInfoQuery, useLogoutMeMutation, useUserDetailsQuery, useAllPostsQuery, useSearchUsersQuery } = serviceApi