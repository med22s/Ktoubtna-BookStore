import mongoose from 'mongoose'


const orderSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    orderBooks:[mongoose.Schema({
        name:{type:String,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
    })],
    shippingAddress:{type:mongoose.Schema({
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    }),required:true},
    payementMethod:{type:String,required:true},
    payementResult:{id:{type:String},status:{type:String},update_time:{type:String},email_address:true},
    taxPrice:{type:Number,required:true,default:0.00},
    shippingPrice:{type:Number,required:true,default:0.00},
    totalPrice:{type:Number,required:true,default:0.00},
    isPaid:{type:Boolean,required:true,default:false},
    isDelivered:{type:Boolean,required:true,default:false},
    deliveredAt:{type:Date},
},{timestamps:true})

const Order=mongoose.model('Order',orderSchema);

export default Order;