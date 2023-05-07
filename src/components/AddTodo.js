import React, { useEffect, useState } from "react";
import "./AddTodo.css";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import db from "../firebase";
import firebase from "firebase";
import IconButton from "@material-ui/core/IconButton";
import { useStateValue } from "../StateProvider";

function AddTodo() {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const addTodo = (e) => {
    e.preventDefault();

    db.collection("users")
      .doc(user.uid)
      .collection("my day")
      .add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setInput(""); // clear up the input field after hitting the submit button
  };

  return (
    <div className="addTodo">
      <div className="addTodo__leftMain">
        <form className="addTodo__left">
          <IconButton
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            <AddOutlinedIcon />
          </IconButton>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a Todo"
          />
        </form>
      </div>
      <div className="addTodo__right"></div>
    </div>
  );
}

export default AddTodo;
