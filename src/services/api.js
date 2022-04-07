import base from "./base";

export default {
  post: async (params) => {
    let result;

    try {
      result = await base.post(params);
    } catch (error) {
      result = error;
    }

    return result;
  },
  delete: async (params) => {
    let result;

    try {
      result = await base.delete(params);
    } catch (error) {
      result = error;
    }

    return result;
  },
  get: async (params) => {
    let result;

    try {
      result = await base.get(params);
    } catch (error) {
      result = error;
    }

    return result;
  },
  googleBookFetch: async (params) => {
    let result;

    try {
      result = await base.googleBookFetch(params);
    } catch (error) {
      result = error;
    }

    return result;
  },
  fetchSavedBookMark: async (params) => {
    let result;

    try {
      result = await base.fetchSavedBookMark(params);
    } catch (error) {
      result = error;
    }

    return result;
  }
};
