const httpStatus = require('http-status');
const ObjectId = require('mongoose').Types.ObjectId;

/*
* Models
*/
const OrderModel = require('../../Models/order');


/*
* utils
*/
const { APIError } = require('../../utils/errorHandler');

module.exports = class orderService {
    constructor() { }
    /*
    * @params page  : which page we want
    * @params limit : how many item we want 
    * @return       : Promise<orders>
    * @description  : get orders
    */
    async getOrders(page, limit) {
        const MAX_PAGE_SIZE = 20;
        //if limit more than MAX_PAGE_SIZE just set limit to MAX_PAGE_SIZE       
        limit = Math.min(limit, MAX_PAGE_SIZE);
        const skip = (page - 1) * limit;
        return await OrderModel.getOrders(skip, limit);
    };
    /*
    * @params id    : orderId
    * @return       : Promise<order>
    * @description  : get order by Id
    */
    async getOrderById(id) {
        const error  = new APIError('order Not found',httpStatus.NOT_FOUND)
        if(ObjectId.isValid(id))
        {
            const  order = await  OrderModel.findById(id).populate('user','name email');
            if(order) 
                return Promise.resolve(order);
        }
        return Promise.reject(error)
    };

    /*
    * @params payload    : req.body
    * @params userId     : user Who create Order
    * @return           : Promise<savedOrder,ApiError>
    * @description      : add new Order
    */
    async addOrder(payload,userId) {
        const {orderBooks,shippingDetails,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=payload;
        if(orderBooks && orderBooks.length <= 0)
            return Promise.reject(new APIError('no ordered items',httpStatus.BAD_REQUEST))

        let order = new OrderModel({
            orderBooks,
            user: userId,
            shippingDetails,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        return await order.save();
    };
    /*
    * @params id        : orderId
    * @params userId    : user Id who is loggedIn 
    * @return           : Promise<oder,ApiError>
    * @description      : get order by Id
    */
    async getSingleOrderById(id,userId) {
        const error  = new APIError('order Not found',httpStatus.NOT_FOUND)
        if(ObjectId.isValid(id))
        {
            const  order = await OrderModel.findOne({_id: id , user : userId}).populate('user','name email')
            if(order) 
                return Promise.resolve(order);
        }
        return Promise.reject(error)
    }
    /*
    * @params id            : orderId
    * @params orderPayload  : order payload
    * @return               : Promise<updatedOrder,ApiError>
    * @description          : update order  when user pay
    */
    async updateOrderAsPaid(order,orderPayload) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id : orderPayload.id,
            status : orderPayload.status,
            update_time :orderPayload.update_time,
            email_address: orderPayload.email_address
        }
        return await order.save();
    }

    /*
    * @params order :  orderModel
    * @return       : Promise<updatedOrder,ApiError>
    * @description  : update delivred Order
    */
    async updateDelivereOrder(order) {
        //check if order not order yet 
        if(order.isPaid === false)
            return Promise.reject(new  APIError("please pay order first!!",httpStatus.BAD_REQUEST))
        order.isDelivered   = true;
        order.deliveredAt   = Date.now();
        return await order.save();
    }
}