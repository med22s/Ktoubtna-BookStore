import Order from '../Models/order.js'
import asyncHandler from 'express-async-handler'


const addOrder=asyncHandler(async (req,res)=>{
    const {orderBooks,shippingDetails,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body

    if(orderBooks && orderBooks.length<=0){
        res.status(400)
        throw new Error('no ordered items')
    }

    let order = new Order({
        orderBooks,
        user: req.user._id,
        shippingDetails,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
  
      order = await order.save()
  
      res.status(201).json(order)

})


const getSingleOrderById=asyncHandler(async(req,res)=>{
    let order=await Order.findById(req.params.id).populate('user','name email')

    if(order) return res.json(order)

    res.status(400)
    throw new Error('order was not found')
})



export {addOrder,getSingleOrderById}