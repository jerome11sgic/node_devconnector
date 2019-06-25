import React from 'react';
import './App.css';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
