const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');

/*
* Models
*/
const OrderModel = require('../../Models/order');

/*
* services
*/
const orderServiceClass = require('./orderServices');
/*
* Utils
*/

const getOrders         = asyncHandler(async (req,res)=>{
    const pageNumber    = Math.abs(parseInt(req.query.pageNumber))  || 1;  // Make sure to parse the skip to number
    const limit         = Math.abs(parseInt(req.query.limit)) || 8; // Make sure to parse the limit to number
    const orderService  = new orderServiceClass();
    const orders        = await orderService.getOrders(pageNumber,limit);
    res.json(orders);
});

const updateDeliveredOrder = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    const orderService  = new orderServiceClass();
    const order         = await orderService.getOrderById(id);
    const updatedOrder  = await orderService.updateDelivereOrder(order);
    res.json(updatedOrder);
});


const addOrder = asyncHandler(async (req,res)=>{
    const userId        = req.user._id;
    const orderService  = new orderServiceClass();
    const order         = await orderService.addOrder(req.body,userId);
    res.status(httpStatus.CREATED).json(order);
})

const getSingleOrderById = asyncHandler(async(req,res)=>{
    console.log('test order id')
    const id            =   req.params.id;
    const orderService  = new orderServiceClass();
    const order         = await orderService.getSingleOrderById(id);
    res.json(order);
})

const updateOrderAsPaid = asyncHandler(async (req, res) => {
    const id            = req.params.id;
    const orderService  = new orderServiceClass();
    let order           = await orderService.getOrderById(id);
    const orderPayload  = {
        id      : req.body.id ,
        status  : req.body.status,
        update_time     : req.body.update_time,
        email_address   : req.body.payer.email_address 
    };
    order               = await orderService.updateOrderAsPaid(order,orderPayload);
    res.json(order);
})

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({ user: req.user._id })
    res.json(orders)
})


module.exports =  {
    getOrders,
    addOrder,
    getSingleOrderById,
    updateOrderAsPaid,
    getMyOrders,
    updateDeliveredOrder
}