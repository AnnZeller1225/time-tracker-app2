import React from "react";
import "./login.css";
const Login = () => {
  return (
     <div class="form">
    <h1>войдите</h1>
    введите логин
    <input type="text" class="input-name" />
    пароль
    <input type="text" class="input-surname" />
  </div>
  );
};

export default Login;
