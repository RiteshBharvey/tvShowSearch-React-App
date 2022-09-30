import React from "react";
import classes from "./Card.module.css";
import fallBackImage from "../images/fallBackImg.png";
import htmlReactParser from "html-react-parser";

const Card = (props) => {
  return (
    <li className={classes.card} id={props.show.id}>
      <div className={classes.cardContainer}>
        <img
          className={classes.image}
          src={props.show.image ? props.show.image.medium : fallBackImage}
          alt=""
        />
        <div className={classes.cardContent}>
          <h4>{props.show.name}</h4>
          <div className={classes.cardText}>
            {props.show.summary ? htmlReactParser(props.show.summary) : "N.A"}
          </div>
          <p className={classes.cardStar}>
            <i className={`${"fa-solid fa-star"} ${classes["fa-star"]}`}></i>
            {props.show.rating.average ? props.show.rating.average : "N.A"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;
