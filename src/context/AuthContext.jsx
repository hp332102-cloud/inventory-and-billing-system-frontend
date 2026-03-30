//createContext->global data share karne k liye
//useState->data store karne k liye
/*import { createContext, useEffect, useState } from "react";
//AuthContext create karna(ye ek global box banata he jisme login data store hoga)
export const AuthContext = createContext();
//AuthProvider function create karna(ye ek wrapper he jo poori app ko login data provide karega)
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);//user state banana(ye user data store karta he)

  //load token on app start
  useEffect(() => {
    const token =localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  //login function 
  const login = (token) => {
    localStorage.setItem("token", token);//token save karta he brower me
    setUser(token);//user state update karta he(ab react ko pata chal gaya user login he)
  };

  //logout function
  const logout = () => {
    localStorage.removeItem("token");//token delete karta he
    setUser(null);//user ko null karta he(means user logout ho gaya)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};*/


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // page refresh hone par token check karega
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(token);
    }
  }, []);

  // login function
  const login = (token) => {

    localStorage.setItem("token", token);

    setUser(token);
  };

  // logout function
  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};