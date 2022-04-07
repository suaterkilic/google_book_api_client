import axios from "axios";

let __BASE_URL        = 'http://localhost:5000';
let __API_URL         = null;

let config = {
  headers: {
    Authorization: `Bearer ${ sessionStorage.getItem('token') || null }`
  }
}

export default {

  post: async (params) => {
    try {
  
      __API_URL = __BASE_URL + '/' + params.endpoint

      if(params.type === 'auth') config = {}

      return await axios.post(__API_URL, params.data, config)

    } catch (error) {
      return error
    }
  },
  delete: async (params) => {
    try {
  
      __API_URL = __BASE_URL + '/' + params.endpoint

      return await axios.delete(__API_URL, params.data, config)

    } catch (error) {
      return error
    }
  },
  get: async (params) => {
    try {
  
      __API_URL = __BASE_URL + '/' + params.endpoint

      return await axios.get(__API_URL)

    } catch (error) {
      return error
    }
  },
  googleBookFetch: async (params) => {
    
    try {

    let __GOOGLE_API_URL  = `https://www.googleapis.com/books/v1/volumes?q=${params.endpoint}`;

      return await axios.get(__GOOGLE_API_URL)

    } catch (error) {
      return error
    }
  },

  fetchSavedBookMark: async (params) => {
    
    try {

    let __GOOGLE_API_URL  = `https://www.googleapis.com/books/v1/volumes/${params.endpoint}`;

      return await axios.get(__GOOGLE_API_URL)

    } catch (error) {
      return error
    }
  },

};
