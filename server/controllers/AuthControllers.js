import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createError } from "../middlewares/errorHandler.js";


const AuthControllers = {

    // register
    async registerUser(req, res, next){

        // client send data 
       const {username, password, first_name, last_name} = req.body;

       // password is bcrypt
       const salt = bcrypt.genSaltSync(10)
       const hashPassword = bcrypt.hashSync(password, salt);

       const newUser = new User({
        username: username,
        password: hashPassword,
        firstname: first_name,
        lastname: last_name,
       })

       try{
          const inUser = await User.findOne({username: username});
          if(inUser){
               return next(createError(403,"This user already exists"))
          }else{
               const user = await newUser.save();
               const {password, ...others} = user._doc;

               res.status(201).json({...others,isAuth:true});
          }
       }catch(err){
            return next(err)
       }
       
    },


// =========================================== Login


    // Login
    async login(req, res, next){

        // client send data 
      const {username, password:inputPass } = req.body;
     
      try{
          const findUser = await User.findOne({username: username});
          if(!findUser) return next(createError(403,"User not exists in the database!"))
          
          const verify_password = await bcrypt.compareSync(inputPass, findUser.password)
          if(!verify_password) return next(createError(403,"Username and password do not match!"))
         
          const {password, ...others} = findUser._doc;

          res.status(200).json({...others,isAuth:true});
       }catch(err){
          return next(err)
       }
       
    },


    
// ===========================================find one user by id


// find user by id

    async oneUser (req, res, next){

     const id = req.params.id;

     // database query for user by id
     try{
          const findOneUser = await User.findById(id).select("-password");
          if(!findOneUser) return next(createError(404,"User not found"))

          res.status(200).json(findOneUser);
     }catch(err){
          return next(err)
     }

    },

    
// ===========================================update a user by user id


// update a user

    async update(req, res, next) {

     const id = req.params.id;
     const {_id} = req.body;
     if(id === _id){
          try{
               const user = await User.findByIdAndUpdate(id, req.body, {new: true});
               
               const {password, ...others} = user._doc
               res.status(201).json({...others, isAuth:true});

          }catch(err){
               return next(err)
          }
     }else{
          return next(createError(420, "Your are not allowed to update profile"))
     }


    },

    
    
// ===========================================delete a user by user id


// delete a user

     async delete (req, res, next){

     const id = req.params.id;
     const {userId, userAdminStatus} = req.body;

     // database query for user params id
     if(id === userId || userAdminStatus){
          try{
               await User.findByIdAndDelete(id);
               res.status(200).json({success: true, message: "User deleted successfully"})
     
          }catch(err){
               return next(err)
          }
     }else{
          return next(createError(420, "User not Delete & Somthing was error")) 
     }
     },

    
    
// ===========================================Follow a user by user id


// Follow a user
     async follow(req, res, next) {
          // following user id follow params id 
          const {followingUserId} = req.body; 
          const id = req.params.id;
          

          if(id === followingUserId) {
               return next(createError(403,"Actions forbidden"))
          }else{
               try{
                    const followUser = await User.findById(id);
                    const followingUser = await User.findById(followingUserId);

                    if(!followUser.followers.includes(followingUserId)){
                         await followUser.updateOne({$push: {followers: followingUserId}})
                         await followingUser.updateOne({$push: {following: id}})

                         res.status(200).json('User followed!')
                    }else{
                         return next(createError(403,"User can't  followed you"))
                    }

               }catch(err){
                    return next(err)
               }
          }
     },

    
    
// ===========================================Follow a user by user id


// unFollow a user
     async unfollow(req, res, next) {
          // following user id follow params id 
          const {followingUserId} = req.body;
          const id = req.params.id;
     


          if(id === followingUserId) {
               return next(createError(403,"Actions forbidden"))
          }else{
               try{
                    const followUser = await User.findById(id);
                    const followingUser = await User.findById(followingUserId);

                    if(followUser.followers.includes(followingUserId)){
                         await followUser.updateOne({$pull: {followers: followingUserId}})
                         await followingUser.updateOne({$pull: {following: id}})

                         res.status(200).json('User unfollowed!')
                    }else{
                         return next(createError(403,"User can't  unfollowed you"))
                    }

               }catch(err){
                    return next(err)
               }
          }
     },

    
// ===========================================Follow a user by user id


// one clik user follw and unfollow functionality a user


     async multiFollow(req, res, next) {
          // following user id follow params id 
          const {followingUserId} = req.body;
          const id = req.params.id;
     


          if(id === followingUserId) {
               return next(createError(403,"Actions forbidden"))
          }else{
               try{
                    const followUser = await User.findById(id);
                    const followingUser = await User.findById(followingUserId);

                    // if user followes array inclues following id 
                    //then pull or delete following userid in database
                    if(followUser.followers.includes(followingUserId)){
                         await followUser.updateOne({$pull: {followers: followingUserId}})
                        await followingUser.updateOne({$pull: {following: id}})

                         res.status(200).json("unfollowed",)
                    // else user followes array not  inclues following id 
                    //then push or add following userid in database
                    }else{
                         await followUser.updateOne({$push: {followers: followingUserId}})
                         await followingUser.updateOne({$push: {following: id}})

                         res.status(200).json("followed")
                    }

               }catch(err){
                    return next(err)
               }
          }
     },
     async getAll (req, res, next){
     
          // database query for user by id
          try{
               const findAllUser = await User.find({}).select("-password");
     
               res.status(200).json(findAllUser);
          }catch(err){
               return next(err)
          }
     
         },

}






export default AuthControllers;