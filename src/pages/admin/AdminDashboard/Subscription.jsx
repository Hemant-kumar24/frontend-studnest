import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const plan = {
  name: "Premium",
  price: "₹4999/only (Lifetime)",
  features: ["Lifetime Premium Access with All Features"],
  color: "purple",
};

const Subscription = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true); // start loading
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/order",
        { amount: 4999 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "StudNest Subscription",
        description: "Lifetime Premium Subscription",
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Subscription activated!");
            setTimeout(() => {
              window.location.href = "/admin/upload";
            }, 1500);
          } catch (error) {
            toast.error("Verification failed");
          } finally {
            setLoading(false);
          }
        },
        theme: {
          color: "#8B5CF6",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Error starting payment");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upgrade to Premium
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl shadow-xl border-2 border-${plan.color}-300 bg-white p-8 flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300`}
        >
          <div className="text-center">
            <div className={`text-${plan.color}-600 text-6xl mb-3`}>
              <FaCrown />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">{plan.name}</h2>
            <p className="text-3xl font-bold mt-3">{plan.price}</p>
          </div>

          <ul className="mt-6 space-y-4 text-base text-gray-600">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            className={`mt-10 w-full py-3 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-105"
            }`}
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
