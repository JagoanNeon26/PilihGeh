import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NEXT_PUBLIC_ENV;

const register = (data) =>
  axios.post(`${API_URL}/users/register-no-device`, data).then((response) => {
    if (response.data) {
      localStorage.setItem('auth-token', response.data.token);
    }
    return response;
  });

const login = (data) =>
  axios.post(`${API_URL}/users/login-no-device`, data).then((response) => {
    if (response.data) {
      localStorage.setItem('auth-token', response.data.token);
    }
    return response;
  });

const verifyOtp = (data) =>
  axios
    .post(`${API_URL}/users/verify-otp`, data, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('auth-token', response.data.logToken);
      }
      return response;
    });

const logout = () => {
  localStorage.removeItem('auth-token');
};

const AuthService = {
  register,
  login,
  verifyOtp,
  logout,
};
export default AuthService;
