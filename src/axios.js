import axios from "axios";

const instance = axios.create({
  baseURL: "https://zellzoneserverv2.onrender.com",
  // baseURL: "http://localhost:8000",
});

export default instance;
