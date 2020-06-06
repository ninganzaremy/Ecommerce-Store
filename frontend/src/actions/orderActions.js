import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
} from "../constants/orderConstants";
import { getErrorMessage } from "../util";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: " Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/mine", {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders", {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/" + order._id + "/pay",
      paymentResult,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete("/api/orders/" + orderId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};
const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: {} });
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data: paidOrder } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: paidOrder });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: getErrorMessage(error) });
  }
};
const updateOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: order });
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data: updatedOrder } = await axios.put(
      `/api/orders/${order._id}`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: updatedOrder });
  } catch (error) {
    dispatch({ type: ORDER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};
export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  listOrders,
  deleteOrder,
  deliverOrder,
  updateOrder,
};
