import axios from "axios";

const instance = axios.create({
  baseURL: "https://query-task.onrender.com",
  withCredentials: true,
//   headers: {
//     token: localStorage.getItem("Accesstoken"),
//   },
});

export default instance;
