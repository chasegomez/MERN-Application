import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ReactLogo from './images/react.svg';
import ForgeLogo from './images/forge_icon.png';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <img src={ForgeLogo} alt="forge logo" width="90px"></img>
        <h1>Welcome to iForge</h1>
        <p>Exercise activity is listed in the activity tracker below:</p>
      </header>
      <div className="App-body">
        <Router>
          <Navigation />
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create-exercise">
            <CreatePage />
          </Route>
          <Route path="/edit-exercise">
            <EditPage exerciseToEdit={exerciseToEdit} />
          </Route>
        </Router>
      </div>
      <footer className="App-footer">
        <p>Powered by:</p>
        <img src={ReactLogo} alt="react logo" className="App-logo"></img>
        <p>© 2022 | Chase Gomez</p>
      </footer>
    </div>
    
  );
}

export default App;
