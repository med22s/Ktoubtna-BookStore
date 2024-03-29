const httpStatus = require('http-status');
/*
* Models
*/
const UserModel = require('../../Models/user');

/*
* utils
*/
const { setUpObjectFields } = require('../../utils/field');
const { APIError } = require('../../utils/errorHandler');


module.exports = class bookService {
    constructor() { }

    transformUser(user) {
        const userFields = ['_id', 'name', 'email', 'isAdmin', 'createdAt', 'updatedAt'];
        return setUpObjectFields(user, userFields);
    }
    /*
    * @params currentUserId : for dont get it in 
    * @return       : Promise<users>
    * @description  : get users
    */
    async getUsers(currentUserId) {
        return await UserModel.getUsers(currentUserId);
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
        try {
            const deleteUserResult = await user.remove();
            if (deleteUserResult)
                return Promise.resolve({ message: "deleted successfully" });
            throw new APIError("something happend Wrong", httpStatus.INTERNAL_SERVER_ERROR);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /*
    * @params      : userModel
    * @params      : request.body
    * @return      : Promise<user,APIError>
    * @description : update user 
    */
    async updateUser(user, payload) {
        const { name, email } = payload;
        user.name = name;
        user.email = email;
        user.isAdmin = payload.isAdmin || user.isAdmin;
        return await user.save();
    }

    /*
    * @params      : userModel
    * @params      : request.body
    * @return      : Promise<user,APIError>
    * @description : update Profile  LoggedIn User 
    */
    async updateProfile(user, payload) {
        try {
            const { name, email, password } = payload;
            user.name = name;
            user.email = email;
            if (password)
                user.password = password;
            user = await user.save();
            //transform user to show just what we want & ignore what we dont to show..
            const userResult = this.transformUser(user);
            return Promise.resolve(userResult);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}