import { Modal } from '@mantine/core';
import "./ProfileModal.css";
import { useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {setAuth,setFetching} from "../../store/AuthReducer";
import {useParams} from "react-router-dom";
import {updateUserProfile, uploadfile} from "../../Http"

const ProfileModal = ({openModal, setOpenModal,data}) => {


    const [userData, setUserData] = useState(data)
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)

    const dispatch = useDispatch()
    const {id} = useParams()
    const {isFetchng} = useSelector(state=>state.Auth)

    const handleChange = (e) =>{
        setUserData(prev=> ({...prev, [e.target.name]: e.target.value}))
    }
    const handleImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            e.target.name === "profileImage" ? setProfileImage(e.target.files[0]): setCoverImage(e.target.files[0])
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        // upload profile image
        if(profileImage){
            const data = new FormData()
            const fileName = Date.now()+profileImage.name
            data.append("name", fileName)
            data.append("file", profileImage)
            userData.profileImage = fileName
            const uploadProfile = async () => {
                try{
                    await uploadfile(data)
                }catch(err){
                    console.log(err)
                }
            }
            uploadProfile()
        }
        //upload cover image
        if(coverImage){
            const data = new FormData()
            const fileName = Date.now()+coverImage.name
            data.append("name", fileName)
            data.append("file", coverImage)
            userData.coverImage = fileName
            const uploadCover = async () => {
                try{
                    await uploadfile(data)
                }catch(err){
                    console.log(err)
                }
            }
            uploadCover()
        }

        // update profile data
        const updateProfile = async () => {
            dispatch(setFetching(true))
            try{
                const res = await updateUserProfile(id,userData)
                dispatch(setAuth(res.data))
                dispatch(setFetching(false))
            }catch(err){
                dispatch(setFetching(false))
                console.log(err);
            }
        }

        updateProfile()
        setOpenModal(false)

    }

    return (
        <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit Profile"
        centered
      >
        <form className="signupForm">
            <div className="formInputContainer">
                <input type="text" value={userData.firstname} placeholder='First Name' name='firstname' onChange={handleChange}/>
                <input type="text" value={userData.lastname} placeholder='Last Name' name='lastname' onChange={handleChange}/>
            </div>
            <div>
                <input type="text" style={{width: "100%"}} placeholder='UserName' value={userData.username} name='username' onChange={handleChange}/>
            </div>
            <div className="formInputContainer">
                <input type="text" placeholder='LivesIn' value={userData.livesIn} name='livesIn' onChange={handleChange}/>
                <input type="text" style={{width: "100%"}} value={userData.relationship} placeholder='Relationships' name='relationship' onChange={handleChange}/>
            </div>
            <div>
                <input type="text" style={{width: "100%"}} value={userData.workAt} placeholder='Works At' name='workAt' onChange={handleChange}/>
            </div>
            <div className="profile">
                <div className="profileImage">
                    <span>Profile Image</span>
                    <input type="file" name="profileImage" onChange={handleImageChange}/>
                </div>
                <div className="profileImage">
                    <span>Cover Image</span>
                    <input type="file" name="coverImage" onChange={handleImageChange}/>
                </div>
            </div>
            
            <div className="A_btnContainer">
                <button type='submit' disabled={isFetchng} className="button A_Submit" onClick={handleUpdate}>Save</button>
            </div>
        </form>
      </Modal>
    );
}

export default ProfileModal;