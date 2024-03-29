import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL, USER_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_UPDATE_PROFILE_RESET, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL, GET_RESET_PASSWORD_TOKEN_REQUEST, GET_RESET_PASSWORD_TOKEN_SUCCESS, GET_RESET_PASSWORD_TOKEN_FAIL, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_FAIL} from '../Types/userTypes'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, user: action.payload }
      case USER_LOGIN_FAIL:
        console.log(action);  
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false,success:true }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {} 
    default:
      return state
  }
}

export const userProfileReducer = (state = {userInfo:{}}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state,loading: true }
    case USER_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_PROFILE_RESET:
      return {userInfo:{}}
    default:
      return state
  }
}


export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true ,}
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, updatedUser: action.payload,updated:true }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload,success:false }
    case USER_UPDATE_PROFILE_RESET:
        return {}
    default:
      return state
  }
}


export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}



export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {}
      }
    default:
      return state
  }
}


export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return { loading: true }
    case FORGET_PASSWORD_SUCCESS:
      console.log(action.payload)
      return { loading: false,msg:action.payload.msg, success: true }
    case FORGET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const getResetPasswordTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RESET_PASSWORD_TOKEN_REQUEST:
      return { loading: true }
    case GET_RESET_PASSWORD_TOKEN_SUCCESS:
      return { loading: false,user:action.payload }
    case GET_RESET_PASSWORD_TOKEN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return { loading: true }
    case PASSWORD_RESET_SUCCESS:
      console.log(action.payload)
      return { loading: false,msg:action.payload.message }
    case PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true }
    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
