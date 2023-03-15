import logo from './logo.svg';
import './App.css';
import SimpleForm from './Simple-form';
import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
function App() {
  return (
    <div className="App">
      <Header />
      <SimpleForm />
      <Footer />
    </div>
  );
}

export default App;
