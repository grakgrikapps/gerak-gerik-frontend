import axios from "axios";
// import Swal from "sweetalert2";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    if (Cookies.get("token"))
      config.headers["Authorization"] = "Bearer " + Cookies.get("token");

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// add a response interceptor
http.interceptors.response.use(
  (response) => {
    // Tangani respons sukses di sini jika diperlukan
    return response?.data;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // Tangani error 401 di sini, misalnya, redirect atau tampilkan pesan
    //   if (window) window.location.replace("/logout");
    // }
    return Promise.reject(error);
  }
);

export default http;
