import {BOOK_LIST_REQUEST,BOOK_LIST_SUCCESS,BOOK_LIST_FAIL
    ,BOOK_DETAILS_FAIL,BOOK_DETAILS_REQUEST,BOOK_DETAILS_SUCCESS} from '../Types/bookTypes'


export const bookListReducer=(state={books:[]},action)=>{

    switch(action.type){
        case BOOK_LIST_REQUEST:
            return {books:[],loading:true}
        case BOOK_LIST_SUCCESS:
            return {...state,loading:false,books:action.payload}
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
        default:
            return state
    }
}






