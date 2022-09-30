import { useState } from "react";
import Cards from "./components/Cards";
import Header from "./components/Header";
import HeaderBackGround from "./components/HeaderBackGround";
import HeaderText from "./components/HeaderText";
import HeaderCardContainer from "./components/UI/HeaderCardContainer";
import HeaderContainer from "./components/UI/HeaderContainer";

function App() {
const [cardData, setCardData]=useState([]);  
function searchHandler(data){
  setCardData(data);
}
  return (
    <>
      <HeaderContainer>
        <Header />
        <HeaderCardContainer>
          <HeaderBackGround />
          <HeaderText onSearch={searchHandler}/>
        </HeaderCardContainer>
      </HeaderContainer>
      <Cards data={cardData}/>
    </>
  );
}

export default App;
