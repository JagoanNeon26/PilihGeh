import axios from 'axios';
import authHeader from './auth-header';
import authHeaderFile from './auth-header-file';

const API_URL = process.env.NEXT_PUBLIC_ENV;

const addVoting = (data) =>
  axios
    .post(`${API_URL}/users/create-pemilihan`, data, { headers: authHeader() })
    .then((response) => response);

const getAdminVoting = () =>
  axios
    .get(`${API_URL}/users/get-kelola-pemilihan`, { headers: authHeader() })
    .then((response) => response);

const getAdminVotingById = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}`, { headers: authHeader() })
    .then((response) => response);

const addCandidate = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-kandidat`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const getCandidate = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-kandidat`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getCandidateById = (id, candidateNumber) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-kandidat/${candidateNumber}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const updateCandidate = (id, candidateNumber, data) =>
  axios
    .put(
      `${API_URL}/admin/pemilihan/${id}/edit-kandidat/${candidateNumber}`,
      data,
      { headers: authHeader() }
    )
    .then((response) => response);

const deleteCandidateById = (id, candidateNumber) =>
  axios
    .delete(
      `${API_URL}/admin/pemilihan/${id}/delete-kandidat/${candidateNumber}`,
      { headers: authHeader() }
    )
    .then((response) => response);

const addTimeline = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-timeline`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const getTimeline = (id, timezone) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-timeline`, {
      params: { timezone },
      headers: authHeader(),
    })
    .then((response) => response);

const updateTimeline = (id, data) =>
  axios
    .put(`${API_URL}/admin/pemilihan/${id}/update-timeline`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const deleteTimeline = (id) =>
  axios
    .delete(`${API_URL}/admin/pemilihan/${id}/delete-timeline`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getAllVoters = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-list`, {
      headers: authHeader(),
    })
    .then((response) => response);

const addVoters = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-user`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const deleteVoters = (id, id_pemilihan_user) =>
  axios
    .delete(
      `${API_URL}/admin/pemilihan/${id}/delete-user/${id_pemilihan_user}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => response);

const sendTokenVoters = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/send-token-all`, {
      headers: authHeader(),
    })
    .then((response) => response);

const joinVoters = (id, token) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/join/${token}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const sendTokenVotersById = (id, id_pemilihan_user) =>
  axios
    .get(
      `${API_URL}/admin/pemilihan/${id}/send-token-pemilihan/${id_pemilihan_user}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => response);

const addVotersByFile = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-user-excel`, data, {
      headers: authHeaderFile(),
    })
    .then((response) => response);

const getAllAdmin = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-list-admin`, {
      headers: authHeader(),
    })
    .then((response) => response);

const addAdmin = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-admin`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const deleteAdmin = (id, user_id) =>
  axios
    .delete(`${API_URL}/admin/pemilihan/${id}/delete-admin/${user_id}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getAdminById = (id, user_id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-list-admin/${user_id}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const addAdminByFile = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/add-admin-excel`, data, {
      headers: authHeaderFile(),
    })
    .then((response) => response);

const joinAdmin = (id, token) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/join-admin/${token}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const addCandidatePhoto = (id, data, no_kandidat) =>
  axios
    .put(
      `${API_URL}/admin/pemilihan/${id}/add-edit-photo-kandidat/${no_kandidat}`,
      data,
      {
        headers: authHeaderFile(),
      }
    )
    .then((response) => response);

const downloadVote = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/download-data`, {
      headers: authHeader(),
      responseType: 'arraybuffer', // Ensure the response type is set to arraybuffer
    })
    .then((response) => response);

const editVoting = (id, data) =>
  axios
    .post(`${API_URL}/admin/pemilihan/${id}/change-title`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const setEmergency = (id, data) =>
  axios
    .put(`${API_URL}/admin/pemilihan/${id}/set-emergency`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const setStop = (id, data) =>
  axios
    .put(`${API_URL}/admin/pemilihan/${id}/set-stop`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const resetVote = (id) =>
  axios
    .delete(`${API_URL}/admin/pemilihan/${id}/delete-all-votes`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getVoting = () =>
  axios
    .get(`${API_URL}/users/get-pemilihan`, { headers: authHeader() })
    .then((response) => response);

const getVotingById = (id) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}`, { headers: authHeader() })
    .then((response) => response);

const checkVoteAvalaibility = (id) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/check-vote-available`, {
      headers: authHeader(),
    })
    .then((response) => response);

const addVote = (id, no_kandidat, data) =>
  axios
    .post(`${API_URL}/users/pemilihan/${id}/add-vote/${no_kandidat}`, data, {
      headers: authHeaderFile(),
    })
    .then((response) => response);

const count = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/count`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getVote = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-vote`, { headers: authHeader() })
    .then((response) => response);

const getPendingVote = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/pending-vote`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getVerifiedVote = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/verified-vote`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getInvalidVote = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/invalid-vote`, {
      headers: authHeader(),
    })
    .then((response) => response);

const verifyVote = (id, data) =>
  axios
    .put(`${API_URL}/admin/pemilihan/${id}/verify-vote`, data, {
      headers: authHeader(),
    })
    .then((response) => response);

const getCandidateUsers = (id) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/get-kandidat`, {
      headers: authHeader(),
    })
    .then((response) => response);

const getTimelineUsers = (id, timezone) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/get-timeline`, {
      params: { timezone },
      headers: authHeader(),
    })
    .then((response) => response);

const countUsers = (id) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/count`, {
      headers: authHeader(),
    })
    .then((response) => response);

const verifyVoteUsers = (id, token) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/verify-vote/${token}`, {
      headers: authHeader(),
    })
    .then((response) => response);

const resendVerifyVoteUsers = (id) =>
  axios
    .get(`${API_URL}/users/pemilihan/${id}/resend-token-verify-vote`, {
      headers: authHeader(),
    })
    .then((response) => response);

const votingServices = {
  addVoting,
  getAdminVoting,
  getAdminVotingById,
  addCandidate,
  getCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidateById,
  addTimeline,
  getTimeline,
  updateTimeline,
  deleteTimeline,
  getAllVoters,
  addVoters,
  deleteVoters,
  sendTokenVoters,
  joinVoters,
  sendTokenVotersById,
  addVotersByFile,
  getAllAdmin,
  addAdmin,
  deleteAdmin,
  getAdminById,
  addAdminByFile,
  joinAdmin,
  addCandidatePhoto,
  editVoting,
  downloadVote,
  setEmergency,
  setStop,
  resetVote,
  getVoting,
  getVotingById,
  addVote,
  count,
  getVote,
  getPendingVote,
  getVerifiedVote,
  getInvalidVote,
  verifyVote,
  getCandidateUsers,
  getTimelineUsers,
  countUsers,
  checkVoteAvalaibility,
  verifyVoteUsers,
  resendVerifyVoteUsers,
};
export default votingServices;
