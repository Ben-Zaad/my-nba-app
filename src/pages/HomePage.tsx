import {useContext, useState} from "react";
import styled from "styled-components";
import {Column, Row, ScrollableContainer} from "../components/styledComponents";
import {PlayerContext} from "../context/PlayerContext";
import BasketBallIcon from "../assets/basket_ball_icon.svg";

export const HomePage = () => {
    const playersContext = useContext(PlayerContext);
    const {players, page, getPlayers} = playersContext;
    const [searchValue, setSearchValue] = useState("")

    return (
        <HomePageContainer>
            <HalfScreenContainer>
                <SearchContainer>
                    <SearchTitle>Enter Player's Name Here:</SearchTitle>
                    <StyledInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <SearchFieldButtonRow>
                        {"<-"}
                    <SearchButton onClick={() => getPlayers(searchValue, page)}>Search</SearchButton>
                        {"->"}
                    </SearchFieldButtonRow>
                </SearchContainer>
                <div>
                    <StyledRow key={'title'}>
                        <StyledImage src={BasketBallIcon}/>
                        <StyledListBox>First Name</StyledListBox>
                        <StyledListBox>Last Name</StyledListBox>
                        <StyledListBox>Position</StyledListBox>
                    </StyledRow>
                    {players?.map((player) => {
                        return (<StyledRow key={player.key}>
                            <StyledImage src={BasketBallIcon}/>
                            <StyledListBox>{player.firstName}</StyledListBox>
                            <StyledListBox>{player.lastName}</StyledListBox>
                            <StyledListBox>{player.position}</StyledListBox>
                        </StyledRow>)
                    })}
                </div>
            </HalfScreenContainer>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
`

const SearchContainer = styled(Column)`
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 8rem;
  background: linear-gradient(darkred, red, darkred);
`

const StyledInput = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 8px;
  padding: 0 0 0 1rem;
  border-width: 1px;

  &:focus {
    outline: none;
  }

`

const SearchTitle = styled.div`
  font-size: 14px;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const SearchButton = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 8px;
  border-width: 1px;
  background: linear-gradient(burlywood, whitesmoke, burlywood);
`

const StyledRow = styled(Row)`
  width: 100%;
  height: 2rem;
  align-items: center;
  background: linear-gradient(royalblue, cornflowerblue, royalblue);
  border-bottom: 1px solid darkblue;
  justify-content: space-around;
  text-align: left;
`

const SearchFieldButtonRow = styled(Row)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const StyledListBox = styled.div`
  width: 25%;
`

const HalfScreenContainer = styled(Column)`
  width: 50%;
`

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
`
