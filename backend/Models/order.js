const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    orderBooks:[{
        name:{type:String,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true}
    }],
    shippingDetails:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    paymentMethod:{type:String,required:true},
    paymentResult:{id:{type:String},status:{type:String},update_time:{type:String},email_address:{ type: String }},
    taxPrice:{type:Number,required:true,default:0.00},
    shippingPrice:{type:Number,required:true,default:0.00},
    totalPrice:{type:Number,required:true,default:0.00},
    isPaid:{type:Boolean,required:true,default:false},
    paidAt: {type: Date},
    isDelivered:{type:Boolean,required:true,default:false},
    deliveredAt:{type:Date},
},{timestamps:true})


/**
 * Statics
 */
 orderSchema.statics = {
    /**
    * Get Users
    * @param pageNumber  : how many item to skip 
    * @param limit : number of item to get 
    * @returns Promise<orders, error>
    */
    async getOrders(pageNumber,limit) {
        const count  = await Order.countDocuments({});
        const orders = await Order.find().populate('user', 'name email')
                                        .skip(pageNumber)
                                        .limit(limit);
    return Promise.resolve({orders,pageNumber,pages: Math.ceil(count / limit)})
    },
}


const Order=mongoose.model('Order',orderSchema);

module.exports= Order;