import axios from 'axios';
import authHeader from './auth-header';

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

const getTimeline = (id) =>
  axios
    .get(`${API_URL}/admin/pemilihan/${id}/get-timeline`, {
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
};
export default votingServices;
