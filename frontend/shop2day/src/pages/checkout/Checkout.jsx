import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Checkout.scss";
import success from "../../Images/success.gif"

const CheckoutSuccess = () => {
    const navigate = useNavigate(); // Get the navigate function from React Router

    useEffect(() => {
      // Set a timeout to navigate after one minute (60,000 milliseconds)
      const timeoutId = setTimeout(() => {
        navigate('/'); // Navigate to the home page
      }, 10000);
  
      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }, [navigate]);
  return (
    <div className="checkout">
        <img src={success} alt="" />
    <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>shop2day@onlineshop.com</strong>
      </p>
    </div>
  

  );
};

export default CheckoutSuccess;
