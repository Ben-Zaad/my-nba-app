import {useContext, useState} from "react";
import styled from "styled-components";
import {Column, FlexBox, Row, ScrollableContainer} from "../components/styledComponents";
import {PlayerContext} from "../context/PlayerContext";
import BasketBallIcon from "../assets/basket_ball_icon.svg";
import GrayBasketBallIcon from "../assets/gray_basket_ball_icon.svg";
import StarIcon from "../assets/star-icon.svg";

interface ColoredListProps {
    color: string;
}

export const HomePage = () => {
    const playersContext = useContext(PlayerContext);
    const {players, favorites, addFavorite, removeFavorite, isLoading, page, totalPages, setPlayerPage, getPlayers} = playersContext;
    const [searchValue, setSearchValue] = useState("")
    const [listColor, setListColor] = useState("Type a Color")

    return (
        <HomePageContainer>
            <Row>
            <HalfScreenContainer>
                <SearchContainer>
                    <SearchTitle>Enter Player's Name Here:</SearchTitle>
                    <StyledInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <SearchFieldButtonRow>
                        {page > 0 && players.length > 0 && totalPages &&
                          <ArrowButton onClick={() => setPlayerPage(page - 1, searchValue)}>{"<-"}</ArrowButton>}
                        <SearchButton onClick={() => getPlayers(searchValue, page)}>Search</SearchButton>
                        {page < totalPages &&
                          <ArrowButton onClick={() => setPlayerPage(page + 1, searchValue)}>{"->"}</ArrowButton>}
                    </SearchFieldButtonRow>
                    Page {page} out of {totalPages}
                </SearchContainer>
                    <StyledRow key={'title'}>
                        <StyledImage src={StarIcon}/>
                        <StyledListBox>First Name</StyledListBox>
                        <StyledListBox>Last Name</StyledListBox>
                        <StyledListBox>Height</StyledListBox>
                        <StyledListBox>Position</StyledListBox>
                    </StyledRow>
                <CustomScrollableContainer>
                    {isLoading ? <>Loading...</> : players?.map((player) => {
                        return (<StyledRow onClick={()=>addFavorite(player)} key={player.key}>
                            <StyledImage src={favorites.includes(player) ? BasketBallIcon : GrayBasketBallIcon}/>
                            <StyledListBox>{player.firstName}</StyledListBox>
                            <StyledListBox>{player.lastName}</StyledListBox>
                            <StyledListBox>{player.height}</StyledListBox>
                            <StyledListBox>{player.position}</StyledListBox>
                        </StyledRow>)
                    })}
                </CustomScrollableContainer>
            </HalfScreenContainer>
            <HalfScreenContainer>
                <ColoredList color={listColor}>
                <InputListColor>
                    <ColorListPadding>
                    <SearchTitle>Type Here To Change This List Color:</SearchTitle>
                <StyledInput value={listColor} onChange={(e)=>setListColor(e.target.value)} />
                    </ColorListPadding>
                    {favorites.length > 0 && <StyledRow key={'title'}>
                        <StyledImage src={StarIcon}/>
                        <StyledListBox>First Name</StyledListBox>
                        <StyledListBox>Last Name</StyledListBox>
                        <StyledListBox>Height</StyledListBox>
                        <StyledListBox>Position</StyledListBox>
                    </StyledRow>}
                    {favorites.map((player => {
                    return (
                        <StyledRow onClick={()=>removeFavorite(player.id)} key={player.key + 'favorites'}>
                            <StyledImage src={favorites.includes(player) ? BasketBallIcon : GrayBasketBallIcon}/>
                            <StyledListBox>{player.firstName}</StyledListBox>
                            <StyledListBox>{player.lastName}</StyledListBox>
                            <StyledListBox>{player.height}</StyledListBox>
                            <StyledListBox>{player.position}</StyledListBox>
                        </StyledRow>)
                }))}
                </InputListColor>
                </ColoredList>
            </HalfScreenContainer>
            </Row>
        </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
  overflow: hidden;
`

const SearchContainer = styled(Column)`
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 8rem;
  background: linear-gradient(darkred, red, darkred);
`

const InputListColor = styled(Column)`
  align-content: center;
  align-items: center;
  width: 100%;
  min-height: 8rem;
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
  font-size: 16px;
  font-weight: 600;
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
  padding: 1rem;
`
const ArrowButton = styled.button``

const CustomScrollableContainer = styled(ScrollableContainer)`
  max-height: 70vh;
`

const ColoredList = styled(FlexBox)<ColoredListProps>`
    background-color: ${p=>p.color};
    min-height: 100rem;
`

const ColorListPadding = styled.div`
  padding-bottom: 1rem;
`