import React from "react";
import "./App.css";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditPage from './pages/EditPage';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route path="/" component={MainPage} exact/> 
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/edit" component={EditPage} />
    </>
  )
}

export default App;