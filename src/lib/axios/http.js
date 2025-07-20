import axios from "axios";
// import Swal from "sweetalert2";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "Bearer " +
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImlkIjozLCJlbWFpbCI6ImFkbWluZ3Jpa0BnbWFpbC5jb20iLCJwcm9maWxlX2lkIjo0LCJ1cGRhdGVkQXQiOiIyMDI1LTA3LTE5VDE3OjA0OjE3LjQzMFoiLCJjcmVhdGVkQXQiOiIyMDI1LTA3LTE5VDE3OjA0OjE3LjQzMFoiLCJpYXQiOjE3NTI5NDQ2NTd9.j3LPlb7AsMAW_G3iyoS88l7EmmAEyDckmE48DoU0bkY`;
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
    if (error.response && error.response.status === 401) {
      // Tangani error 401 di sini, misalnya, redirect atau tampilkan pesan
    //   if (window) window.location.replace("/logout");
    }
    return Promise.reject(error);
  }
);

export default http;
