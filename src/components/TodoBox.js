import React, { useEffect, useState } from "react";
import "./TodoBox.css";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import firebase from "firebase";
import db from "../firebase";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    background: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TodoBox({ task }) {
  const { pageId } = useParams();
  const [{ user }] = useStateValue();

  const [userData, setUserData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    // update the todo the new input text

    db.collection("users")
      .doc(user.uid)
      .collection("my day")
      .doc(task.id)
      .set(
        {
          todo: input,
        },
        { merge: true }
      );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a model</h1>
          <form>
            <input
              placeholder={task.todo}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={updateTodo}
            >
              Update Todo
            </Button>
          </form>
        </div>
      </Modal>

      <div className="todobox">
        <div className="todobox__left">
          <Brightness1OutlinedIcon />
          <p>{task.todo}</p>
        </div>
        <div className="todobox__right">
          <EditOutlinedIcon
            className="editIcon"
            onClick={(e) => setOpen(true)}
          />
          <DeleteOutlinedIcon
            className="deleteIcon"
            onClick={(e) =>
              db
                .collection("users")
                .doc(user.uid)
                .collection("my day")
                .doc(task.id)
                .delete()
            }
          />
        </div>
      </div>
    </>
  );
}

export default TodoBox;
