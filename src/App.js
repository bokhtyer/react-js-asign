import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./app/Home";
import Header from "./component/Header";
import Admin from "./app/Admin";
import Employee from "./app/Employee";
import ViewDetails from './component/Add/ViewDetails'
import EditUser from "./component/Add/EditUser";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/employee">
            <Employee />
          </Route> */}
          <Route exact path="/view-user/:id">
            <ViewDetails />
          </Route>
          <Route exact path="/edit-user/:id">
            <EditUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
