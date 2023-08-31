import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NEXT_PUBLIC_ENV;

const getUser = () =>
  axios
    .get(`${API_URL}/users/get-profile`, { headers: authHeader() })
    .then((response) => response);

const editProfile = (data) =>
  axios.patch(`${API_URL}/users/edit-profile`, data, {
    headers: authHeader(),
  });

const verifEditProfile = async (data, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/users/edit-profile/verify/${token}`,
      data,
      { headers: authHeader() }
    );
    localStorage.setItem('auth-token', response.data.logToken);
    return response;
  } catch (error) {
    throw error;
  }
};

const UserService = {
  getUser,
  editProfile,
  verifEditProfile,
};
export default UserService;
