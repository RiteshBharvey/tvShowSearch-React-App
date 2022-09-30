import React from "react";
import classes from "./HeaderBackGround.module.css";
import image from "../images/nfBanner.jpg"

const HeaderBackGround = () => {
  return (
    <div className={classes["our-story-card-background"]}>
      <div className={classes["concord-img-wrapper"]}>
        <img
          className={classes["concord-img"]}
          src={image}
          alt=""
        />
        <div className={classes["concord-img-gradient"]}></div>
      </div>
    </div>
  );
};

export default HeaderBackGround;
