import React, { useEffect, useState } from "react";
import "./Page.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TabIcon from "@material-ui/icons/Tab";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HouseIcon from "@material-ui/icons/House";
import TodoBox from "./TodoBox";
import AddTodo from "./AddTodo";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

function Page() {
  const [todos, setTodos] = useState([]);
  const { pageId } = useParams();
  const [{ user }] = useStateValue();

  useEffect(() => {
    //this code here... fire when the component loads

    db.collection("users")
      .doc(user.uid)
      .collection("my day")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
    console.log("hi");
  }, []);

  return (
    <div className="page">
      <div
        className={`page__header ${
          pageId === "my day" ? "page__headerStyle1" : ""
        } ${pageId === "important" ? "page__headerStyle2" : ""} ${
          pageId === "planned" ? "page__headerStyle3" : ""
        } ${pageId === "assigned" ? "page__headerStyle4" : ""} ${
          pageId === "tasks" ? "page__headerStyle5" : ""
        }`}
      >
        <div className={`page__headerTitle `}>
          {pageId === "my day" ? (
            <StarBorderIcon className="page__headerIcon" />
          ) : null}
          {pageId === "planned" ? (
            <EventNoteIcon className="page__headerIcon" />
          ) : null}
          {pageId === "assigned" ? (
            <PermIdentityIcon className="page__headerIcon" />
          ) : null}
          {pageId === "tasks" ? (
            <HouseIcon className="page__headerIcon" />
          ) : null}
          <WbSunnyIcon className="page__headerIcon" />
          <h1 className="page__heading"> My Day </h1>
        </div>
        <div className="page__headerIcons">
          <TabIcon />
          <MoreHorizIcon />
        </div>
      </div>
      {todos.map((todo) => (
        <TodoBox task={todo} />
      ))}

      <AddTodo className="page__addTodo" />
    </div>
  );
}

export default Page;
