/* eslint-disable react/prop-types */

import toast from 'react-hot-toast';
import { useRazorpay } from 'react-razorpay';
    

const NavigationHead = ({ handleSaveProduct }) => {

  const { error, isLoading, Razorpay } = useRazorpay();

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

  return (
    <div className="w-5/6 mx-auto bg-white px-10 py-4 flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="text-xl font-semibold">Add Product</span>
      </div>
      <div className="flex gap-3">
        <button className="btn btn-outline hover:bg-gray-200 hover:text-slate-800">
          Save As Draft
        </button>
        <button className="btn btn-neutral" onClick={() => handleSaveProduct()}>
          Save
        </button>
        <button className="btn btn-neutral" onClick={handlePay}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default NavigationHead;
