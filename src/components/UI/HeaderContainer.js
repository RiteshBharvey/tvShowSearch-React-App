import React from "react";
import classes from "./HeaderContainer.module.css";
const HeaderContainer = (props) => {
  return <div className={classes["our-story-container"]}>{props.children}</div>;
};

export default HeaderContainer;
