import {BOOK_LIST_REQUEST,BOOK_LIST_SUCCESS,BOOK_LIST_FAIL,BOOK_DETAILS_FAIL,BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS, BOOK_DELETE_REQUEST, 
    BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL, BOOK_CREATE_REQUEST,
     BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL, BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, BOOK_ADD_REVIEW_REQUEST, BOOK_ADD_REVIEW_SUCCESS, BOOK_ADD_REVIEW_FAIL, BOOK_TOP_REQUEST, BOOK_TOP_SUCCESS, BOOK_TOP_FAIL} from '../Types/bookTypes'
import axios from 'axios'

export const listBooks=(keyword = '', pageNumber = '')=>async (dispatch)=>{


    // dispatch the request

    dispatch({type:BOOK_LIST_REQUEST})

    try {
        const {data}=await axios.get(`/api/books?keyword=${keyword}&pageNumber=${pageNumber}`)
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



export const deleteBook = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_DELETE_REQUEST,
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      await axios.delete(`/api/books/${id}`, config)
  
      dispatch({
        type: BOOK_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOK_DELETE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const addBook = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_CREATE_REQUEST
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/books`, {}, config)
  
      dispatch({
        type: BOOK_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_CREATE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
      })
    }
  }


  export const updateBook = (book) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/books/${book._id}`,
        book,
        config
      )
  
      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const addBookReview = (bookId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: BOOK_ADD_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      await axios.post(`/api/books/${bookId}/reviews`, review, config)
  
      dispatch({
        type: BOOK_ADD_REVIEW_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOK_ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const getTopBooks = () => async (dispatch) => {
    try {
      dispatch({ type: BOOK_TOP_REQUEST })
  
      const { data } = await axios.get(`/api/books/top`)
  
      dispatch({
        type: BOOK_TOP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }