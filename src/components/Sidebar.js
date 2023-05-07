import React from "react";
import "./Sidebar.css";
import { Avatar, Button } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import SidebarOption from "./SidebarOption";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HouseIcon from "@material-ui/icons/House";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Sidebar() {
  const [{ user }] = useStateValue();

  return (
    <div className="home_sidebar">
      {" "}
      {/* sidebar */}
      <div className="home_sidebarHeader">
        <Avatar
          className="home_avatar"
          alt={user.displayName}
          src={user.photoURL}
        />
        <div className="home_sidebarInfo">
          <h2>
            {user.displayName} <br />
          </h2>
          <h3>
            {" "}
            <FiberManualRecordIcon className="online_icon" />
            {user.email}
          </h3>
        </div>
      </div>
      <Button
        onClick={() => auth.signOut().then(() => window.location.reload())}
        color="primary"
        variant="contained"
      >
        Sign out
      </Button>
      <div className="home_sidebarSearch">
        <input type="text" placeholder="Search" />
        <SearchIcon />
      </div>
      <Link to="my day">
        {" "}
        <SidebarOption Icon={WbSunnyIcon} title="My Day" number="1" href="/" />
      </Link>
      <Link to="#">
        {" "}
        <SidebarOption
          Icon={StarBorderIcon}
          title="Important"
          number="2"
          href="/page/important"
        />
      </Link>
      <Link to="#">
        {" "}
        <SidebarOption
          Icon={EventNoteIcon}
          title="Planned"
          number="3"
          href="/page/planned"
        />{" "}
      </Link>
      <Link to="#">
        {" "}
        <SidebarOption
          Icon={PermIdentityIcon}
          title="Assigned to me"
          number="4"
          href="/page/assigned"
        />
      </Link>
      <Link to="#">
        {" "}
        <SidebarOption
          Icon={HouseIcon}
          title="Tasks"
          number="5"
          href="/page/tasks"
        />
      </Link>
    </div>
  );
}

export default Sidebar;
