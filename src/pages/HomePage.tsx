import {useContext, useState} from "react";
import styled from "styled-components";
import {Column, FlexBox, Row} from "../components/styledComponents";
import {PlayerContext} from "../context/PlayerContext";

export const HomePage = () => {
    const playersContext = useContext(PlayerContext);
    const {players, getPlayers} = playersContext;
    const [searchValue, setSeatchValue] = useState("")

    return (
        <HomePageContainer>
            <Column>
                <SearchContainer>
                    <Column>
                        <SearchTitle>Enter Player's Name Here:</SearchTitle>
                        <StyledInput value={searchValue} onChange={(e) => setSeatchValue(e.target.value)}/>
                        <SearchButton onClick={() => getPlayers(searchValue)}>Search</SearchButton>
                    </Column>
                </SearchContainer>
                {players?.map((player) => {
                    return (<Row key={player.key}>
                        <div>{player.firstName}</div>
                        <div>{player.lastName}</div>
                    </Row>)
                })}
            </Column>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
`

const SearchContainer = styled(FlexBox)`
  align-content: center;
  width: 50%;
  height: 100%;
  background-color: red;
`

const StyledInput = styled.input`
  width: 30rem;
  height: 2rem;
`

const SearchTitle = styled.div`
  font-size: 14px;
`

const SearchButton = styled.button`
  height: 50px;
  width: 100px;
`
