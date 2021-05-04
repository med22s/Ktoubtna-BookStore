import mongoose from 'mongoose'


const bookSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    name:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    genre:{type:String,required:true},
    reviews:[new mongoose.Schema({
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        message:{type:String,required:true}
    },{timestamps:true})],
    rating:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0},
    numberInStock:{type:Number,required:true,default:0},
    numReviews:{type:Number,required:true,default:0}
},{timestamps:true})

const Book=mongoose.model('book',bookSchema);

export default Book;