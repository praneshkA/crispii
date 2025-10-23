import React, { useState, useEffect } from "react";
import { CheckCircle, Upload, X, Smartphone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { BASE_API_URL } from "../config";


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, cartItems, subtotal, deliveryFee, totalAmount } = location.state || {};

  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const UPI_ID = "praneshalagesan@oksbi";
  const MERCHANT_NAME = "Pranesh";

  // Generate UPI string
  const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${totalAmount || 0}&cu=INR`;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirect if no data
  useEffect(() => {
    if (!formData || !cartItems) {
      alert("No order data found. Please complete checkout first.");
      navigate("/checkout");
    }
  }, [formData, cartItems, navigate]);

  // Require authentication before placing an order
  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId') || 'guest';
    if (!authToken || userId === 'guest') {
      navigate('/login', { state: { from: '/payment', returnState: { formData, cartItems, subtotal, deliveryFee, totalAmount } } });
    }
  }, [formData, cartItems, subtotal, deliveryFee, totalAmount, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please upload a valid image file (JPG, PNG, GIF, WEBP)');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

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

  const handleUpiDeepLink = () => {
    window.location.href = upiString;
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a payment screenshot first");
      return;
    }

    setLoading(true);

    try {
      const formDataObj = new FormData();
      const userId = sessionStorage.getItem("userId") || "guest";
      formDataObj.append('userId', userId);
      formDataObj.append('customerDetails', JSON.stringify(formData));

      const items = cartItems.map(item => ({
        productId: item._id || item.productId,
        name: item.name,
        image: item.image,
        selectedQuantity: item.selectedQuantity,
        price: item.price,
        quantity: item.quantity,
      }));
      formDataObj.append('items', JSON.stringify(items));
      formDataObj.append('totalAmount', totalAmount);
      formDataObj.append('paymentScreenshot', file);

      const response = await fetch(`${BASE_API_URL}/api/orders`, {
        method: "POST",
        body: formDataObj,
      });

      const orderResp = await response.json();

      if (orderResp.success) {
        setOrderId(orderResp.orderId);
        setUploaded(true);
        
        const myOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
        myOrders.push(orderResp.orderId);
        localStorage.setItem('myOrders', JSON.stringify(myOrders));
        localStorage.removeItem('cart');
      } else {
        alert(orderResp.message || "Failed to create order");
      }
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

  // Mobile View
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Complete Payment
            </h1>
            
            {/* Amount Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4 text-sm">
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Subtotal</span>
                <span>₹{subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Delivery Fee</span>
                <span>{deliveryFee > 0 ? `₹${deliveryFee?.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-600 border-t pt-2">
                <span>Total Amount</span>
                <span>₹{totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* UPI Payment Section */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center mb-4">
              <Smartphone className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Pay via UPI</h3>
              <p className="text-sm opacity-90 mb-4">Click below to open your UPI app</p>
              <button
                onClick={handleUpiDeepLink}
                className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold w-full hover:bg-gray-100 transition shadow-lg"
              >
                Open UPI App
              </button>
            </div>

            {/* QR Code */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-3">Or scan this QR code</p>
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block">
                <QRCode
                  value={upiString}
                  size={192}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">UPI ID: {UPI_ID}</p>
            </div>
          </div>

          {/* Upload Screenshot Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Payment Proof</h3>
            
            {!preview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload-mobile"
                />
                <label htmlFor="file-upload-mobile" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Tap to upload screenshot
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative border-2 border-blue-400 rounded-xl p-2 mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`w-full mt-4 py-3 px-6 rounded-xl font-semibold transition ${
                file && !loading
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit Payment Proof"}
            </button>

            <p className="text-xs text-green-500 text-center mt-3">
              Payment verified within 2 hours
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop View with Generated QR Code
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
          
          {/* Amount Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4 inline-block min-w-[300px]">
            <div className="flex justify-between text-gray-600 mb-2">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm font-semibold">₹{subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-3">
              <span className="text-sm">Delivery Fee</span>
              <span className="text-sm font-semibold">
                {deliveryFee > 0 ? `₹${deliveryFee?.toFixed(2)}` : 'Free'}
              </span>
            </div>
            <div className="flex justify-between font-bold text-blue-600 border-t pt-3">
              <span>Total Amount</span>
              <span className="text-xl">₹{totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-9">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-xl border-4 border-gray-200">
              <QRCode
                value={upiString}
                size={256}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
            <div className="mt-5 text-center">
              <p className="text-sm font-semibold text-gray-700">UPI ID: {UPI_ID}</p>
              <p className="text-xs text-gray-500 mt-2">
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
                      PNG, JPG up to 5MB
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