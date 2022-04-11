import React from 'react'
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from './Home/Home';
import { UserProvider } from './context/UserContext';
import Chat from './Chat/Chat';

function App() {

  return (
    <>
    <UserProvider>
        <Switch>
          {/* OUT */}
          <Route exact path="/" component={Home} />
          {/* IN */}
          <Route exact path="/chat" component={Chat}/>
        </Switch>
        <ToastContainer autoClose={1500} hideProgressBar />
    </UserProvider>
    </>
  );
}

export default App;
