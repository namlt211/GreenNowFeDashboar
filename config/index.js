// const SERVER_API = "http://localhost:1234";

const SERVER_API = "https://greenow12.herokuapp.com";

const GET_ALL_MANUFACTURE_API = SERVER_API + "/get-all-manufacture";
const LOGIN_API = SERVER_API + "/login";
const LOGOUT_API = SERVER_API + "/logout";
const GET_ALL_CATEGORY_FOR_PRODUCT_API =
  SERVER_API + "/get-all-category-for-product";
const ADD_PRODUCT_API = SERVER_API + "/add-product";
const GET_ALL_PRODUCT_API = SERVER_API + "/get-all-product";
const GET_ALL_CATEGORY_API = SERVER_API + "/get-all-category";
const GET_ALL_STATUS_MANUFACTURE_API = SERVER_API + "/get-all-status";
const GET_PRODUCT_BY_CATEGORYID_API =
  SERVER_API + "/get-product-by-category/${categoryid}";
const GET_MANUFACTURE_BY_STATUSID_API =
  SERVER_API + "/get-manufacture-by-statusid/${statusid}";
const ADD_CATEGORY_API = SERVER_API + "/add-category";
const DELETE_CATEGORY_API = SERVER_API + "/delete-category/${id}";
const GET_CATEGORY_BY_ID_API = SERVER_API + "/get-category-by-id/${id}";
const UPDATE_CATEGORY_API = SERVER_API + "/update-category/${id}";
const SEARCH_CATEGORY_BY_SEARCHKEY_API = SERVER_API + "/search-category/${key}";
const DELETE_PRODUCT_BY_ID_API = SERVER_API + "/delete-product-by-id/${id}";
const SEARCH_PRODUCT_BY_NAME = SERVER_API + "/search-product/${key}";
const UPDATE_PRODUCT_API = SERVER_API + "/update-product/${id}";
const GET_PRODUCT_BY_ID_API = SERVER_API + "/find-product-by-id/${id}";
const ADD_MANUFACTURE_API = SERVER_API + "/add-manufacture";
const GET_ALL_STATUS_API = SERVER_API + "/all-status";
const DELETE_MANUFACTURE_BY_ID = SERVER_API + "/delete-by-id/${id}";
const UPDATE_MANUFACTURE_BY_ID = SERVER_API + "/update-by-id/${id}";
const GET_MANUFACTURE_BY_ID = SERVER_API + "/get-by-id/${id}";
const FIND_MANUFACTURE_BY_NAME = SERVER_API + "/find-by-name/${name}";

export {
  GET_ALL_MANUFACTURE_API,
  LOGIN_API,
  LOGOUT_API,
  GET_ALL_CATEGORY_FOR_PRODUCT_API,
  ADD_PRODUCT_API,
  GET_ALL_PRODUCT_API,
  GET_ALL_CATEGORY_API,
  GET_ALL_STATUS_MANUFACTURE_API,
  GET_PRODUCT_BY_CATEGORYID_API,
  GET_MANUFACTURE_BY_STATUSID_API,
  ADD_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_CATEGORY_BY_ID_API,
  UPDATE_CATEGORY_API,
  SEARCH_CATEGORY_BY_SEARCHKEY_API,
  DELETE_PRODUCT_BY_ID_API,
  SEARCH_PRODUCT_BY_NAME,
  UPDATE_PRODUCT_API,
  GET_PRODUCT_BY_ID_API,
  ADD_MANUFACTURE_API,
  GET_ALL_STATUS_API,
  DELETE_MANUFACTURE_BY_ID,
  UPDATE_MANUFACTURE_BY_ID,
  GET_MANUFACTURE_BY_ID,
  FIND_MANUFACTURE_BY_NAME,
};
