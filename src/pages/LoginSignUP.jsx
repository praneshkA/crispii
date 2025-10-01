import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { BASE_API_URL } from '../config';

const LoginSignup = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!isLogin && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (serverError) {
      setServerError('');
    }
  };

  // router navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');

    const endpoint = isLogin ? '/api/login' : '/api/signup';
  const url = `${BASE_API_URL}${endpoint}`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
        let data = null;
        // Try to parse JSON, but if server returns HTML/text (500 page), show that instead
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          // Surface server HTML/text to the user (trimmed)
          setServerError(text.substring(0, 200));
          setIsLoading(false);
          return;
        }

        if (response.ok && data && data.success) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('userId', data.userId);
        // Notify parent (App) about successful auth
        if (onAuthSuccess) onAuthSuccess({ token: data.token, userId: data.userId });
        console.log(`${isLogin ? 'Login' : 'Signup'} successful! Redirecting...`);
        alert(`Success! You are now ${isLogin ? 'logged in' : 'signed up'}.`);
        // Redirect to home
        navigate('/');
      } else {
          setServerError((data && data.message) || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
        setServerError(error.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br white rounded-3xl px-6 py-12 flex items-center justify-center sm:px-4 lg:px-">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-violet-200 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-white/90 p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black/85 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-black/80 text-xs sm:text-sm">
              {isLogin ? 'Login to continue' : 'Sign up to get started'}
            </p>
          </div>

          {serverError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black-200 flex-shrink-0 mt-0.5" />
              <span className="text-red-100 text-xs sm:text-sm">{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/80 pointer-events-none" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className={`w-full bg-white/90 border ${
                      errors.username ? 'border-red-400' : 'border-white/90'
                    } rounded-lg py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 sm:pr-4 text-sm sm:text-base text-black placeholder-black/80 focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-300 text-xs mt-1 ml-1">{errors.username}</p>
                )}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/80 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={`w-full bg-white/90 border ${
                    errors.email ? 'border-red-400' : 'border-black/80'
                  } rounded-lg py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 sm:pr-4 text-sm sm:text-base text-black placeholder-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-black/90 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full bg-white/80 border ${
                    errors.password ? 'border-red-400' : 'border-white/20'
                  } rounded-lg py-2.5 sm:py-3 pl-9 sm:pl-10 pr-10 sm:pr-12 text-sm sm:text-base text-black placeholder-black/80 focus:outline-none focus:ring-2 focus:ring-black/90 focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/80 hover:text-white transition-colors touch-manipulation"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-purple-400 font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 touch-manipulation"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? 'Login' : 'Sign Up'}</span>
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-blue-900 hover:text-black text-m sm:text-sm font-medium underline decoration-1 underline-offset-2 transition-colors touch-manipulation"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>

        <p className="text-black/80 text-xs text-center mt-4 px-4">
          🔒 Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;