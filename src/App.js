import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector} from 'react-redux'

import StartPage from "./components/StartPage";
import Question from "./components/Question";
import EndScreen from "./components/EndScreen";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute"

function App() {
    const user = useSelector((state) => state.user)
  return (
    <BrowserRouter >
      <Switch>
        <PrivateRoute exact path="/" ><StartPage/></PrivateRoute>
        <PrivateRoute exact path="/questions" component={ Question}/>
        <PrivateRoute exact path="/end" component={EndScreen} />
        <Route exact path="/login"><Login/></Route>
        
      </Switch>
    </BrowserRouter>
    

  );
}

export default App;
