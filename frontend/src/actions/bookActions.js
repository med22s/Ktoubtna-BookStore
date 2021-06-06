import {BOOK_LIST_REQUEST,BOOK_LIST_SUCCESS,BOOK_LIST_FAIL,BOOK_DETAILS_FAIL,BOOK_DETAILS_REQUEST,BOOK_DETAILS_SUCCESS} from '../Types/bookTypes'
import axios from 'axios'

export const listBooks=()=>async (dispatch)=>{


    // dispatch the request

    dispatch({type:BOOK_LIST_REQUEST})

    try {
        const {data}=await axios.get('/api/books')
        dispatch({type:BOOK_LIST_SUCCESS,payload:data})
    } catch (error) {

        dispatch({
            type:BOOK_LIST_FAIL,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.message
        })

        
    }



}



export const bookDetails=(id)=>async (dispatch)=>{


    dispatch({type:BOOK_DETAILS_REQUEST})

    try {
        const {data}=await axios.get(`/api/books/${id}`)
        dispatch({type:BOOK_DETAILS_SUCCESS,payload:data})
    } catch (error) {

        dispatch({
            type:BOOK_DETAILS_FAIL,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.message
        })

    }

}