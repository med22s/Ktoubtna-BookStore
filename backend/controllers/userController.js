const User = require ('../Models/user.js')
const asyncHandler = require ('express-async-handler')
const generateAuthToken = require ('../utils/generateAuthToken.js')



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



const getAllUsers=asyncHandler(async(req,res)=>{
  const users=await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    return res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    return res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    console.log(user)
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const {_id,name,email,isAdmin} = await user.save()

    res.json({
      _id,
      name,
      email,
      isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})





module.exports= {authUser,getLoggedUser,registerUser,updateUser,getAllUsers,deleteUser,getUserById,editUser}