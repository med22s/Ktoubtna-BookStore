import {BOOK_LIST_REQUEST,BOOK_LIST_SUCCESS,BOOK_LIST_FAIL
    ,BOOK_DETAILS_FAIL,BOOK_DETAILS_REQUEST,BOOK_DETAILS_SUCCESS, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL, BOOK_CREATE_RESET, BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, BOOK_UPDATE_RESET, BOOK_ADD_REVIEW_REQUEST, BOOK_ADD_REVIEW_SUCCESS, BOOK_ADD_REVIEW_FAIL, BOOK_ADD_REVIEW_RESET, BOOK_TOP_REQUEST, BOOK_TOP_SUCCESS, BOOK_TOP_FAIL, BOOK_DETAILS_RESET} from '../Types/bookTypes'


export const bookListReducer=(state={books:[]},action)=>{

    switch(action.type){
        case BOOK_LIST_REQUEST:
            return {books:[],loading:true}
        case BOOK_LIST_SUCCESS:
            return {...state,loading:false,books: action.payload.books,
              pages: action.payload.pages,
              page: action.payload.page,}
        case BOOK_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}


export const bookDetailsReducer=(state={book:{reviews:[]}},action)=>{

    switch(action.type){
        case BOOK_DETAILS_REQUEST:
            return {books:[],loading:true}
        case BOOK_DETAILS_SUCCESS:
            return {...state,loading:false,book:action.payload}
        case BOOK_DETAILS_FAIL:
            return {...state,loading:false,error:action.payload}
        case BOOK_DETAILS_RESET:
            return {}
        default:
            return state
    }
}


export const bookDeleteReducer=(state={},action)=>{
    switch(action.type){
        case BOOK_DELETE_REQUEST:
            return {loading:true}
        case BOOK_DELETE_SUCCESS:
            return {loading:false,success:true}
        case BOOK_DELETE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state

    }

}



export const bookCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_CREATE_REQUEST:
        return { loading: true }
      case BOOK_CREATE_SUCCESS:
        return { loading: false, success: true, book: action.payload }
      case BOOK_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case BOOK_CREATE_RESET:
        return {}
      default:
        return state
    }
  }


  export const bookUpdateReducer = (state = { book: {} }, action) => {
    switch (action.type) {
      case BOOK_UPDATE_REQUEST:
        return { loading: true }
      case BOOK_UPDATE_SUCCESS:
        return { loading: false, success: true, book: action.payload }
      case BOOK_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case BOOK_UPDATE_RESET:
        return { book: {} }
      default:
        return state
    }
  }

  export const bookAddReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_ADD_REVIEW_REQUEST:
        return { loading: true }
      case BOOK_ADD_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case BOOK_ADD_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case BOOK_ADD_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }


  export const bookTopRatedReducer = (state = { books: [] }, action) => {
    switch (action.type) {
      case BOOK_TOP_REQUEST:
        return { loading: true, books: [] }
      case BOOK_TOP_SUCCESS:
        return { loading: false, books: action.payload }
      case BOOK_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }