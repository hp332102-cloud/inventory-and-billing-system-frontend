/*import axios from "axios";
//api instance create karna(abb pura url nahi likhana padega)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//interceptor ka kaam(ye code har request se pehle run hota he)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");//token read karna
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;//token request me add karna(ab backend ko token mil jayega)
  }
  return req;
});

export default API;//ab tum isko dusri files me use kar sakte ho*/

//ye file automatically token ke sath backend ko request bhejti he



import axios from "axios";

// backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// automatic token add karega(automatically send token with every request)
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;