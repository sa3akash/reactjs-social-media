import { configureStore } from '@reduxjs/toolkit';
import Auth from "./AuthReducer";
import Post from "./postReducer"

export const store = configureStore({
  reducer: {
    Auth,
    Post
  },
})