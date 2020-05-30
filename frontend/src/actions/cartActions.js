import Axios from "axios"
import {CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


const addToCart =(productId, qty) => async (dispatch) =>{
    try {
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type:CART_ADD_ITEM, payload: {
            product: data._id,
            image:data.image,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }})
    } catch (error) {

    }
}

const removeFromCart =(productId) => (dispacth) => {
    dispacth ({ type: CART_REMOVE_ITEM, payload: productId})
}
export {addToCart, removeFromCart}
