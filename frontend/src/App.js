import React from "react";
import "./App.css";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route path="/" component={MainPage} exact/> 
      <Route path="/login" component={LoginPage} />
    </>
  )
}

export default App;