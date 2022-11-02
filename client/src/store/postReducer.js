import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetchng: false,
  post: [],
}

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFetching: (state,action) => {
      state.isFetchng = action.payload
    },
    setPost: (state,action) => {
      
      if(action.payload instanceof Array){
        state.post = action.payload
      }else{
        return {...state, post: [action.payload, ...state.post]}
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPost,setFetching } = PostSlice.actions

export default PostSlice.reducer