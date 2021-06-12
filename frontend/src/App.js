import React from "react";
import "./App.css";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostEditPage from './pages/PostEditPage';
import PostWritePage from './pages/PostWritePage';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route path="/" component={MainPage} exact/> 
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/edit" component={PostEditPage} />
      <Route path="/write" component={PostWritePage} />
    </>
  )
}

export default App;