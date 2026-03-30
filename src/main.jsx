/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/

//ye react app ko brower me load karta he main.jsx file(flow: main.jsx->App.jsx->Brower)
/*import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";

//ye react appp ko HTML me show karta he
ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/


import React from "react"
import ReactDOM from "react-dom/client";

import App from "./App";

import './index.css'

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider>
    <App />
  </AuthProvider>

);
