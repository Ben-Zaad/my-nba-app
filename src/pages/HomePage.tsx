import {useContext, useState} from "react";
import styled from "styled-components";
import {Column, Row} from "../components/styledComponents";
import {PlayerContext} from "../context/PlayerContext";

export const HomePage = () => {
    const playersContext = useContext(PlayerContext);
    const {players, getPlayers} = playersContext;
    const [searchValue, setSearchValue] = useState("")

    return (
        <HomePageContainer>
            <HalfScreenContainer>
                <SearchContainer>
                        <SearchTitle>Enter Player's Name Here:</SearchTitle>
                        <StyledInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                        <SearchButton onClick={() => getPlayers(searchValue)}>Search</SearchButton>
                </SearchContainer>
                {players?.map((player) => {
                    return (<StyledRow key={player.key}>
                        <StyledListBox>{player.firstName}</StyledListBox>
                        <StyledListBox>{player.lastName}</StyledListBox>
                        <StyledListBox>{player.position}</StyledListBox>
                    </StyledRow>)
                })}
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
  height: 100%;
  background-color: red;
`

const StyledInput = styled.input`
  width: 20rem;
  height: 2rem;
  border-radius: 8px;
  padding: 0 0 0 1rem;
`

const SearchTitle = styled.div`
  font-size: 14px;
`

const SearchButton = styled.button`
  height: 30px;
  width: 80px;
  border-radius: 8px;
`

const StyledRow = styled(Row)`
  width: 100%;
  background-color: royalblue;
  border-bottom: 1px solid darkblue;
  justify-content: space-around;
  text-align: left;
`

const StyledListBox = styled.div`
  width: 25%;
`

const HalfScreenContainer = styled(Column)`
  width: 50%;
`
