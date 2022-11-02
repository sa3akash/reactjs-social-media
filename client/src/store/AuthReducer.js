import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetchng: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: JSON.parse(localStorage.getItem("user"))?.isAuth || false
}

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFetching: (state,action) => {
      state.isFetchng = action.payload
    },
    setFollowing: (state,action) => {
      return {...state, user: {...state.user, following:[...state.user.following, action.payload]}}
      
    },
    setUnFollowing: (state,action) => {
      return {...state,user:{...state.user, following:[...state.user.following.filter((personId)=>personId!==action.payload)]}}
    },
    setAuth: (state,action) => {
      state.user = action.payload;
      if(action.payload === null){
        state.isAuth = false;
      }else{
        state.isAuth = action.payload.isAuth
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFetching, setAuth,setFollowing,setUnFollowing } = AuthSlice.actions

export default AuthSlice.reducer