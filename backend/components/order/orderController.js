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
const { APIError } = require('../../utils/errorHandler');

//************************* for Admin **************************
const getOrders         = asyncHandler(async (req,res)=>{
    const skip  = Math.abs(parseInt(req.query.skip))  || 1;  // Make sure to parse the skip to number
    const limit = Math.abs(parseInt(req.query.limit)) || 5; // Make sure to parse the limit to number
    const orderService  = new orderServiceClass();
    const orders        = await orderService.getOrders(skip,limit);
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
    const userId = req.user._id;
    const orderService  = new orderServiceClass();
    const order         = await orderService.addOrder(req.body,userId);
    res.status(httpStatus.CREATED).json(order);
})

const getSingleOrderById = asyncHandler(async(req,res)=>{
    const id        =  req.params.id;
    const userId    = req.user._id;
    const orderService  = new orderServiceClass();
    const order         = await orderService.getSingleOrderById(id,userId);
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