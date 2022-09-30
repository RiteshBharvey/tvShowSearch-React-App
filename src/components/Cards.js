import React from "react";
import Card from "./Card";
import classes from "./Cards.module.css";
// import data from "./data";

const Cards = (props) => {
  return (
    <div>
      <ul className={classes.cards}>
        {props.data.map((val) => {
          return <Card show={val.show} key={Math.random()}/>;
        })}
      </ul>
    </div>
  );
};

export default Cards;