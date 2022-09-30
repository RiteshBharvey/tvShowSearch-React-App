import React from "react";
import classes from "./HeaderCardContainer.module.css";

const HeaderCardContainer = (props) => {
  return <div className={classes["our-story-card"]}>{props.children}</div>;
};

export default HeaderCardContainer;