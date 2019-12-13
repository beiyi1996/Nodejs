import React from "react";
import Home from "./views/Home";
import Completed from "./views/Completed";
import LogIn from "./views/LogIn";
import Register from "./views/Register";
import ModifiedPassword from "./views/ModifiedPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ModifiedPassword />
    </div>
  );
}

export default App;
