import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PaypalCheckoutButton = (props) => {
  const navigate = useNavigate();
  const { product, onDone } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    navigate("/thanks");
    onDone();
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError("You already Paid");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
