import React, { useRef, useState } from "react";
import classes from "./HeaderText.module.css";
import {debounce} from "lodash";

const HeaderText = (props) => {
  const [message, setMessage] = useState();
  const [placeHolder, setPlaceHolder] = useState("eg: Friends....");
  const [selected, setSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
 
  const actorRadioBtn = useRef("");
  const showsRadioBtn = useRef("");
  const inputSearch = useRef();
  
  const userSearchHandler = debounce( async(e)=> {
   
    if (actorRadioBtn.current.checked || showsRadioBtn.current.checked) {
      setSelected(true);
    } else {
      setSelected(false);
    }

    if (showsRadioBtn.current.checked && inputSearch.current.value.trim().length > 0) {
      const api = `https://api.tvmaze.com/search/${showsRadioBtn.current.value}?q=${inputSearch.current.value.trim()}`;
      setIsLoading(true);
      const response = await fetch(api);
      const data = await response.json();
      if(data.length===0){
        setSearchResult(true);
      }else{
        setSearchResult(false);
      }
      props.onSearch(data);
      setIsLoading(false);
    }
    if(showsRadioBtn.current.checked && inputSearch.current.value.trim().length === 0){
      props.onSearch([]);
      setSearchResult(false);
    }
    if (actorRadioBtn.current.checked && inputSearch.current.value.trim().length > 0) {

      const api = `https://api.tvmaze.com/search/${actorRadioBtn.current.value}?q=${inputSearch.current.value.trim()}`;
     
      const response = await fetch(api);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setIsLoading(true);
          fetch(`https://api.tvmaze.com/people/${data[0].person.id}/castcredits?embed=show`).then((response)=>{
            return response.json()
          }).then((data)=>{
            const actorSearchdata = [];
              data.forEach((val) => {
                actorSearchdata.push(val._embedded);
              });
              if(data.length===0){
                setSearchResult(true);
              }else{
                setSearchResult(false);
              }
              if(inputSearch.current.value.trim() !== ""){
                props.onSearch(actorSearchdata);
                setIsLoading(false);
              }else{
                props.onSearch([]);
                setIsLoading(false);
                setSearchResult(true);
              }
          })
        }else if(data.length===0){
          props.onSearch(data);
          setSearchResult(true);
        }
      }
    }
    if(actorRadioBtn.current.checked && inputSearch.current.value.trim().length === 0){
      props.onSearch([]);
      setSearchResult(false);
    }
  },500)

  function selectHandler(e) {
    setMessage(e.target.value);
    setSelected(true);
    if (e.target.value === "people") {
      setPlaceHolder("eg: Nick Jonas....");
    } else {
      setPlaceHolder("eg: Friends....");
    }
  }

  return (
    <>
    <div className={classes["our-story-card-text"]}>
      <h1 id="" className={classes["our-story-card-title"]}>
        Unlimited movies, TV shows and more.
      </h1>
      <h2 id="" className={classes["our-story-card-subtitle"]}>
        Search anywhere. Any anytime.
      </h2>
      <div className={classes["email-form"]}>
        <h3 className={classes["email-form-title"]}>
          Ready to search? Search your fav. show by show name or by actor name.
        </h3>
        <div className={classes.searchOption}>
          <div>
            <input
              id="actor"
              type="radio"
              value="people"
              name="search"
              autoComplete="off"
              ref={actorRadioBtn}
              onChange={selectHandler}
            />
            <label htmlFor="actor">Actor</label>
          </div>
          <div>
            <input
              id="show"
              type="radio"
              value="shows"
              name="search"
              ref={showsRadioBtn}
              onChange={selectHandler}
            />
            <label htmlFor="show">Shows</label>
          </div>
        </div>
        {message && (
          <p className={classes.userMessage}>Enter {message} name to serach show below</p>
        )}
        <div className={classes["email-form-lockup"]}>
          <input
            type="text"
            name="text"
            className={classes.nfTextField}
            id="id_email_hero_fuji"
            placeholder={placeHolder}
            ref={inputSearch}
            onChange={userSearchHandler}
          />
        </div>
      </div>
      {!selected && (
        <p className={classes.btnSelected}>Please select the above options</p>
      )}
    </div>
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {searchResult && <p className={classes.searchResult}>No result found!!</p>}
      </>
  );
};

export default HeaderText;
