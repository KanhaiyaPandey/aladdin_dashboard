/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRazorpay } from 'react-razorpay';
import { userFetch } from '../../utils/Helpers';
import { RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
    

const NavigationHead = ({ handleSaveProduct, activePage }) => {

  const { error, isLoading, Razorpay } = useRazorpay();

  const [sendData, setSendData] = useState(
  
{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "pincode": "10001",
    "email": "john@example.com",
    "phoneNumber": "1234567890"
  },
  "items": [
    {
      "productId": "prod001",
      "variantId": "var001",
      "attributes": ["Color", "Size"],
      "options": ["Red", "M"],
      "media": "https://example.com/image.jpg",
      "quantity": 2,
      "priceSnapshot": 299.99
    }
  ],
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "paymentMode": "RAZORPAY",
  "shippingCharges": "20",
  "extraCharges": "10",
  "discountAmount": "30",
  "grandTotal": "599.98",
  "gatewayDiscount": 15.00
}

)

 const [shipdata, setShipdata] = useState(
  {
  "order_id": "224-4473423424",
  "order_date": "2019-07-24 11:11",
  "pickup_location": "Jammu",
  "comment": "Reseller: M/s Goku",
  "billing_customer_name": "Naruto",
  "billing_last_name": "Uzumaki",
  "billing_address": "House 221B, Leaf Village",
  "billing_address_2": "Near Hokage House",
  "billing_city": "New Delhi",
  "billing_pincode": 110002,
  "billing_state": "Delhi",
  "billing_country": "India",
  "billing_email": "naruto@uzumaki.com",
  "billing_phone": 9876543210,
  "shipping_is_billing": true,
  "shipping_customer_name": "",
  "shipping_last_name": "",
  "shipping_address": "",
  "shipping_address_2": "",
  "shipping_city": "",
  "shipping_pincode":"",
  "shipping_country": "",
  "shipping_state": "",
  "shipping_email": "",
  "shipping_phone": "",
  "order_items": [
    {
      "name": "Kunai",
      "sku": "chakra123",
      "units": 10,
      "selling_price": 900,
      "discount": "",
      "tax": "",
      "hsn": 441122
    }
  ],
  "payment_method": "Prepaid",
  "shipping_charges": 0,
  "giftwrap_charges": 0,
  "transaction_charges": 0,
  "total_discount": 0,
  "sub_total": 9000,
  "length": 10,
  "breadth": 15,
  "height": 20,
  "weight": 2.5
}
 )

const handleOrder = async () => {
  try {
    const userId = "681f628d42bdb65f27292c9b"; // Replace with actual userId (from auth/session/context)
    const response = await userFetch.post(
      `create-order`,
      sendData,
    );
    if (response.data.success) {
      toast.success(response.data.message)
    }
  } catch (error) {
    console.error("Order creation failed:", error.response?.data || error.message);
  }
};


  const handlePay = async () => {
    try {
      // Call your backend to create Razorpay order
      const res = await fetch('http://localhost:8080/api/public/payments/create-order?amount=500&currency=INR', {
        method: 'POST',
      });

      const data = await res.json();

      if (!data || !data.order || !data.order.id) {
        alert("Failed to initialize payment.");
        return;
      }

      const options = {
        key: 'rzp_test_I7vbeMg5LyZmbm', 
        amount: data.order.amount, 
        currency: data.order.currency,
        name: "Aladdin Store",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: function (response) {
          console.log(response);   
           toast.success(response.message)
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9304738536"
        },
        notes: {
          address: "Aladdin HQ"
        },
        theme: {
          color: "#6366f1"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Error while initiating payment");
    }
  };

const handleShipping = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/public/shipping/create-shipping", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shipdata)
    });

    const data = await res.json(); // to parse the response
    console.log(data);
  } catch (error) {
    console.error("Shipping request failed:", error);
  }
};


  return (
    <div className="w-full mx-auto px-10 py-4 flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <Link to="/all-product" className='btn' title='back'><RollbackOutlined /></Link>
        <span className="text-xl font-semibold capitalize">{activePage}</span>
      </div>
      <div className="flex gap-3">
        <button className="btn btn-outline hover:bg-gray-200 hover:text-slate-800">
          Save As Draft
        </button>
        <button className="btn btn-neutral" onClick={() => handleSaveProduct()}>
          Save
        </button>
        {/* <button className="btn btn-neutral" onClick={handlePay}>
          Pay
        </button>

               <button className="btn btn-neutral" onClick={handleOrder}>
          order
        </button>

      <button className="btn btn-neutral" onClick={handleShipping}>
          shipping
        </button> */}

      </div>
    </div>
  );
};

export default NavigationHead;
