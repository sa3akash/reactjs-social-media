import { useState } from 'react';
import "./Post.css";
import {useSelector} from "react-redux";
import {likedPost} from "../../Http"


const URL = process.env.REACT_APP_SERVER_URL;


const Post = ({post}) => {

  const {user} = useSelector(state=>state.Auth)
  const userId = user._id
  const [liked, setLiked] = useState(post.likes.includes(userId))
  const [likes, setLikes] = useState(post.likes.length)



  const handleLike = (id) => {
    setLiked(prev=>!prev)
    liked ? setLikes(prev=>prev-1) : setLikes(prev=>prev+1)
    const likeAndDisLike = async () => {
      try{

        await likedPost(id,userId)
      }catch(err){
        console.log(err);
      }
    }
    likeAndDisLike()
  }



  return (
    <div className='Post'>

        <img src={`${URL}/uploads/${post?.image}`} alt={post.name}/>

        <div className="postReact">
            <img src={liked ? ("/img/like.png") : ("/img/notLike.png")}
            alt="like"
            onClick={()=>handleLike(post._id)}
            style={{cursor:"pointer"}}
            />
            <img src="/img/comment.png" alt="comment" />
            <img src="/img/share.png" alt="share" />
        </div>
        <span style={{color: "var(--gray)", fontSize: "14px"}}>{likes} Likes</span>
        <div className="details">
            <span><b>{post?.name}</b></span>
            <span> {post?.title}</span>
        </div>
    </div>
  )
}

export default Post;