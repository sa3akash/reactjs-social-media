import { useEffect } from 'react';
import "./Posts.css";
import Post from "../post/Post";
import {useDispatch, useSelector} from "react-redux";
import {timelinePost} from "../../Http";
import {setFetching,setPost} from "../../store/postReducer"
import {useParams} from "react-router-dom";

const Posts = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.Auth)
  let {post,isFetchng} = useSelector(state=>state.Post)

  const params = useParams()

  useEffect(()=>{
    const getTimelinePosts = async () => {
      dispatch(setFetching(true))
      try{
        const res = await timelinePost(user._id)
        dispatch(setPost(res.data));
        dispatch(setFetching(false))
      }catch(err){
        console.log(err)
        dispatch(setFetching(false))
      }
    }
    getTimelinePosts()
  },[dispatch,user._id])


  if(!post) return "No Post"

  if(params.id) post = post.filter((post)=> post.userId===params.id)


  return (
    <div className='Posts'>

      {isFetchng ? "Loading...": post.map((post, i)=> (
        <Post key={i} post={post}/>
      ))}
    </div>
  )
}

export default Posts;