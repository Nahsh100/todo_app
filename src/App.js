import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import db from "./firebase";
import firebase from "firebase";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { auth, provider } from "./firebase.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  });

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/page/:pageId">
                <Page />
              </Route>

              <Route index element="/my day">
                <Page />
              </Route>
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
}
export default App;
