import axios from "axios";

const API = axios.create({
  baseURL: "https://sports-event-server.onrender.com/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).data.token
    }`;
  }
  return req;
});

export const signIn = (FormData) => API.post("/user/login", FormData);
export const signUp = (FormData) => API.post("/user/register", FormData);

export const createEvent = (FormData) => API.post("/event/", FormData);
export const getEvents = (page) => API.get(`/event?page=${page}`);
export const getEvent = (id) => API.get(`/event/${id}`);
export const deleteEvent = (id) => API.delete(`/event/${id}`);
export const updateEvent = (id, updatedData) => {
  console.log(id, updatedData);
  return API.post(`/event/${id}`, updatedData);
};
export const getEventsByUser = (userId) =>
  API.get(`/event/userEvents/${userId}`);
export const updateUser = (id, userId) => {
  console.log(id, userId);
  return API.post(`/user/updateUser/${userId}`, { id });
};
export const getEventsBySearch = (searchQuery) =>
  API.get(`/event/search?searchQuery=${searchQuery}`);
export const getEventsByTag = (tag) => API.get(`/event/tag/${tag}`);
export const getRelatedEvents = (tags) => API.post(`/event/realedEvents`, tags);
export const likeEvent = (id) => API.patch(`/event/like/${id}`);
