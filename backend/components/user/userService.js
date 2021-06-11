const httpStatus    = require('http-status');
const path          = require('path');
/*
* Models
*/
const UserModel = require('../../Models/user');

/*
* utils
*/
const { setUpObjectFields } = require('../../utils/field');

module.exports = class bookService {
    constructor() {}

    transformUser(user) {
        const userFields = ['_id','name','email','isAdmin','createdAt','updatedAt'];
        return setUpObjectFields(user,userFields);
    }
    /*
    * @params page  : which page we want
    * @params limit : how many item we want 
    * @params currentUserId : for dont get it in 
    * @return       : Promise<users>
    * @description  : get users
    */
    async getUsers(page,limit,currentUserId) {
        const MAX_PAGE_SIZE = 20;
        //if limit more than MAX_PAGE_SIZE just set limit to MAX_PAGE_SIZE       
        limit = Math.min(limit,MAX_PAGE_SIZE);              
        const skip = (page - 1) * limit;  
        return  await UserModel.getUsers(skip,limit,currentUserId);
    };
    /*
    * @params       : id
    * @return       : Promise<user,APIError>
    * @description  : get user by id
    */
    async getUserById(id) {
        return await UserModel.getUserById(id);
    };

    /*
    * @params       : userModel
    * @return       : Promise<success Message,APIError>
    * @description  : delete this user 
    */
    async deleteUser(user) {
        const deleteUserResult = await user.remove();
        if(deleteUserResult)
            return Promise.resolve({message : "deleted successfully"});
        return Promise.reject(error);
    }
    /*
    * @params      : userModel
    * @params      : request.body
    * @return      : Promise<user,APIError>
    * @description : update user 
    */
    async updateUser(user,payload) {
        const {name,email} = payload;
        user.name    = name;
        user.email   = email;
        user.isAdmin = payload.isAdmin || user.isAdmin;
        return await user.save();
    }

    /*
    * @params      : userModel
    * @params      : request.body
    * @return      : Promise<user,APIError>
    * @description : update Profile  LoggedIn User 
    */
    async updateProfile(user,payload) {
        try 
        {
            const {name,email,password} = payload;
            user.name  = name;
            user.email = email;
            if(password)
                user.password = password;
            user = await user.save();
            //transform user to show just what we want & ignore what we dont to show..
            const userResult = this.transformUser(user);
            return Promise.resolve(userResult);
        } catch(error) {
            return Promise.reject(error);
        }
    }
}