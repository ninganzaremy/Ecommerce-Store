import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createOrder,
  detailsOrder,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import PaypalButton from "../payComponents/PaypalButton";
import LoadingBox from "../payComponents/LoadingBox";
import ErrorBox from "../payComponents/ErrorBox";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

function OrderPage(props) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const orderPay = useSelector((state) => state.orderPay);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/profile";
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {};
  }, [dispatch, successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const handleDeliverOrder = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <ErrorBox message={error} />
  ) : (
    <div>
      <div className="back-to-result button">
        <Link to={redirect}> <i className="far fa-backward"></i> Back to list</Link>
        <br />
      </div>

      <div className="placeorder">
        <div className="placeorder-info">
        <h3>Order-id: {order._id}</h3>
          <div>
            <h3>Shipping Address:</h3>
            <div>
              {order.shipping.address}, {order.shipping.city},{" "}
              {order.shipping.country}, {order.shipping.postalCode}
            </div>
            <h3>
              Delivery Status:{" "}
              {order.isDelivered
                ? `Delivered At ${order.deliveredAt}`
                : "Not Delivered"}
            </h3>
          </div>
          <div>
            <h3>Payment Method</h3>

            <div>{order.payment.paymentMethod}</div>
            <h3>
              Payment Status:
              {order.isPaid ? `Paid At ${order.paidAt}` : "Not Paid"}
            </h3>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Order Items</h3>
                <div>Price</div>
              </li>
              {order.orderItems.map((item) => (
                <li key={item._id}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.product}>{item.name}</Link>
                    </div>
                    <div>Qty: {item.qty}</div>
                  </div>
                  <div className="cart-price">${item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {!order.isPaid && (
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </li>
            <h3>Order Summary</h3>

            <li>
              <div>Items:</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>${order.shippingPrice ? `${order.shippingPrice}` : "0"}</div>
            </li>
            <li>
              <div>Tax:</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total:</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
