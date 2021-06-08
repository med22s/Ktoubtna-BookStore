import User from '../Models/user.js'
import asyncHandler from 'express-async-handler'
import generateAuthToken from '../utils/generateAuthToken.js'



const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

        const user=await User.findOne({email})
        if (user && (await user.checkPassword(password))) {
        return res.json({
            _id:user._id,
            name:user.name,
            email: user.email,
        isAdmin: user.isAdmin,
        token: generateAuthToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  } 
})


const getLoggedUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id).select('-password')

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})



const updateUser=asyncHandler(async(req,res)=>{
  let user=await User.findById(req.user._id)
  const {name,email,password}=req.body

  if (user) {
    user.name=name || user.name
    user.email=email || user.email
    if(password) user.password=password

    user=await user.save()


    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateAuthToken(user._id)
    })


  } else {
    res.status(404)
    throw new Error('User not found')
  }

})




const registerUser=asyncHandler(async (req,res)=>{
  const {name,email,password}=req.body

  const foundUser=await User.findOne({email})
  if(foundUser){
    res.status(400)
    throw new Error('user already exists')
  }else{
    const user=await User.create({name,email,password})
    if(!user) {
      res.status(400)
      throw new Error('invalid user data')
    }else{
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateAuthToken(user._id),
      })
    }
  }

})


export {authUser,getLoggedUser,registerUser,updateUser}