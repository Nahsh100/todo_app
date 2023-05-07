import React, { useEffect } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase.js";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import db from "../firebase";

function Login() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
      }
    });
  }, [dispatch]);

  const signIn = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        db.collection("users")
          .doc(result.user.uid)
          .set({
            name: result.user.displayName,
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps.png"
          alt=""
        />
        <h1>Sign in to your todo-app</h1>
        <p>mytodoapp.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
