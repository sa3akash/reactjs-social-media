import React, {useState, useRef} from 'react';
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule,  UilTimes } from "@iconscout/react-unicons";
import {useSelector,useDispatch} from "react-redux";
import {postServer,uploadfile} from "../../Http";
import {setFetching,setPost} from "../../store/postReducer"


const URL_SERVER = process.env.REACT_APP_SERVER_URL;


const PostShare = () => {
    const [image, setImage] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const imageRef = useRef()

    const {user} = useSelector(state=>state.Auth)
    const {isFetchng} = useSelector(state=>state.Post)
    const dispatch = useDispatch()

    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(img)
        }
    }

   
    const handlePost = (e) => {
      if(!postTitle){
        return
      }
        let post = {
            userId:user._id,
            title:postTitle,
        }
        if(image){
            const data = new FormData();
            const filename = Date.now() + image.name;
            
            data.append("name",filename)
            data.append("file",image)
            post.image = filename;

            const createPost = async () => {
                dispatch(setFetching(true))
                try{
                    await uploadfile(data)
                    const res = await postServer(post)
                    dispatch(setPost(res.data))
                    dispatch(setFetching(false))

                    clearState()
                }catch(err){
                    dispatch(setFetching(false))
                    console.log(err);
                }
            }
            createPost()
        }
    }

    const clearState = () =>{
        setImage(null)
        setPostTitle("")
    }

  return (
        <div className='PostShare'>
            <img src={user.profileImage ? URL_SERVER+"/uploads/"+user.profileImage: "/img/default.png"} alt="avatar" />
            <div className='PostTextInput'>
                <input type="text" value={postTitle} required placeholder="What's hapaning hare!" onChange={(e)=>setPostTitle(e.target.value)}/>
                <div className="PostOptions">
                    <div className="option" style={{color: "var(--photo"}} onClick={()=> imageRef.current.click()}>
                        <UilScenery />
                        <span>Photo</span>
                    </div>
                    <div className="option" style={{color: "var(--video"}}>
                        <UilPlayCircle />
                        <span>Video</span>
                    </div>
                    <div className="option" style={{color: "var(--location"}}>
                        <UilLocationPoint />
                        <span>Location</span>
                    </div>
                    <div className="option" style={{color: "var(--shedule"}}>
                        <UilSchedule />
                        <span>Shedule</span>
                    </div>
                    <button className="button ps-button" disabled={isFetchng} onClick={handlePost}>share</button>
                    <div style={{display: 'none'}}>
                        <input type="file" name="file" ref={imageRef} onChange={onImageChange}/>
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} className='button'/>
                        <img src={URL.createObjectURL(image)} alt="previewImage" />
                    </div>
                )}
            </div>
        </div>
  )
}

export default PostShare;