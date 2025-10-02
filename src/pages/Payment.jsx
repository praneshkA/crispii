import React, { useState } from "react";
import { CheckCircle, Upload, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import qrcode from "../assets/qrcode.jpg";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, cartItems, totalAmount } = location.state || {};

  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if no data
  React.useEffect(() => {
    if (!formData || !cartItems) {
      alert("No order data found. Please complete checkout first.");
      navigate("/checkout");
    }
  }, [formData, cartItems, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a payment screenshot first");
      return;
    }

    setLoading(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Get userId from localStorage (if you have auth)
        const userId = localStorage.getItem("userId") || "guest";

        // Prepare order data
        const orderData = {
          userId,
          customerDetails: formData,
          items: cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            selectedQuantity: item.selectedQuantity,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount,
          paymentScreenshot: base64Image,
        };

        // Send to backend
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (data.success) {
          setOrderId(data.orderId);
          setUploaded(true);
          
          // Optional: Clear cart after successful order
          // You can call your cart clear API here
        } else {
          alert(data.message || "Failed to create order");
        }
      };

      reader.onerror = () => {
        alert("Failed to read file");
        setLoading(false);
      };
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (uploaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Received!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-700 font-semibold">
              Order ID: {orderId}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Shipping Address:</strong><br />
              {formData?.firstName} {formData?.lastName}<br />
              {formData?.address}<br />
              {formData?.apartment && `${formData.apartment}, `}
              {formData?.city}, {formData?.state} - {formData?.pincode}<br />
              Phone: {formData?.phone}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600">
            Scan the QR code below and upload your payment screenshot
          </p>
          <p className="text-xl font-bold text-gray-800 mt-3">
            Total Amount: ₹{totalAmount?.toFixed(2)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-9">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-50 p-4 rounded-xl border-4 border-gray-200">
              <img
                src={qrcode}
                alt="Payment QR Code"
                style={{ width: "600px", height: "300px" }}
                className="object-contain"
              />
            </div>
            <div className="mt-5 text-center">
              <p className="text-sm font-semibold text-gray-700">UPI ID:praneshalagesan@okicici</p>
              <p className="text-xs text-gray-500 mt-6">
                Use any UPI app to complete payment
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col justify-center">
            <label className="block mb-4">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">
                Upload Payment Screenshot
              </span>
              
              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative border-2 border-blue-400 rounded-xl p-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveFile}
                    className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </label>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition ${
                file && !loading
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit Payment Proof"}
            </button>

            <p className="text-xs text-green-500 text-center mt-4">
              Your payment will be verified within 2 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;