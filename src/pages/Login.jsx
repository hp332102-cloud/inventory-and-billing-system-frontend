/*import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //email and password store karne k liye state  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //context se login function lena
  const { login } = useContext(AuthContext);
  //redirect function
  const navigate = useNavigate();
  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();//page reload stop karna

    try {
        //backend api call
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);//token lena backend se
      navigate("/dashboard");//dashboard par redirect karega

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;*/


import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await API.post("/users/login", {
        mobile:mobile,
        password:password,
      });

      const token = res.data.token;

      //Add this 1 line
      localStorage.setItem("token",token);

      login(token);

      navigate("/dashboard");

    } catch (error) {

      //alert("Login failed");
      
      console.log(error);
      console.log(error.response);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
};

export default Login;